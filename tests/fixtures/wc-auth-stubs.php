<?php
/**
 * Minimal stubs for the WooCommerce REST auth permission characterization.
 *
 * Required only by the tests that exercise the "WooCommerce present" branch of
 * the controller's permission callback. The "absent" branch is covered by a
 * process-isolated test that does NOT load this file.
 */

if (!class_exists('WP_User')) {
    class WP_User
    {
    }
}

if (!class_exists('WC_REST_Authentication')) {
    class WC_REST_Authentication
    {
        /** @var mixed The value authenticate() should return. */
        public static $result = null;

        /**
         * @param mixed $user Unused; mirrors the WC signature.
         * @return mixed
         */
        public function authenticate($user)
        {
            return self::$result;
        }
    }
}
