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
        $this->assertContains('script_loader_tag', $GLOBALS['__prq_filters']);
    }
}
