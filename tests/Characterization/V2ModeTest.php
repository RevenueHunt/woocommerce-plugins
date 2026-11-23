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
        Functions\when('get_locale')->justReturn('en_US');
        Functions\when('get_transient')->justReturn([]); // No advertised menu: retain the default launch URL.
        Functions\when('wp_generate_uuid4')->justReturn('c7e6e7c3-8e62-4c11-a59d-3bc880137d4f');
        Functions\when('wp_get_current_user')->justReturn((object) ['ID' => 7, 'user_email' => 'owner@example.com', 'display_name' => 'Ann']);
        $before = time();
        Functions\when('get_option')->alias(fn($name) => $name === 'prq_v2_connection' ? $connection : null); // No V1 shop: no operator capture.
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

    public function test_opening_the_v2_admin_captures_the_operator_once_a_day(): void
    {
        // A V1 shop switched to V2 keeps its hashid and API key: the admin who opens RevenueHunt becomes a contact.
        if (!defined('PRQ_API_URL')) { define('PRQ_API_URL', 'https://api.revenuehunt.com'); }
        if (!defined('PRQ_STORE_URL')) { define('PRQ_STORE_URL', 'example.com'); }
        $options = ['prq_v2_connection' => $this->connection(), 'rh_shop_hashid' => 'AbC123', 'rh_api_key' => 'k3y'];
        $transients = [];
        Functions\when('get_option')->alias(fn($name) => $options[$name] ?? null);
        Functions\when('get_transient')->alias(function ($name) use (&$transients) { return $transients[$name] ?? false; });
        Functions\when('set_transient')->alias(function ($name, $value) use (&$transients) { $transients[$name] = $value; return true; });
        Functions\when('is_user_logged_in')->justReturn(true);
        Functions\when('current_user_can')->justReturn(true);
        Functions\when('wp_get_current_user')->justReturn(new class { public $ID = 7; public $user_email = 'ann@example.com'; public $display_name = 'Ann'; public $roles = ['administrator']; public function exists() { return true; } });
        Functions\when('get_user_meta')->justReturn('');
        Functions\when('get_user_locale')->justReturn('en_US');
        Functions\when('get_locale')->justReturn('en_US');
        Functions\when('wp_json_encode')->alias('json_encode');
        Functions\when('wp_generate_uuid4')->justReturn('c7e6e7c3-8e62-4c11-a59d-3bc880137d4f');
        $posts = [];
        Functions\when('wp_remote_post')->alias(function ($url, $args) use (&$posts) { $posts[] = [$url, json_decode($args['body'], true)]; return []; });

        $builder = new \Product_Recommendation_Quiz_For_Ecommerce_Admin_Oauth_Url_Builder();
        $this->assertStringStartsWith('https://admin.example.com/auth/woocommerce?token=', $builder->prquiz_get_oauth_url());
        $builder->prquiz_get_oauth_url();

        $this->assertCount(1, $posts);
        [$url, $body] = $posts[0];
        $this->assertSame('https://api.revenuehunt.com/api/v1/woocommerce/operator_capture', $url);
        $this->assertSame('AbC123', $body['shop_hashid']);
        $this->assertSame('ann@example.com', $body['operator']['email']);
        $data = sprintf('purpose=operator_capture&hashid=AbC123&domain=example.com&plugin_version=%s&timestamp=%s&operator_email=ann@example.com', PRQ_PLUGIN_VERSION, $body['timestamp']);
        $this->assertSame(base64_encode(hash_hmac('sha256', $data, 'k3y', true)), $body['hmac']);
    }

    #[\PHPUnit\Framework\Attributes\RunInSeparateProcess]
    #[\PHPUnit\Framework\Attributes\PreserveGlobalState(false)]
    public function test_catalog_ready_request_matches_independent_fixed_signature_vector(): void
    {
        $connection = array_replace($this->connection(), ['shop' => 'wc-test', 'shared_secret' => 'prq-v2-test-secret']);
        $state = ['expires' => 1700003600, 'products' => 42];
        Functions\when('wp_cache_delete')->justReturn(true);
        Functions\when('time')->justReturn(1700000000);
        Functions\when('get_option')->alias(fn($key) => $key === V2::OPTION ? $connection : $state);
        Functions\when('rest_url')->justReturn('https://shop.example/wp-json/prq/v3/catalog/download');
        Functions\expect('add_query_arg')->once()->with(\Mockery::type('array'), 'https://shop.example/wp-json/prq/v3/catalog/download')->andReturn('https://shop.example/wp-json/prq/v3/catalog/download?x=1');
        Functions\when('wp_json_encode')->alias('json_encode');
        $body = '{"shop":"wc-test","url":"https:\/\/shop.example\/wp-json\/prq\/v3\/catalog\/download?x=1","expires_at":1700003600,"products":42}';
        $expected = 'c28b5508860cdf47b5b058bad09325fd88199a914514ab3d269223244ad11657';
        $this->assertSame($expected, hash_hmac('sha256', "1700000000\nPOST\n/api/woocommerce/catalog_ready\n\n" . $body, 'prq-v2-test-secret'));
        Functions\expect('wp_remote_post')->once()->with('https://api.example.com/api/woocommerce/catalog_ready', \Mockery::on(function ($args) use ($body, $expected) {
            $this->assertSame($body, $args['body']);
            $this->assertSame('1700000000', $args['headers']['X-PRQ-Timestamp']);
            $this->assertSame('application/json', $args['headers']['Content-Type']);
            $this->assertSame('sha256=' . $expected, $args['headers']['X-PRQ-Signature']);
            return true;
        }))->andReturn(['response' => ['code' => 200]]);
        Functions\when('wp_remote_retrieve_response_code')->justReturn(200);
        (new Catalog())->batch(str_repeat('a', 48));
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
        $this->assertSame([['prq/v3', '/catalog/export', 'POST'], ['prq/v3', '/catalog/download', 'GET'], ['prq/v3', '/orders', 'GET'], ['prq/v3', '/quizzes/(?P<sqid>[A-Za-z0-9]+)', 'PUT'], ['prq/v3', '/quizzes/(?P<sqid>[A-Za-z0-9]+)', 'DELETE'], ['prq/v3', '/assistants/(?P<sqid>[A-Za-z0-9]+)', 'PUT'], ['prq/v3', '/assistants/(?P<sqid>[A-Za-z0-9]+)', 'DELETE'], ['prq/v3', '/storefront', 'PUT'], ['prq/v3', '/storefront', 'GET']], $routes);
        // Cached storefront output must not contain a Store API nonce.
        $source = file_get_contents(dirname(__DIR__, 2) . '/src/front/class-product-recommendation-quiz-for-ecommerce-front-embed-script.php');
        $this->assertStringNotContainsString('wp_create_nonce', $source);
    }

    #[\PHPUnit\Framework\Attributes\RunInSeparateProcess]
    #[\PHPUnit\Framework\Attributes\PreserveGlobalState(false)]
    public function test_v2_shortcode_and_block_enqueue_local_module_only_when_rendering_mount(): void
    {
        Functions\when('get_option')->alias(fn($key, $default = false) => $key === V2::OPTION ? $this->connection() : $default);
        Functions\when('plugins_url')->justReturn('https://shop.example/plugins/prq/assets/v2/quiz-renderer.js');
        Functions\expect('wp_enqueue_script_module')->once()->with('prq-v2-quiz-renderer', 'https://shop.example/plugins/prq/assets/v2/quiz-renderer.js', [], PRQ_PLUGIN_VERSION);
        Functions\when('esc_attr')->alias(fn($s) => htmlspecialchars($s, ENT_QUOTES));
        Functions\when('shortcode_atts')->alias(fn($defaults, $atts) => array_merge($defaults, $atts));
        Functions\expect('wp_enqueue_script')->never();
        Functions\expect('wp_localize_script')->never();
        $delivery = \Product_Recommendation_Quiz_For_Ecommerce_Delivery_Resolver::resolve('prq', PRQ_PLUGIN_VERSION);
        $expected = '<div data-prq-quiz="quiz123" data-prq-height="600px"></div>';
        $this->assertSame($expected, (new \Product_Recommendation_Quiz_For_Ecommerce_Front_Shortcode($delivery))->render_shortcode(['id' => 'quiz123']));
        $this->assertSame($expected, (new \Product_Recommendation_Quiz_For_Ecommerce_Front_Block($delivery))->render_block(['id' => 'quiz123']));
        $this->assertSame('<div data-prq-quiz="" data-prq-height="600px"></div>', $delivery->render([]));
        (new \Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Script('prq', PRQ_PLUGIN_VERSION))->enqueue_scripts();
    }

    #[\PHPUnit\Framework\Attributes\RunInSeparateProcess]
    #[\PHPUnit\Framework\Attributes\PreserveGlobalState(false)]
    public function test_v2_mount_uses_module_tag_filter_before_wordpress_65(): void
    {
        $this->assertFalse(function_exists('wp_enqueue_script_module'));
        Functions\when('get_option')->justReturn($this->connection());
        Functions\when('esc_attr')->alias(fn($s) => htmlspecialchars($s, ENT_QUOTES));
        Functions\when('plugins_url')->justReturn('https://shop.example/plugins/prq/assets/v2/quiz-renderer.js');
        Functions\expect('wp_enqueue_script')->once()->with('prq-v2-quiz-renderer', 'https://shop.example/plugins/prq/assets/v2/quiz-renderer.js', [], PRQ_PLUGIN_VERSION, true);
        $delivery = new \Product_Recommendation_Quiz_For_Ecommerce_V2_Delivery();
        $this->assertSame('<div data-prq-quiz="quiz123" data-prq-height="600px"></div>', $delivery->render(['id' => 'quiz123']));
        $tag = '<script type="text/javascript" src="https://shop.example/plugins/prq/assets/v2/quiz-renderer.js"></script>';
        $this->assertSame('<script type="module" src="https://shop.example/plugins/prq/assets/v2/quiz-renderer.js"></script>', $delivery->module_tag($tag, 'prq-v2-quiz-renderer'));
        $this->assertSame($tag, $delivery->module_tag($tag, 'unrelated'));
        $this->assertContains('script_loader_tag', $GLOBALS['__prq_filters']);
    }

    #[\PHPUnit\Framework\Attributes\RunInSeparateProcess]
    #[\PHPUnit\Framework\Attributes\PreserveGlobalState(false)]
    #[\PHPUnit\Framework\Attributes\TestWith([false, null, false], 'fresh store')]
    #[\PHPUnit\Framework\Attributes\TestWith(['ab12cd', null, true], 'matching V1 store')]
    #[\PHPUnit\Framework\Attributes\TestWith(['ab12cd', 'prq_v2_quizzes', false], 'switch again with a published quiz')]
    #[\PHPUnit\Framework\Attributes\TestWith(['ab12cd', 'prq_v2_assistants', false], 'switch again with a published assistant')]
    public function test_connect_stores_credentials_and_rotates_native_order_webhooks_on_retry($hashid, ?string $index, bool $held): void
    {
        $stored = false;
        $options = [PRQ_OPTION_SHOP_HASHID => $hashid];
        if ($index !== null) {
            $options[$index] = ['A1' => ['version' => 'v1']];
        }
        $deleted = [];
        $connection = $this->connection();
        $rotated = array_replace($connection, ['shared_secret' => str_repeat('r', 32)]);
        $store = function ($key, $value) use (&$stored) { $stored = $value; return true; };
        Functions\when('get_option')->alias(function ($key, $default = false) use (&$stored, &$options) {
            return $key === V2::OPTION ? $stored : ($options[$key] ?? $default);
        });
        Functions\when('wp_http_validate_url')->returnArg();
        Functions\when('wp_parse_url')->alias('parse_url');
        Functions\when('untrailingslashit')->alias(fn($s) => rtrim($s, '/'));
        Functions\expect('add_option')->once()->with(V2::OPTION, $connection, '', false)->andReturnUsing($store);
        Functions\expect('add_option')->with('prq_v1_storefront', 1, '', true)->times((int) $held)->andReturnUsing(function ($key, $value) use (&$options) {
            $options[$key] = $value;
            return true;
        });
        Functions\when('get_current_user_id')->justReturn(7);
        Functions\expect('update_option')->once()->with(V2::OPTION, $connection + ['webhook_ids' => [41, 42]], false)->andReturnUsing($store);
        Functions\expect('update_option')->once()->with(V2::OPTION, $rotated, false)->andReturnUsing(function ($key, $value) use (&$deleted, $store) {
            $this->assertSame([41, 42], $deleted);
            return $store($key, $value);
        });
        Functions\expect('update_option')->once()->with(V2::OPTION, $rotated + ['webhook_ids' => [43, 44]], false)->andReturnUsing($store);
        $webhook = \Mockery::mock('overload:WC_Webhook');
        $topics = [];
        $secrets = [];
        $webhook->shouldReceive('set_name')->once();
        $webhook->shouldReceive('set_topic')->once()->andReturnUsing(function ($topic) use (&$topics) { $topics[] = $topic; });
        $webhook->shouldReceive('set_delivery_url')->once()->with('https://api.example.com/api/woocommerce/orders');
        $oldSecret = hash_hmac('sha256', 'prq-v2-webhook', $connection['shared_secret']);
        $newSecret = hash_hmac('sha256', 'prq-v2-webhook', $rotated['shared_secret']);
        $webhook->shouldReceive('set_secret')->once()->andReturnUsing(function ($secret) use (&$secrets) { $secrets[] = $secret; });
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
        $this->assertSame([$oldSecret, $oldSecret], $secrets);
        $this->assertSame($held ? 1 : false, get_option('prq_v1_storefront'));
        $this->assertSame($held ? [] : $stored, V2::storefront());

        // The REST controller saves the hashid after connect() even for a fresh store.
        $options[PRQ_OPTION_SHOP_HASHID] = 'ab12cd';
        $oldWebhooks = [];
        foreach ([41, 42] as $id) {
            $oldWebhooks[$id] = \Mockery::mock();
            $oldWebhooks[$id]->shouldReceive('delete')->once()->with(true)->andReturnUsing(function () use (&$deleted, $id) { $deleted[] = $id; });
        }
        Functions\when('wc_get_webhook')->alias(fn($id) => $oldWebhooks[$id] ?? false);
        $retry = new \WP_REST_Request($rotated);
        $retry->set_route('/wc/v3/prq_set_token');
        $this->assertTrue(V2::connect($retry));
        $this->assertSame($rotated + ['webhook_ids' => [43, 44]], $stored);
        $this->assertSame(['order.created', 'order.updated', 'order.created', 'order.updated'], $topics);
        $this->assertSame([$oldSecret, $oldSecret, $newSecret, $newSecret], $secrets);
        $this->assertSame($held ? 1 : false, get_option('prq_v1_storefront'));
    }

    #[\PHPUnit\Framework\Attributes\TestWith(['existing'], 'existing V1 store')]
    #[\PHPUnit\Framework\Attributes\TestWith([false], 'existing V2 connection')]
    public function test_connect_refuses_a_different_woo_shop($hashid): void
    {
        $stored = $hashid ? false : ['shop' => 'wc-existing'] + $this->connection();
        Functions\when('get_option')->alias(fn($key) => $key === PRQ_OPTION_SHOP_HASHID ? $hashid : $stored);
        Functions\expect('add_option')->never();
        Functions\expect('update_option')->never();
        Functions\when('get_current_user_id')->justReturn(7);
        $request = new \WP_REST_Request($this->connection());
        $request->set_route('/wc/v3/prq_set_token');
        $error = V2::connect($request);
        $this->assertInstanceOf(\WP_Error::class, $error);
        $this->assertSame(403, $error->get_error_data()['status']);
    }

    #[\PHPUnit\Framework\Attributes\TestWith(['v1'])]
    #[\PHPUnit\Framework\Attributes\TestWith(['v2'])]
    public function test_mode_change_requires_authenticated_woocommerce_manager_without_legacy_fallthrough(string $mode): void
    {
        $controller = new \Product_Recommendation_Quiz_For_Ecommerce_Rest_Set_Token_Controller();
        $request = new \WP_REST_Request(['mode' => $mode]);
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

    #[\PHPUnit\Framework\Attributes\TestWith([false], 'fresh store')]
    #[\PHPUnit\Framework\Attributes\TestWith([true], 'existing V2 connection')]
    public function test_connect_rejects_incomplete_v2_configuration(bool $connected): void
    {
        Functions\when('get_option')->alias(fn($key) => $key === V2::OPTION && $connected ? $this->connection() : false);
        Functions\when('get_current_user_id')->justReturn(7);
        Functions\expect('add_option')->never();
        Functions\expect('update_option')->never();
        $request = new \WP_REST_Request(['mode' => 'v2', 'shop' => 'wc-ab12cd']);
        $request->set_route('/wc/v3/prq_set_token');
        $this->assertSame('prq_invalid_connection', V2::connect($request)->get_error_code());
    }
}
