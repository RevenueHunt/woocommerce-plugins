<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Script;
use Product_Recommendation_Quiz_For_Ecommerce_Delivery;
use Product_Recommendation_Quiz_For_Ecommerce_Delivery_Resolver;

/**
 * Tests for the front-end delivery seam (placement).
 *
 * Pins the V1 delivery contract: embed.js is the implementation behind the
 * Delivery interface, the resolver returns it, and render() produces the
 * documented `rh-widget rh-inline` hydration container while enqueuing embed.js
 * under the same handle the site-wide hook uses (so it is never double-loaded).
 */
final class DeliveryTest extends TestCase
{
    private const HANDLE = 'product-recommendation-quiz-for-ecommerce';

    protected function setUp(): void
    {
        parent::setUp();
        if (!defined('PRQ_STORE_URL'))   { define('PRQ_STORE_URL', 'example.com'); }
        if (!defined('PRQ_ADMIN_URL'))   { define('PRQ_ADMIN_URL', 'https://admin.revenuehunt.com'); }
        if (!defined('PRQ_WOO_VERSION')) { define('PRQ_WOO_VERSION', '10.0.0'); }
        if (!defined('PRQ_WP_VERSION'))  { define('PRQ_WP_VERSION', '6.7'); }
    }

    private function delivery(): Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Script
    {
        return new Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Script(self::HANDLE, PRQ_PLUGIN_VERSION);
    }

    public function test_embed_script_is_a_delivery(): void
    {
        $this->assertInstanceOf(
            Product_Recommendation_Quiz_For_Ecommerce_Delivery::class,
            $this->delivery()
        );
    }

    public function test_resolver_returns_the_v1_delivery(): void
    {
        $delivery = Product_Recommendation_Quiz_For_Ecommerce_Delivery_Resolver::resolve(self::HANDLE, PRQ_PLUGIN_VERSION);
        $this->assertInstanceOf(Product_Recommendation_Quiz_For_Ecommerce_Delivery::class, $delivery);
        $this->assertInstanceOf(Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Script::class, $delivery);
    }

    public function test_render_returns_inline_container_and_enqueues_embed(): void
    {
        Functions\when('esc_url')->returnArg();
        Functions\expect('wp_enqueue_script')->once()->with(
            self::HANDLE,
            'https://admin.revenuehunt.com/embed.js?shop=' . rawurlencode('example.com'),
            [],
            PRQ_PLUGIN_VERSION,
            true
        );
        Functions\expect('wp_localize_script')->once();

        $html = $this->delivery()->render(['id' => 'rkHm6Y', 'height' => 600]);

        $this->assertSame(
            '<div class="rh-widget rh-inline" data-url="https://admin.revenuehunt.com/public/quiz/rkHm6Y" style="margin:10px auto;width:100%;height:600px;display:flex;"></div>',
            $html
        );
    }

    public function test_render_enqueues_under_the_global_handle(): void
    {
        // "Never double-load" relies on placement enqueuing the SAME handle the
        // site-wide hook uses — WordPress dedupes scripts by handle.
        Functions\when('esc_url')->returnArg();
        $captured = null;
        Functions\expect('wp_enqueue_script')->once()->with(
            \Mockery::on(function ($handle) use (&$captured) { $captured = $handle; return true; }),
            \Mockery::any(),
            \Mockery::any(),
            \Mockery::any(),
            \Mockery::any()
        );
        Functions\when('wp_localize_script')->justReturn(true);

        $this->delivery()->render(['id' => 'abc']);

        $this->assertSame(self::HANDLE, $captured);
    }

    public function test_render_defaults_height_to_600(): void
    {
        Functions\when('esc_url')->returnArg();
        Functions\when('wp_enqueue_script')->justReturn(true);
        Functions\when('wp_localize_script')->justReturn(true);

        $html = $this->delivery()->render(['id' => 'abc']);

        $this->assertStringContainsString('height:600px;', $html);
    }

    public function test_render_returns_empty_and_does_not_enqueue_without_id(): void
    {
        Functions\expect('wp_enqueue_script')->never();
        Functions\expect('wp_localize_script')->never();

        $this->assertSame('', $this->delivery()->render([]));
        $this->assertSame('', $this->delivery()->render(['id' => '']));
    }
}
