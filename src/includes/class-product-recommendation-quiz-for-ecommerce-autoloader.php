<?php
/**
 * Self-contained class autoloader for the plugin.
 *
 * Replaces the manual require_once chains: classes are loaded on first use by
 * convention. A class named Product_Recommendation_Quiz_For_Ecommerce_Foo_Bar
 * is resolved to class-product-recommendation-quiz-for-ecommerce-foo-bar.php,
 * searched across the plugin's source subdirectories. The shipped artifact does
 * NOT depend on Composer's vendor/ autoloader.
 *
 * @link       https://revenuehunt.com/
 * @since      2.3.9
 *
 * @package    Product_Recommendation_Quiz_For_Ecommerce
 * @subpackage Product_Recommendation_Quiz_For_Ecommerce/includes
 */

// Prevent direct access.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Convention-based autoloader for this plugin's classes.
 *
 * @package    Product_Recommendation_Quiz_For_Ecommerce
 * @subpackage Product_Recommendation_Quiz_For_Ecommerce/includes
 */
class Product_Recommendation_Quiz_For_Ecommerce_Autoloader {

	/**
	 * Source subdirectories (relative to src/) searched for class files.
	 *
	 * @since 2.3.9
	 * @var string[]
	 */
	private static $dirs = array( 'includes', 'admin', 'rest', 'front' );

	/**
	 * Register the autoloader with the SPL stack.
	 *
	 * @since 2.3.9
	 * @return void
	 */
	public static function register() {
		spl_autoload_register( array( __CLASS__, 'autoload' ) );
	}

	/**
	 * Resolve and load one of the plugin's classes.
	 *
	 * Only classes carrying the plugin's class prefix are handled; everything
	 * else is left to other registered autoloaders. The expected filename is
	 * derived from the class name following the WordPress file-naming
	 * convention (lowercase, underscores to hyphens, "class-" prefix).
	 *
	 * @since 2.3.9
	 * @param string $class_name The fully-qualified class name being loaded.
	 * @return void
	 */
	public static function autoload( $class_name ) {
		$prefix = 'Product_Recommendation_Quiz_For_Ecommerce';
		if ( 0 !== strpos( $class_name, $prefix ) ) {
			return;
		}

		$file = 'class-' . strtolower( str_replace( '_', '-', $class_name ) ) . '.php';
		$base = plugin_dir_path( __DIR__ );

		foreach ( self::$dirs as $dir ) {
			$path = $base . $dir . '/' . $file;
			if ( is_file( $path ) ) {
				require_once $path;
				return;
			}
		}
	}
}
