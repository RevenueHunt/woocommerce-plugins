<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use PHPUnit\Framework\Attributes\PreserveGlobalState;
use PHPUnit\Framework\Attributes\RunInSeparateProcess;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_Environment;

/**
 * Tests for the environment detector.
 *
 * Detection tests are process-isolated because they assert on the presence /
 * absence of WP-ecosystem functions, constants and classes — symbols leak
 * across tests within one PHP process otherwise.
 */
final class EnvironmentTest extends TestCase
{
    private function env(): Product_Recommendation_Quiz_For_Ecommerce_Environment
    {
        return new Product_Recommendation_Quiz_For_Ecommerce_Environment();
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_no_translation_or_currency_plugins_detected(): void
    {
        $env = $this->env();
        $this->assertNull($env->get_translation_plugin());
        $this->assertNull($env->get_multicurrency_plugin());
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_detects_wpml(): void
    {
        Functions\when('icl_object_id')->justReturn(0);
        $this->assertSame('WPML', $this->env()->get_translation_plugin());
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_detects_polylang(): void
    {
        Functions\when('pll_languages_list')->justReturn([]);
        $this->assertSame('Polylang', $this->env()->get_translation_plugin());
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_detects_woocs_multicurrency(): void
    {
        eval('class WOOCS {}');
        $this->assertSame('WOOCS - Currency Switcher', $this->env()->get_multicurrency_plugin());
    }

    public function test_base_language_is_locale(): void
    {
        Functions\when('get_locale')->justReturn('de_DE');
        $this->assertSame('de_DE', $this->env()->get_base_language());
    }

    public function test_base_currency_from_woocommerce(): void
    {
        Functions\when('get_woocommerce_currency')->justReturn('EUR');
        $this->assertSame('EUR', $this->env()->get_base_currency());
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_base_currency_empty_without_woocommerce(): void
    {
        $this->assertSame('', $this->env()->get_base_currency());
    }

    public function test_wordpress_version_from_bloginfo(): void
    {
        Functions\when('get_bloginfo')->justReturn('6.7');
        $this->assertSame('6.7', $this->env()->get_wordpress_version());
    }

    public function test_woocommerce_version_from_wc_instance(): void
    {
        Functions\when('WC')->justReturn((object) ['version' => '9.1.0']);
        $this->assertSame('9.1.0', $this->env()->get_woocommerce_version());
    }
}
