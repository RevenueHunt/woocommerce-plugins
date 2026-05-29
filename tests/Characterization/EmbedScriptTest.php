<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Script;

/**
 * Characterization tests for the front-end delivery seam (embed.js).
 *
 * Pins the storefront enqueue contract the monolith relies on: the script is
 * NOT enqueued on cart/checkout, it IS enqueued elsewhere with the documented
 * js_vars payload, and the tag is rendered with the async attribute.
 */
final class EmbedScriptTest extends TestCase
{
    private const HANDLE = 'product-recommendation-quiz-for-ecommerce';

    protected function setUp(): void
    {
        parent::setUp();
        // Storefront constants normally defined by the core class constructor.
        if (!defined('PRQ_STORE_URL'))  { define('PRQ_STORE_URL', 'example.com'); }
        if (!defined('PRQ_ADMIN_URL'))  { define('PRQ_ADMIN_URL', 'https://admin.revenuehunt.com'); }
        if (!defined('PRQ_WOO_VERSION')) { define('PRQ_WOO_VERSION', '10.0.0'); }
        if (!defined('PRQ_WP_VERSION'))  { define('PRQ_WP_VERSION', '6.7'); }
    }

    private function embed(): Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Script
    {
        return new Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Script(self::HANDLE, PRQ_PLUGIN_VERSION);
    }

    public function test_not_enqueued_on_checkout(): void
    {
        Functions\when('is_checkout')->justReturn(true);
        Functions\when('is_cart')->justReturn(false);
        Functions\expect('wp_enqueue_script')->never();
        Functions\expect('wp_localize_script')->never();

        $this->embed()->enqueue_scripts();
    }

    public function test_not_enqueued_on_cart(): void
    {
        Functions\when('is_checkout')->justReturn(false);
        Functions\when('is_cart')->justReturn(true);
        Functions\expect('wp_enqueue_script')->never();
        Functions\expect('wp_localize_script')->never();

        $this->embed()->enqueue_scripts();
    }

    public function test_enqueues_async_embed_with_js_vars_on_normal_pages(): void
    {
        Functions\when('is_checkout')->justReturn(false);
        Functions\when('is_cart')->justReturn(false);

        $captured = null;
        Functions\expect('wp_enqueue_script')->once()->with(
            self::HANDLE,
            'https://admin.revenuehunt.com/embed.js?shop=' . rawurlencode('example.com'),
            [],
            PRQ_PLUGIN_VERSION,
            true
        );
        Functions\expect('wp_localize_script')->once()->with(
            self::HANDLE,
            'js_vars',
            \Mockery::on(function ($payload) use (&$captured) {
                $captured = $payload;
                return true;
            })
        );

        $this->embed()->enqueue_scripts();

        $this->assertSame([
            'shop'           => 'example.com',
            'platform'       => 'woocommerce',
            'channel'        => 'wordpress',
            'plugin_version' => PRQ_PLUGIN_VERSION,
            'woo_version'    => '10.0.0',
            'wp_version'     => '6.7',
        ], $captured);
    }

    public function test_async_added_to_own_handle(): void
    {
        $tag = "<script src='x.js' id='" . self::HANDLE . "-js'></script>";
        $out = $this->embed()->add_async_to_embed_script($tag, self::HANDLE, 'x.js');
        $this->assertStringContainsString('<script async ', $out);
    }

    public function test_async_left_untouched_for_other_handles(): void
    {
        $tag = "<script src='other.js'></script>";
        $this->assertSame($tag, $this->embed()->add_async_to_embed_script($tag, 'some-other-handle', 'other.js'));
    }

    public function test_async_not_double_added(): void
    {
        $tag = "<script async src='x.js'></script>";
        $this->assertSame($tag, $this->embed()->add_async_to_embed_script($tag, self::HANDLE, 'x.js'));
    }
}
