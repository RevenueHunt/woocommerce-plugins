<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_V2 as V2;
use Product_Recommendation_Quiz_For_Ecommerce_V2_Catalog as Catalog;

final class V2ModeTest extends TestCase
{
    private function connection(): array
    {
        return ['mode' => 'v2', 'shop' => 'wc-ab12cd', 'shared_secret' => str_repeat('s', 32), 'api_url' => 'https://api.example.com', 'admin_url' => 'https://admin.example.com'];
    }

    private function request(string $method, string $route, array $query = [], string $body = ''): \WP_REST_Request
    {
        $request = \Mockery::mock(\WP_REST_Request::class);
        $request->shouldReceive('get_method')->andReturn($method);
        $request->shouldReceive('get_route')->andReturn($route);
        $request->shouldReceive('get_query_params')->andReturn($query);
        $request->shouldReceive('get_body')->andReturn($body);
        return $request;
    }

    public function test_order_signature_binds_query_method_and_exact_rest_route(): void
    {
        $secret = 'prq-v2-test-secret';
        // Exact get_route() string: /prq/v3/orders, NOT /wp-json/prq/v3/orders.
        $route = '/prq/v3/orders';
        $query = ['number' => 'RH 42/7', 'email' => 'ann+quiz@example.com'];
        $payload = "1700000000\nGET\n/prq/v3/orders\nemail=ann%2Bquiz%40example.com&number=RH%2042%2F7\n";
        $this->assertSame('770847424bbdd16fcfcdd5b78a618706b58f5e49e5848d8f25a92801eb84934b', hash_hmac('sha256', $payload, $secret));
        $signature = 'sha256=' . hash_hmac('sha256', $payload, $secret);
        $request = $this->request('GET', $route, $query);
        $this->assertTrue(V2::verify($secret, '1700000000', $request, $signature, 1700000000));
        $this->assertTrue(V2::verify($secret, '1700000000', $this->request('GET', $route, array_reverse($query, true)), $signature, 1700000000));
        foreach ([
            $this->request('GET', $route, array_replace($query, ['number' => 'RH 43/7'])),
            $this->request('GET', $route, array_replace($query, ['email' => 'other@example.com'])),
            $this->request('POST', $route, $query),
            $this->request('GET', '/prq/v3/catalog/export', $query),
        ] as $tampered) {
            $this->assertFalse(V2::verify($secret, '1700000000', $tampered, $signature, 1700000000));
        }
        Functions\when('get_option')->justReturn($this->connection());
        $timestamp = (string) time();
        $request->shouldReceive('get_header')->with('X-PRQ-Timestamp')->andReturn($timestamp);
        $request->shouldReceive('get_header')->with('X-PRQ-Signature')->andReturn('sha256=' . hash_hmac('sha256', str_replace('1700000000', $timestamp, $payload), $this->connection()['shared_secret']));
        $this->assertTrue((new V2())->authorize($request));
    }

    public function test_export_signature_covers_raw_bytes_and_requires_fresh_timestamp(): void
    {
        $body = '{"picked_metafields":["spf"]}';
        $request = $this->request('POST', '/prq/v3/catalog/export', [], $body);
        $signature = 'sha256=' . hash_hmac('sha256', "1000\nPOST\n/prq/v3/catalog/export\n\n" . $body, 'secret');
        $this->assertTrue(V2::verify('secret', '1000', $request, $signature, 1000));
        $this->assertTrue(V2::verify('secret', '1000', $request, $signature, 1300));
        $this->assertFalse(V2::verify('secret', '1000', $request, $signature, 1301));
        $this->assertFalse(V2::verify('secret', '1000', $request, $signature, 699));
        $this->assertFalse(V2::verify('secret', '1000', $this->request('POST', '/prq/v3/catalog/export', [], $body . ' '), $signature, 1000));
        $this->assertFalse(V2::verify('wrong', '1000', $request, $signature, 1000));
        $this->assertFalse(V2::verify('secret', '', $request, $signature, 1000));
        $this->assertFalse(V2::verify('', '1000', $request, $signature, 1000));
    }

