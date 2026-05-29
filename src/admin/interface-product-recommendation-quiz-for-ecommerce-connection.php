<?php
/**
 * The backend connection seam.
 *
 * Models "is this store connected to its RevenueHunt backend, and which one"
 * independent of how that connection is established or stored. The V1
 * implementation reports the WooCommerce-OAuth connection to
 * admin.revenuehunt.com; a future V3 implementation reports a
 * cloud.revenuehunt.com connection — the status panel consumes this contract,
 * so it never hard-codes the V1 rh_* token shape as the only notion of
 * "connected".
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
 * Contract describing the store's connection to its backend.
 *
 * @package    Product_Recommendation_Quiz_For_Ecommerce
 * @subpackage Product_Recommendation_Quiz_For_Ecommerce/admin
 */
interface Product_Recommendation_Quiz_For_Ecommerce_Connection {

	/**
	 * Whether the store is connected to its backend.
	 *
	 * @since 2.4.0
	 * @return bool
	 */
	public function is_connected(): bool;

	/**
	 * The backend host this store connects to (e.g. "admin.revenuehunt.com").
	 *
	 * @since 2.4.0
	 * @return string
	 */
	public function get_target(): string;

	/**
	 * The store's own domain as seen by the plugin.
	 *
	 * @since 2.4.0
	 * @return string
	 */
	public function get_domain(): string;
}
