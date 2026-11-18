<?php

namespace RevenueHunt\PRQ\Tests\Characterization;

use Brain\Monkey\Functions;
use RevenueHunt\PRQ\Tests\TestCase;
use Product_Recommendation_Quiz_For_Ecommerce_V2 as V2;
use Product_Recommendation_Quiz_For_Ecommerce_V2_Storefront as Storefront;
use Product_Recommendation_Quiz_For_Ecommerce_V2_Delivery as Delivery;

final class V2StorefrontTest extends TestCase
{
    private array $options;
    private string $uploads;
    private bool $lockHeld = false;
    private bool $lockAvailable = true;

    protected function setUp(): void
    {
        parent::setUp();
        $this->uploads = sys_get_temp_dir() . '/prq-storefront-' . bin2hex(random_bytes(8));
        mkdir($this->uploads);
        $this->options = [V2::OPTION => ['mode' => 'v2', 'shop' => 'wc-ab12cd', 'shared_secret' => 'prq-v2-test-secret'], Storefront::QUIZZES => [], Storefront::ASSISTANTS => [], Storefront::STOREFRONT => []];
        Functions\when('get_option')->alias(fn($key, $default = false) => $this->options[$key] ?? $default);
        Functions\when('update_option')->alias(function ($key, $value, $autoload) {
            $this->assertTrue($autoload);
            $this->options[$key] = $value;
            return true;
        });
        Functions\when('delete_option')->alias(function ($key) { unset($this->options[$key]); return true; });
        Functions\when('wp_upload_dir')->justReturn(['basedir' => $this->uploads, 'baseurl' => 'https://shop.example/wp-content/uploads']);
        Functions\when('wp_mkdir_p')->alias(fn($dir) => is_dir($dir) || mkdir($dir, 0777, true));
        Functions\when('wp_delete_file')->alias(function ($path) { if (is_file($path)) unlink($path); });
        Functions\when('wp_json_encode')->alias('json_encode');
        Functions\when('esc_attr')->alias(fn($value) => htmlspecialchars((string) $value, ENT_QUOTES));
        Functions\when('esc_html')->alias(fn($value) => htmlspecialchars((string) $value, ENT_QUOTES));
        Functions\when('get_locale')->justReturn('en_US');
        Functions\when('plugins_url')->alias(fn($path) => 'https://shop.example/wp-content/plugins/prq/' . $path);
        Functions\when('wp_cache_delete')->justReturn(true);
        $wpdb = \Mockery::mock();
        $wpdb->shouldReceive('prepare')->with('SELECT GET_LOCK(%s, 10)', 'prq_v2_index')->andReturn('acquire index lock');
        $wpdb->shouldReceive('prepare')->with('SELECT RELEASE_LOCK(%s)', 'prq_v2_index')->andReturn('release index lock');
        $wpdb->shouldReceive('get_var')->with('acquire index lock')->andReturnUsing(function () {
            $this->assertFalse($this->lockHeld);
            if (!$this->lockAvailable) return '0';
            $this->lockHeld = true;
            return '1';
        });
        $wpdb->shouldReceive('get_var')->with('release index lock')->andReturnUsing(function () {
            $this->assertTrue($this->lockHeld);
            $this->lockHeld = false;
            return '1';
        });
        $GLOBALS['wpdb'] = $wpdb;
    }

    protected function tearDown(): void
    {
        foreach (glob($this->uploads . '/prq-v2/*') ?: [] as $file) unlink($file);
        if (is_dir($this->uploads . '/prq-v2')) rmdir($this->uploads . '/prq-v2');
        rmdir($this->uploads);
        $this->assertFalse($this->lockHeld, 'Every acquired index lock must be released.');
        unset($GLOBALS['wpdb']);
        parent::tearDown();
    }

