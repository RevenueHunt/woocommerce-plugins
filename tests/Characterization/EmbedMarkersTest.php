<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Embed_Markers as Markers;

/**
 * Tests for the embed.js marker builder and the per-request singleton registry.
 *
 * The marker assertions are byte-exact: embed.js reads these attributes by name
 * and value, so the HTML is a contract. The registry tests pin the dedup /
 * precedence mechanism the footer injector and blocks both lean on.
 */
final class EmbedMarkersTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        // esc_attr is not defined by the bootstrap; identity is enough for byte
        // assertions (the values under test contain no HTML-special chars).
        Functions\when('esc_attr')->returnArg();
        // Reset the static singleton registry for test isolation.
        Markers::reset();
    }

    /* ---------- auto-popup ---------- */

    public function test_auto_popup_emits_every_attribute_in_order(): void
    {
        $html = Markers::auto_popup([
            'quiz_id'      => 'abc123',
            'timeout'      => 5,
            'exit_intent'  => true,
            'aggressive'   => false,
            'popup_width'  => 900,
            'popup_height' => 600,
        ]);

        $this->assertSame(
            '<div id="auto-popup" data-quiz-id="abc123" data-timeout="5" data-exit-intent="true" data-aggressive="false" data-popup-width="900" data-popup-height="600"></div>',
            $html
        );
    }

    public function test_auto_popup_omits_zero_dimensions(): void
    {
        $html = Markers::auto_popup([
            'quiz_id'      => 'abc123',
            'timeout'      => 0,
            'exit_intent'  => false,
            'aggressive'   => true,
            'popup_width'  => 0,
            'popup_height' => 0,
        ]);

        $this->assertSame(
            '<div id="auto-popup" data-quiz-id="abc123" data-timeout="0" data-exit-intent="false" data-aggressive="true"></div>',
            $html
        );
    }

    public function test_auto_popup_empty_without_quiz_id(): void
    {
        $this->assertSame('', Markers::auto_popup([]));
        $this->assertSame('', Markers::auto_popup(['quiz_id' => '']));
    }

    /* ---------- chat ---------- */

    public function test_chat_emits_every_attribute_in_order(): void
    {
        $html = Markers::chat([
            'quiz_id'      => 'xyz789',
            'color'        => '#ff0000',
            'dot'          => true,
            'hide'         => false,
            'greeting'     => 'Need help?',
            'popup_width'  => 420,
            'popup_height' => 640,
        ]);

        $this->assertSame(
            '<div id="rh-chat" data-quiz-id="xyz789" data-chat-color="#ff0000" data-chat-dot="true" data-chat-hide="false" data-chat-greeting="Need help?" data-popup-width="420" data-popup-height="640"></div>',
            $html
        );
    }

    public function test_chat_omits_empty_color_greeting_and_dimensions(): void
    {
        $html = Markers::chat([
            'quiz_id' => 'xyz789',
            'dot'     => false,
            'hide'    => true,
        ]);

        $this->assertSame(
            '<div id="rh-chat" data-quiz-id="xyz789" data-chat-dot="false" data-chat-hide="true"></div>',
            $html
        );
    }

    public function test_chat_empty_without_quiz_id(): void
    {
        $this->assertSame('', Markers::chat(['color' => '#000']));
    }

    /* ---------- link popup ---------- */

    public function test_link_href_builds_quiz_anchor(): void
    {
        $this->assertSame('#quiz-CODE42', Markers::link_href('CODE42'));
    }

    public function test_link_href_empty_for_blank_code(): void
    {
        $this->assertSame('', Markers::link_href(''));
        $this->assertSame('', Markers::link_href('   '));
    }

    /* ---------- registry ---------- */

    public function test_registry_tracks_modes_independently(): void
    {
        $this->assertFalse(Markers::was_rendered(Markers::MODE_AUTO_POPUP));
        $this->assertFalse(Markers::was_rendered(Markers::MODE_CHAT));

        Markers::mark_rendered(Markers::MODE_AUTO_POPUP);

        $this->assertTrue(Markers::was_rendered(Markers::MODE_AUTO_POPUP));
        $this->assertFalse(Markers::was_rendered(Markers::MODE_CHAT));
    }

    public function test_auto_popup_once_emits_then_dedupes(): void
    {
        $settings = ['quiz_id' => 'abc123', 'timeout' => 5];

        $first  = Markers::auto_popup_once($settings);
        $second = Markers::auto_popup_once($settings);

        $this->assertStringStartsWith('<div id="auto-popup"', $first);
        $this->assertSame('', $second);
        $this->assertTrue(Markers::was_rendered(Markers::MODE_AUTO_POPUP));
    }

    public function test_chat_once_emits_then_dedupes(): void
    {
        $settings = ['quiz_id' => 'xyz789'];

        $first  = Markers::chat_once($settings);
        $second = Markers::chat_once($settings);

        $this->assertStringStartsWith('<div id="rh-chat"', $first);
        $this->assertSame('', $second);
    }

    public function test_once_does_not_mark_when_output_empty(): void
    {
        // An empty/invalid block (no quiz id) must NOT suppress a later valid embed.
        $this->assertSame('', Markers::auto_popup_once([]));
        $this->assertFalse(Markers::was_rendered(Markers::MODE_AUTO_POPUP));

        $valid = Markers::auto_popup_once(['quiz_id' => 'abc123', 'timeout' => 5]);
        $this->assertStringStartsWith('<div id="auto-popup"', $valid);
    }
}
