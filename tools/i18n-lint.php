<?php
/**
 * i18n lint: catch split / fragmented translatable strings.
 *
 * WPCS's WordPress.WP.I18n sniffs already enforce the correct text domain and
 * well-formed calls. They do NOT catch sentences split across multiple
 * translation calls — the anti-pattern this phase removed (e.g. a sentence
 * chained as esc_html_e('... under ') . <a>..</a> . esc_html_e(' to finish.')).
 *
 * The reliable tell of such a fragment is leading/trailing whitespace on the
 * translatable literal ('... under ', ' to finish.', 'Check out '): whole
 * sentences never need it. This scans src/ for translation calls whose first
 * string argument has surrounding whitespace and fails if any remain, so a
 * future split sentence can't slip back in.
 *
 * Usage: php tools/i18n-lint.php [<dir> ...]   (defaults to src/)
 */

$dirs = array_slice($argv, 1);
if (!$dirs) {
    $dirs = array(__DIR__ . '/../src');
}

// Translation functions whose FIRST argument is the translatable string.
const I18N_FUNCS = array(
    '__', '_e', 'esc_html__', 'esc_html_e', 'esc_attr__', 'esc_attr_e',
    'esc_textarea__', '_x', '_ex', 'esc_html_x', 'esc_attr_x', '_n', '_nx',
);

$findings = array();

foreach ($dirs as $dir) {
    $rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir, FilesystemIterator::SKIP_DOTS));
    foreach ($rii as $file) {
        if (strtolower($file->getExtension()) !== 'php') {
            continue;
        }
        $tokens = token_get_all(file_get_contents($file->getPathname()));
        $n      = count($tokens);
        for ($i = 0; $i < $n; $i++) {
            $tok = $tokens[$i];
            if (!is_array($tok) || $tok[0] !== T_STRING || !in_array($tok[1], I18N_FUNCS, true)) {
                continue;
            }
            // Next significant token must be '(' for this to be a call.
            $j = $i + 1;
            while ($j < $n && is_array($tokens[$j]) && $tokens[$j][0] === T_WHITESPACE) {
                $j++;
            }
            if ($j >= $n || $tokens[$j] !== '(') {
                continue;
            }
            // First significant token inside the call should be the string literal.
            $k = $j + 1;
            while ($k < $n && is_array($tokens[$k]) && $tokens[$k][0] === T_WHITESPACE) {
                $k++;
            }
            if ($k >= $n || !is_array($tokens[$k]) || $tokens[$k][0] !== T_CONSTANT_ENCAPSED_STRING) {
                continue; // dynamic/concatenated first arg — not our concern here.
            }
            $raw   = $tokens[$k][1];
            $value = substr($raw, 1, -1); // strip surrounding quotes
            if ($value !== '' && $value !== trim($value)) {
                $rel = str_replace(dirname(__DIR__) . '/', '', $file->getPathname());
                $findings[] = sprintf('%s:%d  %s(%s …)', $rel, $tok[2], $tok[1], $raw);
            }
        }
    }
}

if ($findings) {
    fwrite(STDERR, "✗ i18n-lint: split/fragmented translatable strings (leading/trailing whitespace).\n");
    fwrite(STDERR, "  Merge the sentence into one string and inject links/values via sprintf() %s.\n\n");
    foreach ($findings as $f) {
        fwrite(STDERR, "  $f\n");
    }
    exit(1);
}

echo "✓ i18n-lint: no split/fragmented translatable strings\n";