    private function body(): array
    {
        return ['name' => 'Skin finder', 'version' => 'v42', 'runtime' => 1, 'scripts' => false,
            'artifact' => ['format' => 'html', 'html' => '<main>Quiz</main>'],
            'treatment' => ['format' => 'html', 'html' => '<main>Treatment</main>'],
            'experiment' => ['id' => 'exp1']];
    }

    private function request(string $method, string $route, ?array $body = null, ?string $signature = null, ?string $timestamp = null): \WP_REST_Request
    {
        $bytes = $body === null ? '' : json_encode($body);
        $timestamp ??= (string) time();
        $request = \Mockery::mock(\WP_REST_Request::class);
        $request->shouldReceive('get_method')->andReturn($method);
        $request->shouldReceive('get_route')->andReturn($route);
        $request->shouldReceive('get_query_params')->andReturn([]);
        $request->shouldReceive('get_body')->andReturn($bytes);
        $request->shouldReceive('get_json_params')->andReturn($body);
        $request->shouldReceive('get_param')->with('sqid')->andReturn(basename($route));
        $request->shouldReceive('get_header')->with('X-PRQ-Timestamp')->andReturn($timestamp);
        // Independent construction, not the production sign helper.
        $request->shouldReceive('get_header')->with('X-PRQ-Signature')->andReturn($signature ?? 'sha256=' . hash_hmac('sha256', "$timestamp\n$method\n$route\n\n$bytes", 'prq-v2-test-secret'));
        return $request;
    }

    public function test_all_delivery_routes_use_existing_verifier_and_reject_missing_bad_and_stale_signatures(): void
    {
        $routes = [];
        Functions\when('register_rest_route')->alias(function ($namespace, $path, $args) use (&$routes) { $routes[$path . ':' . $args['methods']] = $args; });
        (new V2())->register_routes();
        foreach ([['PUT', '/quizzes/(?P<sqid>[A-Za-z0-9]+)', '/prq/v3/quizzes/abc'], ['DELETE', '/quizzes/(?P<sqid>[A-Za-z0-9]+)', '/prq/v3/quizzes/abc'], ['PUT', '/assistants/(?P<sqid>[A-Za-z0-9]+)', '/prq/v3/assistants/asst1'], ['DELETE', '/assistants/(?P<sqid>[A-Za-z0-9]+)', '/prq/v3/assistants/asst1'], ['PUT', '/storefront', '/prq/v3/storefront'], ['GET', '/storefront', '/prq/v3/storefront']] as [$method, $pattern, $path]) {
            $route = $routes[$pattern . ':' . $method];
            $this->assertSame(V2::class, get_class($route['permission_callback'][0]));
            $this->assertTrue(call_user_func($route['permission_callback'], $this->request($method, $path, $method === 'PUT' ? $this->body() : null)));
            foreach ([['', (string) time()], ['sha256=bad', (string) time()], [null, (string) (time() - 301)]] as [$sig, $time]) {
                $error = call_user_func($route['permission_callback'], $this->request($method, $path, null, $sig, $time));
                $this->assertSame(403, $error->get_error_data()['status']);
            }
        }
    }

    public function test_quiz_push_and_delete_store_both_envelopes_and_small_autoloaded_index(): void
    {
        $store = new Storefront();
        $body = $this->body();
        $request = $this->request('PUT', '/prq/v3/quizzes/abc', $body);
        $this->assertTrue((new V2())->authorize($request));
        $this->assertSame(['ok' => true], $store->put_quiz($request));
        $path = $this->uploads . '/prq-v2/quiz-abc';
        $this->assertSame($body['artifact'], json_decode(file_get_contents($path . '.html.json'), true));
        $this->assertSame($body['treatment'], json_decode(file_get_contents($path . '-treatment.html.json'), true));
        $this->assertSame(['name' => 'Skin finder', 'version' => 'v42', 'runtime' => 1, 'scripts' => false, 'experiment' => ['id' => 'exp1']], $this->options[Storefront::QUIZZES]['abc']);
        $this->assertSame([], glob($this->uploads . '/prq-v2/.prq-*'));
        $body['treatment'] = null;
        $body['experiment'] = null;
        $store->put_quiz($this->request('PUT', '/prq/v3/quizzes/abc', $body));
        $this->assertFileDoesNotExist($path . '-treatment.html.json');
        $store->delete_quiz($this->request('DELETE', '/prq/v3/quizzes/abc'));
        $this->assertFileDoesNotExist($path . '.html.json');
        $this->assertSame([], $this->options[Storefront::QUIZZES]);
    }

