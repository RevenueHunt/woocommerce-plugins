<?php
/**
 * V2 connection and request signing. Absent connection means V1, always.
 *
 * @package Product_Recommendation_Quiz_For_Ecommerce
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

/** V2-only integration entry point. */
class Product_Recommendation_Quiz_For_Ecommerce_V2 {
	/** Connection option, deliberately not autoloaded. */
	const OPTION = 'prq_v2_connection';

	/**
	 * Read the connection selected by the monolith, never infer it from a domain.
	 *
	 * @param bool $fresh Whether a worker needs changes made by another request.
	 * @return array Connection or empty array for V1.
	 */
	public static function connection( $fresh = false ) {
		if ( $fresh ) {
			wp_cache_delete( self::OPTION, 'options' );
			// A worker booted before connect may have cached the option as missing.
			wp_cache_delete( 'notoptions', 'options' );
		}
		$value = get_option( self::OPTION, array() );
		return is_array( $value ) && isset( $value['mode'] ) && 'v2' === $value['mode'] ? $value : array();
	}

	/**
	 * Accept V2 credentials on first connect or when the matching V1 shop switches.
	 *
	 * @param WP_REST_Request $request Token intake request (already authenticated).
	 * @return true|WP_Error Validation result.
	 */
	public static function connect( $request ) {
		if ( 'v2' !== $request->get_param( 'mode' ) ) {
			return true;
		}
		if ( ! get_current_user_id() || '/wc/v3/prq_set_token' !== $request->get_route() ) {
			return new WP_Error( 'prq_woocommerce_authorize_required', __( "Please connect from WooCommerce's authorize screen.", 'product-recommendation-quiz-for-ecommerce' ), array( 'status' => 403 ) );
		}
		$hashid = get_option( PRQ_OPTION_SHOP_HASHID );
		if ( $hashid && 'wc-' . $hashid !== $request->get_param( 'shop' ) ) {
			return new WP_Error( 'prq_shop_mismatch', 'Shop does not match the existing connection.', array( 'status' => 403 ) );
		}
		if ( self::connection() ) {
			return true;
		}
		$connection = array( 'mode' => 'v2' );
		foreach ( array( 'shop', 'shared_secret', 'api_url', 'admin_url' ) as $key ) {
			$value = $request->get_param( $key );
			if ( ! is_string( $value ) || '' === $value ) {
				return new WP_Error( 'prq_invalid_connection', 'Invalid V2 connection.', array( 'status' => 400 ) );
			}
			$connection[ $key ] = $value;
		}
		if ( ! preg_match( '/^wc-[a-zA-Z0-9]+$/', $connection['shop'] ) || ! preg_match( '/^[\x21-\x7E]{32,255}$/', $connection['shared_secret'] ) ) {
			return new WP_Error( 'prq_invalid_connection', 'Invalid V2 identity or secret.', array( 'status' => 400 ) );
		}
		foreach ( array( 'api_url', 'admin_url' ) as $key ) {
			if ( ! wp_http_validate_url( $connection[ $key ] ) || 'https' !== wp_parse_url( $connection[ $key ], PHP_URL_SCHEME ) ) {
				return new WP_Error( 'prq_invalid_connection', 'V2 URLs must use HTTPS.', array( 'status' => 400 ) );
			}
			$connection[ $key ] = untrailingslashit( $connection[ $key ] );
		}
		if ( ! add_option( self::OPTION, $connection, '', false ) ) {
			return true;
		}
		$orders = new Product_Recommendation_Quiz_For_Ecommerce_V2_Orders();
		$orders->create_webhooks();
		return true;
	}

	/**
	 * Switch back to V1 without deleting any shop or storefront data.
	 *
	 * @param WP_REST_Request $request Token intake request (already authenticated).
	 * @return true|WP_Error Switch result.
	 */
	public static function disconnect( $request ) {
		if ( ! get_current_user_id() || '/wc/v3/prq_set_token' !== $request->get_route() ) {
			return new WP_Error( 'prq_woocommerce_authorize_required', __( "Please connect from WooCommerce's authorize screen.", 'product-recommendation-quiz-for-ecommerce' ), array( 'status' => 403 ) );
		}
		$hashid = get_option( PRQ_OPTION_SHOP_HASHID );
		if ( ! $hashid || $hashid !== $request->get_param( 'shop_hashid' ) ) {
			return new WP_Error( 'prq_shop_mismatch', 'Shop does not match the existing connection.', array( 'status' => 403 ) );
		}
		if ( self::connection() ) {
			self::deactivate();
			$orders = new Product_Recommendation_Quiz_For_Ecommerce_V2_Orders();
			$orders->set_webhook_status( 'delete' );
			if ( ! delete_option( self::OPTION ) ) {
				return new WP_Error( 'prq_disconnect_failed', 'Could not remove the V2 connection.', array( 'status' => 500 ) );
			}
		}
		return true;
	}

