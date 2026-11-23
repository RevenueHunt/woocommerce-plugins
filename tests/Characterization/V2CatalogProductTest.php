<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_V2_Catalog_Product as Mapper;

final class V2CatalogProductTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Functions\when('taxonomy_exists')->justReturn(false);
        Functions\when('wp_get_post_terms')->alias(fn($id, $taxonomy) => $taxonomy === 'product_tag' ? ['vegan'] : []);
        Functions\when('wp_get_attachment_image_url')->justReturn('https://example.com/image.jpg');
        Functions\when('wc_attribute_label')->alias(fn($name) => $name === 'pa_size' ? 'Size' : $name);
        Functions\when('wc_format_decimal')->alias(fn($value, $decimals) => number_format((float) $value, $decimals, '.', ''));
        Functions\when('wc_get_price_decimals')->justReturn(2);
        Functions\when('metadata_exists')->justReturn(true);
    }

    private function product(int $id, string $type = 'simple', array $overrides = [])
    {
        $defaults = [
            'get_id' => $id, 'get_name' => 'Serum', 'get_description' => '<p>Hydrating</p>', 'get_slug' => 'serum',
            'get_permalink' => 'https://example.com/product/serum/', 'get_image_id' => 1, 'get_type' => $type,
            'get_status' => 'publish', 'get_catalog_visibility' => 'visible', 'get_category_ids' => [7],
            'get_attributes' => [], 'get_children' => [], 'get_sku' => 'SER-50', 'get_regular_price' => '29',
            'get_price' => '24', 'get_sale_price' => '24', 'get_stock_status' => 'instock',
            'managing_stock' => true, 'get_stock_quantity' => 12, 'is_on_sale' => true,
        ];
        $product = \Mockery::mock('WC_Product');
        foreach (array_merge($defaults, $overrides) as $method => $value) {
            $product->shouldReceive($method)->andReturn($value);
        }
        $product->shouldReceive('is_type')->andReturnUsing(fn($value) => $type === $value);
        return $product;
    }

    public function test_simple_product_exact_neutral_json_shape_and_only_picked_public_values(): void
    {
        $meta = ['spf' => 30, 'unpicked' => 'not exported', '_secret' => 'x', 'yoast_title' => 'x', 'large' => str_repeat('x', 2049), 'array' => ['x']];
        Functions\when('get_post_meta')->alias(fn($id, $key) => $meta[$key] ?? '');
        $product = $this->product(12);
        $line = json_decode(json_encode((new Mapper())->line($product, ['spf', '_secret', 'yoast_title', 'large', 'array'])), true);
        $this->assertSame([
            'id' => 'gid://woocommerce/Product/12', 'title' => 'Serum', 'description' => '<p>Hydrating</p>', 'handle' => 'serum',
            'link' => 'https://example.com/product/serum/', 'image_link' => 'https://example.com/image.jpg', 'vendor' => '',
            'product_type' => 'simple', 'status' => 'active', 'tags' => ['vegan'], 'collections' => ['gid://woocommerce/Collection/7'],
            'attributes' => [], 'metafields' => ['spf' => '30'],
            'variants' => [['id' => 'gid://woocommerce/ProductVariant/12', 'title' => 'Serum', 'sku' => 'SER-50', 'price' => '29.00', 'availability' => 'in_stock', 'sale_price' => '24.00', 'inventory_quantity' => 12]],
        ], $line);
    }

    public function test_variable_product_nests_real_variation_ids_and_separates_attributes(): void
    {
        $attribute = \Mockery::mock();
        $attribute->shouldReceive('is_taxonomy')->andReturn(false);
        $attribute->shouldReceive('get_name')->andReturn('Skin type');
        $attribute->shouldReceive('get_options')->andReturn(['dry', 'normal']);
        $attribute->shouldReceive('get_variation')->andReturn(false);
        $size = \Mockery::mock();
        $size->shouldReceive('is_taxonomy')->andReturn(false);
        $size->shouldReceive('get_name')->andReturn('Size');
        $size->shouldReceive('get_options')->andReturn(['50 ml']);
        $size->shouldReceive('get_variation')->andReturn(true);
        $product = $this->product(12, 'variable', ['get_children' => [45, 46], 'get_attributes' => [$attribute, $size], 'get_catalog_visibility' => 'hidden']);
        $variation = $this->product(45, 'variation', ['get_attributes' => ['pa_size' => '50 ml'], 'get_stock_status' => 'onbackorder', 'managing_stock' => false, 'get_sale_price' => '']);
        // Disabled in the product editor: not for sale, so not exported.
        $disabled = $this->product(46, 'variation', ['get_status' => 'private']);
        Functions\when('wc_get_product')->alias(fn($id) => $id === 45 ? $variation : $disabled);
        $line = (new Mapper())->line($product, []);
        $this->assertSame('draft', $line['status']);
        $this->assertSame(['Skin type' => ['dry', 'normal']], (array) $line['attributes']);
        $this->assertSame([['id' => 'gid://woocommerce/ProductVariant/45', 'title' => 'Serum', 'sku' => 'SER-50', 'price' => '29.00', 'availability' => 'backorder', 'options' => [['name' => 'Size', 'value' => '50 ml']]]], $line['variants']);
        $this->assertSame('{}', json_encode($line['metafields']));
    }

    public function test_a_scheduled_sale_exports_only_the_regular_price_until_it_runs(): void
    {
        Functions\when('get_post_meta')->justReturn('');
        $line = (new Mapper())->line($this->product(12, 'simple', ['get_price' => '29', 'is_on_sale' => false]), []);
        $this->assertSame([['id' => 'gid://woocommerce/ProductVariant/12', 'title' => 'Serum', 'sku' => 'SER-50', 'price' => '29.00', 'availability' => 'in_stock', 'inventory_quantity' => 12]], $line['variants']);
    }

    public function test_custom_field_rule_excludes_all_contract_prefixes_and_size_and_non_scalars(): void
    {
        foreach (['_private', 'yoast_title', 'rank_math_description', 'elementor_data', 'fb_id', 'pys_event', 'et_pb_layout', 'wpfoof_field', 'wc_gla_sync', 'aioseo_title', 'tm_meta_data', 'berocket_data', 'wcwl_data'] as $key) {
            $this->assertFalse(Mapper::eligible_meta($key, 'public-looking'), $key);
        }
        $this->assertFalse(Mapper::eligible_meta('', 'x'));
        $this->assertFalse(Mapper::eligible_meta('ingredients', str_repeat('x', 2049)));
        $this->assertFalse(Mapper::eligible_meta('ingredients', ['x']));
        $this->assertFalse(Mapper::eligible_meta('ingredients', (object) ['x']));
        $this->assertTrue(Mapper::eligible_meta('ingredients', str_repeat('x', 2048)));
        $this->assertTrue(Mapper::eligible_meta('spf', 30));
    }
}
