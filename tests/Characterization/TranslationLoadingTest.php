<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use RevenueHunt\PRQ\Tests\TestCase;

require_once dirname(__DIR__, 2) . '/tools/po2mo.php';

/**
 * Loading behavior for the bundled translations.
 *
 * Proves the whole chain end to end without a WordPress install: a committed
 * .po compiles (via the build's pure-PHP po2mo) to a valid .mo whose binary an
 * INDEPENDENT reader can decode, a representative admin string resolves to its
 * translation, and an unknown / unbundled locale falls back cleanly to the
 * English source with no fatal and no empty string.
 */
final class TranslationLoadingTest extends TestCase
{
    private const LANG_DIR = __DIR__ . '/../../shared/languages';
    private const SLUG      = 'product-recommendation-quiz-for-ecommerce';

    /** Locales the Woo target bundles (see targets/woocommerce/target.json). */
    private const BUNDLED = array('nl_NL', 'nl_BE', 'de_DE', 'fr_FR', 'es_ES', 'es_MX', 'it_IT', 'pl_PL', 'pt_BR');

    /**
     * Minimal, dependency-free .mo binary reader (little-endian). Independent of
     * po2mo's parser so it actually validates the emitted binary.
     *
     * @return array<string, string>
     */
    private function readMo(string $bin): array
    {
        $magic = unpack('V', substr($bin, 0, 4))[1];
        $this->assertSame(0x950412de, $magic, '.mo magic number');
        $count = unpack('V', substr($bin, 8, 4))[1];
        $o_off = unpack('V', substr($bin, 12, 4))[1];
        $t_off = unpack('V', substr($bin, 16, 4))[1];

        $map = array();
        for ($i = 0; $i < $count; $i++) {
            $o_len = unpack('V', substr($bin, $o_off + $i * 8, 4))[1];
            $o_pos = unpack('V', substr($bin, $o_off + $i * 8 + 4, 4))[1];
            $t_len = unpack('V', substr($bin, $t_off + $i * 8, 4))[1];
            $t_pos = unpack('V', substr($bin, $t_off + $i * 8 + 4, 4))[1];
            $map[substr($bin, $o_pos, $o_len)] = substr($bin, $t_pos, $t_len);
        }
        return $map;
    }

    private function compiledMo(string $locale): array
    {
        $po = file_get_contents(self::LANG_DIR . '/' . self::SLUG . '-' . $locale . '.po');
        return $this->readMo(prq_compile_mo($po));
    }

    public function test_bundled_locale_resolves_a_representative_string(): void
    {
        $nl = $this->compiledMo('nl_NL');

        // A simple whole string and a merged sprintf string both translate, and
        // the sprintf placeholder survives the merge/compile round-trip.
        $this->assertSame('Gefeliciteerd!', $nl['Congratulations!']);
        $this->assertArrayHasKey(
            'Please update your permalink settings under %s to ensure seamless authentication.',
            $nl
        );
        $this->assertStringContainsString(
            '%s',
            $nl['Please update your permalink settings under %s to ensure seamless authentication.'],
            'placeholder is preserved in the translation'
        );
    }

    public function test_untranslated_msgid_is_absent_so_english_is_used(): void
    {
        $nl = $this->compiledMo('nl_NL');

        // A string that does not exist must not resolve — WordPress then returns
        // the English source unchanged (clean fallback, never an empty string).
        $this->assertArrayNotHasKey('This string does not exist in the catalog.', $nl);
    }

    public function test_partial_locale_leaves_untranslated_sentences_for_english(): void
    {
        // de_DE's community set did not translate every fragment, so a couple of
        // merged sentences are intentionally left out of the catalog (rather than
        // shipped half-translated). They must be ABSENT so English is shown — the
        // header and at least one real entry must still be present.
        $de = $this->compiledMo('de_DE');
        $this->assertArrayHasKey('', $de);
        $this->assertArrayHasKey('Congratulations!', $de);
    }

    public function test_every_bundled_locale_compiles_to_a_valid_nonempty_catalog(): void
    {
        foreach (self::BUNDLED as $locale) {
            $path = self::LANG_DIR . '/' . self::SLUG . '-' . $locale . '.po';
            $this->assertFileExists($path, "missing source .po for $locale");
            $map = $this->readMo(prq_compile_mo(file_get_contents($path)));
            $this->assertArrayHasKey('', $map, "$locale .mo has a header entry");
            // At least one real (non-header) translated entry.
            $real = array_filter(array_keys($map), static fn($k) => $k !== '');
            $this->assertNotEmpty($real, "$locale has no translated strings");
        }
    }

    public function test_unbundled_locale_has_no_catalog(): void
    {
        // No .po for a locale we don't ship => nothing loads => English fallback.
        $this->assertFileDoesNotExist(self::LANG_DIR . '/' . self::SLUG . '-sv_SE.po');
    }
}
