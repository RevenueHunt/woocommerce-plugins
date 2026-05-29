<?php
/**
 * Single-source build for the RevenueHunt WordPress / WooCommerce plugins.
 *
 * One canonical source (src/, in the eCommerce identity) + per-target manifests
 * (targets/<key>/target.json) -> build/<slug>/ distribution artifacts.
 *
 * The eCommerce artifact is a near-identity copy of src/. The WooCommerce
 * artifact is a deterministic transform: a handful of well-scoped token
 * substitutions plus the two WC-only plugin headers. See each target.json.
 *
 * Usage:
 *   php tools/build.php            # build all targets
 *   php tools/build.php ecommerce  # build one target
 */

const ROOT   = __DIR__ . '/..';
// 'js' is included so the block editor script's block name + text domain get the
// same per-target identity substitution as block.json (it carries no class/func
// prefixes, only the slug/display tokens).
const TEXT_EXT = ['php', 'txt', 'md', 'css', 'pot', 'po', 'json', 'html', 'js'];

// Canonical tokens — the identity src/ is authored in (eCommerce).
const CANON = [
    'class'   => 'Product_Recommendation_Quiz_For_Ecommerce',
    'func'    => 'product_recommendation_quiz_for_ecommerce',
    'slug'    => 'product-recommendation-quiz-for-ecommerce',
    'name'    => 'Product Recommendation Quiz for eCommerce',
    'display' => 'eCommerce',
    'channel' => "=> 'wordpress'",
];

/** Recursively delete a directory. */
function rrmdir(string $dir): void {
    if (!is_dir($dir)) return;
    foreach (scandir($dir) as $f) {
        if ($f === '.' || $f === '..') continue;
        $p = "$dir/$f";
        is_dir($p) ? rrmdir($p) : unlink($p);
    }
    rmdir($dir);
}

/** Build the ordered substitution map for a target. */
function repl_map(array $cfg): array {
    return [
        CANON['class']   => $cfg['classPrefix'],
        CANON['func']    => str_replace('-', '_', $cfg['slug']),
        CANON['slug']    => $cfg['slug'],
        CANON['name']    => $cfg['pluginName'],
        CANON['display'] => $cfg['display'],
        CANON['channel'] => "=> '" . $cfg['channel'] . "'",
    ];
}

/** Insert the two WC-only headers immediately after the "Requires PHP" line. */
function insert_wc_headers(string $contents, array $wc): string {
    $lines = '';
    foreach ($wc as $k => $v) {
        $lines .= " * {$k}: {$v}\n";
    }
    return preg_replace(
        '/^( \* Requires PHP:.*\n)/m',
        '$1' . $lines,
        $contents,
        1
    );
}

/** Copy src/ -> dest applying renames + substitutions. */
function copy_tree(string $src, string $dest, array $repl, array $cfg): void {
    $canonMain = CANON['slug'] . '.php';
    $rii = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($src, FilesystemIterator::SKIP_DOTS)
    );
    foreach ($rii as $file) {
        $rel = substr($file->getPathname(), strlen($src) + 1);
        if (basename($rel) === '.DS_Store') continue;

        $destRel  = strtr($rel, [CANON['slug'] => $cfg['slug']]);
        $destPath = "$dest/$destRel";
        @mkdir(dirname($destPath), 0777, true);

        $ext = strtolower($file->getExtension());
        if (in_array($ext, TEXT_EXT, true)) {
            $c = strtr(file_get_contents($file->getPathname()), $repl);
            if ($rel === $canonMain && !empty($cfg['wcHeaders'])) {
                $c = insert_wc_headers($c, $cfg['wcHeaders']);
            }
            file_put_contents($destPath, $c);
        } else {
            copy($file->getPathname(), $destPath);
        }
    }
}

function build_target(string $key): void {
    $cfg  = json_decode(file_get_contents(ROOT . "/targets/$key/target.json"), true);
    $slug = $cfg['slug'];
    $dest = ROOT . "/build/$slug";
    $repl = repl_map($cfg);

    rrmdir($dest);
    mkdir($dest, 0777, true);

    // 1. source tree (renamed + substituted)
    copy_tree(ROOT . '/src', $dest, $repl, $cfg);

    // 2. changelog (per-target, verbatim — distribution-specific history/wording),
    //    LICENSE (shared, verbatim), languages (.pot renamed + substituted)
    copy(ROOT . "/targets/$key/changelog.txt", "$dest/changelog.txt");
    copy(ROOT . '/shared/LICENSE.txt', "$dest/LICENSE.txt");
    @mkdir("$dest/languages", 0777, true);
    foreach (glob(ROOT . '/shared/languages/*.pot') as $pot) {
        file_put_contents("$dest/languages/$slug.pot", strtr(file_get_contents($pot), $repl));
    }

    // Bundled translations: opt-in per target. The eCommerce free plugin relies
    // on translate.wordpress.org language packs (ships the .pot only); the Woo
    // plugin is not on GlotPress, so it ships compiled .mo (+ source .po). The
    // canonical .po (eCommerce identity) is token-substituted like every other
    // text file so its msgids match this target's transformed source strings,
    // then compiled to .mo in pure PHP (no gettext/WP-CLI dependency).
    if (!empty($cfg['bundleTranslations'])) {
        require_once __DIR__ . '/po2mo.php';
        foreach (glob(ROOT . '/shared/languages/*.po') as $po) {
            $locale  = substr(basename($po, '.po'), strlen(CANON['slug']) + 1);
            $po_text = strtr(file_get_contents($po), $repl);
            file_put_contents("$dest/languages/$slug-$locale.po", $po_text);
            file_put_contents("$dest/languages/$slug-$locale.mo", prq_compile_mo($po_text));
        }
    }

    // 3. per-target readmes (verbatim — distribution-specific copy)
    foreach ($cfg['readmes'] as $r) {
        copy(ROOT . "/targets/$key/$r", "$dest/$r");
    }

    // 4. listing assets (screenshots) -> assets/ (per-target; matches shipped layout)
    $la = ROOT . "/targets/$key/listing-assets";
    if (is_dir($la)) {
        @mkdir("$dest/assets", 0777, true);
        foreach (glob("$la/*") as $f) {
            if (basename($f) !== '.DS_Store') copy($f, "$dest/assets/" . basename($f));
        }
    }

    echo "  built build/$slug\n";
}

$only = $argv[1] ?? 'all';
$keys = $only === 'all' ? ['ecommerce', 'woocommerce'] : [$only];
echo "Building: " . implode(', ', $keys) . "\n";
foreach ($keys as $k) build_target($k);
echo "Done.\n";
