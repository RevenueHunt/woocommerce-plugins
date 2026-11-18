<?php

// V2 only: the siteWide key and the data-prq-piece value intentionally match.
$paths = [
    'src/front/class-product-recommendation-quiz-for-ecommerce-v2-delivery.php',
    'src/front/class-product-recommendation-quiz-for-ecommerce-front-embed-blocks.php',
    'tests/Characterization/V2StorefrontTest.php',
];
$hits = 0;
foreach ($paths as $file) {
    $path = __DIR__ . '/../../' . $file;
    $source = file_get_contents($path);
    $updated = preg_replace('/\bchatButton\b/', 'quizButton', $source, -1, $count);
    if ($count) {
        file_put_contents($path, $updated);
        $hits += $count;
    }
}
printf("chatButton → quizButton: %d hits in %d files\n", $hits, count($paths));