    public function test_bad_and_stale_signatures_return_explicit_403(): void
    {
        Functions\when('get_option')->justReturn($this->connection());
        foreach ([['GET', '/prq/v3/orders'], ['POST', '/prq/v3/catalog/export']] as [$method, $route]) {
            foreach ([(string) time(), (string) (time() - 301)] as $timestamp) {
                $request = $this->request($method, $route);
                $signature = $timestamp < time() - 300
                    ? 'sha256=' . hash_hmac('sha256', "$timestamp\n$method\n$route\n\n", $this->connection()['shared_secret'])
                    : 'sha256=bad';
                $request->shouldReceive('get_header')->with('X-PRQ-Timestamp')->andReturn($timestamp);
                $request->shouldReceive('get_header')->with('X-PRQ-Signature')->andReturn($signature);
                $error = (new V2())->authorize($request);
                $this->assertSame('prq_invalid_signature', $error->get_error_code());
                $this->assertSame(['status' => 403], $error->get_error_data());
            }
        }
    }

    public function test_admin_jwt_claims_signature_and_iframe_launch_url(): void
    {
        $connection = $this->connection();
        Functions\when('get_option')->justReturn($connection);
        Functions\when('wp_json_encode')->alias('json_encode');
        Functions\when('wp_generate_uuid4')->justReturn('c7e6e7c3-8e62-4c11-a59d-3bc880137d4f');
        Functions\when('wp_get_current_user')->justReturn((object) ['ID' => 7, 'user_email' => 'owner@example.com', 'display_name' => 'Ann']);
        $before = time();
        $url = (new \Product_Recommendation_Quiz_For_Ecommerce_Admin_Oauth_Url_Builder())->prquiz_get_oauth_url();
        $this->assertStringStartsWith($connection['admin_url'] . '/auth/woocommerce?token=', $url);
        parse_str(parse_url($url, PHP_URL_QUERY), $params);
        [$header, $payload, $signature] = explode('.', $params['token']);
        $decode = fn($part) => json_decode(base64_decode(strtr($part, '-_', '+/')), true);
        $this->assertSame(['alg' => 'HS256', 'typ' => 'JWT'], $decode($header));
        $claims = $decode($payload);
        $this->assertSame(['iss', 'aud', 'shop', 'wp_user', 'email', 'name', 'iat', 'exp', 'jti'], array_keys($claims));
        $this->assertSame('prq-plugin', $claims['iss']);
        $this->assertSame('rh-v2-admin', $claims['aud']);
        $this->assertSame('wc-ab12cd', $claims['shop']);
        $this->assertSame(7, $claims['wp_user']);
        $this->assertSame('owner@example.com', $claims['email']);
        $this->assertSame('Ann', $claims['name']);
        $this->assertGreaterThanOrEqual($before, $claims['iat']);
        $this->assertSame(60, $claims['exp'] - $claims['iat']);
        $this->assertMatchesRegularExpression('/^[a-f0-9-]{36}$/', $claims['jti']);
        $this->assertSame(rtrim(strtr(base64_encode(hash_hmac('sha256', "$header.$payload", $connection['shared_secret'], true)), '+/', '-_'), '='), $signature);
    }

    public function test_download_url_expires_and_cannot_be_reused_or_tampered(): void
    {
        $id = str_repeat('a', 48);
        $expires = time() + 3600;
        $state = ['expires' => $expires];
        $used = false;
        Functions\when('get_option')->alias(function ($key) use (&$state, &$used) {
            if ($key === V2::OPTION) return $this->connection();
            if (strpos($key, 'prq_v2_export_') === 0) return $state;
            return $used;
        });
        $request = new \WP_REST_Request(['id' => $id, 'expires' => (string) $expires, 'signature' => hash_hmac('sha256', "$id.$expires", $this->connection()['shared_secret'])]);
        $catalog = new Catalog();
        $this->assertTrue($catalog->authorize_download($request));
        $used = true;
        $this->assertFalse($catalog->authorize_download($request));
        $used = false;
        $request->set_param('signature', 'bad');
        $this->assertFalse($catalog->authorize_download($request));
        $state['expires'] = time() - 1;
        $request->set_param('expires', (string) $state['expires']);
        $request->set_param('signature', hash_hmac('sha256', "$id." . $state['expires'], $this->connection()['shared_secret']));
        $this->assertFalse($catalog->authorize_download($request));
    }

