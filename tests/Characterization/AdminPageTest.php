<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Admin_Page;

/**
 * Characterization tests for the admin settings page orchestration.
 *
 * Pins the two cheapest, highest-value dispatch branches of prquiz_options():
 * the manage_options permission gate, and the WooCommerce-missing prerequisite
 * (which returns before the HTTPS/define block). Deeper branches define
 * constants and are covered indirectly via DiagnosticsTest.
 */
final class AdminPageTest extends TestCase
{
    private function page(): Product_Recommendation_Quiz_For_Ecommerce_Admin_Page
    {
        return new Product_Recommendation_Quiz_For_Ecommerce_Admin_Page();
    }

    public function test_options_blocks_users_without_manage_options(): void
    {
        Functions\when('current_user_can')->justReturn(false);
        Functions\when('esc_html__')->returnArg();
        // wp_die halts in production; emulate by throwing so dispatch stops here.
        Functions\when('wp_die')->alias(function () {
            throw new \RuntimeException('wp_die called');
        });

        $this->expectException(\RuntimeException::class);
        $this->page()->prquiz_options();
    }

    public function test_options_shows_woocommerce_missing_when_woocommerce_absent(): void
    {
        Functions\when('current_user_can')->justReturn(true);
        Functions\when('site_url')->justReturn('https://example.com');
        Functions\when('wp_parse_url')->justReturn('example.com');
        Functions\when('esc_html__')->returnArg();
        // woocommerce_missing() assembles a whole sentence and outputs it via
        // wp_kses(); identity is enough to assert the rendered copy.
        Functions\when('wp_kses')->returnArg();

        // WooCommerce class is not defined in the test harness, so the
        // prerequisite check fails naturally and the notice is rendered.
        ob_start();
        $this->page()->prquiz_options();
        $html = ob_get_clean();

        $this->assertStringContainsString('requires the WooCommerce plugin', $html);
    }
}
