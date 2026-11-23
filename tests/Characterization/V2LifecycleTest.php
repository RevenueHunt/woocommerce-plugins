<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_V2 as V2;

#[\PHPUnit\Framework\Attributes\RunTestsInSeparateProcesses]
#[\PHPUnit\Framework\Attributes\PreserveGlobalState(false)]
final class V2LifecycleTest extends TestCase
{
    private array $options;
    private string $uploads;

    protected function setUp(): void
    {
        parent::setUp();
        $this->options = [V2::OPTION => [
            'mode' => 'v2', 'shop' => 'wc-lifecycle', 'shared_secret' => 'synthetic-lifecycle-shared-secret',
            'api_url' => 'https://api.example.com', 'admin_url' => 'https://admin.example.com',
            'webhook_ids' => [41, 42],
        ]];
        $this->uploads = sys_get_temp_dir() . '/prq-lifecycle-' . bin2hex(random_bytes(8));
        mkdir($this->uploads);
        Functions\when('get_option')->alias(fn($key, $default = false) => $this->options[$key] ?? $default);
        Functions\when('delete_option')->alias(function ($key) { unset($this->options[$key]); return true; });
        Functions\when('wp_cache_delete')->justReturn(true);
        Functions\when('wp_upload_dir')->justReturn(['basedir' => $this->uploads]);
        Functions\when('wp_delete_file')->alias('unlink');
        Functions\when('wp_json_encode')->alias('json_encode');
        $db = \Mockery::mock();
        $db->options = 'wp_options';
        $db->shouldReceive('esc_like')->with('prq_v2_export_')->andReturn('prq\\_v2\\_export\\_');
        $db->shouldReceive('esc_like')->with('prq_v2_download_')->andReturn('prq\\_v2\\_download\\_');
        $db->shouldReceive('prepare')->with('SELECT option_name FROM wp_options WHERE option_name LIKE %s OR option_name LIKE %s', 'prq\\_v2\\_export\\_%', 'prq\\_v2\\_download\\_%')->andReturn('prepared export lookup');
        $db->shouldReceive('get_col')->with('prepared export lookup')->andReturnUsing(fn() => array_values(array_filter(array_keys($this->options), fn($key) => str_starts_with($key, 'prq_v2_export_') || str_starts_with($key, 'prq_v2_download_'))));
        $GLOBALS['wpdb'] = $db;
    }

    protected function tearDown(): void
    {
        foreach (glob($this->uploads . '/*') as $path) unlink($path);
        rmdir($this->uploads);
        unset($GLOBALS['wpdb']);
        parent::tearDown();
    }

    private function webhooks(string $status, bool $delete = false): array
    {
        $webhooks = [];
        foreach ([41, 42] as $id) {
            $webhook = \Mockery::mock('WC_Webhook');
            $webhook->shouldReceive('set_status')->once()->with($status);
            $webhook->shouldReceive('save')->once();
            if ($delete) $webhook->shouldReceive('delete')->once()->with(true);
            $webhooks[$id] = $webhook;
        }
        Functions\when('wc_get_webhook')->alias(fn($id) => $webhooks[$id] ?? false);
        return $webhooks;
    }

    private function unschedule(): void
    {
        Functions\expect('as_unschedule_all_actions')->once()->with('', [], 'prq');
        // Woo's queued delivery bypasses its paused-status check. Cancel only ours.
        $ours = \Mockery::mock();
        $ours->shouldReceive('get_args')->andReturn(['webhook_id' => 41, 'arg' => 123]);
        $other = \Mockery::mock();
        $other->shouldReceive('get_args')->andReturn(['webhook_id' => 99, 'arg' => 456]);
        Functions\when('as_get_scheduled_actions')->justReturn([$ours, $other]);
        Functions\expect('as_unschedule_all_actions')->with('woocommerce_deliver_webhook_async', ['webhook_id' => 41, 'arg' => 123], 'woocommerce-webhooks')->atLeast()->once();
    }

    private function export(): string
    {
        $id = str_repeat('a', 48);
        $path = $this->uploads . '/prq-catalog-' . $id . '.php';
        file_put_contents($path, "<?php exit; __halt_compiler(); ?>\n{\"format\":\"rh-catalog\"}\n");
        $this->options['prq_v2_export_' . $id] = ['path' => $path];
        $this->options['prq_v2_download_' . $id] = true;
        $this->options['prq_v2_catalog_active'] = $id;
        $this->options['prq_v2_picked_metafields'] = ['spf'];
        return $path;
    }

