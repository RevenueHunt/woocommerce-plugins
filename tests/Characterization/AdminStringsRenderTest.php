<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use PHPUnit\Framework\Attributes\PreserveGlobalState;
use PHPUnit\Framework\Attributes\RunInSeparateProcess;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Admin_Diagnostics;
use Product_Recommendation_Quiz_For_Ecommerce_Admin_Page;

/**
 * Characterization tests for the rendered admin/diagnostic screens.
 *
 * Pins the *visible sentence* of every merchant-facing screen — tags stripped,
 * whitespace collapsed — so the i18n refactor (merging split fragments into
 * whole sprintf() strings) can be proven to preserve exactly what each screen
 * SAYS, only changing how it is marked up for translation.
 */
final class AdminStringsRenderTest extends TestCase
{
    /**
     * Stub the i18n + escaping helpers as pass-throughs and capture the visible
     * text of a render callback (HTML tags stripped, whitespace collapsed).
     */
    private function visibleText(callable $render): string
    {
        // Translation echo/return helpers: identity (return the English source).
        Functions\when('esc_html_e')->alias(function ($text) { echo $text; });
        Functions\when('esc_attr_e')->alias(function ($text) { echo $text; });
        Functions\when('esc_html__')->returnArg();
        Functions\when('esc_attr__')->returnArg();
        // __() is already a pass-through stub from the test bootstrap.
        // Escaping helpers used around dynamic values / URLs: identity.
        Functions\when('esc_html')->returnArg();
        Functions\when('esc_attr')->returnArg();
        Functions\when('esc_url')->returnArg();
        Functions\when('admin_url')->returnArg();
        Functions\when('plugin_dir_url')->justReturn('');

        ob_start();
        $render();
        $html = ob_get_clean();

        // Collapse to the human-visible sentence: drop tags, normalize space.
        // Tags are removed (not spaced) so punctuation abutting a closing tag —
        // e.g. "here</a>." — stays "here."; word separation comes from the
        // source whitespace/newlines between fragments.
        $text = preg_replace('/<[^>]*>/', '', $html);
        $text = html_entity_decode($text, ENT_QUOTES);
        return trim(preg_replace('/\s+/', ' ', $text));
    }

    private function diag(): Product_Recommendation_Quiz_For_Ecommerce_Admin_Diagnostics
    {
        return new Product_Recommendation_Quiz_For_Ecommerce_Admin_Diagnostics();
    }

    /* ---------- diagnostics error screens ---------- */

    public function test_woocommerce_missing_visible_sentence(): void
    {
        $text = $this->visibleText(fn() => $this->diag()->woocommerce_missing());
        $this->assertSame(
            'Product Recommendation Quiz for eCommerce requires the WooCommerce plugin to be installed and active. You can download WooCommerce here. If you want this plugin developed for your eCommerce platform, please send us a message.',
            $text
        );
    }

    public function test_https_ssl_missing_visible_sentence(): void
    {
        $text = $this->visibleText(fn() => $this->diag()->https_ssl_missing());
        $this->assertSame(
            'Product Recommendation Quiz for eCommerce requires your website to have a valid HTTPS/SSL certificate.',
            $text
        );
    }

    public function test_is_localhost_visible_sentence(): void
    {
        $text = $this->visibleText(fn() => $this->diag()->is_localhost());
        $this->assertSame(
            'This plugin does not work on local environments. It needs to be installed on a live website. Your website needs to be public and not hidden by a site under construction plugin because it needs connection to our server in order to work.',
            $text
        );
    }

    public function test_plain_permalink_warning_visible_sentence(): void
    {
        $text = $this->visibleText(fn() => $this->diag()->plain_permalink_warning());
        $this->assertSame(
            'Your current permalink structure is set to "Plain". For this plugin to authenticate correctly, a different permalink structure (such as "Post name") is required. Please update your permalink settings under Settings > Permalinks to ensure seamless authentication.',
            $text
        );
    }

    public function test_wpml_active_visible_sentence(): void
    {
        $text = $this->visibleText(fn() => $this->diag()->wpml_active());
        $this->assertSame(
            'There\'s an issue with the WPML Multilingual CMS plugin which interferes with the authentication process of other plugins. Please deactivate the WPML Multilingual CMS plugin temporarily, you can reactivate it later. More info here.',
            $text
        );
    }

    public function test_wp_json_error_visible_sentence(): void
    {
        $text = $this->visibleText(fn() => $this->diag()->wp_json_error());
        $this->assertSame(
            'It seems like there\'s something interfering with your WordPress REST API. This needs to be fixed in order to grant access to this plugin. More info here. We\'re getting the following error accessing your WooCommerce API from our server:',
            $text
        );
    }

    public function test_wp_json_error_html_content_type_visible_sentence(): void
    {
        $text = $this->visibleText(fn() => $this->diag()->wp_json_error_html_content_type('shop.example.com'));
        $this->assertSame(
            'The following REST API endpoint is returning a valid JSON but the returned content-type is text/html instead of the expected application/json: https://shop.example.com/wp-json/wc/v3/',
            $text
        );
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_migration_warning_visible_sentence(): void
    {
        define('PRQ_STORE_URL', 'new.example.com');
        Functions\when('get_option')->justReturn('old.example.com');

        $text = $this->visibleText(fn() => $this->diag()->migration_warning());
        $this->assertSame(
            'We\'ve detected that you\'ve changed the domain name. We\'re migrating your Product Recommendation Quiz account from old.example.com to new.example.com Please contact us if you encounter any issues.',
            $text
        );
    }

    /* ---------- admin page views ---------- */

    public function test_first_visit_visible_sentence(): void
    {
        $builder = \Mockery::mock(\Product_Recommendation_Quiz_For_Ecommerce_Admin_Oauth_Url_Builder::class);
        $builder->shouldReceive('prquiz_get_woocommerce_auth_url')->andReturn('https://auth.example.com/');
        $page = new Product_Recommendation_Quiz_For_Ecommerce_Admin_Page(null, $builder);

        $text = $this->visibleText(fn() => $page->prquiz_first_visit());
        $this->assertSame(
            'Product Recommendation Quiz for eCommerce by RevenueHunt Congratulations! You\'re one step away from getting more conversions and sales in your store. We just need you to grant this plugin permission to access your WooCommerce store: grant permission now Are you having trouble granting access? Check out this article',
            $text
        );
    }
}
