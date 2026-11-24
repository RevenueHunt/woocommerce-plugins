<?php
/**
 * V2 mounts, local runtime and once-per-page store manifest.
 *
 * @package Product_Recommendation_Quiz_For_Ecommerce
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

/** Render ids only; credentials and Store API nonces never enter cached output. */
class Product_Recommendation_Quiz_For_Ecommerce_V2_Delivery implements Product_Recommendation_Quiz_For_Ecommerce_Delivery {
	/** Runtime requested.
	 *
	 * @var bool
	 */
	private $needed = false;
	/** Store JSON printed.
	 *
	 * @var bool
	 */
	private $printed = false;
	/** Enabled site-wide settings for this request.
	 *
	 * @var array
	 */
	private $site_wide = array();

	/**
	 * Inline block/shortcode, with empty id meaning the Store default.
	 *
	 * @param array $atts Placement attributes.
	 * @return string Escaped mount.
	 */
	public function render( array $atts ): string {
		$this->enqueue();
		$id     = isset( $atts['id'] ) ? $atts['id'] : '';
		$height = isset( $atts['height'] ) ? absint( $atts['height'] ) : 600;
		$unit   = isset( $atts['height_unit'] ) && 'vh' === $atts['height_unit'] ? 'vh' : 'px';
		return '<div data-prq-quiz="' . esc_attr( $id ) . '" data-prq-height="' . esc_attr( $height . $unit ) . '"' .
			( ! empty( $atts['fixed_height'] ) ? ' data-prq-fixed-height' : '' ) .
			( ! empty( $atts['full_width'] ) ? ' data-prq-full-width' : '' ) . '></div>';
	}

	/**
	 * Render the additional V2 block placements.
	 *
	 * @param string $kind Piece name.
	 * @param array  $atts Saved attributes (unchanged from V1).
	 * @return string Escaped markup.
	 */
	public function piece( $kind, $atts ) {
		$this->enqueue();
		$id = isset( $atts['quizId'] ) ? $atts['quizId'] : '';
		if ( 'assistant' === $kind ) {
			return '<div data-prq-assistant="' . esc_attr( isset( $atts['assistantId'] ) ? $atts['assistantId'] : '' ) . '"></div>';
		}
		if ( 'link-popup' === $kind ) {
			$label = ! empty( $atts['label'] ) ? $atts['label'] : __( 'Take the quiz', 'product-recommendation-quiz-for-ecommerce' );
			return '<a href="#quiz' . ( '' !== $id ? '-' . esc_attr( $id ) : '' ) . '" class="wp-element-button">' . esc_html( $label ) . '</a>';
		}
		$config = array(
			'enabled' => true,
			'quizId'  => '' === $id ? null : $id,
		);
		if ( 'quizButton' === $kind ) {
			$config += array(
				'position' => 'bottom-right',
				'color'    => ! empty( $atts['color'] ) ? $atts['color'] : '#000000',
				'greeting' => isset( $atts['greeting'] ) ? $atts['greeting'] : '',
			);
		} else {
			$config += array(
				'delaySeconds' => isset( $atts['timeout'] ) ? absint( $atts['timeout'] ) : 5,
				'exitIntent'   => ! empty( $atts['exitIntent'] ),
			);
		}
		return '<div data-prq-piece="' . esc_attr( $kind ) . '" data-prq-config="' . esc_attr( wp_json_encode( $config ) ) . '"></div>';
	}

	/** Enqueue only the plugin's bundled code. @return void */
	private function enqueue() {
		if ( $this->needed ) {
			return;
		}
		$this->needed = true;
		$src          = plugins_url( 'assets/v2/quiz-renderer.js', dirname( __DIR__ ) . '/product-recommendation-quiz-for-ecommerce.php' );
		if ( function_exists( 'wp_enqueue_script_module' ) ) {
			wp_enqueue_script_module( 'prq-v2-quiz-renderer', $src, array(), PRQ_PLUGIN_VERSION );
		} else {
			wp_enqueue_script( 'prq-v2-quiz-renderer', $src, array(), PRQ_PLUGIN_VERSION, true );
			add_filter( 'script_loader_tag', array( $this, 'module_tag' ), 10, 2 );
		}
	}

	/** Prepare site-wide delivery early enough for WordPress's module printer. @return void */
	public function site_wide() {
		if ( ( function_exists( 'is_checkout' ) && is_checkout() ) || ( function_exists( 'is_cart' ) && is_cart() ) ) {
			return;
		}
		$store = get_option( Product_Recommendation_Quiz_For_Ecommerce_V2_Storefront::STOREFRONT, array() );
		$wide  = isset( $store['siteWide'] ) ? $store['siteWide'] : array();
		if ( ! empty( $wide['popupLinks'] ) || ! empty( $wide['quizButton']['enabled'] ) || ! empty( $wide['automaticPopup']['enabled'] ) || ! empty( $wide['assistant']['enabled'] ) ) {
			$this->site_wide = $wide;
			$this->enqueue();
		}
	}

