<?php
/**
 * V2 storefront mount and hosted module loading.
 *
 * @package Product_Recommendation_Quiz_For_Ecommerce
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

/** Render the V2 mount contract; never print a cached Store API nonce. */
class Product_Recommendation_Quiz_For_Ecommerce_V2_Delivery implements Product_Recommendation_Quiz_For_Ecommerce_Delivery {
	/**
	 * Render a mount and enqueue the hosted storefront module.
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
		$src        = rtrim( $connection['admin_url'], '/' ) . '/woocommerce/quiz-renderer.js';
		if ( function_exists( 'wp_enqueue_script_module' ) ) {
			wp_enqueue_script_module( 'prq-v2-quiz-renderer', $src, array(), null );
		} else {
			// phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion -- V2 short-caches the hosted entry; do not append the plugin version.
			wp_enqueue_script( 'prq-v2-quiz-renderer', $src, array(), null, true );
			add_filter( 'script_loader_tag', array( $this, 'module_tag' ), 10, 2 );
		}
		return '<div data-prq-shop="' . esc_attr( $connection['shop'] ) . '" data-prq-quiz="' . esc_attr( $id ) . '"></div>';
	}

	/**
	 * Mark only our hosted script as a module on WordPress before 6.5.
	 *
	 * @param string $tag Script tag.
	 * @param string $handle Registered script handle.
	 * @return string Script tag with module type for our handle only.
	 */
	public function module_tag( $tag, $handle ) {
		if ( 'prq-v2-quiz-renderer' !== $handle ) {
			return $tag;
		}
		$tag = preg_replace( '/\s+type=([\'"]).*?\1/', '', $tag );
		return str_replace( '<script ', '<script type="module" ', $tag );
	}
}
