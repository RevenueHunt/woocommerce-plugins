<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use PHPUnit\Framework\Attributes\PreserveGlobalState;
use PHPUnit\Framework\Attributes\RunInSeparateProcess;
use RevenueHunt\PRQ\Tests\TestCase;

/**
 * Tests for the WooCommerce feature-compatibility declaration.
 *
 * Pins that the plugin declares compatibility with BOTH HPOS
 * (custom_order_tables) and the Cart/Checkout Blocks, and that the declaration
 * no-ops gracefully when the FeaturesUtil API is unavailable.
 *
 * Process-isolated: the declaration branch hinges on whether the FeaturesUtil
 * class exists, which is a one-way global the suite cannot toggle back.
 */
final class WooCompatibilityTest extends TestCase
{
    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_declares_hpos_and_cart_checkout_blocks_when_featuresutil_present(): void
    {
        require dirname(__DIR__) . '/fixtures/wc-features-util-stub.php';
        \Automattic\WooCommerce\Utilities\FeaturesUtil::$declared = [];

        product_recommendation_quiz_for_ecommerce_declare_woo_compatibility();

        $features = array_column(\Automattic\WooCommerce\Utilities\FeaturesUtil::$declared, 0);
        $this->assertContains('custom_order_tables', $features);
        $this->assertContains('cart_checkout_blocks', $features);

        // Each declaration marks the plugin compatible (third arg true).
        foreach (\Automattic\WooCommerce\Utilities\FeaturesUtil::$declared as $call) {
            $this->assertTrue($call[2]);
            $this->assertIsString($call[1]); // plugin main file
        }
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_noops_without_featuresutil(): void
    {
        // Fresh process, FeaturesUtil never defined -> the guard short-circuits
        // and the call is a harmless no-op (no fatal).
        $this->assertFalse(class_exists(\Automattic\WooCommerce\Utilities\FeaturesUtil::class));
        product_recommendation_quiz_for_ecommerce_declare_woo_compatibility();
        $this->assertTrue(true);
    }
}
