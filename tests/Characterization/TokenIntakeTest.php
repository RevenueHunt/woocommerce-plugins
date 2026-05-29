<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use WP_Error;
use WP_REST_Request;

/**
 * Characterization tests for the token-intake path at v2.3.8.
 *
 * These pin the CURRENT behavior — including the documented security gaps
 * (HIGH-1 HMAC skip, MED-1 XFF keying, MED-2 replay window). They are the
 * red→green baseline: the Tier-1 security fixes will invert the asserts marked
 * "SECURITY BASELINE" below.
 */
final class TokenIntakeTest extends TestCase
{
    /* ---------- prq_validate_shop_hashid (pure) ---------- */

    public function test_validate_shop_hashid_accepts_alphanumeric(): void
    {
        $this->assertTrue(prq_validate_shop_hashid('abc123XYZ'));
    }

    public function test_validate_shop_hashid_rejects_symbols(): void
    {
        $this->assertFalse(prq_validate_shop_hashid('abc-123'));
        $this->assertFalse(prq_validate_shop_hashid('abc 123'));
        $this->assertFalse(prq_validate_shop_hashid('drop;table'));
    }

    public function test_validate_shop_hashid_rejects_empty(): void
    {
        $this->assertFalse(prq_validate_shop_hashid(''));
    }

    /* ---------- prq_check_rate_limit ---------- */

    public function test_rate_limit_allows_when_under_threshold(): void
    {
        $_SERVER['REMOTE_ADDR'] = '203.0.113.7';
        Functions\when('get_transient')->justReturn(3);
        Functions\when('set_transient')->justReturn(true);

        $this->assertTrue(prq_check_rate_limit());
    }

    public function test_rate_limit_returns_429_at_threshold(): void
    {
        $_SERVER['REMOTE_ADDR'] = '203.0.113.7';
        Functions\when('get_transient')->justReturn(10);

        $result = prq_check_rate_limit();
        $this->assertInstanceOf(WP_Error::class, $result);
        $this->assertSame('rate_limited', $result->get_error_code());
        $this->assertSame(['status' => 429], $result->get_error_data());
    }

    public function test_rate_limit_no_ip_is_throttled_not_open(): void
    {
        // MED-1 fix: no determinable IP must NOT fail open — it is throttled
        // through a shared bucket and still 429s at the threshold.
        $captured = null;
        Functions\when('get_transient')->justReturn(0);
        Functions\when('set_transient')->alias(function ($key, $val, $exp) use (&$captured) {
            $captured = $key;
            return true;
        });

        $this->assertTrue(prq_check_rate_limit());        // counted, not bypassed
        $this->assertSame('prq_rate_unknown', $captured); // shared bucket

        Functions\when('get_transient')->justReturn(10);
        $this->assertInstanceOf(WP_Error::class, prq_check_rate_limit());
    }

    public function test_rate_limit_ignores_spoofed_xff_uses_remote_addr(): void
    {
        // MED-1 fix: with no trusted proxy, a spoofable XFF header is ignored;
        // the throttle keys on REMOTE_ADDR.
        $_SERVER['HTTP_X_FORWARDED_FOR'] = '1.2.3.4, 9.9.9.9';
        $_SERVER['REMOTE_ADDR']          = '203.0.113.7';

        $captured = null;
        Functions\when('apply_filters')->justReturn(false); // proxy not trusted
        Functions\when('get_transient')->justReturn(0);
        Functions\when('set_transient')->alias(function ($key, $val, $exp) use (&$captured) {
            $captured = $key;
            return true;
        });

        prq_check_rate_limit();

        $this->assertSame('prq_rate_' . md5('203.0.113.7'), $captured);
    }

    public function test_rate_limit_trusts_xff_only_behind_configured_proxy(): void
    {
        // MED-1 fix: when explicitly behind a trusted proxy, trust the
        // proxy-appended (LAST) entry, not the client-supplied head.
        $_SERVER['HTTP_X_FORWARDED_FOR'] = '1.2.3.4, 198.51.100.9';
        $_SERVER['REMOTE_ADDR']          = '203.0.113.7';

        $captured = null;
        Functions\when('apply_filters')->justReturn(true); // proxy trusted
        Functions\when('get_transient')->justReturn(0);
        Functions\when('set_transient')->alias(function ($key, $val, $exp) use (&$captured) {
            $captured = $key;
            return true;
        });

        prq_check_rate_limit();

        $this->assertSame('prq_rate_' . md5('198.51.100.9'), $captured);
    }

    /* ---------- prq_verify_signature ---------- */

    public function test_verify_signature_requires_core_params(): void
    {
        Functions\when('get_option')->justReturn('secret');
        $req = new WP_REST_Request(['signature' => 'x']); // missing shop_hashid + token
        $this->assertFalse(prq_verify_signature($req));
    }

    public function test_verify_signature_skips_verification_when_no_api_key(): void
    {
        // SECURITY BASELINE (HIGH-1): with no stored api_key, ANY non-empty
        // signature/hashid/token tuple is accepted unauthenticated.
        Functions\when('get_option')->justReturn(false); // rh_api_key empty
        $req = new WP_REST_Request([
            'signature'   => 'anything',
            'shop_hashid' => 'attacker',
            'token'       => 'attackertoken',
        ]);
        $this->assertTrue(prq_verify_signature($req));
    }

    public function test_verify_signature_accepts_valid_hmac(): void
    {
        $apiKey = 'shared-secret';
        Functions\when('get_option')->justReturn($apiKey);
        $sig = $this->sign('shop1', 'tok1', $apiKey);

        $req = new WP_REST_Request([
            'signature'   => $sig,
            'shop_hashid' => 'shop1',
            'token'       => 'tok1',
        ]);
        $this->assertTrue(prq_verify_signature($req));
    }

    public function test_verify_signature_rejects_bad_hmac(): void
    {
        Functions\when('get_option')->justReturn('shared-secret');
        $req = new WP_REST_Request([
            'signature'   => base64_encode('not-the-right-mac'),
            'shop_hashid' => 'shop1',
            'token'       => 'tok1',
        ]);
        $this->assertFalse(prq_verify_signature($req));
    }

    public function test_verify_signature_replays_when_timestamp_omitted(): void
    {
        // SECURITY BASELINE (MED-2): with no timestamp the freshness window is
        // never enforced, so a captured tuple replays indefinitely.
        $apiKey = 'shared-secret';
        Functions\when('get_option')->justReturn($apiKey);
        $sig = $this->sign('shop1', 'tok1', $apiKey); // signed WITHOUT timestamp

        $req = new WP_REST_Request([
            'signature'   => $sig,
            'shop_hashid' => 'shop1',
            'token'       => 'tok1',
        ]);
        $this->assertTrue(prq_verify_signature($req));
    }

    public function test_verify_signature_rejects_expired_timestamp(): void
    {
        $apiKey = 'shared-secret';
        Functions\when('get_option')->justReturn($apiKey);
        $oldTs = (string) (time() - 10_000);
        $sig   = $this->sign('shop1', 'tok1', $apiKey, $oldTs);

        $req = new WP_REST_Request([
            'signature'   => $sig,
            'shop_hashid' => 'shop1',
            'token'       => 'tok1',
            'timestamp'   => $oldTs,
        ]);
        $this->assertFalse(prq_verify_signature($req));
    }
}
