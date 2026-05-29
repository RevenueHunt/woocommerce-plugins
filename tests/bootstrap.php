<?php
/**
 * PHPUnit bootstrap for the characterization suite.
 *
 * Docker is not required: instead of a full WordPress, we define the small set
 * of deterministic WP helper stubs + classes that the plugin's token-intake
 * functions touch, then load src/ with PRQ_SKIP_BOOTSTRAP so the file's
 * function/constant definitions are available without booting the plugin.
 *
 * Stateful WP functions (get_option/get_transient/set_transient/update_option)
 * are deliberately NOT defined here — Brain Monkey mocks them per test.
 */

require_once dirname(__DIR__) . '/vendor/autoload.php';

define('PRQ_SKIP_BOOTSTRAP', true);
if (!defined('WPINC'))            define('WPINC', 'wp-includes');
if (!defined('MINUTE_IN_SECONDS')) define('MINUTE_IN_SECONDS', 60);

/* ---- deterministic helper stubs (not the behavior under test) ---- */
if (!function_exists('register_activation_hook'))   { function register_activation_hook($f, $c) {} }
if (!function_exists('register_deactivation_hook')) { function register_deactivation_hook($f, $c) {} }
if (!function_exists('add_action'))                 { function add_action(...$a) { return true; } }
if (!function_exists('add_filter'))                 { function add_filter(...$a) { return true; } }
if (!function_exists('plugin_dir_path'))            { function plugin_dir_path($f) { return rtrim(dirname($f), '/') . '/'; } }
if (!function_exists('sanitize_text_field'))        { function sanitize_text_field($s) { return is_string($s) ? trim(preg_replace('/[\r\n\t]+|\s{2,}/', ' ', strip_tags($s))) : ''; } }
if (!function_exists('wp_unslash'))                 { function wp_unslash($v) { return is_string($v) ? stripslashes($v) : $v; } }
if (!function_exists('__'))                         { function __($s, $d = null) { return $s; } }
if (!function_exists('absint'))                     { function absint($n) { return abs((int) $n); } }
if (!function_exists('is_wp_error'))                { function is_wp_error($t) { return $t instanceof WP_Error; } }
if (!function_exists('rest_ensure_response'))       { function rest_ensure_response($r) { return $r; } }

/* ---- minimal WP classes ---- */
if (!class_exists('WP_Error')) {
    class WP_Error {
        public $code;
        public $message;
        public $data;
        public function __construct($code = '', $message = '', $data = '') {
            $this->code = $code;
            $this->message = $message;
            $this->data = $data;
        }
        public function get_error_code()    { return $this->code; }
        public function get_error_message() { return $this->message; }
        public function get_error_data()    { return $this->data; }
    }
}
if (!class_exists('WP_REST_Request')) {
    class WP_REST_Request {
        private $params;
        public function __construct(array $params = []) { $this->params = $params; }
        public function get_param($key) { return $this->params[$key] ?? null; }
        public function set_param($key, $value) { $this->params[$key] = $value; }
    }
}

/* ---- load the canonical plugin source (run() guarded by PRQ_SKIP_BOOTSTRAP) ---- */
require_once dirname(__DIR__) . '/src/product-recommendation-quiz-for-ecommerce.php';
