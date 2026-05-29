<?php
/**
 * Detects the WordPress/WooCommerce environment around the plugin.
 *
 * Read-only inspection used by the status panel (and reusable elsewhere): which
 * translation and multi-currency plugins are active, the base language and
 * currency, and the WooCommerce/WordPress versions. Detection is best-effort by
 * the documented constant/class/function each ecosystem plugin exposes.
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
 * Best-effort detection of the surrounding WP/WC environment.
 *
 * @package    Product_Recommendation_Quiz_For_Ecommerce
 * @subpackage Product_Recommendation_Quiz_For_Ecommerce/admin
 */
class Product_Recommendation_Quiz_For_Ecommerce_Environment {

	/**
	 * The active multilingual/translation plugin, if any.
	 *
	 * @since 2.4.0
	 * @return string|null Plugin name, or null when none detected.
	 */
	public function get_translation_plugin() {
		if ( defined( 'ICL_SITEPRESS_VERSION' ) || function_exists( 'icl_object_id' ) ) {
			return 'WPML';
		}
		if ( defined( 'POLYLANG_VERSION' ) || function_exists( 'pll_languages_list' ) ) {
			return 'Polylang';
		}
		return null;
	}

	/**
	 * The active multi-currency plugin, if any.
	 *
	 * @since 2.4.0
	 * @return string|null Plugin name, or null when none detected.
	 */
	public function get_multicurrency_plugin() {
		if ( class_exists( 'woocommerce_wpml' ) || defined( 'WCML_VERSION' ) ) {
			return 'WooCommerce Multilingual (WPML)';
		}
		if ( class_exists( 'WOOCS' ) ) {
			return 'WOOCS - Currency Switcher';
		}
		if ( class_exists( 'WOOMULTI_CURRENCY' ) || defined( 'WOOMULTI_CURRENCY_VERSION' ) ) {
			return 'WooCommerce Multi Currency';
		}
		if ( class_exists( '\Aelia\WC\CurrencySwitcher\WC_Aelia_CurrencySwitcher' ) ) {
			return 'Aelia Currency Switcher';
		}
		return null;
	}

	/**
	 * The site's base language locale (e.g. "en_US").
	 *
	 * @since 2.4.0
	 * @return string
	 */
	public function get_base_language() {
		return (string) get_locale();
	}

	/**
	 * The store's base currency code (e.g. "EUR"), or '' when WooCommerce is absent.
	 *
	 * @since 2.4.0
	 * @return string
	 */
	public function get_base_currency() {
		return function_exists( 'get_woocommerce_currency' ) ? (string) get_woocommerce_currency() : '';
	}

	/**
	 * The active WooCommerce version, or '' when WooCommerce is absent.
	 *
	 * @since 2.4.0
	 * @return string
	 */
	public function get_woocommerce_version() {
		return ( function_exists( 'WC' ) && WC() ) ? (string) WC()->version : '';
	}

	/**
	 * The WordPress version.
	 *
	 * @since 2.4.0
	 * @return string
	 */
	public function get_wordpress_version() {
		return (string) get_bloginfo( 'version' );
	}
}
