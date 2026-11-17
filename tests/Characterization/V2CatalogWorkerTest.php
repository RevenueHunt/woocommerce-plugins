<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_V2 as V2;
use Product_Recommendation_Quiz_For_Ecommerce_V2_Catalog as Catalog;

#[\PHPUnit\Framework\Attributes\RunTestsInSeparateProcesses]
#[\PHPUnit\Framework\Attributes\PreserveGlobalState(false)]
final class V2CatalogWorkerTest extends TestCase
{
    private array $options = [];
    private array $cache = [];
    private array $notoptions = [];
    private array $hooks = [];
    private array $queued = [];
    private string $uploads;

    protected function setUp(): void
    {
        parent::setUp();
        $this->uploads = sys_get_temp_dir() . '/prq-worker-' . bin2hex(random_bytes(8));
        mkdir($this->uploads);
        // Model WP's per-request option and missing-option caches. Another request
        // can connect in the database without updating this worker's local cache.
        Functions\when('get_option')->alias(function ($key, $default = false) {
            if (isset($this->notoptions[$key])) return $default;
            if (isset($this->cache[$key])) return $this->cache[$key];
            if (isset($this->options[$key])) return $this->cache[$key] = $this->options[$key];
            $this->notoptions[$key] = true;
            return $default;
        });
        Functions\when('wp_cache_delete')->alias(function ($key, $group) {
            $this->assertSame('options', $group);
            if ($key === 'notoptions') $this->notoptions = [];
            else unset($this->cache[$key]);
            return true;
        });
        Functions\when('add_option')->alias(function ($key, $value) {
            if (isset($this->options[$key])) return false;
            $this->options[$key] = $value;
            return true;
        });
        Functions\when('update_option')->alias(function ($key, $value) {
            $this->options[$key] = $value;
            $this->cache[$key] = $value;
            return true;
        });
        Functions\when('delete_option')->alias(function ($key) {
            unset($this->options[$key], $this->cache[$key]);
            return true;
        });
        $GLOBALS['__prq_action_callbacks'] = [];
        $GLOBALS['__prq_filters'] = [];
        $this->hooks =& $GLOBALS['__prq_action_callbacks'];
        Functions\when('wp_upload_dir')->justReturn(['basedir' => $this->uploads]);
        Functions\when('as_schedule_single_action')->justReturn(1);
        Functions\when('as_enqueue_async_action')->alias(function ($hook, $args, $group) {
            $this->assertSame('prq', $group);
            $this->queued[] = [$hook, $args];
            return 2;
        });
    }

    protected function tearDown(): void
    {
        foreach (glob($this->uploads . '/*') as $path) unlink($path);
        rmdir($this->uploads);
        unset($GLOBALS['__prq_action_callbacks']);
        parent::tearDown();
    }

    private function runQueuedBatch(): void
    {
        $this->assertCount(1, $this->queued);
        [$hook, $args] = array_shift($this->queued);
        $this->assertSame('prq_v2_catalog_batch', $hook);
        $this->assertArrayHasKey($hook, $this->hooks, "Scheduled action for $hook will not be executed as no callbacks are registered.");
        foreach ($this->hooks[$hook] as $callback) $callback(...$args);
    }

    public function test_worker_booted_before_connect_runs_first_queued_export_with_fresh_connection(): void
    {
        (new V2())->run();
        $this->assertArrayHasKey(V2::OPTION, $this->notoptions);
        // Connect and first export happen in another request after this worker booted.
        $this->options[V2::OPTION] = [
            'mode' => 'v2', 'shop' => 'wc-worker', 'shared_secret' => str_repeat('s', 32),
            'api_url' => 'https://api.example.com', 'admin_url' => 'https://admin.example.com',
        ];
        $this->assertSame([], V2::connection(), 'This worker still caches the pre-connect miss.');
        $this->assertTrue((new Catalog())->start([]));
        $id = $this->options['prq_v2_catalog_active'];
        $path = $this->options['prq_v2_export_' . $id]['path'];
        Functions\when('get_woocommerce_currency')->justReturn('USD');
        Functions\when('get_locale')->justReturn('en_US');
        Functions\when('get_terms')->justReturn([]);
        Functions\when('wp_json_encode')->alias('json_encode');
        Functions\when('as_unschedule_all_actions')->justReturn(1);
        Functions\when('rest_url')->justReturn('https://shop.example/wp-json/prq/v3/catalog/download');
        Functions\when('add_query_arg')->justReturn('https://shop.example/signed-download');
        Functions\expect('wp_remote_post')->once()->with('https://api.example.com/api/woocommerce/catalog_ready', \Mockery::on(function ($args) {
            $this->assertSame('wc-worker', json_decode($args['body'], true)['shop']);
            return true;
        }))->andReturn(['response' => ['code' => 200]]);
        Functions\when('wp_remote_retrieve_response_code')->justReturn(200);

        $this->runQueuedBatch();

        $lines = file($path, FILE_IGNORE_NEW_LINES);
        $this->assertSame('<?php exit; __halt_compiler(); ?>', $lines[0]);
        $this->assertSame('rh-catalog', json_decode($lines[1], true)['format']);
        $this->assertSame(['type' => 'metafield_keys', 'keys' => []], json_decode($lines[2], true));
        $this->assertArrayHasKey('expires', $this->options['prq_v2_export_' . $id]);
        $this->assertArrayNotHasKey('prq_v2_catalog_active', $this->options);
        $this->assertSame(['prq_v2_catalog_nightly', 'prq_v2_catalog_batch', 'prq_v2_catalog_cleanup'], array_keys($this->hooks));
        $this->assertSame([], $GLOBALS['__prq_filters']);
    }

    public function test_queued_batch_without_any_connection_does_no_work(): void
    {
        (new V2())->run();
        $this->assertTrue((new Catalog())->start([]));
        $options = $this->options;
        Functions\expect('wp_remote_post')->never();
        Functions\expect('update_option')->never();

        $this->runQueuedBatch();

        $this->assertSame([], glob($this->uploads . '/*'));
        $this->assertSame($options, $this->options);
    }
}