	/** Resume connected V2 stores without changing the V1 activation path. @return void */
	public static function activate() {
		if ( ! self::connection() ) {
			return;
		}
		$orders = new Product_Recommendation_Quiz_For_Ecommerce_V2_Orders();
		$orders->set_webhook_status( 'active' );
		if ( function_exists( 'as_has_scheduled_action' ) ) {
			$catalog = new Product_Recommendation_Quiz_For_Ecommerce_V2_Catalog();
			$catalog->schedule_nightly();
		}
	}

	/** Stop V2 background work, retaining the connection for reactivation. @return void */
	public static function deactivate() {
		if ( ! self::connection() ) {
			return;
		}
		$orders = new Product_Recommendation_Quiz_For_Ecommerce_V2_Orders();
		$orders->set_webhook_status( 'paused' );
		if ( function_exists( 'as_unschedule_all_actions' ) ) {
			as_unschedule_all_actions( '', array(), 'prq' );
		}
		// Canceled batches cannot resume: remove their files and lock so nightly can start afresh.
		$catalog = new Product_Recommendation_Quiz_For_Ecommerce_V2_Catalog();
		$catalog->cleanup_all();
	}

	/** Remove V2 data before attempting a best-effort, bounded uninstall notice. @return void */
	public static function uninstall() {
		$connection = self::connection();
		if ( ! $connection ) {
			return;
		}
		self::deactivate();
		$orders = new Product_Recommendation_Quiz_For_Ecommerce_V2_Orders();
		$orders->set_webhook_status( 'delete' );
		Product_Recommendation_Quiz_For_Ecommerce_V2_Storefront::uninstall();
		delete_option( 'prq_v2_picked_metafields' );
		delete_option( self::OPTION );

		$route     = '/api/woocommerce/uninstalled';
		$body      = wp_json_encode( array( 'shop' => $connection['shop'] ) );
		$timestamp = (string) time();
		wp_remote_post(
			$connection['api_url'] . $route,
			array(
				'headers'     => array(
					'Content-Type'    => 'application/json',
					'X-PRQ-Timestamp' => $timestamp,
					'X-PRQ-Signature' => self::sign( $connection['shared_secret'], $timestamp, 'POST', $route, array(), $body ),
				),
				'body'        => $body,
				'timeout'     => 3,
				'redirection' => 0,
			)
		);
	}

	/** Register worker callbacks before connect; keep request hooks V2-only. @return void */
	public function run() {
		$catalog = new Product_Recommendation_Quiz_For_Ecommerce_V2_Catalog();
		add_action( 'prq_v2_catalog_nightly', array( $catalog, 'nightly' ) );
		add_action( 'prq_v2_catalog_batch', array( $catalog, 'batch' ), 10, 1 );
		add_action( 'prq_v2_catalog_cleanup', array( $catalog, 'cleanup' ), 10, 1 );
		if ( ! self::connection() ) {
			return;
		}
		$orders = new Product_Recommendation_Quiz_For_Ecommerce_V2_Orders();
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		add_action( 'action_scheduler_init', array( $catalog, 'schedule_nightly' ) );
		add_filter( 'woocommerce_store_api_add_to_cart_data', array( $orders, 'cart_data' ), 10, 2 );
		add_action( 'woocommerce_checkout_create_order', array( $orders, 'attribute_order' ) );
		add_action( 'woocommerce_store_api_checkout_update_order_meta', array( $orders, 'attribute_order' ) );
	}

	/** Register no additional REST routes in V1. @return void */
	public function register_routes() {
		if ( ! self::connection() ) {
			return;
		}
		$catalog = new Product_Recommendation_Quiz_For_Ecommerce_V2_Catalog();
		$orders  = new Product_Recommendation_Quiz_For_Ecommerce_V2_Orders();
		$store   = new Product_Recommendation_Quiz_For_Ecommerce_V2_Storefront();
		foreach ( array(
			array( '/catalog/export', 'POST', array( $catalog, 'queue' ), array( $this, 'authorize' ) ),
			array( '/catalog/download', 'GET', array( $catalog, 'download' ), array( $catalog, 'authorize_download' ) ),
			array( '/orders', 'GET', array( $orders, 'lookup' ), array( $this, 'authorize' ) ),
			array( '/quizzes/(?P<sqid>[A-Za-z0-9]+)', 'PUT', array( $store, 'put_quiz' ), array( $this, 'authorize' ) ),
			array( '/quizzes/(?P<sqid>[A-Za-z0-9]+)', 'DELETE', array( $store, 'delete_quiz' ), array( $this, 'authorize' ) ),
			array( '/assistants/(?P<sqid>[A-Za-z0-9]+)', 'PUT', array( $store, 'put_assistant' ), array( $this, 'authorize' ) ),
			array( '/assistants/(?P<sqid>[A-Za-z0-9]+)', 'DELETE', array( $store, 'delete_assistant' ), array( $this, 'authorize' ) ),
			array( '/storefront', 'PUT', array( $store, 'put_storefront' ), array( $this, 'authorize' ) ),
			array( '/storefront', 'GET', array( $store, 'get_storefront' ), array( $this, 'authorize' ) ),
		) as $route ) {
			register_rest_route(
				'prq/v3',
				$route[0],
				array(
					'methods'             => $route[1],
					'callback'            => $route[2],
					'permission_callback' => $route[3],
				)
			);
		}
	}

