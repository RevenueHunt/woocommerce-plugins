<?php

// Only these two V2 fixtures: V1 embed markers and generic helper comments stay.
foreach (['V2BlockEditorTest.php', 'V2StorefrontTest.php'] as $file) {
    $path = __DIR__ . '/../../tests/Characterization/' . $file;
    $source = file_get_contents($path);
    $source = strtr($source, ['Shopping helper' => 'Shopping assistant', 'Store helper' => 'Store assistant', 'Helper' => 'Assistant']);
    $source = preg_replace('/\\bhelper\\b(?=[\'"\/]|\.html)/', 'asst1', $source);
    file_put_contents($path, $source);
}
