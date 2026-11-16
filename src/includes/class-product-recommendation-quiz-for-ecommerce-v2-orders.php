<?php
/**
 * Store API attribution, native WooCommerce webhooks and signed order lookup.
 *
 * @package Product_Recommendation_Quiz_For_Ecommerce
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

/** V2 order integration; all hooks are registered only in V2 mode. */
class Product_Recommendation_Quiz_For_Ecommerce_V2_Orders {
	/**
	 * Preserve the two supported Store API extension fields in the WC cart session.
	 *
	 * @param array           $data WooCommerce add-to-cart data.
	 * @param WP_REST_Request $request Store API request.
	 * @return array Add-to-cart data including attribution.
	 */
	public function cart_data( $data, $request ) {
		$extensions = $request->get_param( 'extensions' );
		$prq        = is_array( $extensions ) && isset( $extensions['prq'] ) && is_array( $extensions['prq'] ) ? $extensions['prq'] : array();
		foreach ( array( '__quiz_response_id', '__assistant_chat_id' ) as $key ) {
			if ( isset( $prq[ $key ] ) && is_string( $prq[ $key ] ) && strlen( $prq[ $key ] ) <= 255 ) {
				$data['cart_item_data']['prq'][ $key ] = sanitize_text_field( $prq[ $key ] );
			}
		}
		return $data;
	}

	/**
	 * Both checkout flows call this before saving the order. First attributed cart
	 * item wins for each identifier, consistently with a single order-level id.
	 *
	 * @param WC_Order $order Order being created/updated.
	 * @return void
	 */
	public function attribute_order( $order ) {
		if ( ! WC()->cart ) {
			return;
		}
		foreach ( WC()->cart->get_cart() as $item ) {
			foreach ( array(
				'__quiz_response_id'  => '_prq_quiz_response_id',
				'__assistant_chat_id' => '_prq_assistant_chat_id',
			) as $key => $meta ) {
				if ( ! $order->get_meta( $meta ) && ! empty( $item['prq'][ $key ] ) ) {
					$order->update_meta_data( $meta, $item['prq'][ $key ] );
				}
			}
		}
	}

	/**
	 * Create the two native WooCommerce webhooks once at connect. WooCommerce owns
	 * delivery/retries and X-WC-Webhook-Signature = base64(HMAC-SHA256(raw body)).
	 *
	 * @return void
	 */
	public function create_webhooks() {
		$connection = Product_Recommendation_Quiz_For_Ecommerce_V2::connection();
		$ids        = array();
		foreach ( array( 'order.created', 'order.updated' ) as $topic ) {
			$webhook = new WC_Webhook();
			$webhook->set_name( 'RevenueHunt V2 ' . $topic );
			$webhook->set_topic( $topic );
			$webhook->set_delivery_url( $connection['api_url'] . '/api/woocommerce/orders' );
			$webhook->set_secret( Product_Recommendation_Quiz_For_Ecommerce_V2::webhook_secret( $connection['shared_secret'] ) );
			$webhook->set_api_version( 'wp_api_v3' );
			$webhook->set_status( 'active' );
			$webhook->set_user_id( get_current_user_id() );
			$ids[] = $webhook->save();
		}
		$connection['webhook_ids'] = $ids;
		update_option( Product_Recommendation_Quiz_For_Ecommerce_V2::OPTION, $connection, false );
	}

	/**
	 * Find owned webhooks, including connections made before IDs were stored.
	 *
	 * @return WC_Webhook[] Native webhooks for this connection.
	 */
	private function webhooks() {
		$connection = Product_Recommendation_Quiz_For_Ecommerce_V2::connection();
		$ids        = $connection['webhook_ids'] ?? array();
		$fallback   = empty( $ids );
		$webhooks   = array();
		foreach ( $ids as $id ) {
			$webhook = wc_get_webhook( $id );
			if ( $webhook ) {
				$webhooks[ $id ] = $webhook;
			} else {
				$fallback = true;
			}
		}
		if ( $fallback ) {
			$store = new WC_Webhook_Data_Store();
			foreach ( $store->get_webhooks_ids() as $id ) {
				$webhook = wc_get_webhook( $id );
				if ( $webhook && $connection['api_url'] . '/api/woocommerce/orders' === $webhook->get_delivery_url() ) {
					$webhooks[ $id ] = $webhook;
				}
			}
		}
		return $webhooks;
	}

