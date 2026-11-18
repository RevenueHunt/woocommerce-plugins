<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_V2 as V2;
use Product_Recommendation_Quiz_For_Ecommerce_V2_Storefront as Storefront;
use Product_Recommendation_Quiz_For_Ecommerce_V2_Delivery as Delivery;
use Product_Recommendation_Quiz_For_Ecommerce_V2_Block_Editor as Editor;

final class V2BlockEditorTest extends TestCase
{
    #[\PHPUnit\Framework\Attributes\RunInSeparateProcess]
    #[\PHPUnit\Framework\Attributes\PreserveGlobalState(false)]
    public function test_v2_registers_five_dynamic_searchable_blocks_with_preloaded_names(): void
    {
        $options = [
            V2::OPTION => ['mode' => 'v2', 'shop' => 'wc-test'],
            Storefront::QUIZZES => ['abc' => ['name' => 'Skin finder']],
            Storefront::ASSISTANTS => ['asst1' => ['name' => 'Shopping assistant', 'version' => 'v1', 'runtime' => 1, 'experiment' => null]],
            Storefront::STOREFRONT => ['assistants' => [['id' => 'obsolete', 'name' => 'Ignored legacy list']]],
        ];
        Functions\when('get_option')->alias(fn($key, $default = false) => $options[$key] ?? $default);
        Functions\when('plugin_dir_url')->justReturn('https://shop.example/wp-content/plugins/prq/front/');
        Functions\when('admin_url')->alias(fn($path) => 'https://shop.example/wp-admin/' . $path);
        Functions\expect('wp_remote_get')->never();
        Functions\when('wp_register_script')->alias(function ($handle, $src, $deps) {
            if ($handle !== Editor::HANDLE) $this->assertContains(Editor::HANDLE, $deps);
        });
        Functions\when('wp_localize_script')->alias(function ($handle, $object, $data) {
            if ($handle !== Editor::HANDLE) return;
            $this->assertSame('prqV2BlocksData', $object);
            $this->assertSame('v2', $data['mode']);
            $this->assertTrue($data['connected']);
            $this->assertSame('Skin finder', $data['quizzes']->abc['name']);
            $this->assertSame([['id' => 'asst1', 'name' => 'Shopping assistant']], $data['assistants']);
            $this->assertSame('https://shop.example/wp-admin/admin.php?page=prqfw', $data['editUrl']);
        });
        $registered = [];
        Functions\when('register_block_type')->alias(function ($dir, $args) use (&$registered) {
            $metadata = json_decode(file_get_contents($dir . '/block.json'), true);
            $this->assertSame(3, $metadata['apiVersion']);
            $this->assertIsCallable($args['render_callback']);
            $this->assertContains('widgets', [$metadata['category']]);
            $registered[$metadata['name']] = $args['title'] ?? $metadata['title'];
            $keywords = $args['keywords'] ?? $metadata['keywords'];
            foreach (['recommendation', 'assistant', 'chat', 'revenuehunt'] as $keyword) $this->assertContains($keyword, $keywords);
            foreach (['quiz', 'product finder'] as $keyword) {
                if ($metadata['name'] === 'revenuehunt/assistant') $this->assertNotContains($keyword, $keywords);
                else $this->assertContains($keyword, $keywords);
            }
        });
        $delivery = new Delivery();
        (new \Product_Recommendation_Quiz_For_Ecommerce_Front_Block($delivery))->register();
        (new \Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Blocks($delivery))->register();
        $this->assertSame([
            'revenuehunt/product-recommendation-quiz-for-ecommerce' => 'RevenueHunt Quiz',
            'revenuehunt/assistant' => 'RevenueHunt Assistant',
            'revenuehunt/auto-popup-quiz' => 'RevenueHunt Automatic Popup',
            'revenuehunt/chat-button-quiz' => 'RevenueHunt Quiz Button',
            'revenuehunt/link-popup-quiz' => 'RevenueHunt Popup Button',
        ], $registered);
    }
}