    public function test_deactivate_unschedules_and_pauses_without_losing_connection(): void
    {
        $connection = $this->options[V2::OPTION];
        $this->webhooks('paused');
        $this->unschedule();
        $path = $this->export();
        \Product_Recommendation_Quiz_For_Ecommerce_Deactivator::deactivate();
        $this->assertFileDoesNotExist($path);
        $this->assertSame([V2::OPTION, 'prq_v2_picked_metafields'], array_keys($this->options));
        $this->assertSame($connection, $this->options[V2::OPTION]);
    }

    public function test_mode_v1_removes_connection_and_order_webhooks_but_preserves_shop_data(): void
    {
        $this->webhooks('paused', true);
        $this->unschedule();
        $path = $this->export();
        $this->options[PRQ_OPTION_SHOP_HASHID] = 'lifecycle';
        $this->options[PRQ_OPTION_API_KEY] = 'legacy-key';
        $this->options['prq_v1_storefront'] = 1;
        $this->options['prq_v2_quizzes'] = ['quiz123'];
        Functions\when('get_current_user_id')->justReturn(7);
        Functions\when('get_transient')->justReturn(false);
        Functions\when('set_transient')->justReturn(true);
        Functions\expect('update_option')->never();
        $controller = new \Product_Recommendation_Quiz_For_Ecommerce_Rest_Set_Token_Controller();
        $request = new \WP_REST_Request(['mode' => 'v1', 'shop_hashid' => 'lifecycle']);
        $request->set_route('/wc/v3/prq_set_token');

        $this->assertSame('lifecycle', $controller->handle($request));
        $this->assertSame('lifecycle', $controller->handle($request));
        $this->assertFileDoesNotExist($path);
        $this->assertSame([
            'prq_v2_picked_metafields' => ['spf'],
            PRQ_OPTION_SHOP_HASHID => 'lifecycle',
            PRQ_OPTION_API_KEY => 'legacy-key',
            'prq_v2_quizzes' => ['quiz123'],
        ], $this->options);
    }

    public function test_mode_v1_refuses_a_different_shop_or_the_legacy_route(): void
    {
        $this->options[PRQ_OPTION_SHOP_HASHID] = 'lifecycle';
        $options = $this->options;
        Functions\when('get_current_user_id')->justReturn(7);
        Functions\when('get_transient')->justReturn(false);
        Functions\when('set_transient')->justReturn(true);
        $controller = new \Product_Recommendation_Quiz_For_Ecommerce_Rest_Set_Token_Controller();

        foreach (['/wc/v3/prq_set_token' => 'other', '/prq/v1/settoken' => 'lifecycle'] as $route => $hashid) {
            $request = new \WP_REST_Request(['mode' => 'v1', 'shop_hashid' => $hashid]);
            $request->set_route($route);
            $error = $controller->handle($request);
            $this->assertInstanceOf(\WP_Error::class, $error);
            $this->assertSame(403, $error->get_error_data()['status']);
            $this->assertSame($options, $this->options);
        }
    }

    public function test_reactivate_resumes_and_reschedules_nightly(): void
    {
        $this->webhooks('active');
        Functions\when('as_has_scheduled_action')->justReturn(false);
        Functions\when('wp_timezone')->justReturn(new \DateTimeZone('UTC'));
        Functions\when('add_option')->justReturn(true);
        Functions\expect('as_schedule_single_action')->once()->with(\Mockery::on(function ($timestamp) {
            $this->assertSame('03:00', gmdate('H:i', $timestamp));
            return $timestamp > time();
        }), 'prq_v2_catalog_nightly', [], 'prq');
        \Product_Recommendation_Quiz_For_Ecommerce_Activator::activate();
        $this->assertArrayHasKey(V2::OPTION, $this->options);
    }