	/**
	 * Pause/resume native hooks, or permanently delete on uninstall.
	 *
	 * @param string $status Native status, or 'delete'.
	 * @return void
	 */
	public function set_webhook_status( $status ) {
		if ( ! function_exists( 'wc_get_webhook' ) ) {
			return;
		}
		$webhooks = $this->webhooks();
		foreach ( $webhooks as $webhook ) {
			if ( 'delete' === $status ) {
				$webhook->delete( true );
			} else {
				$webhook->set_status( $status );
				$webhook->save();
			}
		}
		// WC's async delivery bypasses the status check: pausing alone is not enough.
		if ( 'active' !== $status && function_exists( 'as_get_scheduled_actions' ) ) {
			$actions = as_get_scheduled_actions(
				array(
					'hook'     => 'woocommerce_deliver_webhook_async',
					'group'    => 'woocommerce-webhooks',
					'status'   => 'pending',
					'per_page' => -1,
				)
			);
			foreach ( $actions as $action ) {
				$args = $action->get_args();
				if ( isset( $args['webhook_id'], $webhooks[ $args['webhook_id'] ] ) ) {
					as_unschedule_all_actions( 'woocommerce_deliver_webhook_async', $args, 'woocommerce-webhooks' );
				}
			}
		}
	}

	/**
	 * Require both customer email and exact displayed order number. WC CRUD keeps
	 * this compatible with HPOS; paging also supports custom order-number filters.
	 *
	 * @param WP_REST_Request $request Authenticated lookup request.
	 * @return WP_REST_Response|WP_Error Order summary or not found.
	 */
	public function lookup( $request ) {
		$number = $request->get_param( 'number' );
		$email  = $request->get_param( 'email' );
		if ( ! is_string( $number ) || '' === $number || ! is_string( $email ) || ! is_email( $email ) ) {
			return new WP_Error( 'prq_invalid_order', 'Order number and email are required.', array( 'status' => 400 ) );
		}
		$page = 1;
		do {
			$orders = wc_get_orders(
				array(
					'billing_email' => $email,
					'limit'         => 50,
					'page'          => $page,
					'orderby'       => 'ID',
					'order'         => 'DESC',
				)
			);
			foreach ( $orders as $order ) {
				if ( (string) $order->get_order_number() !== $number || 0 !== strcasecmp( $order->get_billing_email(), $email ) ) {
					continue;
				}
				$items = array();
				foreach ( $order->get_items() as $item ) {
					if ( ! $item instanceof WC_Order_Item_Product ) {
						continue;
					}
					$items[] = array(
						'name'     => $item->get_name(),
						'quantity' => $item->get_quantity(),
						'total'    => $item->get_total(),
					);
				}
				$tracking = array();
				foreach ( (array) $order->get_meta( '_wc_shipment_tracking_items' ) as $shipment ) {
					if ( is_array( $shipment ) ) {
						$tracking[] = array_intersect_key( $shipment, array_flip( array( 'tracking_provider', 'custom_tracking_provider', 'tracking_number', 'custom_tracking_link', 'date_shipped' ) ) );
					}
				}
				return new WP_REST_Response(
					array(
						'number'   => $number,
						'status'   => $order->get_status(),
						'currency' => $order->get_currency(),
						'items'    => $items,
						'tracking' => $tracking,
					),
					200,
					array( 'Cache-Control' => 'no-store, private' )
				);
			}
			++$page;
			$has_more = 50 === count( $orders );
		} while ( $has_more );
		return new WP_Error( 'prq_order_not_found', 'Order not found.', array( 'status' => 404 ) );
	}
}