    #[\PHPUnit\Framework\Attributes\RunInSeparateProcess]
    #[\PHPUnit\Framework\Attributes\PreserveGlobalState(false)]
    public function test_assistant_push_rollout_and_delete_store_only_shell_and_public_metadata(): void
    {
        Functions\expect('wp_enqueue_script_module')->times(3)->with('prq-v2-quiz-renderer', 'https://shop.example/wp-content/plugins/prq/assets/v2/quiz-renderer.js', [], PRQ_PLUGIN_VERSION);
        Functions\expect('wp_enqueue_script')->never();
        $store = new Storefront();
        $body = ['name' => 'Shopping assistant', 'version' => 'assistant-v1', 'runtime' => 1,
            'shell' => '<main>Welcome! How can I help?</main>', 'experiment' => null,
            'instructions' => 'PRIVATE INSTRUCTIONS', 'skills' => ['PRIVATE SKILL']];
        $request = $this->request('PUT', '/prq/v3/assistants/asst1', $body);
        $this->assertTrue((new V2())->authorize($request));
        $this->assertSame(['ok' => true], $store->put_assistant($request));
        $path = $this->uploads . '/prq-v2/assistant-asst1.html';
        $this->assertSame($body['shell'], file_get_contents($path));
        $this->assertSame(['name' => 'Shopping assistant', 'version' => 'assistant-v1', 'runtime' => 1, 'experiment' => null], $this->options[Storefront::ASSISTANTS]['asst1']);
        $this->assertSame([], glob($this->uploads . '/prq-v2/.prq-*'));
        $delivery = new Delivery();
        $this->assertSame('<div data-prq-assistant="asst1"></div>', $delivery->piece('assistant', ['assistantId' => 'asst1']));
        ob_start(); $delivery->footer(); $html = ob_get_clean();
        $data = json_decode(strip_tags($html), true, 512, JSON_THROW_ON_ERROR);
        $this->assertSame(['src' => 'https://shop.example/wp-content/uploads/prq-v2/assistant-asst1.html?v=assistant-v1', 'runtime' => 1], $data['assistants']['asst1']);
        $this->assertStringNotContainsString('PRIVATE', $html);

        $body['shell'] = null;
        $body['version'] = 'rollout-v2';
        $body['experiment'] = ['id' => 'rollout1', 'trafficSplit' => 50];
        $this->assertSame(['ok' => true], $store->put_assistant($this->request('PUT', '/prq/v3/assistants/asst1', $body)));
        $this->assertFileDoesNotExist($path);
        $this->assertSame(['name' => 'Shopping assistant', 'version' => 'rollout-v2', 'runtime' => 1, 'experiment' => $body['experiment']], $this->options[Storefront::ASSISTANTS]['asst1']);
        $delivery = new Delivery();
        $delivery->piece('assistant', []);
        ob_start(); $delivery->footer(); $data = json_decode(strip_tags(ob_get_clean()), true, 512, JSON_THROW_ON_ERROR);
        $this->assertSame(['src' => null, 'runtime' => 1], $data['assistants']['asst1']);

        $body['shell'] = '<main>Rollout finished</main>';
        $body['experiment'] = null;
        $body['version'] = 'assistant-v2';
        $store->put_assistant($this->request('PUT', '/prq/v3/assistants/asst1', $body));
        $this->assertSame($body['shell'], file_get_contents($path));
        // Missing local files must fall back to V2 even outside a rollout.
        unlink($path);
        $delivery = new Delivery();
        $delivery->piece('assistant', []);
        ob_start(); $delivery->footer(); $data = json_decode(strip_tags(ob_get_clean()), true, 512, JSON_THROW_ON_ERROR);
        $this->assertSame(['src' => null, 'runtime' => 1], $data['assistants']['asst1']);
        $store->put_assistant($this->request('PUT', '/prq/v3/assistants/asst1', $body));
        $this->assertSame(['ok' => true], $store->delete_assistant($this->request('DELETE', '/prq/v3/assistants/asst1')));
        $this->assertFileDoesNotExist($path);
        $this->assertSame([], $this->options[Storefront::ASSISTANTS]);
    }

