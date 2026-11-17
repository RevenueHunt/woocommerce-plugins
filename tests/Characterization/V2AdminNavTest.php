<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Admin_Menu as Menu;
use Product_Recommendation_Quiz_For_Ecommerce_V2_Admin_Nav as Nav;

final class V2AdminNavTest extends TestCase
{
    private array $getBefore;

    protected function setUp(): void
    {
        parent::setUp();
        $this->newRequest();
        $this->getBefore = $_GET;
        $_GET = [];
        if (!defined('DAY_IN_SECONDS')) define('DAY_IN_SECONDS', 86400);
        Functions\when('get_option')->justReturn(['mode' => 'v2', 'admin_url' => 'https://admin.example.com/v2']);
        Functions\when('get_locale')->justReturn('en_US');
        Functions\when('esc_html')->alias(fn($text) => htmlspecialchars($text, ENT_QUOTES));
        Functions\when('wp_remote_retrieve_response_code')->alias(fn($response) => $response['response']['code']);
        Functions\when('wp_remote_retrieve_body')->alias(fn($response) => $response['body']);
    }

    protected function tearDown(): void
    {
        $_GET = $this->getBefore;
        $this->newRequest();
        parent::tearDown();
    }

    /** Simulate PHP clearing request-local statics without adding a production reset API. */
    private function newRequest(): void
    {
        (new \ReflectionProperty(Nav::class, 'request_items'))->setValue(null, []);
    }

    private function items(): array
    {
        return [['path' => '/home', 'label' => 'Home'], ['path' => '/quizzes', 'label' => 'Quizzes'], ['path' => '/assistants', 'label' => 'Assistants']];
    }

    public function test_v2_submenus_follow_the_fetched_list_and_cache_it_for_a_day(): void
    {
        $cached = false;
        Functions\when('get_transient')->alias(function () use (&$cached) { return $cached; });
        Functions\expect('set_transient')->once()->with(\Mockery::type('string'), $this->items(), DAY_IN_SECONDS)
            ->andReturnUsing(function ($key, $items) use (&$cached) { $cached = $items; return true; });
        Functions\expect('wp_remote_get')->once()->with('https://admin.example.com/v2/api/admin-nav?platform=woocommerce&locale=en_US', \Mockery::on(fn($args) => $args['timeout'] <= 3))
            ->andReturn(['response' => ['code' => 200], 'body' => json_encode(['items' => $this->items()])]);
        Functions\expect('add_menu_page')->once();
        $submenus = [];
        Functions\when('add_submenu_page')->alias(function (...$args) use (&$submenus) { $submenus[] = $args; });
        (new Menu('prq', 'test'))->my_plugin_menu();
        (new \Product_Recommendation_Quiz_For_Ecommerce_Admin_Embeds_Page())->add_menu();
        $this->assertSame(['Home', 'Quizzes', 'Assistants'], array_column($submenus, 2));
        $this->assertSame(['prqfw', 'prqfw&path=%2Fquizzes', 'prqfw&path=%2Fassistants'], array_column($submenus, 4));
        foreach ($submenus as $args) {
            $this->assertSame('prqfw', $args[0]);
            $this->assertSame('manage_options', $args[3]);
            $this->assertSame('prquiz_options', $args[5][1]);
        }
        $this->assertSame($this->items(), Nav::items()); // Cache hit, no second HTTP call.
    }

    public function test_failed_fetch_is_memoized_and_the_next_request_uses_the_short_failure_cache(): void
    {
        $cached = false;
        $key = 'prq_v2_admin_nav_' . md5('https://admin.example.com/v2|en_US');
        Functions\expect('get_transient')->twice()->with($key)
            ->andReturnUsing(function () use (&$cached) { return $cached; });
        Functions\expect('set_transient')->once()->with($key, [], 5 * MINUTE_IN_SECONDS)
            ->andReturnUsing(function ($key, $items) use (&$cached) { $cached = $items; return true; });
        Functions\expect('wp_remote_get')->once()->andReturn(new \WP_Error('timeout', 'Request timed out'));
        $this->assertSame([], Nav::items());
        $this->assertSame([], Nav::items());
        $this->assertSame([], Nav::items());
        $this->newRequest();
        $this->assertSame([], Nav::items());
        $this->assertSame([], Nav::items());
    }

    #[\PHPUnit\Framework\Attributes\DataProvider('unavailableLists')]
    public function test_fetch_failure_or_invalid_list_keeps_only_the_main_item($response): void
    {
        Functions\when('get_transient')->justReturn(false);
        Functions\expect('wp_remote_get')->once()->andReturn($response);
        Functions\expect('add_menu_page')->once();
        Functions\expect('add_submenu_page')->never();
        Functions\expect('set_transient')->once()->with(\Mockery::type('string'), [], 5 * MINUTE_IN_SECONDS);
        (new Menu('prq', 'test'))->my_plugin_menu();
    }

    public static function unavailableLists(): array
    {
        return [
            'network' => [new \WP_Error('timeout', 'Request timed out')],
            'status' => [['response' => ['code' => 503], 'body' => 'unavailable']],
            'path' => [['response' => ['code' => 200], 'body' => '{"items":[{"path":"https://other.example/","label":"Home"}]}']],
            'markup' => [['response' => ['code' => 200], 'body' => '{"items":[{"path":"/home","label":"<b>Home</b>"}]}']],
        ];
    }

    public function test_v1_keeps_its_original_main_and_display_menu_without_fetching(): void
    {
        Functions\when('get_option')->justReturn(false);
        Functions\expect('wp_remote_get')->never();
        Functions\expect('add_menu_page')->once();
        Functions\expect('add_submenu_page')->once()->with('prqfw', 'Display', 'Display', 'manage_options', 'prqfw-display', \Mockery::type('array'));
        (new Menu('prq', 'test'))->my_plugin_menu();
        (new \Product_Recommendation_Quiz_For_Ecommerce_Admin_Embeds_Page())->add_menu();
    }

    #[\PHPUnit\Framework\Attributes\DataProvider('destinations')]
    public function test_launch_to_is_only_an_exact_advertised_path($path, ?string $expected): void
    {
        $_GET['path'] = $path;
        Functions\when('get_transient')->justReturn($this->items());
        Functions\when('get_option')->justReturn(['mode' => 'v2', 'admin_url' => 'https://admin.example.com/v2', 'shop' => 'wc-demo', 'shared_secret' => str_repeat('s', 32)]);
        Functions\when('wp_json_encode')->alias('json_encode');
        Functions\when('wp_generate_uuid4')->justReturn('test-jti');
        Functions\when('wp_get_current_user')->justReturn((object) ['ID' => 1, 'user_email' => 'admin@example.test', 'display_name' => 'Admin']);
        $url = (new \Product_Recommendation_Quiz_For_Ecommerce_Admin_Oauth_Url_Builder())->prquiz_get_oauth_url();
        parse_str(parse_url($url, PHP_URL_QUERY), $query);
        $this->assertSame($expected, $query['to'] ?? null);
    }

    public static function destinations(): array
    {
        return [['/assistants', '/assistants'], ['/not-advertised', null], ['<b>/assistants</b>', null], [['/assistants'], null]];
    }
}
