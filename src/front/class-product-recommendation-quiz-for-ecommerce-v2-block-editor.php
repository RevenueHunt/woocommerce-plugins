<?php
/**
 * Local editor data for the V2 block pickers (no editor API requests).
 *
 * @package Product_Recommendation_Quiz_For_Ecommerce
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

/** Shared registration for the plain ES5 V2 editor. */
class Product_Recommendation_Quiz_For_Ecommerce_V2_Block_Editor {
	const HANDLE = 'prq-v2-block-editor';

	/** Register the shared helper and preload published names. @return void */
	public static function register() {
		wp_register_script( self::HANDLE, plugin_dir_url( __FILE__ ) . 'blocks/v2-editor.js', array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' ), PRQ_PLUGIN_VERSION, true );
		$assistants = array();
		foreach ( get_option( Product_Recommendation_Quiz_For_Ecommerce_V2_Storefront::ASSISTANTS, array() ) as $id => $assistant ) {
			$assistants[] = array(
				'id'   => (string) $id,
				'name' => $assistant['name'],
			);
		}
		wp_localize_script(
			self::HANDLE,
			'prqV2BlocksData',
			array(
				'mode'       => 'v2',
				'connected'  => (bool) Product_Recommendation_Quiz_For_Ecommerce_V2::connection(),
				'quizzes'    => (object) get_option( Product_Recommendation_Quiz_For_Ecommerce_V2_Storefront::QUIZZES, array() ),
				'assistants' => $assistants,
				'editUrl'    => admin_url( 'admin.php?page=prqfw' ),
				'iconUrl'    => plugin_dir_url( __FILE__ ) . '../admin/img/revenuehunt-logo.png',
			)
		);
	}

	/**
	 * V2-only searchable, friendly metadata; leave V1 metadata untouched.
	 *
	 * @param string $kind Placement.
	 * @return array Registration overrides.
	 */
	public static function settings( $kind ) {
		if ( ! Product_Recommendation_Quiz_For_Ecommerce_V2::connection() ) {
			return array();
		}
		$titles = array(
			'inline'          => __( 'RevenueHunt Quiz', 'product-recommendation-quiz-for-ecommerce' ),
			'link-popup'      => __( 'RevenueHunt Popup Button', 'product-recommendation-quiz-for-ecommerce' ),
			'quiz-button'     => __( 'RevenueHunt Quiz Button', 'product-recommendation-quiz-for-ecommerce' ),
			'automatic-popup' => __( 'RevenueHunt Automatic Popup', 'product-recommendation-quiz-for-ecommerce' ),
		);
		return array(
			'title'    => $titles[ $kind ],
			'keywords' => array(
				__( 'quiz', 'product-recommendation-quiz-for-ecommerce' ),
				__( 'product finder', 'product-recommendation-quiz-for-ecommerce' ),
				__( 'recommendation', 'product-recommendation-quiz-for-ecommerce' ),
				__( 'assistant', 'product-recommendation-quiz-for-ecommerce' ),
				__( 'chat', 'product-recommendation-quiz-for-ecommerce' ),
				__( 'revenuehunt', 'product-recommendation-quiz-for-ecommerce' ),
			),
		);
	}
}
