<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Site_Health;
use Product_Recommendation_Quiz_For_Ecommerce_Admin_Diagnostics;

/**
 * Tests for the Site Health integration.
 *
 * Pins that the plugin's prerequisite checks are registered as direct Site
 * Health tests and that each test callback maps the underlying diagnostic to
 * the correct pass/fail status, reusing the diagnostics unit (no new rules).
 */
final class SiteHealthTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        // Site Health result arrays run text through these helpers.
        Functions\when('esc_html__')->returnArg();
        Functions\when('esc_url')->returnArg();
        Functions\when('admin_url')->returnArg();
    }

    private function diagnostics(): object
    {
        return \Mockery::mock(Product_Recommendation_Quiz_For_Ecommerce_Admin_Diagnostics::class);
    }

    private function health(object $diagnostics): Product_Recommendation_Quiz_For_Ecommerce_Site_Health
    {
        return new Product_Recommendation_Quiz_For_Ecommerce_Site_Health($diagnostics);
    }

    public function test_registers_four_direct_tests(): void
    {
        $tests = $this->health($this->diagnostics())->register_tests(['direct' => [], 'async' => []]);

        foreach (['prq_permalinks', 'prq_ssl', 'prq_wpml', 'prq_rest_api'] as $key) {
            $this->assertArrayHasKey($key, $tests['direct']);
            $this->assertIsCallable($tests['direct'][$key]['test']);
        }
    }

    public function test_permalinks_critical_when_plain(): void
    {
        $diag = $this->diagnostics();
        $diag->shouldReceive('check_plain_permalink')->andReturn(true);

        $result = $this->health($diag)->test_permalinks();
        $this->assertSame('critical', $result['status']);
        $this->assertSame('prq_permalinks', $result['test']);
    }

    public function test_permalinks_good_when_pretty(): void
    {
        $diag = $this->diagnostics();
        $diag->shouldReceive('check_plain_permalink')->andReturn(false);

        $this->assertSame('good', $this->health($diag)->test_permalinks()['status']);
    }

    public function test_ssl_status_follows_is_ssl(): void
    {
        Functions\when('is_ssl')->justReturn(true);
        $this->assertSame('good', $this->health($this->diagnostics())->test_ssl()['status']);

        Functions\when('is_ssl')->justReturn(false);
        $this->assertSame('critical', $this->health($this->diagnostics())->test_ssl()['status']);
    }

    public function test_wpml_status_follows_diagnostic(): void
    {
        $bad = $this->diagnostics();
        $bad->shouldReceive('is_wpml_problematic')->andReturn(true);
        $this->assertSame('critical', $this->health($bad)->test_wpml()['status']);

        $ok = $this->diagnostics();
        $ok->shouldReceive('is_wpml_problematic')->andReturn(false);
        $this->assertSame('good', $this->health($ok)->test_wpml()['status']);
    }

    public function test_rest_api_good_on_200(): void
    {
        Functions\when('site_url')->justReturn('https://store.example.com');
        Functions\when('wp_parse_url')->alias(fn($url, $component) => parse_url($url, $component));

        $diag = $this->diagnostics();
        $diag->shouldReceive('api_check_json')->with('store.example.com')->andReturn([200, 'OK']);

        $this->assertSame('good', $this->health($diag)->test_rest_api()['status']);
    }

    public function test_rest_api_critical_on_non_200(): void
    {
        Functions\when('site_url')->justReturn('https://store.example.com');
        Functions\when('wp_parse_url')->alias(fn($url, $component) => parse_url($url, $component));

        $diag = $this->diagnostics();
        $diag->shouldReceive('api_check_json')->andReturn([500, '']);

        $this->assertSame('critical', $this->health($diag)->test_rest_api()['status']);
    }
}