    #[\PHPUnit\Framework\Attributes\TestWith([1], 'active hold')]
    #[\PHPUnit\Framework\Attributes\TestWith(['ended'], 'ended hold')]
    public function test_uninstall_deletes_owned_data_and_attempts_signed_notice_despite_http_failure($hold): void
    {
        $this->webhooks('paused', true);
        $this->unschedule();
        $path = $this->export();
        // A similarly named file is not ours; never delete arbitrary upload paths.
        file_put_contents($this->uploads . '/prq-catalog-unrelated.php', 'unrelated');
        $connection = $this->options[V2::OPTION];
        $this->options['prq_v1_storefront'] = $hold;
        foreach (['rh_shop_hashid', 'rh_api_key', 'rh_domain', 'rh_token'] as $key) $this->options[$key] = 'legacy';
        Functions\expect('wp_remote_post')->once()->with('https://api.example.com/api/woocommerce/uninstalled', \Mockery::on(function ($args) use ($connection, $path) {
            $this->assertFileDoesNotExist($path);
            $this->assertArrayNotHasKey(V2::OPTION, $this->options);
            $this->assertSame('{"shop":"wc-lifecycle"}', $args['body']);
            $this->assertSame(3, $args['timeout']);
            $this->assertSame(0, $args['redirection']);
            $this->assertSame('application/json', $args['headers']['Content-Type']);
            $timestamp = $args['headers']['X-PRQ-Timestamp'];
            $this->assertLessThanOrEqual(1, abs(time() - (int) $timestamp));
            $this->assertSame('sha256=' . hash_hmac('sha256', "$timestamp\nPOST\n/api/woocommerce/uninstalled\n\n" . $args['body'], $connection['shared_secret']), $args['headers']['X-PRQ-Signature']);
            return true;
        }))->andReturn(new \WP_Error('http_request_failed', 'Timed out'));
        if (!defined('WP_UNINSTALL_PLUGIN')) define('WP_UNINSTALL_PLUGIN', true);
        require dirname(__DIR__, 2) . '/src/uninstall.php';
        $this->assertSame([], $this->options);
        $this->assertFileExists($this->uploads . '/prq-catalog-unrelated.php');
    }

    public function test_missing_stored_id_never_claims_same_url_webhook_or_its_deliveries(): void
    {
        // Stored IDs are [41, 42], but 42 was deleted independently.
        $owned = \Mockery::mock('WC_Webhook');
        $owned->shouldReceive('get_delivery_url')->andReturn('https://api.example.com/api/woocommerce/orders');
        $owned->shouldReceive('set_status')->with('paused')->twice();
        $owned->shouldReceive('set_status')->with('active')->once();
        $owned->shouldReceive('save')->times(3);
        $owned->shouldReceive('delete')->with(true)->once();
        $other = \Mockery::mock('WC_Webhook');
        $other->shouldReceive('get_delivery_url')->andReturn('https://api.example.com/api/woocommerce/orders');
        $other->shouldReceive('set_status')->never();
        $other->shouldReceive('save')->never();
        $other->shouldReceive('delete')->never();
        Functions\when('wc_get_webhook')->alias(fn($id) => [41 => $owned, 99 => $other][$id] ?? false);
        $store = \Mockery::mock('overload:WC_Webhook_Data_Store');
        $store->shouldReceive('get_webhooks_ids')->andReturn([41, 42, 99]);

        $actions = [];
        foreach ([41, 99] as $id) {
            $actions[$id] = \Mockery::mock();
            $actions[$id]->shouldReceive('get_args')->andReturn(['webhook_id' => $id, 'arg' => 123]);
        }
        $pending = $actions;
        $canceled = [];
        Functions\when('as_get_scheduled_actions')->alias(function () use (&$pending) { return array_values($pending); });
        Functions\when('as_unschedule_all_actions')->alias(function ($hook, $args, $group) use (&$pending, &$canceled) {
            if ($hook === 'woocommerce_deliver_webhook_async') {
                $this->assertSame('woocommerce-webhooks', $group);
                $this->assertSame(41, $args['webhook_id']);
                $canceled[] = $args['webhook_id'];
                unset($pending[$args['webhook_id']]);
            }
        });
        Functions\when('as_has_scheduled_action')->justReturn(true);
        Functions\when('add_option')->justReturn(true);
        Functions\expect('wp_remote_post')->once()->andReturn(['response' => ['code' => 500]]);

        \Product_Recommendation_Quiz_For_Ecommerce_Deactivator::deactivate();
        $this->assertSame([99], array_keys($pending));
        \Product_Recommendation_Quiz_For_Ecommerce_Activator::activate();
        $this->assertSame([99], array_keys($pending));
        $pending[41] = $actions[41];
        V2::uninstall();
        $this->assertSame([99], array_keys($pending));
        $this->assertSame([41, 41], $canceled);
        $this->assertSame([], $this->options);
    }
}
