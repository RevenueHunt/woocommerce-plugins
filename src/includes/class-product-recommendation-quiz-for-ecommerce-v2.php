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
	 * @return array Connection or empty array for V1.
	 */
	public static function connection() {
		$value = get_option( self::OPTION, array() );
		return is_array( $value ) && isset( $value['mode'] ) && 'v2' === $value['mode'] ? $value : array();
	}

	/**
	 * Accept V2 credentials only at first connect. Existing V1 shops cannot migrate.
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
		if ( self::connection() || get_option( PRQ_OPTION_SHOP_HASHID ) ) {
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

	/** Register hooks only for a connected V2 store. @return void */
	public function run() {
		if ( ! self::connection() ) {
			return;
		}
		$catalog = new Product_Recommendation_Quiz_For_Ecommerce_V2_Catalog();
		$orders  = new Product_Recommendation_Quiz_For_Ecommerce_V2_Orders();
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		add_action( 'action_scheduler_init', array( $catalog, 'schedule_nightly' ) );
		add_action( 'prq_v2_catalog_nightly', array( $catalog, 'nightly' ) );
		add_action( 'prq_v2_catalog_batch', array( $catalog, 'batch' ), 10, 1 );
		add_action( 'prq_v2_catalog_cleanup', array( $catalog, 'cleanup' ), 10, 1 );
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
		foreach ( array(
			array( '/catalog/export', 'POST', array( $catalog, 'queue' ), array( $this, 'authorize' ) ),
			array( '/catalog/download', 'GET', array( $catalog, 'download' ), array( $catalog, 'authorize_download' ) ),
			array( '/orders', 'GET', array( $orders, 'lookup' ), array( $this, 'authorize' ) ),
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
	 * Verify the contract's timestamp.body signature (raw bytes, not parsed JSON).
	 *
	 * @param string $secret Shared secret.
	 * @param string $timestamp Unix timestamp header.
	 * @param string $body Raw request body.
	 * @param string $signature Signature header.
	 * @param int    $now Current Unix time.
	 * @return bool Whether authentic and within five minutes, including future skew.
	 */
	public static function verify( $secret, $timestamp, $body, $signature, $now ) {
		return '' !== $secret && ctype_digit( $timestamp ) && abs( $now - (int) $timestamp ) <= 300
			&& hash_equals( 'sha256=' . hash_hmac( 'sha256', $timestamp . '.' . $body, $secret ), $signature );
	}

	/**
	 * REST permission callback.
	 *
	 * @param WP_REST_Request $request Signed request.
	 * @return bool Whether authorized.
	 */
	public function authorize( $request ) {
		$connection = self::connection();
		return $connection && self::verify( $connection['shared_secret'], (string) $request->get_header( 'X-PRQ-Timestamp' ), $request->get_body(), (string) $request->get_header( 'X-PRQ-Signature' ), time() );
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
