<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use Product_Recommendation_Quiz_For_Ecommerce_V2 as V2;
use Product_Recommendation_Quiz_For_Ecommerce_V2_Media as Media;
use RevenueHunt\PRQ\Tests\TestCase;

final class V2MediaTest extends TestCase
{
    private function uploadRequest(array $body): \WP_REST_Request
    {
        $request = \Mockery::mock(\WP_REST_Request::class);
        $request->shouldReceive('get_json_params')->once()->andReturn($body);
        return $request;
    }

    private function image(): array
    {
        $id = 123;
        $url = 'https://shop.example/wp-content/uploads/serum.jpg';
        Functions\when('wp_get_attachment_url')->alias(fn($postId) => $postId === $id ? $url : false);
        Functions\when('esc_url_raw')->alias(fn($url) => $url);
        Functions\when('get_post_mime_type')->alias(fn($postId) => $postId === $id ? 'image/jpeg' : false);
        Functions\when('get_attached_file')->alias(fn($postId) => $postId === $id ? '/uploads/serum.jpg' : false);
        Functions\when('get_post_meta')->alias(fn($postId, $key) => $postId === $id && $key === '_wp_attachment_image_alt' ? 'Serum' : '');
        Functions\when('wp_get_attachment_metadata')->alias(fn($postId) => $postId === $id ? ['width' => 800, 'height' => 600] : false);
        Functions\when('get_post_time')->alias(fn($format, $gmt, $postId) => $format === DATE_ATOM && $gmt && $postId === $id ? '2026-11-27T10:00:00+00:00' : false);
        Functions\when('wp_parse_url')->alias('parse_url');
        Functions\when('wp_basename')->alias('basename');
        return ['id' => $id, 'url' => $url, 'filename' => 'serum.jpg', 'alt' => 'Serum', 'mime' => 'image/jpeg',
            'date' => '2026-11-27T10:00:00+00:00', 'width' => 800, 'height' => 600];
    }

    public function test_v2_registers_both_media_methods_with_the_signed_permission_callback(): void
    {
        $v2 = new V2();
        $routes = [];
        Functions\when('register_rest_route')->alias(function ($namespace, $path, $args) use (&$routes) {
            if ($path === '/media') $routes[$args['methods']] = [$namespace, $args];
        });
        $v2->register_routes();
        $this->assertSame([], $routes, 'No media routes in V1.');

        Functions\when('get_option')->justReturn(['mode' => 'v2', 'shared_secret' => 'prq-v2-test-secret']);
        $v2->register_routes();
        $this->assertSame(['GET', 'POST'], array_keys($routes));
        foreach ($routes as $method => [$namespace, $route]) {
            $this->assertSame('prq/v3', $namespace);
            $this->assertInstanceOf(Media::class, $route['callback'][0]);
            $this->assertSame($method === 'GET' ? 'list_media' : 'add_media', $route['callback'][1]);
            $this->assertSame([$v2, 'authorize'], $route['permission_callback']);
        }
    }

    public function test_get_maps_paged_attachments_to_the_contract(): void
    {
        $image = $this->image();
        Functions\when('remove_filter')->justReturn(true);
        \WP_Query::$queryHandler = function ($args, $query) {
            $this->assertSame([
                'post_type' => 'attachment', 'post_status' => 'inherit', 'post_mime_type' => 'image',
                's' => 'serum', 'paged' => 2, 'posts_per_page' => 50, 'orderby' => 'date', 'order' => 'DESC',
            ], $args);
            $query->max_num_pages = 3;
            return [(object) ['ID' => 123]];
        };

        try {
            $request = new \WP_REST_Request(['type' => 'image', 'search' => ' <b>serum</b> ', 'page' => '2', 'per_page' => '99']);
            $this->assertSame(['items' => [$image], 'page' => 2, 'total_pages' => 3], (new Media())->list_media($request));
        } finally {
            \WP_Query::$queryHandler = null;
        }
    }

    public function test_post_refuses_http_without_downloading(): void
    {
        Functions\when('wp_parse_url')->alias('parse_url');
        Functions\expect('download_url')->never();

        $result = (new Media())->add_media($this->uploadRequest(['url' => 'http://cdn.example/serum.jpg']));
        $this->assertSame(400, $result->get_status());
        $this->assertSame('prq_media_invalid', $result->get_data()['code']);
    }

    private function mockDownload(string $url, string $name, array $type, callable $check): void
    {
        $temp = tempnam(sys_get_temp_dir(), 'prq-media-');
        try {
            Functions\when('wp_parse_url')->alias('parse_url');
            Functions\when('wp_basename')->alias('basename');
            Functions\when('sanitize_file_name')->alias(fn($name) => str_replace(' ', '-', $name));
            Functions\when('remove_filter')->justReturn(true);
            Functions\when('wp_generate_attachment_metadata')->justReturn([]);
            Functions\when('wp_filesize')->justReturn(123);
            Functions\expect('download_url')->once()->with($url)->andReturn($temp);
            $mimes = ['jpg|jpeg' => 'image/jpeg', 'mp4' => 'video/mp4', 'pdf' => 'application/pdf'];
            Functions\when('get_allowed_mime_types')->justReturn($mimes);
            Functions\expect('wp_check_filetype_and_ext')->once()->with($temp, $name, $mimes)->andReturn($type);
            Functions\when('wp_delete_file')->alias('unlink');
            $check($temp);
            $this->assertFileDoesNotExist($temp);
        } finally {
            if (is_file($temp)) unlink($temp);
        }
    }

    public function test_post_refuses_non_media_and_deletes_the_download(): void
    {
        $url = 'https://cdn.example/report.pdf';
        $this->mockDownload($url, 'report.pdf', ['ext' => 'pdf', 'type' => 'application/pdf'], function () use ($url) {
            Functions\expect('media_handle_sideload')->never();
            $result = (new Media())->add_media($this->uploadRequest(['url' => $url]));
            $this->assertSame(400, $result->get_status());
            $this->assertSame('prq_media_invalid', $result->get_data()['code']);
        });
    }

    public function test_post_stores_an_attachment_and_its_alt_text_and_returns_the_created_item(): void
    {
        $image = $this->image();
        $url = 'https://cdn.example/file.jpg';
        $this->mockDownload($url, 'face-serum.jpg', ['ext' => 'jpg', 'type' => 'image/jpeg'], function ($temp) use ($url, $image) {
            Functions\expect('media_handle_sideload')->once()->with(['name' => 'face-serum.jpg', 'tmp_name' => $temp], 0)->andReturn(123);
            Functions\when('wp_slash')->alias('addslashes');
            Functions\expect('update_post_meta')->once()->with(123, '_wp_attachment_image_alt', 'Serum')->andReturn(true);
            $result = (new Media())->add_media($this->uploadRequest(['url' => $url, 'filename' => 'face serum.jpg', 'alt' => '<b>Serum</b>']));
            $this->assertSame(201, $result->get_status());
            $this->assertSame($image, $result->get_data());
        });
    }
}
