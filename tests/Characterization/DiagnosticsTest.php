<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use PHPUnit\Framework\Attributes\PreserveGlobalState;
use PHPUnit\Framework\Attributes\RunInSeparateProcess;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Admin_Diagnostics;

/**
 * Characterization tests for the admin diagnostics unit.
 *
 * Pins the logic-bearing prerequisite checks (permalink, JSON detection, WPML
 * version gate) and the LOW-1 hardening: api_check_json() must identify with a
 * fixed plugin user-agent rather than reflecting the visitor's header.
 */
final class DiagnosticsTest extends TestCase
{
    private function diag(): Product_Recommendation_Quiz_For_Ecommerce_Admin_Diagnostics
    {
        return new Product_Recommendation_Quiz_For_Ecommerce_Admin_Diagnostics();
    }

    /* ---------- check_plain_permalink ---------- */

    public function test_plain_permalink_true_when_empty(): void
    {
        Functions\when('get_option')->justReturn('');
        $this->assertTrue($this->diag()->check_plain_permalink());
    }

    public function test_plain_permalink_false_when_set(): void
    {
        Functions\when('get_option')->justReturn('/%postname%/');
        $this->assertFalse($this->diag()->check_plain_permalink());
    }

    /* ---------- is_json ---------- */

    public function test_is_json_true_for_valid_json(): void
    {
        $this->assertTrue($this->diag()->is_json('{"a":1}'));
    }

    public function test_is_json_false_for_garbage(): void
    {
        $this->assertFalse($this->diag()->is_json('not json{'));
    }

    /* ---------- api_check_json (LOW-1: fixed user-agent) ---------- */

    public function test_api_check_json_sends_fixed_user_agent_and_returns_tuple(): void
    {
        $captured_args = null;
        // add_action/remove_action are no-op stubs from the test bootstrap.
        Functions\when('wp_remote_post')->alias(function ($url, $args) use (&$captured_args) {
            $captured_args = $args;
            return ['response' => ['code' => 200], 'body' => 'OK'];
        });
        Functions\when('wp_remote_retrieve_response_code')->justReturn(200);
        Functions\when('wp_remote_retrieve_body')->justReturn('OK');

        $result = $this->diag()->api_check_json('example.com');

        $this->assertSame([200, 'OK'], $result);
        $this->assertSame(
            'ProductRecommendationQuiz/' . PRQ_PLUGIN_VERSION,
            $captured_args['user-agent']
        );
    }

    public function test_api_check_json_returns_zero_tuple_on_transport_error(): void
    {
        // add_action/remove_action are no-op stubs from the test bootstrap.
        Functions\when('wp_remote_post')->justReturn(new \WP_Error('http_request_failed', 'down'));

        $this->assertSame([0, ''], $this->diag()->api_check_json('example.com'));
    }

    /* ---------- check_wpml (version gate) ---------- */

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_check_wpml_returns_false_when_wpml_absent(): void
    {
        // No icl_object_id defined in a fresh process => not active => no block.
        $this->assertFalse($this->diag()->check_wpml());
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_check_wpml_blocks_and_warns_on_pre_4_5_wpml(): void
    {
        Functions\when('icl_object_id')->justReturn(0);
        // wpml_active() now emits one whole sentence via wp_kses(sprintf(__())).
        Functions\when('esc_html__')->returnArg();
        Functions\when('wp_kses')->returnArg();
        define('ICL_SITEPRESS_VERSION', '4.4.0');

        ob_start();
        $blocked = $this->diag()->check_wpml();
        $html = ob_get_clean();

        $this->assertTrue($blocked);
        $this->assertStringContainsString('WPML Multilingual CMS', $html);
    }
}
