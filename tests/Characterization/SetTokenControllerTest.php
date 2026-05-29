<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use PHPUnit\Framework\Attributes\PreserveGlobalState;
use PHPUnit\Framework\Attributes\RunInSeparateProcess;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Rest_Set_Token_Controller as Controller;
use WP_Error;
use WP_REST_Request;

/**
 * Characterization for the previously-uncovered controller surfaces:
 * the WooCommerce permission callback and the "only set if empty" semantics of
 * the token handler (the option-write contract the monolith relies on).
 */
final class SetTokenControllerTest extends TestCase
{
    private function controller(): Controller
    {
        return new Controller();
    }

    /* ---------- check_woocommerce_permission ---------- */

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_permission_false_when_woocommerce_absent(): void
    {
        // Fresh process, WC_REST_Authentication never defined => denied.
        $this->assertFalse($this->controller()->check_woocommerce_permission(new WP_REST_Request()));
    }

    public function test_permission_true_for_authenticated_wp_user(): void
    {
        require_once dirname(__DIR__) . '/fixtures/wc-auth-stubs.php';
        \WC_REST_Authentication::$result = new \WP_User();

        $this->assertTrue($this->controller()->check_woocommerce_permission(new WP_REST_Request()));
    }

    public function test_permission_false_for_wp_error(): void
    {
        require_once dirname(__DIR__) . '/fixtures/wc-auth-stubs.php';
        \WC_REST_Authentication::$result = new WP_Error('rest_forbidden', 'no');

        $this->assertFalse($this->controller()->check_woocommerce_permission(new WP_REST_Request()));
    }

    public function test_permission_false_for_null_result(): void
    {
        require_once dirname(__DIR__) . '/fixtures/wc-auth-stubs.php';
        \WC_REST_Authentication::$result = null;

        $this->assertFalse($this->controller()->check_woocommerce_permission(new WP_REST_Request()));
    }

    /* ---------- handle(): only-set-if-empty option contract ---------- */

    public function test_handle_writes_credentials_when_absent(): void
    {
        Functions\when('get_transient')->justReturn(0);
        Functions\when('set_transient')->justReturn(true);
        Functions\when('get_option')->justReturn(false); // no stored credentials yet

        $writes = [];
        Functions\when('update_option')->alias(function ($key, $value) use (&$writes) {
            $writes[$key] = $value;
            return true;
        });

        $req = new WP_REST_Request([
            'shop_hashid' => 'abc123',
            'api_key'     => 'validkey123',
        ]);
        $this->controller()->handle($req);

        $this->assertSame('abc123', $writes[PRQ_OPTION_SHOP_HASHID] ?? null);
        $this->assertSame('validkey123', $writes[PRQ_OPTION_API_KEY] ?? null);
    }

    public function test_handle_does_not_overwrite_existing_credentials(): void
    {
        Functions\when('get_transient')->justReturn(0);
        Functions\when('set_transient')->justReturn(true);
        Functions\when('get_option')->justReturn('already-set'); // credentials present

        Functions\expect('update_option')->never();

        $req = new WP_REST_Request([
            'shop_hashid' => 'new456',
            'api_key'     => 'newkey456',
        ]);
        $result = $this->controller()->handle($req);

        $this->assertSame('already-set', $result);
    }
}
