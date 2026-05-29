<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;

// The deactivator is loaded lazily by the plugin (only inside the activation
// hooks), so pull it in explicitly for the unit harness.
require_once dirname(__DIR__, 2) . '/src/includes/class-product-recommendation-quiz-for-ecommerce-deactivator.php';

/**
 * LOW-3: deactivation must NOT destroy stored credentials — only uninstall does.
 * Destroying them on deactivate is a UX footgun AND the amplifier that re-opens
 * the HIGH-1 unauthenticated-write window on every deactivate/reactivate cycle.
 */
final class LifecycleTest extends TestCase
{
    private const OPTION_KEYS = ['rh_shop_hashid', 'rh_api_key', 'rh_domain', 'rh_token'];

    public function test_deactivate_preserves_credentials(): void
    {
        // Cache may be cleared, but options must NOT be deleted on deactivate.
        Functions\when('wp_cache_delete')->justReturn(true);
        Functions\expect('delete_option')->never();

        \Product_Recommendation_Quiz_For_Ecommerce_Deactivator::deactivate();
    }

    public function test_deactivate_clears_object_cache(): void
    {
        Functions\when('delete_option')->justReturn(true);
        foreach (self::OPTION_KEYS as $key) {
            Functions\expect('wp_cache_delete')->once()->with($key, 'options');
        }

        \Product_Recommendation_Quiz_For_Ecommerce_Deactivator::deactivate();
    }

    public function test_uninstall_cleanup_deletes_all_credentials(): void
    {
        // The destructive path (used by uninstall.php) still removes every key.
        Functions\when('wp_cache_delete')->justReturn(true);
        foreach (self::OPTION_KEYS as $key) {
            Functions\expect('delete_option')->once()->with($key);
        }

        \Product_Recommendation_Quiz_For_Ecommerce_Deactivator::cleanup(true);
    }
}