    public function test_v2_routes_are_explicit_and_no_nonce_is_printed(): void
    {
        Functions\when('get_option')->justReturn($this->connection());
        $routes = [];
        Functions\when('register_rest_route')->alias(function ($namespace, $path, $args) use (&$routes) {
            $routes[] = [$namespace, $path, $args['methods']];
            $this->assertIsCallable($args['permission_callback']);
        });
        (new V2())->register_routes();
        $this->assertSame([['prq/v3', '/catalog/export', 'POST'], ['prq/v3', '/catalog/download', 'GET'], ['prq/v3', '/orders', 'GET']], $routes);
        // Cached storefront output must not contain a Store API nonce.
        $source = file_get_contents(dirname(__DIR__, 2) . '/src/front/class-product-recommendation-quiz-for-ecommerce-front-embed-script.php');
        $this->assertStringNotContainsString('wp_create_nonce', $source);
    }

    public function test_v2_shortcode_and_block_render_mount_only_without_any_script(): void
    {
        Functions\when('get_option')->justReturn($this->connection());
        Functions\when('esc_attr')->alias(fn($s) => htmlspecialchars($s, ENT_QUOTES));
        Functions\when('shortcode_atts')->alias(fn($defaults, $atts) => array_merge($defaults, $atts));
        Functions\expect('wp_enqueue_script')->never();
        Functions\expect('wp_localize_script')->never();
        $delivery = \Product_Recommendation_Quiz_For_Ecommerce_Delivery_Resolver::resolve('prq', PRQ_PLUGIN_VERSION);
        $expected = '<div data-prq-shop="wc-ab12cd" data-prq-quiz="quiz123"></div>';
        $this->assertSame($expected, (new \Product_Recommendation_Quiz_For_Ecommerce_Front_Shortcode($delivery))->render_shortcode(['id' => 'quiz123']));
        $this->assertSame($expected, (new \Product_Recommendation_Quiz_For_Ecommerce_Front_Block($delivery))->render_block(['id' => 'quiz123']));
        (new \Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Script('prq', PRQ_PLUGIN_VERSION))->enqueue_scripts();
    }

    #[\PHPUnit\Framework\Attributes\RunInSeparateProcess]
    #[\PHPUnit\Framework\Attributes\PreserveGlobalState(false)]
    public function test_first_connect_stores_credentials_once_and_registers_native_order_webhooks(): void
    {
        $stored = false;
        $connection = $this->connection();
        Functions\when('get_option')->alias(function ($key) use (&$stored) { return $key === V2::OPTION ? $stored : false; });
        Functions\when('wp_http_validate_url')->returnArg();
        Functions\when('wp_parse_url')->alias('parse_url');
        Functions\when('untrailingslashit')->alias(fn($s) => rtrim($s, '/'));
        Functions\expect('add_option')->once()->with(V2::OPTION, $connection, '', false)->andReturnUsing(function ($key, $value) use (&$stored) { $stored = $value; return true; });
        Functions\when('get_current_user_id')->justReturn(7);
        Functions\expect('update_option')->once()->with(V2::OPTION, $connection + ['webhook_ids' => [41, 42]], false)->andReturnUsing(function ($key, $value) use (&$stored) { $stored = $value; return true; });
        $webhook = \Mockery::mock('overload:WC_Webhook');
        $topics = [];
        $webhook->shouldReceive('set_name')->once();
        $webhook->shouldReceive('set_topic')->once()->andReturnUsing(function ($topic) use (&$topics) { $topics[] = $topic; });
        $webhook->shouldReceive('set_delivery_url')->once()->with('https://api.example.com/api/woocommerce/orders');
        $derived = hash_hmac('sha256', 'prq-v2-webhook', $connection['shared_secret']);
        $this->assertNotSame($connection['shared_secret'], $derived);
        $webhook->shouldReceive('set_secret')->never()->with($connection['shared_secret']);
        $webhook->shouldReceive('set_secret')->once()->with($derived);
        $webhook->shouldReceive('set_api_version')->once()->with('wp_api_v3');
        $webhook->shouldReceive('set_status')->once()->with('active');
        $webhook->shouldReceive('set_user_id')->once()->with(7);
        $nextId = 41;
        $webhook->shouldReceive('save')->once()->andReturnUsing(function () use (&$nextId) { return $nextId++; });
        $request = new \WP_REST_Request($connection);
        $request->set_route('/wc/v3/prq_set_token');
        $this->assertTrue(V2::connect($request));
        $this->assertSame($connection + ['webhook_ids' => [41, 42]], $stored);
        $this->assertSame(['order.created', 'order.updated'], $topics);
        $this->assertTrue(V2::connect($request));
    }

