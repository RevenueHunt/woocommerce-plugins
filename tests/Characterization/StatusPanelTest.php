<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Admin_Status_Panel;
use Product_Recommendation_Quiz_For_Ecommerce_Admin_Page;
use Product_Recommendation_Quiz_For_Ecommerce_Connection;
use Product_Recommendation_Quiz_For_Ecommerce_Environment;

/**
 * Tests for the native status panel and its placement in the connected view.
 *
 * Pins the visible content of the panel for the connected (detected) and
 * disconnected (nothing detected) cases, and that the authenticated admin view
 * renders the panel above the management iframe.
 */
final class StatusPanelTest extends TestCase
{
    /**
     * Stub i18n + escaping as pass-throughs and capture the visible text.
     */
    private function visibleText(callable $render): string
    {
        Functions\when('esc_html_e')->alias(function ($text) { echo $text; });
        Functions\when('esc_attr_e')->alias(function ($text) { echo $text; });
        Functions\when('esc_html__')->returnArg();
        Functions\when('esc_attr__')->returnArg();
        Functions\when('esc_html')->returnArg();
        Functions\when('esc_attr')->returnArg();
        Functions\when('esc_url')->returnArg();
        Functions\when('plugin_dir_url')->justReturn('');
        Functions\when('wp_kses')->returnArg();

        ob_start();
        $render();
        $html = ob_get_clean();

        $text = preg_replace('/<[^>]*>/', '', $html);
        $text = html_entity_decode($text, ENT_QUOTES);
        return trim(preg_replace('/\s+/', ' ', $text));
    }

    private function connection(bool $connected, string $target, string $domain): object
    {
        $connection = \Mockery::mock(Product_Recommendation_Quiz_For_Ecommerce_Connection::class);
        $connection->shouldReceive('is_connected')->andReturn($connected);
        $connection->shouldReceive('get_target')->andReturn($target);
        $connection->shouldReceive('get_domain')->andReturn($domain);
        return $connection;
    }

    private function environment(?string $translation, ?string $multicurrency, string $wc, string $currency, string $language, string $wp): object
    {
        $environment = \Mockery::mock(Product_Recommendation_Quiz_For_Ecommerce_Environment::class);
        $environment->shouldReceive('get_translation_plugin')->andReturn($translation);
        $environment->shouldReceive('get_multicurrency_plugin')->andReturn($multicurrency);
        $environment->shouldReceive('get_woocommerce_version')->andReturn($wc);
        $environment->shouldReceive('get_base_currency')->andReturn($currency);
        $environment->shouldReceive('get_base_language')->andReturn($language);
        $environment->shouldReceive('get_wordpress_version')->andReturn($wp);
        return $environment;
    }

    public function test_connected_panel_visible_content(): void
    {
        $panel = new Product_Recommendation_Quiz_For_Ecommerce_Admin_Status_Panel(
            $this->connection(true, 'admin.revenuehunt.com', 'store.example.com'),
            $this->environment('WPML', 'WOOCS - Currency Switcher', '9.1.0', 'USD', 'en_US', '6.7')
        );

        $this->assertSame(
            'Connection status Connection Connected to admin.revenuehunt.com Store domain store.example.com '
            . 'WordPress version 6.7 WooCommerce version 9.1.0 Translation plugin WPML '
            . 'Multi-currency plugin WOOCS - Currency Switcher Base language en_US Base currency USD',
            $this->visibleText(fn() => $panel->render())
        );
    }

    public function test_disconnected_panel_visible_content(): void
    {
        $panel = new Product_Recommendation_Quiz_For_Ecommerce_Admin_Status_Panel(
            $this->connection(false, 'admin.revenuehunt.com', 'store.example.com'),
            $this->environment(null, null, '', '', 'en_US', '6.7')
        );

        $this->assertSame(
            'Connection status Connection Not connected Store domain store.example.com '
            . 'WordPress version 6.7 WooCommerce version None detected Translation plugin None detected '
            . 'Multi-currency plugin None detected Base language en_US Base currency —',
            $this->visibleText(fn() => $panel->render())
        );
    }

    public function test_authenticated_view_renders_panel_above_iframe(): void
    {
        $builder = \Mockery::mock(\Product_Recommendation_Quiz_For_Ecommerce_Admin_Oauth_Url_Builder::class);
        $builder->shouldReceive('prquiz_get_oauth_url')->andReturn('https://app.example.com/');

        $panel = \Mockery::mock(Product_Recommendation_Quiz_For_Ecommerce_Admin_Status_Panel::class);
        $panel->shouldReceive('render')->once()->andReturnUsing(function () {
            echo '<!--PRQ_PANEL_MARKER-->';
        });

        $page = new Product_Recommendation_Quiz_For_Ecommerce_Admin_Page(null, $builder, $panel);

        $html = (function () use ($page) {
            Functions\when('esc_html_e')->alias(function ($text) { echo $text; });
            Functions\when('esc_attr_e')->alias(function ($text) { echo $text; });
            Functions\when('esc_html__')->returnArg();
            Functions\when('esc_url')->returnArg();
            Functions\when('plugin_dir_url')->justReturn('');
            Functions\when('wp_kses')->returnArg();

            ob_start();
            $page->prquiz_authenticated_visit();
            return ob_get_clean();
        })();

        $marker_pos = strpos($html, '<!--PRQ_PANEL_MARKER-->');
        $iframe_pos = strpos($html, '<iframe');
        $this->assertNotFalse($marker_pos);
        $this->assertNotFalse($iframe_pos);
        $this->assertLessThan($iframe_pos, $marker_pos, 'Status panel must render above the iframe.');
    }
}
