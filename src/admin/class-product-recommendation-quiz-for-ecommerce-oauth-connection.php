<?php
/**
 * V1 connection: the WooCommerce-OAuth link to admin.revenuehunt.com.
 *
 * Reports connection state from the credentials the OAuth handshake stores
 * locally. Isolating the V1 notion of "connected" here keeps the status panel
 * generation-agnostic: a future V3 connection implements the same interface
 * without the panel changing.
 *
 * @link       https://revenuehunt.com/
 * @since      2.4.0
 *
 * @package    Product_Recommendation_Quiz_For_Ecommerce
 * @subpackage Product_Recommendation_Quiz_For_Ecommerce/admin
 */

// Prevent direct access.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The V1 WooCommerce-OAuth connection.
 *
 * @package    Product_Recommendation_Quiz_For_Ecommerce
 * @subpackage Product_Recommendation_Quiz_For_Ecommerce/admin
 */
class Product_Recommendation_Quiz_For_Ecommerce_Oauth_Connection implements Product_Recommendation_Quiz_For_Ecommerce_Connection {

	/**
	 * Whether the OAuth handshake has stored a shop identifier.
	 *
	 * @since 2.4.0
	 * @return bool
	 */
	public function is_connected(): bool {
		return (bool) get_option( PRQ_OPTION_SHOP_HASHID );
	}

	/**
	 * The backend host for this connection.
	 *
	 * @since 2.4.0
	 * @return string
	 */
	public function get_target(): string {
		return Product_Recommendation_Quiz_For_Ecommerce::is_development_environment()
			? 'localhost:9528'
			: 'admin.revenuehunt.com';
	}

	/**
	 * The store's own domain (the host of its site URL).
	 *
	 * @since 2.4.0
	 * @return string
	 */
	public function get_domain(): string {
		$host = wp_parse_url( site_url(), PHP_URL_HOST );
		return is_string( $host ) ? $host : '';
	}
}
