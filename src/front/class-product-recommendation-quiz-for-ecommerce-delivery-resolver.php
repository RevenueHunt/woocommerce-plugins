<?php
/**
 * Selects the active front-end delivery implementation.
 *
 * Chooses delivery for storefront placements (shortcode, blocks and site-wide
 * hooks) without changing which connection the admin and editor use.
 *
 * @link       https://revenuehunt.com/
 * @since      2.4.0
 *
 * @package    Product_Recommendation_Quiz_For_Ecommerce
 * @subpackage Product_Recommendation_Quiz_For_Ecommerce/front
 */

// Prevent direct access.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Resolves the front-end delivery seam to its active implementation.
 *
 * @package    Product_Recommendation_Quiz_For_Ecommerce
 * @subpackage Product_Recommendation_Quiz_For_Ecommerce/front
 */
class Product_Recommendation_Quiz_For_Ecommerce_Delivery_Resolver {

	/**
	 * Return the active delivery implementation.
	 *
	 * @since 2.4.0
	 * @param string $plugin_name The plugin/script handle delivery should use.
	 * @param string $version     The plugin version.
	 * @return Product_Recommendation_Quiz_For_Ecommerce_Delivery The active delivery.
	 */
	public static function resolve( $plugin_name, $version ): Product_Recommendation_Quiz_For_Ecommerce_Delivery {
		if ( Product_Recommendation_Quiz_For_Ecommerce_V2::storefront() ) {
			return new Product_Recommendation_Quiz_For_Ecommerce_V2_Delivery();
		}
		// V1: enqueue embed.js and return the existing hydration container.
		return new Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Script( $plugin_name, $version );
	}
}