    public function test_storefront_roundtrip_finds_shortcode_nested_blocks_template_part_reusable_block_and_widget(): void
    {
        $settings = ['defaultQuiz' => 'abc', 'defaultAssistant' => 'asst1', 'siteWide' => ['popupLinks' => true, 'assistant' => ['enabled' => true]], 'overPlanAt' => null, 'customFeaturesBlockedAt' => null];
        $store = new Storefront();
        $this->assertSame(['ok' => true], $store->put_storefront($this->request('PUT', '/prq/v3/storefront', $settings)));
        $this->assertSame($settings, $this->options[Storefront::STOREFRONT]);
        $store->put_storefront($this->request('PUT', '/prq/v3/storefront', $settings + ['assistants' => [['id' => 'obsolete', 'name' => 'Not a second index']]]));
        $this->assertArrayNotHasKey('assistants', $this->options[Storefront::STOREFRONT]);
        $store->put_assistant($this->request('PUT', '/prq/v3/assistants/asst1', ['name' => 'Store assistant', 'version' => 'assistant-v1', 'runtime' => 1, 'shell' => '<main>Assistant</main>', 'experiment' => null]));
        $store->put_quiz($this->request('PUT', '/prq/v3/quizzes/abc', $this->body()));
        $content = '[product_recommendation_quiz id="abc"]<!-- wp:group --><!-- wp:revenuehunt/product-recommendation-quiz-for-ecommerce {"id":"nested"} /--><!-- /wp:group -->';
        $block = fn($name, $attrs = [], $children = []) => ['blockName' => $name, 'attrs' => $attrs, 'innerBlocks' => $children];
        $parsed = [
            $content => [$block('core/group', [], [$block('revenuehunt/product-recommendation-quiz-for-ecommerce', ['id' => 'nested'])])],
            '<!-- wp:revenuehunt/link-popup-quiz /-->' => [$block('revenuehunt/link-popup-quiz')],
            '<!-- wp:revenuehunt/assistant {"assistantId":"asst1"} /-->' => [$block('revenuehunt/assistant', ['assistantId' => 'asst1'])],
            '<!-- wp:revenuehunt/chat-button-quiz {"quizId":"widget"} /-->' => [$block('revenuehunt/chat-button-quiz', ['quizId' => 'widget'])],
        ];
        Functions\when('parse_blocks')->alias(fn($text) => $parsed[$text]);
        Functions\when('has_shortcode')->alias(fn($text, $tag) => str_contains($text, '[' . $tag));
        Functions\when('get_shortcode_regex')->justReturn('(\\[?)\\[(product_recommendation_quiz)([^\\]]*)\\](?:()())(\\]?)');
        Functions\when('shortcode_parse_atts')->justReturn(['id' => 'abc']);
        Functions\when('get_permalink')->alias(fn($id) => 'https://shop.example/?p=' . $id);
        $this->options['widget_block'] = [2 => ['content' => array_keys($parsed)[3]], '_multiwidget' => 1];
        $wpdb = \Mockery::mock();
        $wpdb->posts = 'wp_posts';
        $wpdb->shouldReceive('esc_like')->with('product_recommendation_quiz')->once()->andReturn('product\\_recommendation\\_quiz');
        $wpdb->shouldReceive('esc_like')->with('wp:revenuehunt/')->once()->andReturn('wp:revenuehunt/');
        $wpdb->shouldReceive('prepare')->once()->with(\Mockery::on(function ($sql) {
            $this->assertStringContainsString("post_status = 'publish'", $sql);
            $this->assertStringContainsString("'post', 'page', 'wp_template', 'wp_template_part', 'wp_block'", $sql);
            $this->assertSame(2, substr_count($sql, 'LIKE %s'));
            return true;
        }), '%product\\_recommendation\\_quiz%', '%wp:revenuehunt/%')->andReturn('candidate query');
        $wpdb->shouldReceive('get_results')->once()->with('candidate query')->andReturn([
            (object) ['ID' => 1, 'post_type' => 'page', 'post_title' => 'Finder', 'post_content' => $content],
            (object) ['ID' => 2, 'post_type' => 'wp_template_part', 'post_title' => 'Header', 'post_content' => array_keys($parsed)[1]],
            (object) ['ID' => 3, 'post_type' => 'wp_block', 'post_title' => 'Assistant', 'post_content' => array_keys($parsed)[2]],
        ]);
        $GLOBALS['wpdb'] = $wpdb;
        $result = $store->get_storefront();
        $this->assertSame(1, $result['runtime']);
        $this->assertEquals((object) ['abc' => 'v42'], $result['quizzes']);
        $this->assertEquals((object) ['asst1' => 'assistant-v1'], $result['assistants']);
        $this->assertSame(['inline', 'shortcode', 'link-popup', 'assistant', 'chat-button'], array_column($result['placements'], 'kind'));
        $this->assertSame(['nested', 'abc', '', null, 'widget'], array_column($result['placements'], 'quizId'));
        $this->assertSame([null, null, null, 'asst1', null], array_column($result['placements'], 'assistantId'));
        $this->assertSame(['kind', 'quizId', 'assistantId', 'postId', 'postType', 'title', 'url'], array_keys($result['placements'][0]));
        $this->assertSame([1, 1, 2, 3, null], array_column($result['placements'], 'postId'));
    }

