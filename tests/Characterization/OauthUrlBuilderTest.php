<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Admin_Oauth_Url_Builder;

/**
 * Characterization tests for the connection-layer URL builder.
 *
 * The monolith depends on these wire formats byte-for-byte, so they are pinned
 * exactly: the WooCommerce authorize URL (RFC3986 query, %20 not +) and the
 * authenticated OAuth URL — in particular the HMAC payload field order
 * (hashid, domain, plugin_version, timestamp) and base64(sha256) construction.
 */
final class OauthUrlBuilderTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        if (!defined('PRQ_STORE_URL'))  { define('PRQ_STORE_URL', 'example.com'); }
        if (!defined('PRQ_API_URL'))    { define('PRQ_API_URL', 'https://api.revenuehunt.com'); }
        if (!defined('PRQ_WOO_VERSION')) { define('PRQ_WOO_VERSION', '10.0.0'); }
        if (!defined('PRQ_WP_VERSION'))  { define('PRQ_WP_VERSION', '6.7'); }
    }

    private function builder(): Product_Recommendation_Quiz_For_Ecommerce_Admin_Oauth_Url_Builder
    {
        return new Product_Recommendation_Quiz_For_Ecommerce_Admin_Oauth_Url_Builder();
    }

    public function test_woocommerce_auth_url_is_rfc3986_with_expected_params(): void
    {
        Functions\when('get_site_url')->justReturn('https://example.com/wc-auth/v1/authorize/');
        Functions\when('admin_url')->justReturn('https://example.com/wp-admin/admin.php?page=prqfw');

        $url = $this->builder()->prquiz_get_woocommerce_auth_url();

        $expected_query = http_build_query(
            [
                'app_name'     => 'Product Recommendation Quiz',
                'scope'        => 'read_write',
                'user_id'      => 'example.com',
                'return_url'   => 'https://example.com/wp-admin/admin.php?page=prqfw',
                'callback_url' => 'https://api.revenuehunt.com/api/v1/woocommerce/create',
            ],
            '',
            '&',
            PHP_QUERY_RFC3986
        );

        $this->assertSame('https://example.com/wc-auth/v1/authorize/?' . $expected_query, $url);
        // RFC3986: spaces in app_name must be %20, never +.
        $this->assertStringContainsString('app_name=Product%20Recommendation%20Quiz', $url);
        $this->assertStringNotContainsString('+', $url);
    }

    public function test_oauth_url_hmac_payload_format_and_params(): void
    {
        $shop_hashid = 'shop123';
        $api_key     = 'shared-secret';

        Functions\when('get_option')->alias(function ($key) use ($shop_hashid, $api_key) {
            switch ($key) {
                case PRQ_OPTION_SHOP_HASHID: return $shop_hashid;
                case PRQ_OPTION_API_KEY:     return $api_key;
                case 'gmt_offset':           return '2';
                default:                     return false;
            }
        });
        Functions\when('get_locale')->justReturn('en_US');
        Functions\when('get_bloginfo')->alias(function ($k) {
            return $k === 'name' ? 'My Store' : 'admin@example.com';
        });
        Functions\when('get_woocommerce_currency')->justReturn('USD');
        Functions\when('get_woocommerce_currency_symbol')->justReturn('$');

        $countries = \Mockery::mock();
        $countries->shouldReceive('get_base_country')->andReturn('US');
        $wc = new \stdClass();
        $wc->countries = $countries;
        Functions\when('WC')->justReturn($wc);

        $url   = $this->builder()->prquiz_get_oauth_url();
        $parts = wp_parse_str_compat(parse_url($url, PHP_URL_QUERY));

        // Production OAuth endpoint (example.com is not a dev domain).
        $this->assertStringStartsWith('https://admin.revenuehunt.com/public/woocommerce/oauth?', $url);

        // Stable params.
        $this->assertSame('wordpress', $parts['channel']);
        $this->assertSame('example.com', $parts['domain']);
        $this->assertSame($shop_hashid, $parts['shop_hashid']);
        $this->assertSame(PRQ_PLUGIN_VERSION, $parts['plugin_version']);
        $this->assertSame('US', $parts['country']);
        $this->assertSame('en', $parts['locale']);
        $this->assertSame('USD', $parts['currency']);

        // HMAC: recompute over the exact documented payload using the URL's own
        // timestamp; it must match the hmac the builder emitted.
        $expected_data = sprintf(
            'hashid=%s&domain=%s&plugin_version=%s&timestamp=%s',
            $shop_hashid,
            'example.com',
            PRQ_PLUGIN_VERSION,
            $parts['timestamp']
        );
        $expected_hmac = base64_encode(hash_hmac('sha256', $expected_data, $api_key, true));
        $this->assertSame($expected_hmac, $parts['hmac']);
    }
}

/**
 * Parse a URL query string into an associative array (urldecoded).
 *
 * Defined alongside the test so we do not depend on a WP stub for parse_str.
 *
 * @param string $query The raw query string.
 * @return array<string,string> Decoded key/value pairs.
 */
function wp_parse_str_compat($query)
{
    $out = [];
    parse_str((string) $query, $out);
    return $out;
}
