<?php
/**
 * The admin menu and admin-area asset registration.
 *
 * @link       https://revenuehunt.com/
 * @since      1.0.0
 *
 * @package    Product_Recommendation_Quiz_For_Ecommerce
 * @subpackage Product_Recommendation_Quiz_For_Ecommerce/admin
 */

// Prevent direct access.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Registers the admin menu and admin-area assets.
 *
 * Delegates the settings-page rendering to the admin page unit.
 *
 * @package    Product_Recommendation_Quiz_For_Ecommerce
 * @subpackage Product_Recommendation_Quiz_For_Ecommerce/admin
 */
class Product_Recommendation_Quiz_For_Ecommerce_Admin_Menu {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * The settings page renderer (menu callback target).
	 *
	 * @since    2.3.9
	 * @var      Product_Recommendation_Quiz_For_Ecommerce_Admin_Page    $admin_page    Settings page renderer.
	 */
	private $admin_page;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string $plugin_name       The name of this plugin.
	 * @param      string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;
		$this->admin_page  = new Product_Recommendation_Quiz_For_Ecommerce_Admin_Page();
	}

	/**
	 * Register the stylesheet for the admin area.
	 *
	 * V2 adds its menu script and the Media Library on the RevenueHunt iframe page only.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {
		wp_enqueue_style(
			$this->plugin_name,
			plugin_dir_url( __FILE__ ) . 'css/product-recommendation-quiz-for-ecommerce-admin.css',
			array(),
			$this->version,
			'all'
		);

		$connection = Product_Recommendation_Quiz_For_Ecommerce_V2::connection();
		global $plugin_page;
		if ( $connection && 'prqfw' === $plugin_page ) {
			wp_enqueue_media();
			// Also without menu items: the app's full-screen window still covers the whole admin.
			$handle = $this->plugin_name . '-v2-nav';
			wp_enqueue_script( $handle, plugin_dir_url( __FILE__ ) . 'js/product-recommendation-quiz-for-ecommerce-v2-nav.js', array( 'media-editor' ), $this->version, true );
			wp_localize_script(
				$handle,
				'prqV2AdminNav',
				array(
					'adminUrl'    => $connection['admin_url'],
					'paths'       => array_column( Product_Recommendation_Quiz_For_Ecommerce_V2_Admin_Nav::items(), 'path' ),
					'mediaTitle'  => __( 'Select media', 'product-recommendation-quiz-for-ecommerce' ),
					'mediaButton' => __( 'Select', 'product-recommendation-quiz-for-ecommerce' ),
				)
			);
		}
	}

	/**
	 * Register the plugin admin menu.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function my_plugin_menu() {
		add_menu_page(
			__( 'Product Recommendation Quiz', 'product-recommendation-quiz-for-ecommerce' ),
			__( 'Product Quiz', 'product-recommendation-quiz-for-ecommerce' ),
			'manage_options',
			'prqfw',
			array( $this->admin_page, 'prquiz_options' ),
			'dashicons-format-chat',
			58
		);
		foreach ( Product_Recommendation_Quiz_For_Ecommerce_V2_Admin_Nav::items() as $item ) {
			add_submenu_page(
				'prqfw',
				esc_html( $item['label'] ),
				esc_html( $item['label'] ),
				'manage_options',
				Product_Recommendation_Quiz_For_Ecommerce_V2_Admin_Nav::menu_slug( $item['path'] ),
				array( $this->admin_page, 'prquiz_options' )
			);
		}
		if ( Product_Recommendation_Quiz_For_Ecommerce_V2::connection() ) {
			add_filter( 'submenu_file', array( $this, 'current_submenu' ) );
		}
	}

	/**
	 * Keep WordPress's initial selection aligned with the requested V2 page.
	 *
	 * @param string|null $submenu_file WordPress's selected submenu.
	 * @return string|null The matching V2 submenu, or the unchanged selection.
	 */
	public function current_submenu( $submenu_file ) {
		global $plugin_page;
		if ( 'prqfw' === $plugin_page ) {
			$path = Product_Recommendation_Quiz_For_Ecommerce_V2_Admin_Nav::selected_path();
			if ( '' !== $path ) {
				return Product_Recommendation_Quiz_For_Ecommerce_V2_Admin_Nav::menu_slug( $path );
			}
		}
		return $submenu_file;
	}
}
