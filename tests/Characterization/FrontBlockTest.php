<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use PHPUnit\Framework\Attributes\PreserveGlobalState;
use PHPUnit\Framework\Attributes\RunInSeparateProcess;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Front_Block;
use Product_Recommendation_Quiz_For_Ecommerce_Delivery;

/**
 * Tests for the Product Recommendation Quiz Gutenberg block.
 *
 * Pins that the block registers its editor script + a dynamic (render_callback)
 * block, and that the callback is a delivery-agnostic consumer: it forwards the
 * block attributes to the active delivery and returns its markup.
 */
final class FrontBlockTest extends TestCase
{
    public function test_register_registers_editor_script_and_dynamic_block(): void
    {
        Functions\when('plugin_dir_url')->justReturn('https://example.com/wp-content/plugins/prq/front/');
        Functions\expect('wp_register_script')->once()->with(
            'product-recommendation-quiz-for-ecommerce-block-editor',
            'https://example.com/wp-content/plugins/prq/front/blocks/quiz/editor.js',
            ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n'],
            PRQ_PLUGIN_VERSION,
            true
        );
        // The editor preview origin is localized to the editor script.
        Functions\expect('wp_localize_script')->once()->with(
            'product-recommendation-quiz-for-ecommerce-block-editor',
            'prqQuizBlock',
            \Mockery::on(function ($data) {
                return isset($data['adminOrigin']) && is_string($data['adminOrigin']);
            })
        );

        $captured_args = null;
        Functions\expect('register_block_type')->once()->with(
            \Mockery::type('string'),
            \Mockery::on(function ($args) use (&$captured_args) {
                $captured_args = $args;
                return true;
            })
        );

        $delivery = \Mockery::mock(Product_Recommendation_Quiz_For_Ecommerce_Delivery::class);
        (new Product_Recommendation_Quiz_For_Ecommerce_Front_Block($delivery))->register();

        $this->assertArrayHasKey('render_callback', $captured_args);
        $this->assertIsCallable($captured_args['render_callback']);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_register_noops_without_block_api(): void
    {
        // Fresh process: register_block_type is undefined -> function_exists() false.
        $delivery = \Mockery::mock(Product_Recommendation_Quiz_For_Ecommerce_Delivery::class);
        (new Product_Recommendation_Quiz_For_Ecommerce_Front_Block($delivery))->register();

        $this->assertFalse(function_exists('register_block_type'));
    }

    public function test_render_block_delegates_attributes_to_delivery(): void
    {
        $delivery = \Mockery::mock(Product_Recommendation_Quiz_For_Ecommerce_Delivery::class);
        $delivery->shouldReceive('render')
            ->once()
            ->with([
                'id'           => 'rkHm6Y',
                'height'       => 450,
                'height_unit'  => '%',
                'fixed_height' => true,
                'autoscroll'   => false,
                'full_width'   => true,
            ])
            ->andReturn('<div class="rh-widget rh-inline"></div>');

        $block = new Product_Recommendation_Quiz_For_Ecommerce_Front_Block($delivery);
        $out = $block->render_block([
            'id'         => 'rkHm6Y',
            'height'     => 450,
            'heightUnit' => '%',
            'fixedHeight' => true,
            'autoscroll' => false,
            'fullWidth'  => true,
        ]);

        $this->assertSame('<div class="rh-widget rh-inline"></div>', $out);
    }

    public function test_render_block_uses_defaults_without_attributes(): void
    {
        $delivery = \Mockery::mock(Product_Recommendation_Quiz_For_Ecommerce_Delivery::class);
        $delivery->shouldReceive('render')
            ->once()
            ->with([
                'id'           => '',
                'height'       => 600,
                'height_unit'  => 'px',
                'fixed_height' => false,
                'autoscroll'   => true,
                'full_width'   => false,
            ])
            ->andReturn('');

        $block = new Product_Recommendation_Quiz_For_Ecommerce_Front_Block($delivery);
        $this->assertSame('', $block->render_block([]));
    }
}
