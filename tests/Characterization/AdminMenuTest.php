<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Admin_Menu;

/**
 * The admin loads only the plugin's own stylesheet: no script, and nothing from our servers
 * (WordPress.org guideline 8). The RevenueHunt app is the iframe on the plugin's page.
 */
final class AdminMenuTest extends TestCase
{
    public function test_admin_enqueues_only_the_local_stylesheet(): void
    {
        Functions\when('plugin_dir_url')->justReturn('https://example.com/wp-content/plugins/prq/admin/');
        Functions\expect('wp_enqueue_style')->once()->with(
            'product-recommendation-quiz-for-ecommerce',
            'https://example.com/wp-content/plugins/prq/admin/css/product-recommendation-quiz-for-ecommerce-admin.css',
            [],
            PRQ_PLUGIN_VERSION,
            'all'
        );
        Functions\expect('wp_enqueue_script')->never();

        (new Product_Recommendation_Quiz_For_Ecommerce_Admin_Menu('product-recommendation-quiz-for-ecommerce', PRQ_PLUGIN_VERSION))
            ->enqueue_scripts();
    }
}
