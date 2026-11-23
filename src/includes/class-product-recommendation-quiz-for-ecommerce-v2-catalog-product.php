<?php
/**
 * Neutral rh-catalog v1 product serialization (not shopper-facing data).
 *
 * @package Product_Recommendation_Quiz_For_Ecommerce
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

/** Converts WooCommerce objects to the shared catalogue contract. */
class Product_Recommendation_Quiz_For_Ecommerce_V2_Catalog_Product {
	/**
	 * Public, scalar custom fields only; applies to names AND selected values.
	 *
	 * @param string $key Meta key.
	 * @param mixed  $value Unserialized value.
	 * @return bool Whether eligible.
	 */
	public static function eligible_meta( $key, $value ) {
		return '' !== $key && ! preg_match( '/^(?:_|yoast|rank_math|elementor|fb_|pys|et_pb|wpfoof|wc_gla|aioseo|tm_meta|berocket|wcwl)/i', $key )
			&& is_scalar( $value ) && strlen( (string) $value ) <= 2048;
	}

	/**
	 * Serialize a product, with variants nested and selected custom fields only.
	 *
	 * @param WC_Product $product Product.
	 * @param array      $picked Picked meta keys.
	 * @return array JSON line payload.
	 */
	public function line( $product, $picked ) {
		$id         = $product->get_id();
		$attributes = array();
		$brands     = taxonomy_exists( 'product_brand' ) ? wp_get_post_terms( $id, 'product_brand', array( 'fields' => 'names' ) ) : array();
		$vendor     = is_array( $brands ) ? implode( ', ', $brands ) : '';
		foreach ( $product->get_attributes() as $attribute ) {
			$values = $attribute->is_taxonomy() ? wc_get_product_terms( $id, $attribute->get_name(), array( 'fields' => 'names' ) ) : $attribute->get_options();
			$name   = wc_attribute_label( $attribute->get_name() );
			if ( ! $vendor && in_array( strtolower( $attribute->get_name() ), array( 'brand', 'pa_brand' ), true ) ) {
				$vendor = implode( ', ', $values );
			}
			if ( ! $attribute->get_variation() ) {
				$attributes[ $name ] = $values;
			}
		}
		$metafields = array();
		foreach ( $picked as $key ) {
			$value = get_post_meta( $id, $key, true );
			if ( metadata_exists( 'post', $id, $key ) && self::eligible_meta( $key, $value ) ) {
				$metafields[ $key ] = (string) $value;
			}
		}
		$variants = array();
		if ( $product->is_type( 'variable' ) ) {
			foreach ( $product->get_children() as $variation_id ) {
				$variation = wc_get_product( $variation_id );
				// A disabled variation (private) is not for sale: shoppers never see it on the product page.
				if ( $variation && 'publish' === $variation->get_status() ) {
					$variants[] = $this->variant( $variation );
				}
			}
		} else {
			$variants[] = $this->variant( $product );
		}
		$image = wp_get_attachment_image_url( (int) $product->get_image_id(), 'full' );
		return array(
			'id'           => 'gid://woocommerce/Product/' . $id,
			'title'        => $product->get_name(),
			'description'  => $product->get_description(),
			'handle'       => $product->get_slug(),
			'link'         => $product->get_permalink(),
			'image_link'   => $image ? $image : '',
			'vendor'       => $vendor,
			'product_type' => $product->get_type(),
			'status'       => 'publish' === $product->get_status() && 'hidden' !== $product->get_catalog_visibility() ? 'active' : 'draft',
			'tags'         => wp_get_post_terms( $id, 'product_tag', array( 'fields' => 'names' ) ),
			'collections'  => array_map(
				static function ( $term_id ) {
					return 'gid://woocommerce/Collection/' . $term_id;
				},
				$product->get_category_ids()
			),
			'attributes'   => (object) $attributes,
			'metafields'   => (object) $metafields,
			'variants'     => $variants,
		);
	}

	/**
	 * Serialize a simple product or a variation.
	 *
	 * @param WC_Product $product Product or variation.
	 * @return array Variant payload.
	 */
	private function variant( $product ) {
		$stock = array(
			'instock'     => 'in_stock',
			'outofstock'  => 'out_of_stock',
			'onbackorder' => 'backorder',
		);
		$price = $product->get_regular_price();
		if ( '' === $price ) {
			$price = $product->get_price();
		}
		$variant = array(
			'id'           => 'gid://woocommerce/ProductVariant/' . $product->get_id(),
			'title'        => $product->get_name(),
			'sku'          => $product->get_sku(),
			'price'        => wc_format_decimal( '' !== $price ? $price : '0', wc_get_price_decimals() ),
			'availability' => $stock[ $product->get_stock_status() ],
		);
		// Only a sale running now: a scheduled one keeps its amount in get_sale_price() before it starts and after it ends.
		if ( '' !== $product->get_sale_price() && $product->is_on_sale() ) {
			$variant['sale_price'] = wc_format_decimal( $product->get_sale_price(), wc_get_price_decimals() );
		}
		if ( $product->managing_stock() && null !== $product->get_stock_quantity() ) {
			$variant['inventory_quantity'] = (int) $product->get_stock_quantity();
		}
		if ( $product->is_type( 'variation' ) ) {
			$variant['options'] = array();
			foreach ( $product->get_attributes() as $name => $value ) {
				$term                 = taxonomy_exists( $name ) ? get_term_by( 'slug', $value, $name ) : false;
				$variant['options'][] = array(
					'name'  => wc_attribute_label( $name ),
					'value' => $term ? $term->name : $value,
				);
			}
		}
		return $variant;
	}
}