	/** Print inert JSON once before footer scripts, never executable pushed content. @return void */
	public function footer() {
		if ( ! $this->needed || $this->printed ) {
			return;
		}
		$this->printed = true;
		$connection    = Product_Recommendation_Quiz_For_Ecommerce_V2::connection();
		$store         = get_option( Product_Recommendation_Quiz_For_Ecommerce_V2_Storefront::STOREFRONT, array() );
		$uploads       = wp_upload_dir();
		$quizzes       = array();
		foreach ( get_option( Product_Recommendation_Quiz_For_Ecommerce_V2_Storefront::QUIZZES, array() ) as $id => $quiz ) {
			$src            = $uploads['baseurl'] . '/prq-v2/quiz-' . rawurlencode( (string) $id );
			$version        = '?v=' . rawurlencode( (string) $quiz['version'] );
			$treatment      = ! empty( $quiz['experiment'] ) ? '?v=' . rawurlencode( $quiz['version'] . '-' . $quiz['experiment']['id'] ) : null;
			$quizzes[ $id ] = array(
				'src'          => $src . '.html.json' . $version,
				'treatmentSrc' => null !== $treatment ? $src . '-treatment.html.json' . $treatment : null,
				'experiment'   => $quiz['experiment'],
				'scripts'      => $quiz['scripts'],
				'runtime'      => $quiz['runtime'],
			);
		}
		$assistants = array();
		foreach ( get_option( Product_Recommendation_Quiz_For_Ecommerce_V2_Storefront::ASSISTANTS, array() ) as $id => $assistant ) {
			$path              = '/prq-v2/assistant-' . rawurlencode( (string) $id ) . '.html';
			$assistants[ $id ] = array(
				'src'     => is_file( $uploads['basedir'] . $path ) ? $uploads['baseurl'] . $path . '?v=' . rawurlencode( (string) $assistant['version'] ) : null,
				'runtime' => $assistant['runtime'],
			);
		}
		$data = array(
			'shop'                    => $connection['shop'],
			'runtime'                 => Product_Recommendation_Quiz_For_Ecommerce_V2_Storefront::runtime(),
			'locale'                  => get_locale(),
			'currencyCode'            => get_woocommerce_currency(),
			'currencyFormat'          => self::currency_format(),
			'overPlanAt'              => isset( $store['overPlanAt'] ) ? $store['overPlanAt'] : null,
			'customFeaturesBlockedAt' => isset( $store['customFeaturesBlockedAt'] ) ? $store['customFeaturesBlockedAt'] : null,
			'defaultQuiz'             => isset( $store['defaultQuiz'] ) ? $store['defaultQuiz'] : null,
			'defaultAssistant'        => isset( $store['defaultAssistant'] ) ? $store['defaultAssistant'] : null,
			'quizzes'                 => (object) $quizzes,
			'assistants'              => (object) $assistants,
		);
		if ( $this->site_wide ) {
			$data['siteWide'] = $this->site_wide;
		}
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- JSON_HEX_* prevents breaking out of the inert script element.
		echo '<script type="application/json" id="prq-v2-store">' . wp_json_encode( $data, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT ) . '</script>';
	}

	/**
	 * The store's money format (WooCommerce → Settings → General: currency position, separators, decimals) in the
	 * Shopify `{{amount…}}` syntax the quiz and assistant cards read, so they show prices as the shop does.
	 * Null when no Shopify variable matches the separators: the cards then show the amount and its ISO code.
	 *
	 * @return string|null
	 */
	public static function currency_format() {
		$variables   = array(
			',.' => 'amount',
			'.,' => 'amount_with_comma_separator',
			"'." => 'amount_with_apostrophe_separator',
			' ,' => 'amount_with_space_separator',
			' .' => 'amount_with_period_and_space_separator',
		);
		$no_decimals = array(
			',' => 'amount_no_decimals',
			'.' => 'amount_no_decimals_with_comma_separator',
			' ' => 'amount_no_decimals_with_space_separator',
		);
		// WooCommerce stores a space as typed or as a non-breaking one.
		$thousand = str_replace( "\u{00A0}", ' ', html_entity_decode( wc_get_price_thousand_separator(), ENT_QUOTES, 'UTF-8' ) );
		$decimal  = wc_get_price_decimal_separator();
		switch ( (int) wc_get_price_decimals() ) {
			case 2:
				$variable = isset( $variables[ $thousand . $decimal ] ) ? $variables[ $thousand . $decimal ] : null;
				break;
			case 0:
				$variable = isset( $no_decimals[ $thousand ] ) ? $no_decimals[ $thousand ] : null;
				break;
			default:
				$variable = null;
		}
		if ( null === $variable ) {
			return null;
		}
		$symbol   = html_entity_decode( get_woocommerce_currency_symbol(), ENT_QUOTES, 'UTF-8' );
		$amount   = '{{' . $variable . '}}';
		$formats  = array(
			'left'        => $symbol . $amount,
			'right'       => $amount . $symbol,
			'left_space'  => $symbol . "\u{00A0}" . $amount,
			'right_space' => $amount . "\u{00A0}" . $symbol,
		);
		$position = get_option( 'woocommerce_currency_pos', 'left' );
		return isset( $formats[ $position ] ) ? $formats[ $position ] : $formats['left'];
	}

	/**
	 * Module tags for WordPress before 6.5.
	 *
	 * @param string $tag Script tag.
	 * @param string $handle Script handle.
	 * @return string Filtered tag.
	 */
	public function module_tag( $tag, $handle ) {
		if ( 'prq-v2-quiz-renderer' !== $handle ) {
			return $tag;
		}
		$tag = preg_replace( '/\s+type=([\'"]).*?\1/', '', $tag );
		return str_replace( '<script ', '<script type="module" ', $tag );
	}
}