    #[\PHPUnit\Framework\Attributes\RunInSeparateProcess]
    #[\PHPUnit\Framework\Attributes\PreserveGlobalState(false)]
    public function test_v2_outputs_id_only_mounts_once_only_safe_json_and_only_local_module(): void
    {
        Functions\expect('wp_enqueue_script_module')->once()->with('prq-v2-quiz-renderer', 'https://shop.example/wp-content/plugins/prq/assets/v2/quiz-renderer.js', [], PRQ_PLUGIN_VERSION);
        Functions\expect('wp_enqueue_script')->never();
        $this->options[Storefront::STOREFRONT] = ['defaultQuiz' => 'abc', 'defaultAssistant' => 'asst1', 'siteWide' => ['popupLinks' => true], 'overPlanAt' => '</script><script>bad</script>'];
        $store = new Storefront();
        $store->put_quiz($this->request('PUT', '/prq/v3/quizzes/abc', $this->body()));
        $delivery = new Delivery();
        ob_start(); $delivery->footer(); $this->assertSame('', ob_get_clean());
        $delivery->site_wide();
        $this->assertSame('<div data-prq-quiz="" data-prq-height="600px"></div>', $delivery->render([]));
        $this->assertSame('<div data-prq-quiz="abc" data-prq-height="80vh" data-prq-fixed-height data-prq-full-width></div>', $delivery->render(['id' => 'abc', 'height' => 80, 'height_unit' => 'vh', 'fixed_height' => true, 'full_width' => true]));
        $blocks = new \Product_Recommendation_Quiz_For_Ecommerce_Front_Embed_Blocks($delivery);
        $this->assertSame('<a href="#quiz" class="wp-element-button">Take the quiz</a>', $blocks->render_link_popup([]));
        $this->assertSame('<div data-prq-assistant="asst1"></div>', $blocks->render_assistant(['assistantId' => 'asst1']));
        $this->assertStringContainsString('data-prq-piece="chatButton"', $blocks->render_chat_button(['quizId' => 'abc']));
        $this->assertStringContainsString('data-prq-piece="automaticPopup"', $blocks->render_auto_popup([]));
        ob_start(); $delivery->footer(); $delivery->footer(); $html = ob_get_clean();
        $this->assertSame(1, substr_count($html, 'id="prq-v2-store"'));
        $this->assertSame(1, substr_count($html, '</script>'));
        $data = json_decode(strip_tags($html), true, 512, JSON_THROW_ON_ERROR);
        $this->assertSame('wc-ab12cd', $data['shop']);
        $this->assertSame('en_US', $data['locale']);
        $this->assertSame(1, $data['runtime']);
        $this->assertSame('abc', $data['defaultQuiz']);
        $this->assertSame(['popupLinks' => true], $data['siteWide']);
        $this->assertSame('https://shop.example/wp-content/uploads/prq-v2/quiz-abc.html.json?v=v42', $data['quizzes']['abc']['src']);
        $this->assertSame('https://shop.example/wp-content/uploads/prq-v2/quiz-abc-treatment.html.json?v=v42-exp1', $data['quizzes']['abc']['treatmentSrc']);
        $this->assertStringNotContainsString('shared_secret', $html);
    }

