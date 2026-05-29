<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use PHPUnit\Framework\Attributes\PreserveGlobalState;
use PHPUnit\Framework\Attributes\RunInSeparateProcess;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Oauth_Connection;
use Product_Recommendation_Quiz_For_Ecommerce_Connection;

/**
 * Tests for the V1 backend connection (WooCommerce OAuth).
 *
 * Pins that "connected" is derived from the stored shop identifier (not a
 * hard-coded token shape the panel reads directly), and the reported target /
 * domain. The status panel depends only on the Connection interface.
 */
final class ConnectionTest extends TestCase
{
    private function connection(): Product_Recommendation_Quiz_For_Ecommerce_Oauth_Connection
    {
        return new Product_Recommendation_Quiz_For_Ecommerce_Oauth_Connection();
    }

    public function test_implements_connection_interface(): void
    {
        $this->assertInstanceOf(
            Product_Recommendation_Quiz_For_Ecommerce_Connection::class,
            $this->connection()
        );
    }

    public function test_connected_when_shop_hashid_present(): void
    {
        Functions\when('get_option')->justReturn('abc123');
        $this->assertTrue($this->connection()->is_connected());
    }

    public function test_not_connected_when_shop_hashid_absent(): void
    {
        Functions\when('get_option')->justReturn(false);
        $this->assertFalse($this->connection()->is_connected());
    }

    public function test_target_is_production_backend_off_dev_domains(): void
    {
        // PRQ_STORE_URL undefined here -> is_development_environment() is false.
        $this->assertSame('admin.revenuehunt.com', $this->connection()->get_target());
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_target_is_local_backend_on_dev_domains(): void
    {
        define('PRQ_STORE_URL', 'shop.test');
        $this->assertSame('localhost:9528', $this->connection()->get_target());
    }

    public function test_domain_is_site_url_host(): void
    {
        Functions\when('site_url')->justReturn('https://store.example.com');
        Functions\when('wp_parse_url')->alias(function ($url, $component) {
            return parse_url($url, $component);
        });
        $this->assertSame('store.example.com', $this->connection()->get_domain());
    }
}