    public function test_connect_never_upgrades_existing_v1_shop(): void
    {
        Functions\when('get_option')->alias(fn($key) => $key === PRQ_OPTION_SHOP_HASHID ? 'existing' : false);
        Functions\expect('add_option')->never();
        Functions\when('get_current_user_id')->justReturn(7);
        $request = new \WP_REST_Request($this->connection());
        $request->set_route('/wc/v3/prq_set_token');
        $this->assertTrue(V2::connect($request));
    }

    public function test_v2_permission_requires_authenticated_woocommerce_manager_without_legacy_fallthrough(): void
    {
        $controller = new \Product_Recommendation_Quiz_For_Ecommerce_Rest_Set_Token_Controller();
        $request = new \WP_REST_Request(['mode' => 'v2']);
        Functions\when('get_current_user_id')->justReturn(7);
        Functions\when('current_user_can')->alias(fn($cap) => $cap === 'manage_woocommerce');
        $this->assertTrue($controller->check_woocommerce_permission($request));
        Functions\when('get_current_user_id')->justReturn(0);
        $this->assertSame('prq_woocommerce_authorize_required', $controller->check_woocommerce_permission($request)->get_error_code());
        Functions\when('get_current_user_id')->justReturn(7);
        Functions\when('current_user_can')->justReturn(false);
        $this->assertSame('prq_woocommerce_authorize_required', $controller->check_woocommerce_permission($request)->get_error_code());
    }

    public function test_connect_rejects_anonymous_user_and_legacy_signed_route(): void
    {
        Functions\when('get_option')->justReturn(false);
        Functions\when('get_current_user_id')->justReturn(0);
        Functions\expect('add_option')->never();
        $request = new \WP_REST_Request($this->connection());
        $request->set_route('/wc/v3/prq_set_token');
        $error = V2::connect($request);
        $this->assertSame('prq_woocommerce_authorize_required', $error->get_error_code());
        $this->assertSame("Please connect from WooCommerce's authorize screen.", $error->get_error_message());
        Functions\when('get_current_user_id')->justReturn(7);
        $request->set_route('/prq/v1/settoken');
        $this->assertSame('prq_woocommerce_authorize_required', V2::connect($request)->get_error_code());
    }

    public function test_connect_rejects_incomplete_v2_configuration(): void
    {
        Functions\when('get_option')->justReturn(false);
        Functions\when('get_current_user_id')->justReturn(7);
        Functions\expect('add_option')->never();
        $request = new \WP_REST_Request(['mode' => 'v2', 'shop' => 'wc-ab12cd']);
        $request->set_route('/wc/v3/prq_set_token');
        $this->assertSame('prq_invalid_connection', V2::connect($request)->get_error_code());
    }
}