    public function test_quiz_and_assistant_updates_read_fresh_indexes_inside_the_lock(): void
    {
        // Model another request's stale per-option, autoload and missing-option caches.
        // This is a fresh-read/serialization contract test, not parallel MySQL execution.
        $cache = [];
        $invalidations = [];
        Functions\when('wp_cache_delete')->alias(function ($key, $group) use (&$cache, &$invalidations) {
            $this->assertTrue($this->lockHeld);
            $this->assertSame('options', $group);
            $invalidations[] = $key;
            unset($cache[$key]);
            return true;
        });
        Functions\when('get_option')->alias(function ($key, $default = false) use (&$cache) {
            $this->assertTrue($this->lockHeld);
            if (isset($cache['notoptions'][$key])) return $default;
            return $cache['alloptions'][$key] ?? $cache[$key] ?? $this->options[$key] ?? $default;
        });
        $store = new Storefront();
        $expectedInvalidations = [];
        foreach ([Storefront::QUIZZES => 'quiz', Storefront::ASSISTANTS => 'assistant'] as $name => $type) {
            for ($i = 0; $i < 4; $i++) array_push($expectedInvalidations, $name, 'alloptions', 'notoptions');
            $put = $type === 'quiz' ? 'put_quiz' : 'put_assistant';
            $delete = $type === 'quiz' ? 'delete_quiz' : 'delete_assistant';
            $route = '/prq/v3/' . ($type === 'quiz' ? 'quizzes' : 'assistants') . '/';
            $body = $type === 'quiz' ? $this->body() : ['name' => 'Assistant', 'version' => 'v1', 'runtime' => 1, 'shell' => '<main>Hello</main>', 'experiment' => null];
            $cache = [$name => [], 'alloptions' => [$name => []], 'notoptions' => [$name => true]];
            $this->assertSame(['ok' => true], $store->$put($this->request('PUT', $route . 'A', $body)));
            $cache = [$name => [], 'alloptions' => [$name => []], 'notoptions' => [$name => true]];
            $this->assertSame(['ok' => true], $store->$put($this->request('PUT', $route . 'B', $body)));
            $this->assertSame(['A', 'B'], array_keys($this->options[$name]));
            $beforeDelete = $this->options[$name];
            $cache = [$name => ['A' => $beforeDelete['A']], 'alloptions' => [$name => ['A' => $beforeDelete['A']]]];
            $this->assertSame(['ok' => true], $store->$delete($this->request('DELETE', $route . 'A')));
            $this->assertSame(['B'], array_keys($this->options[$name]));
            $cache = [$name => $beforeDelete, 'alloptions' => [$name => $beforeDelete]];
            $this->assertSame(['ok' => true], $store->$put($this->request('PUT', $route . 'C', $body)));
            $this->assertSame(['B', 'C'], array_keys($this->options[$name]));
        }
        $this->assertSame($expectedInvalidations, $invalidations);
    }

