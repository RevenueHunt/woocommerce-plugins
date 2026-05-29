<?php
/**
 * Self-contained .po -> .mo compiler (pure PHP, no gettext/WP-CLI dependency).
 *
 * The build calls prq_compile_mo() so generating the bundled Woo .mo files needs
 * no external tooling — building an artifact stays portable. The .po files in
 * shared/languages/ are the committed source; .mo are build outputs.
 *
 * Scope matches the plugin's needs: singular msgid/msgstr entries plus the
 * header (msgid ""). No plural/context support — the plugin uses neither, and
 * keeping it minimal avoids shipping a half-built gettext implementation.
 *
 * CLI: php tools/po2mo.php <in.po> <out.mo>
 */

/**
 * Parse a .po string into an ordered [msgid => msgstr] map (header included as
 * the '' entry). Untranslated entries (empty msgstr) are skipped, except the
 * header. Multi-line strings and standard escapes are handled.
 *
 * @param string $po Raw .po contents.
 * @return array<string, string>
 */
function prq_parse_po(string $po): array {
    $entries = [];
    $field   = null;
    $msgid   = null;
    $msgstr  = null;
    $fuzzy   = false;
    $flush = static function () use (&$entries, &$msgid, &$msgstr, &$fuzzy) {
        // Keep the header ('') always; keep others only when translated.
        if ($msgid !== null && $msgstr !== null && ($msgid === '' || $msgstr !== '')) {
            $entries[$msgid] = $msgstr;
        }
        $msgid = $msgstr = null;
        $fuzzy = false;
    };
    foreach (explode("\n", $po) as $line) {
        if ($line !== '' && $line[0] === '#') {
            if (strpos($line, ',') !== false && strpos($line, 'fuzzy') !== false) {
                $fuzzy = true;
            }
            continue;
        }
        if (preg_match('/^msgid "(.*)"$/', $line, $m)) {
            $flush();
            $field = 'id';
            $msgid = prq_po_unescape($m[1]);
            continue;
        }
        if (preg_match('/^msgstr "(.*)"$/', $line, $m)) {
            $field  = 'str';
            $msgstr = prq_po_unescape($m[1]);
            continue;
        }
        if (preg_match('/^"(.*)"$/', $line, $m)) {
            if ($field === 'id')  { $msgid  .= prq_po_unescape($m[1]); }
            if ($field === 'str') { $msgstr .= prq_po_unescape($m[1]); }
            continue;
        }
        if (trim($line) === '') {
            // A fuzzy entry is treated as untranslated for runtime safety.
            if ($fuzzy && $msgid !== '') { $msgstr = ''; }
            $flush();
        }
    }
    if ($fuzzy && $msgid !== '') { $msgstr = ''; }
    $flush();
    return $entries;
}

/**
 * Unescape a .po quoted string segment.
 *
 * @param string $s Escaped segment.
 * @return string
 */
function prq_po_unescape(string $s): string {
    return strtr($s, array( '\\n' => "\n", '\\t' => "\t", '\\r' => "\r", '\\"' => '"', '\\\\' => '\\' ));
}

/**
 * Compile a parsed [msgid => msgstr] map into the binary .mo format.
 *
 * Little-endian, revision 0, originals sorted (gettext convention). No hash
 * table (size zero), but its offset is set just past the translations index
 * table: WordPress derives the translations-table length from
 * (hash_addr - translations_lengths_addr) and rejects the file unless that
 * equals total*8, so hash_addr must point at the string blob, not 0.
 *
 * @param array<string, string> $entries Ordered translations (header as '').
 * @return string Binary .mo contents.
 */
function prq_build_mo(array $entries): string {
    ksort($entries, SORT_STRING);
    $ids    = array_keys($entries);
    $strs   = array_values($entries);
    $count  = count($entries);

    // Layout: 7 uint32 header, then original + translation offset tables
    // (each entry: uint32 length, uint32 offset), then the string blob.
    $header_size  = 7 * 4;
    $table_size   = $count * 8;
    $ids_table    = $header_size;
    $strs_table   = $ids_table + $table_size;
    $blob_start   = $strs_table + $table_size;

    $id_offsets  = '';
    $str_offsets = '';
    $blob        = '';

    foreach ($ids as $id) {
        $id_offsets .= pack('VV', strlen($id), $blob_start + strlen($blob));
        $blob       .= $id . "\0";
    }
    foreach ($strs as $str) {
        $str_offsets .= pack('VV', strlen($str), $blob_start + strlen($blob));
        $blob        .= $str . "\0";
    }

    $header = pack(
        'VVVVVVV',
        0x950412de,  // magic
        0,           // revision
        $count,      // number of strings
        $ids_table,  // offset of originals table
        $strs_table, // offset of translations table
        0,           // hash table size (no hash table)
        $blob_start  // hash table offset == end of translations table (= string blob)
    );

    return $header . $id_offsets . $str_offsets . $blob;
}

/**
 * Compile .po text to .mo binary.
 *
 * @param string $po Raw .po contents.
 * @return string Binary .mo contents.
 */
function prq_compile_mo(string $po): string {
    return prq_build_mo(prq_parse_po($po));
}

// CLI entry point (only when run directly, not when required by the build).
if (isset($argv[0]) && realpath($argv[0]) === __FILE__) {
    if ($argc < 3) {
        fwrite(STDERR, "usage: php tools/po2mo.php <in.po> <out.mo>\n");
        exit(1);
    }
    file_put_contents($argv[2], prq_compile_mo(file_get_contents($argv[1])));
    echo "✓ compiled {$argv[2]}\n";
}
