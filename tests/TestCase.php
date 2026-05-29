<?php

namespace RevenueHunt\PRQ\Tests;

use Brain\Monkey;
use PHPUnit\Framework\TestCase as PHPUnitTestCase;

abstract class TestCase extends PHPUnitTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Monkey\setUp();
    }

    protected function tearDown(): void
    {
        Monkey\tearDown();
        // keep $_SERVER clean between tests
        unset($_SERVER['HTTP_X_FORWARDED_FOR'], $_SERVER['REMOTE_ADDR']);
        parent::tearDown();
    }

    /** Build the HMAC signature exactly as the RevenueHunt server is expected to. */
    protected function sign(string $shopHashid, string $token, string $apiKey, ?string $timestamp = null): string
    {
        $data = sprintf('hashid=%s&token=%s', $shopHashid, $token);
        if ($timestamp !== null && $timestamp !== '') {
            $data .= '&timestamp=' . $timestamp;
        }
        return base64_encode(hash_hmac('sha256', $data, $apiKey, true));
    }
}
