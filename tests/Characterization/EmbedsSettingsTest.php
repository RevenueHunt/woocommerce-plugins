<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Embeds_Settings as Settings;

/**
 * Tests for the app-embeds settings store.
 *
 * Pins the canonical shape of the option, the per-key type coercion every save
 * and read flow through, and the idempotency `get()` relies on (it re-runs
 * `sanitize()` on whatever is stored).
 */
final class EmbedsSettingsTest extends TestCase
{
    public function test_defaults_have_the_full_shape_disabled(): void
    {
        $d = Settings::defaults();

        $this->assertSame(
            ['enabled', 'quiz_id', 'timeout', 'exit_intent', 'aggressive', 'popup_width', 'popup_height'],
            array_keys($d['auto_popup'])
        );
        $this->assertSame(
            ['enabled', 'quiz_id', 'color', 'dot', 'hide', 'greeting', 'popup_width', 'popup_height'],
            array_keys($d['chat'])
        );
        $this->assertFalse($d['auto_popup']['enabled']);
        $this->assertFalse($d['chat']['enabled']);
        $this->assertSame(5, $d['auto_popup']['timeout']);
    }

    public function test_sanitize_coerces_types(): void
    {
        $out = Settings::sanitize([
            'auto_popup' => [
                'enabled'      => '1',
                'quiz_id'      => 'abc123',
                'timeout'      => '7',
                'exit_intent'  => 'on',
                'aggressive'   => '',
                'popup_width'  => '900',
                'popup_height' => '600',
            ],
            'chat' => [
                'enabled'  => '1',
                'quiz_id'  => 'def456',
                'color'    => '#ff0000',
                'dot'      => '1',
                'hide'     => '',
                'greeting' => 'Need help?',
            ],
        ]);

        $this->assertTrue($out['auto_popup']['enabled']);
        $this->assertSame('abc123', $out['auto_popup']['quiz_id']);
        $this->assertSame(7, $out['auto_popup']['timeout']);
        $this->assertTrue($out['auto_popup']['exit_intent']);
        $this->assertFalse($out['auto_popup']['aggressive']);
        $this->assertSame(900, $out['auto_popup']['popup_width']);
        $this->assertSame(600, $out['auto_popup']['popup_height']);

        $this->assertTrue($out['chat']['enabled']);
        $this->assertSame('#ff0000', $out['chat']['color']);
        $this->assertTrue($out['chat']['dot']);
        $this->assertFalse($out['chat']['hide']);
        $this->assertSame('Need help?', $out['chat']['greeting']);
        // Keys absent from input fall back to defaults.
        $this->assertSame(0, $out['chat']['popup_width']);
    }

    public function test_sanitize_strips_markup_from_text_fields(): void
    {
        $out = Settings::sanitize([
            'auto_popup' => ['quiz_id' => '<script>alert(1)</script>code'],
            'chat'       => ['greeting' => 'Hi <b>there</b>'],
        ]);

        $this->assertStringNotContainsString('<script>', $out['auto_popup']['quiz_id']);
        $this->assertStringNotContainsString('<b>', $out['chat']['greeting']);
    }

    public function test_sanitize_drops_unknown_keys(): void
    {
        $out = Settings::sanitize([
            'auto_popup' => ['enabled' => '1', 'bogus' => 'x'],
            'chat'       => [],
            'unknown'    => ['anything'],
        ]);

        $this->assertArrayNotHasKey('bogus', $out['auto_popup']);
        $this->assertArrayNotHasKey('unknown', $out);
        $this->assertSame(['auto_popup', 'chat'], array_keys($out));
    }

    public function test_sanitize_treats_non_array_as_empty(): void
    {
        $out = Settings::sanitize('not an array');
        $this->assertSame(Settings::defaults(), $out);
    }

    public function test_sanitize_is_idempotent(): void
    {
        $once  = Settings::sanitize([
            'auto_popup' => ['enabled' => '1', 'quiz_id' => 'abc', 'timeout' => '3', 'exit_intent' => '1', 'popup_width' => '800'],
            'chat'       => ['enabled' => '1', 'quiz_id' => 'xyz', 'color' => '#123', 'dot' => '1', 'greeting' => 'Hello'],
        ]);
        $twice = Settings::sanitize($once);
        $this->assertSame($once, $twice);
    }

    public function test_get_runs_stored_value_through_sanitize(): void
    {
        Functions\when('get_option')->justReturn([
            'auto_popup' => ['enabled' => '1', 'quiz_id' => 'stored', 'legacy' => 'drop me'],
        ]);

        $out = Settings::get();
        $this->assertTrue($out['auto_popup']['enabled']);
        $this->assertSame('stored', $out['auto_popup']['quiz_id']);
        $this->assertArrayNotHasKey('legacy', $out['auto_popup']);
        // Missing section filled from defaults.
        $this->assertFalse($out['chat']['enabled']);
    }

    public function test_get_handles_missing_option(): void
    {
        Functions\when('get_option')->justReturn(false);
        $this->assertSame(Settings::defaults(), Settings::get());
    }
}
