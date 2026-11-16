<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;

/** Wire/output snapshot written and run before introducing V2 mode. */
final class V1ModeTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Functions\when('get_option')->justReturn(false); // No mode option = existing V1 shop.
        foreach (['PRQ_STORE_URL' => 'example.com', 'PRQ_ADMIN_URL' => 'https://admin.revenuehunt.com', 'PRQ_WOO_VERSION' => '10.0.0', 'PRQ_WP_VERSION' => '6.7'] as $key => $value) {
            if (!defined($key)) define($key, $value);
        }
        Functions\when('esc_url')->returnArg();
        Functions\when('esc_attr')->returnArg();
    }

    public function test_embed_tag_and_payload_and_real_shortcode_and_block_html(): void
    {
        $handle = 'product-recommendation-quiz-for-ecommerce';
        Functions\when('is_checkout')->justReturn(false);
        Functions\when('is_cart')->justReturn(false);
        Functions\expect('wp_enqueue_script')->times(3)->with($handle, PRQ_ADMIN_URL . '/embed.js?shop=example.com', [], PRQ_PLUGIN_VERSION, true);
        Functions\expect('wp_localize_script')->times(3)->with($handle, 'js_vars', [
            'shop' => 'example.com', 'platform' => 'woocommerce', 'channel' => 'wordpress',
            'plugin_version' => PRQ_PLUGIN_VERSION, 'woo_version' => '10.0.0', 'wp_version' => '6.7',
        ]);
        Functions\when('shortcode_atts')->alias(fn($defaults, $atts) => array_merge($defaults, $atts));
        $delivery = new \Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Script($handle, PRQ_PLUGIN_VERSION);
        $delivery->enqueue_scripts();
        $this->assertSame('<script async src="embed.js" id="prq"></script>', $delivery->add_async_to_embed_script('<script src="embed.js" id="prq"></script>', $handle, 'embed.js'));
        $expected = '<div class="rh-widget rh-inline" data-url="https://admin.revenuehunt.com/public/quiz/abc123" data-fixed-height="true" data-autoscroll="false" style="margin:10px auto;width:100%;height:80vh;display:flex;"></div>';
        $shortcode = new \Product_Recommendation_Quiz_For_Ecommerce_Front_Shortcode($delivery);
        $this->assertSame($expected, $shortcode->render_shortcode(['id' => 'abc123', 'height' => 80, 'height_unit' => 'vh', 'fixed_height' => 'true', 'autoscroll' => 'false']));
        $block = new \Product_Recommendation_Quiz_For_Ecommerce_Front_Block($delivery);
        $this->assertSame($expected, $block->render_block(['id' => 'abc123', 'height' => 80, 'heightUnit' => 'vh', 'fixedHeight' => true, 'autoscroll' => false]));
    }

    public function test_connected_admin_html(): void
    {
        Functions\when('plugin_dir_url')->justReturn('https://example.com/plugin/admin/');
        Functions\when('esc_attr_e')->alias(function ($s) { echo $s; });
        Functions\when('esc_html_e')->alias(function ($s) { echo $s; });
        Functions\when('esc_html__')->returnArg();
        Functions\when('wp_kses')->returnArg();
        $builder = \Mockery::mock(\Product_Recommendation_Quiz_For_Ecommerce_Admin_Oauth_Url_Builder::class);
        $builder->shouldReceive('prquiz_get_oauth_url')->once()->andReturn('https://admin.revenuehunt.com/oauth?token=old-token');
        ob_start();
        (new \Product_Recommendation_Quiz_For_Ecommerce_Admin_Page(null, $builder))->prquiz_authenticated_visit();
        $html = trim(preg_replace('/\s+/', ' ', ob_get_clean()));
        $this->assertSame('<div class="wrap"> <img src="https://example.com/plugin/admin/img/revenuehunt-logo.png" width="24" height="24" alt="RevenueHunt" /> <p class="fright h-24 mtop-0 prq-author"> Product Recommendation Quiz for eCommerce <span class="fright"> by <a href="https://revenuehunt.com/" target="_blank" rel="noopener noreferrer">RevenueHunt</a> </span> </p> <iframe title="Product Recommendation Quiz for eCommerce" src="https://admin.revenuehunt.com/oauth?token=old-token" name="app-iframe" context="Main" class="prq-iframe"></iframe> </div>', $html);
    }

    public function test_only_original_rest_routes_registered(): void
    {
        $routes = [];
        Functions\when('register_rest_route')->alias(function ($namespace, $path, $args) use (&$routes) {
            $routes[] = [$namespace, $path, $args['methods'], $args['callback'][1], $args['permission_callback'][1]];
        });
        (new \Product_Recommendation_Quiz_For_Ecommerce_Rest_Set_Token_Controller())->register_routes();
        $this->assertSame([
            ['wc/v3', 'prq_set_token', 'POST', 'handle', 'check_woocommerce_permission'],
            ['prq/v1', 'settoken', 'POST', 'handle', 'verify_signature'],
        ], $routes);
        // If present in a future plugin, the mode registrar must add nothing in V1.
        if (class_exists('Product_Recommendation_Quiz_For_Ecommerce_V2')) {
            (new \Product_Recommendation_Quiz_For_Ecommerce_V2())->register_routes();
            $this->assertCount(2, $routes);
        }
    }
}
