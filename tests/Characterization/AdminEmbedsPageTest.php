<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Admin_Embeds_Page;
use Product_Recommendation_Quiz_For_Ecommerce_Embeds_Settings as Settings;

/**
 * Tests for the "Display" app-embeds settings subpage.
 *
 * Pins that the page hangs off the existing plugin menu, registers its option
 * against the shared store's sanitize callback, gates rendering on
 * `manage_options`, and emits a Settings-API form with the per-mode fields.
 */
final class AdminEmbedsPageTest extends TestCase
{
    private function page(): Product_Recommendation_Quiz_For_Ecommerce_Admin_Embeds_Page
    {
        return new Product_Recommendation_Quiz_For_Ecommerce_Admin_Embeds_Page();
    }

    public function test_add_menu_registers_submenu_under_plugin_menu(): void
    {
        Functions\expect('add_submenu_page')->once()->with(
            'prqfw',
            \Mockery::type('string'),
            \Mockery::type('string'),
            'manage_options',
            'prqfw-display',
            \Mockery::on(fn($cb) => is_callable($cb))
        );

        $this->page()->add_menu();
    }

    public function test_register_settings_uses_shared_group_and_sanitize_callback(): void
    {
        $captured = null;
        Functions\expect('register_setting')->once()->with(
            Settings::GROUP,
            Settings::OPTION,
            \Mockery::on(function ($args) use (&$captured) {
                $captured = $args;
                return true;
            })
        );

        $this->page()->register_settings();

        $this->assertSame(
            ['Product_Recommendation_Quiz_For_Ecommerce_Embeds_Settings', 'sanitize'],
            $captured['sanitize_callback']
        );
        $this->assertIsCallable($captured['sanitize_callback']);
    }

    public function test_render_blocks_users_without_capability(): void
    {
        Functions\when('current_user_can')->justReturn(false);
        Functions\when('esc_html__')->returnArg();
        // wp_die halts in production; emulate by throwing so render stops here.
        Functions\when('wp_die')->alias(function () {
            throw new \RuntimeException('wp_die called');
        });

        $this->expectException(\RuntimeException::class);
        $this->page()->render();
    }

    public function test_render_emits_settings_form_with_per_mode_fields(): void
    {
        Functions\when('current_user_can')->justReturn(true);
        Functions\when('get_option')->justReturn(false);
        Functions\when('esc_html_e')->alias(function ($t) { echo $t; });
        Functions\when('esc_html__')->returnArg();
        Functions\when('esc_attr')->returnArg();
        Functions\when('checked')->justReturn('');
        Functions\expect('settings_fields')->once()->with(Settings::GROUP);
        Functions\expect('submit_button')->once();

        ob_start();
        $this->page()->render();
        $html = ob_get_clean();

        // Auto-popup fields.
        $this->assertStringContainsString('name="prq_embeds[auto_popup][enabled]"', $html);
        $this->assertStringContainsString('name="prq_embeds[auto_popup][quiz_id]"', $html);
        $this->assertStringContainsString('name="prq_embeds[auto_popup][timeout]"', $html);
        $this->assertStringContainsString('name="prq_embeds[auto_popup][exit_intent]"', $html);
        $this->assertStringContainsString('name="prq_embeds[auto_popup][aggressive]"', $html);
        // Chat fields.
        $this->assertStringContainsString('name="prq_embeds[chat][enabled]"', $html);
        $this->assertStringContainsString('name="prq_embeds[chat][color]"', $html);
        $this->assertStringContainsString('name="prq_embeds[chat][greeting]"', $html);
        $this->assertStringContainsString('name="prq_embeds[chat][dot]"', $html);
        // Form posts to options.php.
        $this->assertStringContainsString('action="options.php"', $html);
    }
}
