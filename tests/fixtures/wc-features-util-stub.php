<?php
/**
 * Minimal stub for the WooCommerce FeaturesUtil compatibility declaration.
 *
 * Records each declare_compatibility() call so the "WooCommerce present" branch
 * of the plugin's compatibility hook can be asserted. The "absent" branch (no
 * FeaturesUtil class) is covered by a process-isolated test that does NOT load
 * this file.
 */

namespace Automattic\WooCommerce\Utilities;

if (!class_exists(FeaturesUtil::class)) {
    class FeaturesUtil
    {
        /** @var array<int, array{0:string,1:string,2:bool}> Recorded declarations. */
        public static $declared = [];

        /**
         * @param string $feature    Feature flag slug.
         * @param string $file       Plugin main file.
         * @param bool   $compatible Whether the plugin is compatible.
         * @return bool
         */
        public static function declare_compatibility($feature, $file, $compatible)
        {
            self::$declared[] = [$feature, $file, $compatible];
            return true;
        }
    }
}
