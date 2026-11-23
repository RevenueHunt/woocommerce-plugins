<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use PHPUnit\Framework\Attributes\PreserveGlobalState;
use PHPUnit\Framework\Attributes\RunInSeparateProcess;
use RevenueHunt\PRQ\Tests\TestCase;

/**
 * Characterization for the core plugin class wiring.
 *
 * Pins the set of hooks the plugin registers on run(), independent of HOW they
 * are registered — this survives retiring the WPPB loader in favour of direct
 * add_action/add_filter calls. Process-isolated because the constructor
 * define()s the PRQ_* runtime constants.
 */
final class CoreBootstrapTest extends TestCase
{
    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_run_registers_expected_hooks(): void
    {
        $_SERVER['HTTP_HOST']   = 'example.com';
        $_SERVER['REQUEST_URI'] = '/wp-admin/';

        Functions\when('is_ssl')->justReturn(true);
        Functions\when('esc_url_raw')->returnArg();
        Functions\when('get_site_url')->justReturn('https://example.com');
        Functions\when('get_bloginfo')->justReturn('6.7');
        Functions\when('get_plugins')->justReturn([]); // get_woo_version() -> null

        $GLOBALS['__prq_actions'] = [];
        $GLOBALS['__prq_filters'] = [];

        $plugin = new \Product_Recommendation_Quiz_For_Ecommerce();
        $plugin->run();

        $this->assertContains('plugins_loaded', $GLOBALS['__prq_actions']);
        $this->assertContains('admin_enqueue_scripts', $GLOBALS['__prq_actions']);
        $this->assertContains('admin_menu', $GLOBALS['__prq_actions']);
        $this->assertContains('wp_enqueue_scripts', $GLOBALS['__prq_actions']);
        $this->assertContains('init', $GLOBALS['__prq_actions']); // shortcode + block registration
        $this->assertContains('script_loader_tag', $GLOBALS['__prq_filters']);
        $this->assertContains('site_status_tests', $GLOBALS['__prq_filters']); // Site Health tests
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    #[\PHPUnit\Framework\Attributes\TestWith([true], 'V1 storefront held')]
    #[\PHPUnit\Framework\Attributes\TestWith([false], 'new-admin storefront active')]
    public function test_v2_connection_registers_only_the_active_storefront_delivery(bool $held): void
    {
        $_SERVER['HTTP_HOST'] = 'example.com';
        $_SERVER['REQUEST_URI'] = '/';
        Functions\when('is_ssl')->justReturn(true);
        Functions\when('esc_url_raw')->returnArg();
        Functions\when('get_site_url')->justReturn('https://example.com');
        Functions\when('get_bloginfo')->justReturn('6.7');
        Functions\when('get_plugins')->justReturn([]);
        $options = ['prq_v2_connection' => ['mode' => 'v2'], 'prq_embeds' => [
            'auto_popup' => ['enabled' => true, 'quiz_id' => 'Popup1'],
            'chat' => ['enabled' => true, 'quiz_id' => 'Chat2'],
        ]];
        if ($held) {
            $options['prq_v1_storefront'] = '1'; // WordPress persists scalar option values as strings.
        }
        Functions\when('get_option')->alias(fn($key, $default = false) => $options[$key] ?? $default);
        $GLOBALS['__prq_action_callbacks'] = [];

        (new \Product_Recommendation_Quiz_For_Ecommerce())->run();
        $actions = $GLOBALS['__prq_action_callbacks'];
        $delivery = \Product_Recommendation_Quiz_For_Ecommerce_Delivery_Resolver::resolve('prq', PRQ_PLUGIN_VERSION);
        if ($held) {
            $this->assertInstanceOf(\Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Script::class, $delivery);
            $this->assertSame(['enqueue_scripts'], array_column($actions['wp_enqueue_scripts'], 1));
            $this->assertSame(['render'], array_column($actions['wp_footer'], 1));
            Functions\when('plugin_dir_url')->justReturn('https://example.com/plugins/prq/front/');
            Functions\expect('wp_enqueue_script')->once()->with(\Mockery::any(), 'https://example.com/plugins/prq/front/js/embed.js?shop=example.com', [], PRQ_PLUGIN_VERSION, true);
            Functions\expect('wp_localize_script')->once();
            $actions['wp_enqueue_scripts'][0]();
            Functions\when('esc_attr')->returnArg();
            ob_start();
            $actions['wp_footer'][0]();
            $html = ob_get_clean();
            $this->assertStringContainsString('<div id="auto-popup" data-quiz-id="Popup1"', $html);
            $this->assertStringContainsString('<div id="rh-chat" data-quiz-id="Chat2"', $html);
            $this->assertStringNotContainsString('prq-v2-store', $html);
            $blocks = new \Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Blocks($delivery);
            $this->assertSame('', $blocks->render_assistant(['assistantId' => 'Asst1']));
            Functions\when('esc_url')->returnArg();
            Functions\when('esc_html')->returnArg();
            $this->assertStringContainsString('class="wp-block-button__link" href="#quiz-Popup1"', $blocks->render_link_popup(['quizId' => 'Popup1']));
        } else {
            $this->assertInstanceOf(\Product_Recommendation_Quiz_For_Ecommerce_V2_Delivery::class, $delivery);
            $this->assertSame(['enqueue_scripts', 'site_wide'], array_column($actions['wp_enqueue_scripts'], 1));
            $this->assertSame(['footer'], array_column($actions['wp_footer'], 1));
        }
    }
}
