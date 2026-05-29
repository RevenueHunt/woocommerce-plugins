<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Front_Shortcode;
use Product_Recommendation_Quiz_For_Ecommerce_Delivery;

/**
 * Tests for the [product_recommendation_quiz] placement shortcode.
 *
 * Pins that the shortcode registers under the documented tag and that it is a
 * thin, delivery-agnostic consumer: it parses attributes and hands them to the
 * active delivery, returning whatever the delivery renders.
 */
final class ShortcodeTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        // Mimic WordPress shortcode_atts(): only known keys, atts override defaults.
        Functions\when('shortcode_atts')->alias(function ($pairs, $atts) {
            $atts = (array) $atts;
            $out  = $pairs;
            foreach ($pairs as $key => $default) {
                if (array_key_exists($key, $atts)) {
                    $out[$key] = $atts[$key];
                }
            }
            return $out;
        });
    }

    public function test_register_adds_shortcode_under_documented_tag(): void
    {
        $delivery = \Mockery::mock(Product_Recommendation_Quiz_For_Ecommerce_Delivery::class);
        Functions\expect('add_shortcode')->once()->with(
            'product_recommendation_quiz',
            \Mockery::type('array')
        );

        (new Product_Recommendation_Quiz_For_Ecommerce_Front_Shortcode($delivery))->register();
    }

    public function test_render_delegates_parsed_attributes_to_delivery(): void
    {
        $delivery = \Mockery::mock(Product_Recommendation_Quiz_For_Ecommerce_Delivery::class);
        $delivery->shouldReceive('render')
            ->once()
            ->with([
                'id'           => 'rkHm6Y',
                'height'       => '450',
                'height_unit'  => 'px',
                'fixed_height' => false,
                'autoscroll'   => true,
            ])
            ->andReturn('<div class="rh-widget rh-inline"></div>');

        $shortcode = new Product_Recommendation_Quiz_For_Ecommerce_Front_Shortcode($delivery);
        $out = $shortcode->render_shortcode(['id' => 'rkHm6Y', 'height' => '450']);

        $this->assertSame('<div class="rh-widget rh-inline"></div>', $out);
    }

    public function test_render_parses_boolean_and_unit_attributes(): void
    {
        $delivery = \Mockery::mock(Product_Recommendation_Quiz_For_Ecommerce_Delivery::class);
        $delivery->shouldReceive('render')
            ->once()
            ->with([
                'id'           => 'rkHm6Y',
                'height'       => '80',
                'height_unit'  => '%',
                'fixed_height' => true,
                'autoscroll'   => false,
            ])
            ->andReturn('<div></div>');

        $shortcode = new Product_Recommendation_Quiz_For_Ecommerce_Front_Shortcode($delivery);
        $shortcode->render_shortcode([
            'id'           => 'rkHm6Y',
            'height'       => '80',
            'height_unit'  => '%',
            'fixed_height' => 'true',
            'autoscroll'   => 'false',
        ]);
    }

    public function test_render_uses_defaults_and_returns_empty_without_id(): void
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
            ])
            ->andReturn('');

        $shortcode = new Product_Recommendation_Quiz_For_Ecommerce_Front_Shortcode($delivery);
        $this->assertSame('', $shortcode->render_shortcode([]));
    }
}