	/**
	 * Derive the key WooCommerce stores and displays, never expose the master key.
	 *
	 * @param string $secret Shared secret.
	 * @return string Hex-encoded native webhook key.
	 */
	public static function webhook_secret( $secret ) {
		return hash_hmac( 'sha256', 'prq-v2-webhook', $secret );
	}

	/**
	 * Verify timestamp, method, REST route, canonical query and raw body bytes.
	 *
	 * @param string          $secret Shared secret.
	 * @param string          $timestamp Unix timestamp header.
	 * @param WP_REST_Request $request Signed request.
	 * @param string          $signature Signature header.
	 * @param int             $now Current Unix time.
	 * @return bool Whether authentic and within five minutes, including future skew.
	 */
	public static function verify( $secret, $timestamp, $request, $signature, $now ) {
		if ( '' === $secret || ! ctype_digit( $timestamp ) || abs( $now - (int) $timestamp ) > 300 ) {
			return false;
		}
		$expected = self::sign( $secret, $timestamp, $request->get_method(), $request->get_route(), $request->get_query_params(), $request->get_body() );
		return false !== $expected && hash_equals( $expected, $signature );
	}

	/**
	 * Sign either direction with the same canonical request format.
	 *
	 * @param string $secret Shared secret.
	 * @param string $timestamp Unix timestamp header.
	 * @param string $method Uppercase HTTP method.
	 * @param string $route Route path (V2 path or WP REST get_route(), no /wp-json).
	 * @param array  $query Flat query parameters.
	 * @param string $body Raw body bytes.
	 * @return string|false Signature header, or false for non-scalar query values.
	 */
	public static function sign( $secret, $timestamp, $method, $route, $query, $body ) {
		ksort( $query, SORT_STRING );
		$parts = array();
		foreach ( $query as $name => $value ) {
			// The contract uses flat query parameters, not PHP array notation.
			if ( ! is_scalar( $value ) ) {
				return false;
			}
			$parts[] = rawurlencode( (string) $name ) . '=' . rawurlencode( (string) $value );
		}
		$payload = $timestamp . "\n" . $method . "\n" . $route . "\n" . implode( '&', $parts ) . "\n" . $body;
		return 'sha256=' . hash_hmac( 'sha256', $payload, $secret );
	}

	/**
	 * REST permission callback.
	 *
	 * @param WP_REST_Request $request Signed request.
	 * @return true|WP_Error Whether authorized, or an explicit forbidden response.
	 */
	public function authorize( $request ) {
		$connection = self::connection();
		if ( $connection && self::verify( $connection['shared_secret'], (string) $request->get_header( 'X-PRQ-Timestamp' ), $request, (string) $request->get_header( 'X-PRQ-Signature' ), time() ) ) {
			return true;
		}
		return new WP_Error( 'prq_invalid_signature', 'Invalid or expired request signature.', array( 'status' => 403 ) );
	}

	/**
	 * Mint the one-use admin launch JWT. Replay prevention belongs to V2.
	 *
	 * @param array   $connection V2 connection.
	 * @param WP_User $user Signed-in WordPress administrator.
	 * @return string Compact HS256 JWT.
	 */
	public static function admin_token( $connection, $user ) {
		$now    = time();
		$claims = array(
			'iss'     => 'prq-plugin',
			'aud'     => 'rh-v2-admin',
			'shop'    => $connection['shop'],
			'wp_user' => $user->ID,
			'email'   => $user->user_email,
			'name'    => $user->display_name,
			'iat'     => $now,
			'exp'     => $now + 60,
			'jti'     => wp_generate_uuid4(),
		);
		$encode = static function ( $bytes ) {
			// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode -- JWT base64url encoding, not executable code.
			return rtrim( strtr( base64_encode( $bytes ), '+/', '-_' ), '=' );
		};
		$token  = $encode(
			wp_json_encode(
				array(
					'alg' => 'HS256',
					'typ' => 'JWT',
				)
			)
		) . '.' . $encode( wp_json_encode( $claims ) );
		return $token . '.' . $encode( hash_hmac( 'sha256', $token, $connection['shared_secret'], true ) );
	}
}
