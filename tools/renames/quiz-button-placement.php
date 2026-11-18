<?php

// Rename only the V2 placement kind, not the registered block or its directory.
$paths = [
    'src/front/blocks/embed-blocks-editor.js',
    'src/front/blocks/v2-editor.js',
    'src/front/class-product-recommendation-quiz-for-ecommerce-front-embed-blocks.php',
    'src/front/class-product-recommendation-quiz-for-ecommerce-v2-block-editor.php',
    'src/includes/class-product-recommendation-quiz-for-ecommerce-v2-placements.php',
    'tests/Characterization/V2StorefrontTest.php',
];
$hits = 0;
foreach ($paths as $file) {
    $path = __DIR__ . '/../../' . $file;
    $source = file_get_contents($path);
    $updated = str_replace("'chat-button'", "'quiz-button'", $source, $count);
    if ($count) {
        file_put_contents($path, $updated);
        $hits += $count;
    }
}
printf("chat-button → quiz-button: %d hits in %d files\n", $hits, count($paths));
