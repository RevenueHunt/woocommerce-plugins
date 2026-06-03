<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Front_Global_Embed;
use Product_Recommendation_Quiz_For_Ecommerce_Embed_Markers as Markers;

/**
 * Tests for the site-wide wp_footer embed injector.
 *
 * Pins the enable/disable gates, the cart/checkout skip (matching the embed.js
 * enqueue guard), and the precedence rule: when the registry flag is already
 * set (simulating an on-page block that ran earlier), the footer outputs
 * nothing for that mode.
 */
final class GlobalEmbedTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Functions\when('esc_attr')->returnArg();
        Markers::reset();
    }

    private function render_with_settings(array $settings): string
    {
        Functions\when('get_option')->justReturn($settings);
        ob_start();
        (new Product_Recommendation_Quiz_For_Ecommerce_Front_Global_Embed())->render();
        return ob_get_clean();
    }

    public function test_enabled_mode_outputs_marker_once(): void
    {
        Functions\when('is_cart')->justReturn(false);
        Functions\when('is_checkout')->justReturn(false);

        $out = $this->render_with_settings([
            'auto_popup' => ['enabled' => true, 'quiz_id' => 'abc123', 'timeout' => 5],
        ]);

        $this->assertStringContainsString('<div id="auto-popup"', $out);
        $this->assertStringContainsString('data-quiz-id="abc123"', $out);
        $this->assertTrue(Markers::was_rendered(Markers::MODE_AUTO_POPUP));
    }

    public function test_both_modes_output_when_enabled(): void
    {
        Functions\when('is_cart')->justReturn(false);
        Functions\when('is_checkout')->justReturn(false);

        $out = $this->render_with_settings([
            'auto_popup' => ['enabled' => true, 'quiz_id' => 'abc123', 'timeout' => 5],
            'chat'       => ['enabled' => true, 'quiz_id' => 'xyz789'],
        ]);

        $this->assertStringContainsString('<div id="auto-popup"', $out);
        $this->assertStringContainsString('<div id="rh-chat"', $out);
    }

    public function test_disabled_mode_outputs_nothing(): void
    {
        Functions\when('is_cart')->justReturn(false);
        Functions\when('is_checkout')->justReturn(false);

        $out = $this->render_with_settings([
            'auto_popup' => ['enabled' => false, 'quiz_id' => 'abc123'],
            'chat'       => ['enabled' => false, 'quiz_id' => 'xyz789'],
        ]);

        $this->assertSame('', $out);
    }

    public function test_precedence_registry_already_set_suppresses_footer(): void
    {
        Functions\when('is_cart')->justReturn(false);
        Functions\when('is_checkout')->justReturn(false);

        // Simulate an on-page block having rendered earlier this request.
        Markers::mark_rendered(Markers::MODE_AUTO_POPUP);

        $out = $this->render_with_settings([
            'auto_popup' => ['enabled' => true, 'quiz_id' => 'abc123', 'timeout' => 5],
        ]);

        $this->assertSame('', $out);
    }

    public function test_not_rendered_on_checkout(): void
    {
        Functions\when('is_checkout')->justReturn(true);
        Functions\when('is_cart')->justReturn(false);

        $out = $this->render_with_settings([
            'auto_popup' => ['enabled' => true, 'quiz_id' => 'abc123'],
        ]);

        $this->assertSame('', $out);
    }

    public function test_not_rendered_on_cart(): void
    {
        Functions\when('is_checkout')->justReturn(false);
        Functions\when('is_cart')->justReturn(true);

        $out = $this->render_with_settings([
            'chat' => ['enabled' => true, 'quiz_id' => 'xyz789'],
        ]);

        $this->assertSame('', $out);
    }
}
