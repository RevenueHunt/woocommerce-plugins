<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_V2_Orders as Orders;

final class V2OrdersTest extends TestCase
{
    public function test_store_api_extension_survives_cart_session_and_becomes_order_meta(): void
    {
        $orders = new Orders();
        $data = $orders->cart_data(['cart_item_data' => ['other' => 'preserved']], new \WP_REST_Request(['extensions' => ['prq' => ['__quiz_response_id' => 'response-123', '__assistant_chat_id' => 'chat-456', 'unknown' => 'ignored']]]));
        $this->assertSame(['other' => 'preserved', 'prq' => ['__quiz_response_id' => 'response-123', '__assistant_chat_id' => 'chat-456']], $data['cart_item_data']);
        $cart = \Mockery::mock();
        $cart->shouldReceive('get_cart')->andReturn([$data['cart_item_data']]);
        Functions\when('WC')->justReturn((object) ['cart' => $cart]);
        $meta = [];
        $order = \Mockery::mock('WC_Order');
        $order->shouldReceive('get_meta')->andReturnUsing(fn($key) => $meta[$key] ?? '');
        $order->shouldReceive('update_meta_data')->with('_prq_quiz_response_id', 'response-123')->once()->andReturnUsing(function ($key, $value) use (&$meta) { $meta[$key] = $value; });
        $order->shouldReceive('update_meta_data')->with('_prq_assistant_chat_id', 'chat-456')->once()->andReturnUsing(function ($key, $value) use (&$meta) { $meta[$key] = $value; });
        $orders->attribute_order($order);
        $this->assertSame(['_prq_quiz_response_id' => 'response-123', '_prq_assistant_chat_id' => 'chat-456'], $meta);
    }

    public function test_lookup_requires_email_and_order_number(): void
    {
        Functions\when('is_email')->alias(fn($value) => filter_var($value, FILTER_VALIDATE_EMAIL));
        Functions\expect('wc_get_orders')->never();
        $result = (new Orders())->lookup(new \WP_REST_Request(['number' => '123', 'email' => 'bad']));
        $this->assertSame('prq_invalid_order', $result->get_error_code());
    }
}
