<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use PHPUnit\Framework\TestCase;

final class BuildRuntimeGuardTest extends TestCase
{
    private function assertBuildRejected(string $entry, ?string $manifest, string $message): void
    {
        // Run the real build entry in a disposable source tree, never mutate src/.
        $root = sys_get_temp_dir() . '/prq-build-guard-' . bin2hex(random_bytes(8));
        mkdir($root . '/tools', 0777, true);
        mkdir($root . '/src/assets/v2', 0777, true);
        copy(dirname(__DIR__, 2) . '/tools/build.php', $root . '/tools/build.php');
        file_put_contents($root . '/src/assets/v2/quiz-renderer.js', $entry);
        if ($manifest !== null) file_put_contents($root . '/src/assets/v2/runtime.json', $manifest);
        try {
            exec(escapeshellarg(PHP_BINARY) . ' ' . escapeshellarg($root . '/tools/build.php') . ' all 2>&1', $output, $status);
            $this->assertSame(1, $status);
            $this->assertStringContainsString($message, implode("\n", $output));
            $this->assertDirectoryDoesNotExist($root . '/build');
        } finally {
            unlink($root . '/tools/build.php');
            unlink($root . '/src/assets/v2/quiz-renderer.js');
            if ($manifest !== null) unlink($root . '/src/assets/v2/runtime.json');
            rmdir($root . '/src/assets/v2');
            rmdir($root . '/src/assets');
            rmdir($root . '/src');
            rmdir($root . '/tools');
            rmdir($root);
        }
    }

    public function test_build_rejects_the_committed_placeholder_before_producing_artifacts(): void
    {
        $this->assertBuildRejected('/** PRQ_V2_RUNTIME_PLACEHOLDER */', '{"runtime":1}', 'still a placeholder');
    }

    public function test_build_rejects_a_missing_runtime_manifest_before_producing_artifacts(): void
    {
        $this->assertBuildRejected('export {};', null, 'runtime.json is missing');
    }
}
