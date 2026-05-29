<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://revenuehunt.com/
 * @since      1.0.0
 *
 * @package    Product_Recommendation_Quiz_For_Ecommerce
 * @subpackage Product_Recommendation_Quiz_For_Ecommerce/admin
 */

// Prevent direct access.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Product_Recommendation_Quiz_For_Ecommerce
 * @subpackage Product_Recommendation_Quiz_For_Ecommerce/admin
 */
class Product_Recommendation_Quiz_For_Ecommerce_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Prerequisite checks and diagnostic error screens.
	 *
	 * @since    2.3.9
	 * @var      Product_Recommendation_Quiz_For_Ecommerce_Admin_Diagnostics    $diagnostics    Diagnostics helper.
	 */
	private $diagnostics;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;
		$this->diagnostics = new Product_Recommendation_Quiz_For_Ecommerce_Admin_Diagnostics();
	}

	/**
	 * Register the stylesheets and JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {
		wp_enqueue_style(
			$this->plugin_name,
			plugin_dir_url( __FILE__ ) . 'css/product-recommendation-quiz-for-ecommerce-admin.css',
			array(),
			$this->version,
			'all'
		);

		$data_to_pass = array(
			'shop'           => PRQ_STORE_URL,
			'platform'       => 'woocommerce',
			'channel'        => 'wordpress',
			'plugin_version' => PRQ_PLUGIN_VERSION,
			'woo_version'    => PRQ_WOO_VERSION,
			'wp_version'     => PRQ_WP_VERSION,
		);

		wp_enqueue_script(
			$this->plugin_name,
			PRQ_ADMIN_URL . '/embed.js?shop=' . rawurlencode( PRQ_STORE_URL ),
			array(),
			PRQ_PLUGIN_VERSION,
			true
		);
		wp_localize_script( $this->plugin_name, 'js_vars', $data_to_pass );
	}

	/**
	 * Get WooCommerce authorization URL for initial plugin setup.
	 *
	 * @since 1.0.0
	 * @return string The WooCommerce authorization URL.
	 */
	public function prquiz_get_woocommerce_auth_url() {
		$auth_base    = get_site_url( null, '/wc-auth/v1/authorize/' );
		$return_url   = admin_url( 'admin.php?page=prqfw' );
		$callback_url = PRQ_API_URL . '/api/v1/woocommerce/create';

		$params = array(
			'app_name'     => 'Product Recommendation Quiz',
			'scope'        => 'read_write',
			'user_id'      => PRQ_STORE_URL,
			'return_url'   => $return_url,
			'callback_url' => $callback_url,
		);

		// Add PHP_QUERY_RFC3986 so spaces are encoded as %20 and not +
		$query = http_build_query( $params, '', '&', PHP_QUERY_RFC3986 );

		return $auth_base . '?' . $query;
	}
	
	/**
	 * Get OAuth URL for authenticated admin panel access.
	 *
	 * @since 1.0.0
	 * @return string The OAuth URL with all required parameters.
	 */
	public function prquiz_get_oauth_url() {
		if ( Product_Recommendation_Quiz_For_Ecommerce::is_development_environment() ) {
			$oauth_url = 'http://localhost:9528/public/woocommerce/oauth';
		} else {
			$oauth_url = 'https://admin.revenuehunt.com/public/woocommerce/oauth';
		}

		$shop_hashid = get_option( PRQ_OPTION_SHOP_HASHID );
		$api_key     = get_option( PRQ_OPTION_API_KEY );
		$country     = function_exists( 'WC' ) && WC() && WC()->countries ? WC()->countries->get_base_country() : '';
		$time        = time();

		$data = sprintf(
			'hashid=%s&domain=%s&plugin_version=%s&timestamp=%s',
			$shop_hashid,
			PRQ_STORE_URL,
			PRQ_PLUGIN_VERSION,
			(string) $time
		);
		$hmac = base64_encode( hash_hmac( 'sha256', $data, $api_key, true ) );

		$locale_parts = explode( '_', get_locale() );
		$locale       = isset( $locale_parts[0] ) ? $locale_parts[0] : 'en';

		$params = array(
			'timestamp'      => $time,
			'domain'         => PRQ_STORE_URL,
			'shop_hashid'    => $shop_hashid,
			'channel'        => 'wordpress',
			'country'        => $country,
			'plugin_version' => PRQ_PLUGIN_VERSION,
			'woo_version'    => PRQ_WOO_VERSION,
			'wp_version'     => PRQ_WP_VERSION,
			'name'           => get_bloginfo( 'name' ),
			'email'          => get_bloginfo( 'admin_email' ),
			'locale'         => $locale,
			'timezone'       => get_option( 'gmt_offset' ),
			'currency'       => function_exists( 'get_woocommerce_currency' ) ? get_woocommerce_currency() : '',
			'symbol'         => function_exists( 'get_woocommerce_currency_symbol' ) ? html_entity_decode( get_woocommerce_currency_symbol(), ENT_QUOTES | ENT_SUBSTITUTE | ENT_HTML401 ) : '',
			'hmac'           => $hmac,
		);

		// Use PHP_QUERY_RFC3986 so spaces are encoded as %20 and not +
		$query = http_build_query( $params, '', '&', PHP_QUERY_RFC3986 );

		return $oauth_url . '?' . $query;
	}

	/**
	 * Display the authenticated admin panel with iframe.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function prquiz_authenticated_visit() {
		?>
		<div class="wrap">
			<img src="<?php echo esc_url( plugin_dir_url( __FILE__ ) . 'img/revenuehunt-logo.png' ); ?>" width="24" height="24" alt="<?php esc_attr_e( 'RevenueHunt', 'product-recommendation-quiz-for-ecommerce' ); ?>" />
			<p class="fright h-24 mtop-0 prq-author">
				<?php esc_html_e( 'Product Recommendation Quiz for eCommerce', 'product-recommendation-quiz-for-ecommerce' ); ?>
				<span class="fright"><?php esc_html_e( 'by', 'product-recommendation-quiz-for-ecommerce' ); ?>
					<a href="https://revenuehunt.com/" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'RevenueHunt', 'product-recommendation-quiz-for-ecommerce' ); ?></a>
				</span>
			</p>
			<iframe title="<?php esc_attr_e( 'Product Recommendation Quiz for eCommerce', 'product-recommendation-quiz-for-ecommerce' ); ?>" src="<?php echo esc_url( $this->prquiz_get_oauth_url() ); ?>" name="app-iframe" context="Main" class="prq-iframe"></iframe>
		</div>
		<?php
	}

	/**
	 * Display the first visit setup page with authorization button.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function prquiz_first_visit() {
		?>
		<div class="wrap">
			<img src="<?php echo esc_url( plugin_dir_url( __FILE__ ) . 'img/revenuehunt-logo.png' ); ?>" width="24" height="24" alt="<?php esc_attr_e( 'RevenueHunt', 'product-recommendation-quiz-for-ecommerce' ); ?>" />
			<p class="fright h-24 mtop-0 prq-author">
				<?php esc_html_e( 'Product Recommendation Quiz for eCommerce', 'product-recommendation-quiz-for-ecommerce' ); ?>
				<span class="fright"><?php esc_html_e( 'by', 'product-recommendation-quiz-for-ecommerce' ); ?>
					<a href="https://revenuehunt.com/" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'RevenueHunt', 'product-recommendation-quiz-for-ecommerce' ); ?></a>
				</span>
			</p>
			<hr>
			<h1 class="mtop-60 alcenter"><?php esc_html_e( 'Congratulations!', 'product-recommendation-quiz-for-ecommerce' ); ?></h1>
			<p class="lg alcenter"><?php esc_html_e( 'You\'re one step away from getting more conversions and sales in your store.', 'product-recommendation-quiz-for-ecommerce' ); ?></p>
			<p class="lg alcenter"><?php esc_html_e( 'We just need you to grant this plugin permission to access your WooCommerce store:', 'product-recommendation-quiz-for-ecommerce' ); ?></p>
			<p class="lg alcenter mtop-30">
				<a class="btn btn-main" href="<?php echo esc_url( $this->prquiz_get_woocommerce_auth_url() ); ?>"><?php esc_html_e( 'grant permission now', 'product-recommendation-quiz-for-ecommerce' ); ?></a>
			</p>
			<p class="alcenter mtop-30">
				<?php esc_html_e( 'Are you having trouble granting access? ', 'product-recommendation-quiz-for-ecommerce' ); ?><?php esc_html_e( 'Check out ', 'product-recommendation-quiz-for-ecommerce' ); ?>
				<a href="https://revenuehunt.com/faqs/troubleshooting-product-recommendation-quiz-app-issues-for-wordpress-woocommerce/" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'this article', 'product-recommendation-quiz-for-ecommerce' ); ?></a>
			</p>
		</div>
		<?php
	}

	/**
	 * Render the main plugin options page.
	 *
	 * Performs prerequisite checks and displays either the OAuth flow
	 * or the authenticated admin panel.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function prquiz_options() {
		// Verify user has permission to access this page
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die(
				esc_html__( 'You do not have sufficient permissions to access this page.', 'product-recommendation-quiz-for-ecommerce' ),
				esc_html__( 'Permission Denied', 'product-recommendation-quiz-for-ecommerce' ),
				array( 'response' => 403 )
			);
		}

		$domain = wp_parse_url( site_url(), PHP_URL_HOST );

		// Check WooCommerce is installed
		if ( ! class_exists( 'WooCommerce' ) ) {
			$this->diagnostics->woocommerce_missing();
			return;
		}

		// Check HTTPS/SSL (except for local environments)
		if ( Product_Recommendation_Quiz_For_Ecommerce::is_development_environment() ) {
			// Development environment - skip HTTPS check
			if ( ! defined( 'PRQ_HTTPS_STORE' ) ) {
				define( 'PRQ_HTTPS_STORE', true );
			}
		} elseif ( ( ! empty( $_SERVER['HTTPS'] ) && 'off' !== $_SERVER['HTTPS'] ) || ( ! empty( $_SERVER['SERVER_PORT'] ) && 443 === (int) $_SERVER['SERVER_PORT'] ) ) {
			// Your website does have HTTPS - OK
			if ( ! defined( 'PRQ_HTTPS_STORE' ) ) {
				define( 'PRQ_HTTPS_STORE', true );
			}
		} else {
			// Your website doesn't have HTTPS - ERROR
			$this->diagnostics->https_ssl_missing();
			return;
		}

		// Check not running on localhost
		if ( 'localhost' === $domain ) {
			$this->diagnostics->is_localhost();
			return;
		}

		// Check permalinks are not set to plain
		if ( $this->diagnostics->check_plain_permalink() ) {
			$this->diagnostics->plain_permalink_warning();
			return;
		}

		// Check REST API accessibility
		$wp_api_check = $this->diagnostics->api_check_json( PRQ_STORE_URL );

		// Handle cURL missing error
		if ( 0 === $wp_api_check[0] ) {
			$decoded = json_decode( $wp_api_check[1], true );
			if ( isset( $decoded['error'] ) && 'curl_missing' === $decoded['error'] ) {
				?>
				<div class="error">
					<p><strong><?php esc_html_e( 'The cURL extension is required but not installed on your server.', 'product-recommendation-quiz-for-ecommerce' ); ?></strong></p>
				</div>
				<?php
				return;
			}
		}

		/*
		 * RESPONSE CODES:
		 * 200 success, OK
		 * 400 invalid domain was passed
		 * 404 invalid JSON received
		 * 500 valid domain but no connection
		 * 429 tested more than 10 times per minute
		 */
		if ( 404 === $wp_api_check[0] ) {
			$this->diagnostics->wp_json_error();

			$wp_api_check_json = json_decode( $wp_api_check[1] );
			if ( isset( $wp_api_check_json->content_type ) ) {
				$is_html_type = strpos( $wp_api_check_json->content_type, 'text/html' ) !== false;
				$is_json_body = isset( $wp_api_check_json->body ) && $this->diagnostics->is_json( $wp_api_check_json->body );

				if ( $is_html_type && $is_json_body ) {
					$this->diagnostics->wp_json_error_html_content_type( PRQ_STORE_URL );
				}

				if ( isset( $wp_api_check_json->body ) ) {
					$this->diagnostics->wp_json_error_body( $wp_api_check_json->body );
				}
			}
			return;
		}

		// Check shop credentials
		$shop_hashid = get_option( PRQ_OPTION_SHOP_HASHID );

		if ( $shop_hashid ) {
			// Already have permissions, go to oauth
			$this->prquiz_authenticated_visit();
		} else {
			// Needs to receive credentials from our server
			// Check if WPML is active, it causes authentication issues
			// https://stackoverflow.com/questions/65776787/woocommerce-is-encoding-the-authorization-endpoint
			if ( $this->diagnostics->check_wpml() ) {
				return;
			}
			$this->prquiz_first_visit();
		}
	}

	/**
	 * Register the plugin admin menu.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function my_plugin_menu() {
		add_menu_page(
			'Product Recommendation Quiz',
			'Product Quiz',
			'manage_options',
			'prqfw',
			array( $this, 'prquiz_options' ),
			'dashicons-format-chat',
			58
		);
	}

}