    public function test_contended_index_lock_returns_retryable_503_before_mutating_files_or_options(): void
    {
        $this->lockAvailable = false;
        Functions\expect('wp_cache_delete')->never();
        Functions\expect('wp_upload_dir')->never();
        Functions\expect('update_option')->never();
        $store = new Storefront();
        foreach (['put_quiz', 'delete_quiz', 'put_assistant', 'delete_assistant'] as $method) {
            $body = str_contains($method, 'assistant') ? ['name' => 'Assistant', 'version' => 'v1', 'runtime' => 1, 'shell' => '<main>Hello</main>', 'experiment' => null] : $this->body();
            $error = $store->$method($this->request('PUT', '/prq/v3/unused/A', $body));
            $this->assertSame(503, $error->get_error_data()['status']);
        }
    }

    public function test_index_lock_is_released_after_a_file_write_failure(): void
    {
        Functions\when('wp_mkdir_p')->justReturn(false);
        $store = new Storefront();
        $error = $store->put_quiz($this->request('PUT', '/prq/v3/quizzes/A', $this->body()));
        $this->assertSame(500, $error->get_error_data()['status']);
        $this->assertFalse($this->lockHeld);
        $error = $store->put_assistant($this->request('PUT', '/prq/v3/assistants/A', ['name' => 'Assistant', 'version' => 'v1', 'runtime' => 1, 'shell' => '<main>Hello</main>', 'experiment' => null]));
        $this->assertSame(500, $error->get_error_data()['status']);
        $this->assertFalse($this->lockHeld);
    }

    #[\PHPUnit\Framework\Attributes\RunInSeparateProcess]
    #[\PHPUnit\Framework\Attributes\PreserveGlobalState(false)]
    public function test_successive_experiments_with_the_same_control_have_different_treatment_urls(): void
    {
        Functions\expect('wp_enqueue_script_module')->twice();
        $store = new Storefront();
        $body = $this->body();
        $urls = [];
        $controls = [];
        foreach (['exp1', 'exp2'] as $experiment) {
            $body['experiment']['id'] = $experiment;
            $store->put_quiz($this->request('PUT', '/prq/v3/quizzes/abc', $body));
            $delivery = new Delivery();
            $delivery->render(['id' => 'abc']);
            ob_start(); $delivery->footer(); $data = json_decode(strip_tags(ob_get_clean()), true);
            $urls[] = $data['quizzes']['abc']['treatmentSrc'];
            $controls[] = $data['quizzes']['abc']['src'];
        }
        $this->assertSame($controls[0], $controls[1]);
        $this->assertStringEndsWith('?v=v42-exp1', $urls[0]);
        $this->assertStringEndsWith('?v=v42-exp2', $urls[1]);
        $this->assertNotSame($urls[0], $urls[1]);
    }

    public function test_uninstall_removes_public_copies_and_all_storefront_options(): void
    {
        $store = new Storefront();
        $store->put_quiz($this->request('PUT', '/prq/v3/quizzes/abc', $this->body()));
        $store->put_assistant($this->request('PUT', '/prq/v3/assistants/asst1', ['name' => 'Assistant', 'version' => 'v1', 'runtime' => 1, 'shell' => '<main>Assistant</main>', 'experiment' => null]));
        Storefront::uninstall();
        $this->assertDirectoryDoesNotExist($this->uploads . '/prq-v2');
        $this->assertArrayNotHasKey(Storefront::QUIZZES, $this->options);
        $this->assertArrayNotHasKey(Storefront::ASSISTANTS, $this->options);
        $this->assertArrayNotHasKey(Storefront::STOREFRONT, $this->options);
    }
}
