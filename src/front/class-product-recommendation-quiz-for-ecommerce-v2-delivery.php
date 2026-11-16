<?php
/**
 * V2 storefront mount; the hosted storefront script is specified in phase 3.
 *
 * @package Product_Recommendation_Quiz_For_Ecommerce
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

/** Render only the V2 mount contract; never print a cached Store API nonce. */
class Product_Recommendation_Quiz_For_Ecommerce_V2_Delivery implements Product_Recommendation_Quiz_For_Ecommerce_Delivery {
	/**
	 * Render an inert mount until the V2 storefront script is available.
	 *
	 * @param array $atts Placement attributes.
	 * @return string Escaped mount or empty string without a quiz id.
	 */
	public function render( array $atts ): string {
		$id = isset( $atts['id'] ) ? sanitize_text_field( (string) $atts['id'] ) : '';
		if ( '' === $id ) {
			return '';
		}
		$connection = Product_Recommendation_Quiz_For_Ecommerce_V2::connection();
		return '<div data-prq-shop="' . esc_attr( $connection['shop'] ) . '" data-prq-quiz="' . esc_attr( $id ) . '"></div>';
	}
}
