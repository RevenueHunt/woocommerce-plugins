<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_V2 as V2;
use Product_Recommendation_Quiz_For_Ecommerce_V2_Brand as Brand;

final class V2BrandTest extends TestCase
{
    public function test_brand_route_is_read_only_and_uses_the_signed_permission_callback(): void
    {
        $v2 = new V2();
        Functions\when('get_option')->justReturn(['mode' => 'v2', 'shared_secret' => 'prq-v2-test-secret']);
        $routes = [];
        Functions\when('register_rest_route')->alias(function ($namespace, $path, $args) use (&$routes) {
            if ($path === '/brand') {
                $routes[] = [$namespace, $args];
            }
        });
        $v2->register_routes();
        $this->assertCount(1, $routes);
        [$namespace, $route] = $routes[0];
        $this->assertSame('prq/v3', $namespace);
        $this->assertSame('GET', $route['methods']);
        $this->assertInstanceOf(Brand::class, $route['callback'][0]);
        $this->assertSame('get_brand', $route['callback'][1]);
        $this->assertSame([$v2, 'authorize'], $route['permission_callback']);

        $timestamp = (string) time();
        $request = \Mockery::mock(\WP_REST_Request::class);
        $request->shouldReceive('get_method')->andReturn('GET');
        $request->shouldReceive('get_route')->andReturn('/prq/v3/brand');
        $request->shouldReceive('get_query_params')->andReturn([]);
        $request->shouldReceive('get_body')->andReturn('');
        $request->shouldReceive('get_header')->with('X-PRQ-Timestamp')->andReturn($timestamp);
        $request->shouldReceive('get_header')->with('X-PRQ-Signature')->andReturn('', 'sha256=' . hash_hmac('sha256', "$timestamp\nGET\n/prq/v3/brand\n\n", 'prq-v2-test-secret'));
        $this->assertSame(403, call_user_func($route['permission_callback'], $request)->get_error_data()['status']);
        $this->assertTrue(call_user_func($route['permission_callback'], $request));
    }

    public function test_block_theme_resolves_palette_and_font_presets_and_falls_back_to_the_site_icon(): void
    {
        Functions\when('get_option')->alias(fn($key) => ['blogname' => '  <b>Fern &amp; Field</b>  ', 'blogdescription' => "  Skincare that\nlistens  "][$key] ?? false);
        Functions\when('wp_is_block_theme')->justReturn(true);
        Functions\when('wp_get_global_settings')->justReturn([
            'color' => ['palette' => [
                'default' => [['slug' => 'paper', 'color' => '#FFF']],
                'theme' => [['slug' => 'paper', 'color' => '#FBF7F2'], ['slug' => 'clay', 'color' => '#AA5533']],
                'custom' => [['slug' => 'clay', 'color' => '#C26A52']],
            ]],
            'typography' => ['fontFamilies' => ['theme' => [['slug' => 'dm-sans', 'fontFamily' => '"DM Sans", sans-serif']]]],
        ]);
        Functions\when('wp_get_global_styles')->justReturn([
            'color' => ['background' => 'var(--wp--preset--color--paper)', 'text' => '#321'],
            'elements' => [
                'link' => ['color' => ['text' => 'var:preset|color|clay']],
                'button' => ['color' => ['background' => '#633']],
                'heading' => ['typography' => ['fontFamily' => '"Cormorant", serif']],
            ],
            'typography' => ['fontFamily' => 'var:preset|font-family|dm-sans'],
        ]);
        Functions\expect('get_theme_mod')->once()->with('custom_logo')->andReturn(false);
        Functions\when('get_site_icon_url')->justReturn('//shop.example/site-icon.png');

        $this->assertSame([
            'name' => 'Fern & Field',
            'tagline' => 'Skincare that listens',
            'colors' => ['accent' => '#c26a52', 'background' => '#fbf7f2', 'text' => '#332211'],
            'fonts' => ['heading' => 'Cormorant', 'body' => 'DM Sans'],
            'logo' => ['url' => 'https://shop.example/site-icon.png'],
        ], (array) (new Brand())->get_brand());
    }

    public function test_classic_theme_reads_plain_hex_mods_and_the_full_custom_logo(): void
    {
        Functions\when('get_option')->alias(fn($key) => ['blogname' => str_repeat('é', 81), 'blogdescription' => str_repeat('a', 121)][$key] ?? false);
        Functions\when('wp_is_block_theme')->justReturn(false);
        Functions\when('get_theme_mod')->alias(fn($key) => [
            'background_color' => 'DED', 'accent_color' => 'red', 'primary_color' => '#ABCDEF', 'custom_logo' => 42,
        ][$key] ?? false);
        Functions\expect('wp_get_attachment_image_src')->once()->with(42, 'full')->andReturn(['https://shop.example/logo.png', 240, 60, false]);
        Functions\expect('get_site_icon_url')->never();

        $this->assertSame([
            'name' => str_repeat('é', 80),
            'tagline' => str_repeat('a', 120),
            'colors' => ['accent' => '#abcdef', 'background' => '#ddeedd'],
            'logo' => ['url' => 'https://shop.example/logo.png', 'width' => 240, 'height' => 60],
        ], (array) (new Brand())->get_brand());
    }

    public function test_invalid_or_missing_values_are_omitted(): void
    {
        Functions\when('get_option')->alias(fn($key) => ['blogname' => '<b></b>', 'blogdescription' => ['not text']][$key] ?? false);
        Functions\when('wp_is_block_theme')->justReturn(true);
        Functions\when('wp_get_global_settings')->justReturn([]);
        Functions\when('wp_get_global_styles')->justReturn([
            'color' => ['background' => 'rgb(255, 0, 0)', 'text' => '#1234'],
            'elements' => [
                'link' => ['color' => ['text' => 'var:preset|color|unknown']],
                'button' => ['color' => ['background' => 'red']],
                'heading' => ['typography' => ['fontFamily' => 'var(--wp--preset--font-family--unknown)']],
            ],
            'typography' => ['fontFamily' => 'url(https://shop.example/font)'],
        ]);
        Functions\when('get_theme_mod')->justReturn(42);
        Functions\when('wp_get_attachment_image_src')->justReturn(['http://shop.example/logo.png', 240, 60, false]);
        Functions\when('get_site_icon_url')->justReturn('data:image/png;base64,abc');

        $this->assertSame('{}', json_encode((new Brand())->get_brand(), JSON_THROW_ON_ERROR));
    }
}
