<?php
/**
 * Read-only brand data for the new admin.
 *
 * @package Product_Recommendation_Quiz_For_Ecommerce
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

/** Read the active WordPress theme and public site identity. */
class Product_Recommendation_Quiz_For_Ecommerce_V2_Brand {
	/** Return only available brand fields. @return object REST response data. */
	public function get_brand() {
		$brand = array_filter(
			array(
				'name'    => $this->plain_text( get_option( 'blogname' ), 80 ),
				'tagline' => $this->plain_text( get_option( 'blogdescription' ), 120 ),
			),
			static function ( $value ) {
				return '' !== $value;
			}
		);

		$fonts = array();
		if ( wp_is_block_theme() ) {
			$settings = wp_get_global_settings();
			$styles   = wp_get_global_styles();
			$palette  = $settings['color']['palette'] ?? array();
			$families = $settings['typography']['fontFamilies'] ?? array();
			$colors   = array();
			foreach ( array(
				'accent'     => array( $styles['elements']['link']['color']['text'] ?? '', $styles['elements']['button']['color']['background'] ?? '' ),
				'background' => array( $styles['color']['background'] ?? '' ),
				'text'       => array( $styles['color']['text'] ?? '' ),
			) as $key => $candidates ) {
				foreach ( $candidates as $value ) {
					$color = $this->hex( $this->preset_value( $value, $palette, 'color', 'color' ) );
					if ( '' !== $color ) {
						$colors[ $key ] = $color;
						break;
					}
				}
			}
			$fonts = array_filter(
				array(
					'heading' => $this->family( $styles['elements']['heading']['typography']['fontFamily'] ?? $styles['elements']['h1']['typography']['fontFamily'] ?? '', $families ),
					'body'    => $this->family( $styles['typography']['fontFamily'] ?? '', $families ),
				)
			);
		} else {
			$colors = array();
			foreach ( array( 'accent_color', 'storefront_accent_color', 'primary_color', 'link_color' ) as $mod ) {
				$accent = $this->hex( get_theme_mod( $mod ), true );
				if ( '' !== $accent ) {
					$colors['accent'] = $accent;
					break;
				}
			}
			$colors = array_filter( $colors + array( 'background' => $this->hex( get_theme_mod( 'background_color' ), true ) ) );
		}

		return (object) ( $brand + array_filter(
			array(
				'colors' => $colors,
				'fonts'  => $fonts,
				'logo'   => $this->logo(),
			)
		) );
	}

	/**
	 * Look up theme.json preset references, newest origin first.
	 *
	 * @param mixed  $value Raw style value.
	 * @param array  $presets Preset settings from WordPress.
	 * @param string $type Preset reference type.
	 * @param string $key Field containing the preset value.
	 * @return string Resolved style or direct value.
	 */
	private function preset_value( $value, $presets, $type, $key ) {
		if ( ! is_string( $value ) ) {
			return '';
		}
		$pattern = '/\A(?:var:preset\|' . $type . '\|([\w-]+)|var\(--wp--preset--' . $type . '--([\w-]+)\))\z/';
		if ( ! preg_match( $pattern, $value, $matches ) ) {
			return $value;
		}
		$slug  = $matches[2] ?? $matches[1];
		$lists = isset( $presets[0] ) ? array( $presets ) : array( $presets['custom'] ?? array(), $presets['theme'] ?? array(), $presets['blocks'] ?? array(), $presets['default'] ?? array() );
		foreach ( $lists as $list ) {
			foreach ( $list as $preset ) {
				if ( ( $preset['slug'] ?? '' ) === $slug ) {
					return is_string( $preset[ $key ] ?? null ) ? $preset[ $key ] : '';
				}
			}
		}
		return '';
	}

	/**
	 * Normalize hex only; classic Customizer settings may omit the hash.
	 *
	 * @param mixed $value Raw color.
	 * @param bool  $classic Whether this is a classic theme mod.
	 * @return string Lowercase six-digit hex or an empty string.
	 */
	private function hex( $value, $classic = false ) {
		if ( ! is_string( $value ) || '' === $value ) {
			return '';
		}
		if ( $classic && '#' !== $value[0] ) {
			$value = '#' . $value;
		}
		if ( ! preg_match( '/\A#(?:[0-9a-f]{3}|[0-9a-f]{6})\z/i', $value ) ) {
			return '';
		}
		return strtolower( 4 === strlen( $value ) ? '#' . $value[1] . $value[1] . $value[2] . $value[2] . $value[3] . $value[3] : $value );
	}

	/**
	 * Read the first family in a CSS font stack, not the CSS itself.
	 *
	 * @param mixed $value Raw font family.
	 * @param array $presets Global font family presets.
	 * @return string Plain family name or an empty string.
	 */
	private function family( $value, $presets ) {
		if ( ! is_string( $value ) ) {
			return '';
		}
		$first  = trim( explode( ',', $value, 2 )[0] );
		$value  = $this->preset_value( $first, $presets, 'font-family', 'fontFamily' );
		$family = trim( trim( explode( ',', $value, 2 )[0] ), " \t\n\r\"'" );
		return preg_match( '/\A[\p{L}\p{N} -]+\z/u', $family ) ? trim( mb_substr( $family, 0, 40, 'UTF-8' ) ) : '';
	}

	/**
	 * Strip markup and bound the length of the public site identity.
	 *
	 * @param mixed $value Raw site option.
	 * @param int   $limit Maximum number of characters.
	 * @return string Plain text.
	 */
	private function plain_text( $value, $limit ) {
		if ( ! is_string( $value ) ) {
			return '';
		}
		$plain = sanitize_text_field( html_entity_decode( $value, ENT_QUOTES | ENT_HTML5, 'UTF-8' ) );
		return trim( mb_substr( $plain, 0, $limit, 'UTF-8' ) );
	}

	/** Read the full custom logo, falling back to the site icon. @return array Logo data or an empty array. */
	private function logo() {
		$id    = get_theme_mod( 'custom_logo' );
		$id    = is_int( $id ) || ( is_string( $id ) && ctype_digit( $id ) ) ? (int) $id : 0;
		$image = $id > 0 ? wp_get_attachment_image_src( $id, 'full' ) : false;
		$url   = $this->https_url( $image[0] ?? '' );
		if ( '' === $url ) {
			$url = $this->https_url( get_site_icon_url() );
			return '' === $url ? array() : array( 'url' => $url );
		}
		$logo = array( 'url' => $url );
		foreach ( array(
			'width'  => 1,
			'height' => 2,
		) as $key => $index ) {
			$size = $image[ $index ] ?? 0;
			if ( is_int( $size ) && $size > 0 && $size <= 4000 ) {
				$logo[ $key ] = $size;
			}
		}
		return $logo;
	}

	/**
	 * Require a well-formed HTTPS image URL without upgrading HTTP URLs.
	 *
	 * @param mixed $url Raw image URL.
	 * @return string HTTPS URL or an empty string.
	 */
	private function https_url( $url ) {
		if ( ! is_string( $url ) ) {
			return '';
		}
		if ( 0 === strpos( $url, '//' ) ) {
			$url = 'https:' . $url;
		}
		return 0 === strpos( $url, 'https://' ) && strlen( $url ) <= 500 && false === strpbrk( $url, "<>\"'\\" ) && filter_var( $url, FILTER_VALIDATE_URL ) ? $url : '';
	}
}
