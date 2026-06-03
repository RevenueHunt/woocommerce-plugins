<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use PHPUnit\Framework\Attributes\PreserveGlobalState;
use PHPUnit\Framework\Attributes\RunInSeparateProcess;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Blocks;
use Product_Recommendation_Quiz_For_Ecommerce_Embed_Markers as Markers;

/**
 * Tests for the three placement blocks (auto-popup, chat-button, link-popup).
 *
 * Pins that each block registers as a dynamic block, that the render callbacks
 * emit the shared Embed_Markers output, that the singleton blocks set the
 * registry (so the footer steps aside — precedence) and dedupe a second block,
 * and that link-popup emits a bindable `#quiz-CODE` anchor.
 */
final class EmbedBlocksTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Functions\when('esc_attr')->returnArg();
        Functions\when('esc_url')->returnArg();
        Functions\when('esc_html')->returnArg();
        Markers::reset();
    }

    private function blocks(): Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Blocks
    {
        return new Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Blocks();
    }

    public function test_register_registers_editor_script_and_three_dynamic_blocks(): void
    {
        Functions\when('plugin_dir_url')->justReturn('https://example.com/wp-content/plugins/prq/front/');
        Functions\expect('wp_register_script')->once()->with(
            'product-recommendation-quiz-for-ecommerce-embed-blocks-editor',
            'https://example.com/wp-content/plugins/prq/front/blocks/embed-blocks-editor.js',
            ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n'],
            PRQ_PLUGIN_VERSION,
            true
        );

        $callbacks = [];
        Functions\expect('register_block_type')->times(3)->with(
            \Mockery::type('string'),
            \Mockery::on(function ($args) use (&$callbacks) {
                $callbacks[] = $args['render_callback'];
                return true;
            })
        );

        $this->blocks()->register();

        $this->assertCount(3, $callbacks);
        foreach ($callbacks as $cb) {
            $this->assertIsCallable($cb);
        }
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_register_noops_without_block_api(): void
    {
        $this->blocks()->register();
        $this->assertFalse(function_exists('register_block_type'));
    }

    /* ---------- auto-popup ---------- */

    public function test_render_auto_popup_emits_marker_and_sets_registry(): void
    {
        $out = $this->blocks()->render_auto_popup([
            'quizId'  => 'abc123',
            'timeout' => 8,
        ]);

        $this->assertSame(
            '<div id="auto-popup" data-quiz-id="abc123" data-timeout="8" data-exit-intent="false" data-aggressive="false"></div>',
            $out
        );
        $this->assertTrue(Markers::was_rendered(Markers::MODE_AUTO_POPUP));
    }

    public function test_two_auto_popup_blocks_dedupe_to_one_marker(): void
    {
        $b = $this->blocks();
        $first  = $b->render_auto_popup(['quizId' => 'abc123']);
        $second = $b->render_auto_popup(['quizId' => 'abc123']);

        $this->assertStringStartsWith('<div id="auto-popup"', $first);
        $this->assertSame('', $second);
    }

    public function test_render_auto_popup_empty_without_quiz_id(): void
    {
        $this->assertSame('', $this->blocks()->render_auto_popup([]));
        $this->assertFalse(Markers::was_rendered(Markers::MODE_AUTO_POPUP));
    }

    /* ---------- chat-button ---------- */

    public function test_render_chat_button_emits_marker_and_sets_registry(): void
    {
        $out = $this->blocks()->render_chat_button([
            'quizId'   => 'xyz789',
            'color'    => '#0a0a0a',
            'greeting' => 'Hi!',
            'dot'      => true,
        ]);

        $this->assertSame(
            '<div id="rh-chat" data-quiz-id="xyz789" data-chat-color="#0a0a0a" data-chat-dot="true" data-chat-hide="false" data-chat-greeting="Hi!"></div>',
            $out
        );
        $this->assertTrue(Markers::was_rendered(Markers::MODE_CHAT));
    }

    /* ---------- link-popup ---------- */

    public function test_render_link_popup_emits_anchor(): void
    {
        $out = $this->blocks()->render_link_popup([
            'quizId' => 'CODE42',
            'label'  => 'Find my product',
        ]);

        $this->assertSame(
            '<div class="wp-block-button prq-link-popup"><a class="wp-block-button__link" href="#quiz-CODE42">Find my product</a></div>',
            $out
        );
        // Not a singleton: it never touches the registry.
        $this->assertFalse(Markers::was_rendered(Markers::MODE_AUTO_POPUP));
        $this->assertFalse(Markers::was_rendered(Markers::MODE_CHAT));
    }

    public function test_render_link_popup_uses_default_label(): void
    {
        $out = $this->blocks()->render_link_popup(['quizId' => 'CODE42']);
        $this->assertStringContainsString('href="#quiz-CODE42"', $out);
        $this->assertStringContainsString('Take the quiz', $out);
    }

    public function test_render_link_popup_empty_without_quiz_id(): void
    {
        $this->assertSame('', $this->blocks()->render_link_popup(['label' => 'x']));
    }
}
