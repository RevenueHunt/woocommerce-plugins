<?php

// V2 editor label only. Regenerate the translation template with composer i18n:pot.
$paths = [
    'src/front/blocks/v2-editor.js',
    'src/front/class-product-recommendation-quiz-for-ecommerce-v2-block-editor.php',
    'tests/Characterization/V2BlockEditorTest.php',
];
$hits = 0;
foreach ($paths as $file) {
    $path = __DIR__ . '/../../' . $file;
    $source = file_get_contents($path);
    $updated = str_replace('RevenueHunt Chat Button', 'RevenueHunt Quiz Button', $source, $count);
    if ($count) {
        file_put_contents($path, $updated);
        $hits += $count;
    }
}
printf("RevenueHunt Chat Button → RevenueHunt Quiz Button: %d hits in %d files\n", $hits, count($paths));
