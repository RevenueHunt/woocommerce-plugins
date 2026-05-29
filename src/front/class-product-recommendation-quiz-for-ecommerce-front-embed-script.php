<?php
/**
 * Front-end delivery: the embed.js storefront script.
 *
 * The V1 implementation of the plugin's front-end delivery seam
 * (Product_Recommendation_Quiz_For_Ecommerce_Delivery) — it loads embed.js from
 * admin.revenuehunt.com and returns the inline hydration container embed.js
 * targets. Isolating it here keeps "how the quiz reaches the storefront"
 * swappable without touching the rest of the plugin.
 *
 * @link       https://revenuehunt.com/
 * @since      2.3.9
 *
 * @package    Product_Recommendation_Quiz_For_Ecommerce
 * @subpackage Product_Recommendation_Quiz_For_Ecommerce/front
 */

// Prevent direct access.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Enqueues the embed.js delivery script on the storefront.
 *
 * @package    Product_Recommendation_Quiz_For_Ecommerce
 * @subpackage Product_Recommendation_Quiz_For_Ecommerce/front
 */
class Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Script implements Product_Recommendation_Quiz_For_Ecommerce_Delivery {

	/**
	 * The ID of this plugin.
	 *
	 * @since    2.3.9
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    2.3.9
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    2.3.9
	 * @param      string $plugin_name       The name of the plugin.
	 * @param      string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * Skips loading on WooCommerce checkout and cart pages where the quiz
	 * is never rendered, so a connection timeout to our servers can never
	 * block those critical pages.
	 *
	 * The script is loaded with the 'async' strategy so that even on pages
	 * where it IS enqueued, a slow or failed connection to admin.revenuehunt.com
	 * will not block page rendering or execution.
	 *
	 * @since    2.3.9
	 */
	public function enqueue_scripts() {
		// Don't load the embed script on WooCommerce checkout or cart pages.
		// The quiz is never rendered there, and a connection timeout would
		// degrade the shopping experience for no benefit.
		if ( function_exists( 'is_checkout' ) && is_checkout() ) {
			return;
		}
		if ( function_exists( 'is_cart' ) && is_cart() ) {
			return;
		}

		$this->enqueue_embed();
	}

	/**
	 * The origin embed.js and the hosted quiz are served from.
	 *
	 * Single accessor for the backend origin so both the global enqueue and the
	 * placement renderer reference it identically.
	 *
	 * @since 2.4.0
	 * @return string The admin/backend origin (no trailing slash).
	 */
	private function admin_origin() {
		return PRQ_ADMIN_URL;
	}

	/**
	 * Enqueue embed.js with its js_vars payload.
	 *
	 * Shared by the site-wide hook and by placement rendering. WordPress dedupes
	 * by script handle, so calling this more than once per request never
	 * double-loads the script.
	 *
	 * @since 2.4.0
	 * @return void
	 */
	private function enqueue_embed() {
		$data_to_pass = array(
			'shop'           => PRQ_STORE_URL,
			'platform'       => 'woocommerce',
			'channel'        => 'wordpress',
			'plugin_version' => PRQ_PLUGIN_VERSION,
			'woo_version'    => PRQ_WOO_VERSION,
			'wp_version'     => PRQ_WP_VERSION,
		);

		wp_enqueue_script( $this->plugin_name, $this->admin_origin() . '/embed.js?shop=' . rawurlencode( PRQ_STORE_URL ), array(), PRQ_PLUGIN_VERSION, true );
		wp_localize_script( $this->plugin_name, 'js_vars', $data_to_pass );
	}

	/**
	 * Render an inline quiz placement and ensure embed.js is loaded.
	 *
	 * Returns the container embed.js hydrates in place (the documented
	 * `rh-widget rh-inline` element with the quiz's public data-url). Placement
	 * is explicit merchant intent, so — unlike the site-wide enqueue — it does
	 * not skip cart/checkout. embed.js keeps its async / graceful-degradation
	 * behavior (the script_loader_tag filter applies to this enqueue too), and
	 * the shared handle means the script is never loaded twice on a page.
	 *
	 * @since 2.4.0
	 * @param array<string, mixed> $atts Placement attributes: 'id' (quiz id, required),
	 *                                   'height' (px, default 600).
	 * @return string The placement HTML, or '' when no quiz id is given.
	 */
	public function render( array $atts ): string {
		$quiz_id = isset( $atts['id'] ) ? sanitize_text_field( (string) $atts['id'] ) : '';
		if ( '' === $quiz_id ) {
			return '';
		}

		$height = isset( $atts['height'] ) ? absint( $atts['height'] ) : 600;
		if ( 0 === $height ) {
			$height = 600;
		}

		$this->enqueue_embed();

		$quiz_url = $this->admin_origin() . '/public/quiz/' . rawurlencode( $quiz_id );

		return sprintf(
			'<div class="rh-widget rh-inline" data-url="%s" style="margin:10px auto;width:100%%;height:%dpx;display:flex;"></div>',
			esc_url( $quiz_url ),
			$height
		);
	}

	/**
	 * Add 'async' attribute to the embed.js script tag.
	 *
	 * This ensures that even if admin.revenuehunt.com is unreachable (e.g. due
	 * to ISP routing issues), the merchant's page continues to load and function
	 * normally. The quiz simply won't appear — graceful degradation.
	 *
	 * @since    2.3.9
	 * @param string $tag    The full script tag HTML.
	 * @param string $handle The script's registered handle.
	 * @param string $src    The script source URL.
	 * @return string Modified script tag with async attribute.
	 */
	public function add_async_to_embed_script( $tag, $handle, $src ) {
		if ( $this->plugin_name !== $handle ) {
			return $tag;
		}

		// Don't double-add if WordPress already added it (WP 6.3+ strategy support).
		if ( false !== strpos( $tag, ' async' ) ) {
			return $tag;
		}

		return str_replace( '<script ', '<script async ', $tag );
	}
}
