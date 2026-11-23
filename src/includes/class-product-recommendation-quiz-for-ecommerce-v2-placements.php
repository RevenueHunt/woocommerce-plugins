<?php
/**
 * Read-only placement inventory for V2's Storefront page.
 *
 * @package Product_Recommendation_Quiz_For_Ecommerce
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

/** Find placement candidates, then read their saved content without rendering it. */
class Product_Recommendation_Quiz_For_Ecommerce_V2_Placements {
	/** Scan published content, block widgets, menus, Elementor and enabled V1 embeds. @return array Placement rows. */
	public function scan() {
		global $wpdb;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Live reconciliation across all supported post types.
		$posts = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT ID, post_type, post_title, post_content FROM {$wpdb->posts} WHERE post_status = 'publish' AND post_type IN ('post', 'page', 'wp_template', 'wp_template_part', 'wp_block', 'wp_navigation') AND (post_content LIKE %s OR post_content LIKE %s OR post_content LIKE %s)",
				'%' . $wpdb->esc_like( 'product_recommendation_quiz' ) . '%',
				'%' . $wpdb->esc_like( 'wp:revenuehunt/' ) . '%',
				'%' . $wpdb->esc_like( '#quiz-' ) . '%'
			)
		);
		$rows  = array();
		foreach ( $posts as $post ) {
			$rows = array_merge( $rows, $this->content( $post->post_content, $this->post_location( $post ) ) );
		}
		foreach ( get_option( 'widget_block', array() ) as $widget ) {
			if ( is_array( $widget ) && isset( $widget['content'] ) ) {
				$rows = array_merge(
					$rows,
					$this->content(
						$widget['content'],
						array(
							'postId'   => null,
							'postType' => 'widget_block',
							'title'    => '',
							'url'      => null,
						)
					)
				);
			}
		}
		$rows = array_merge( $rows, $this->menu_links(), $this->elementor() );
		if ( Product_Recommendation_Quiz_For_Ecommerce_V2::v1_storefront_held() ) {
			$settings = Product_Recommendation_Quiz_For_Ecommerce_Embeds_Settings::get();
			$kinds    = array(
				'auto_popup' => 'automatic-popup',
				'chat'       => 'quiz-button',
			);
			foreach ( $kinds as $key => $kind ) {
				if ( $settings[ $key ]['enabled'] ) {
					$rows[] = array(
						'kind'        => $kind,
						'quizId'      => $settings[ $key ]['quiz_id'],
						'assistantId' => null,
						'postId'      => null,
						'postType'    => 'site_wide',
						'title'       => '',
						'url'         => null,
					);
				}
			}
		}
		return $rows;
	}

	/**
	 * Describe the post that contains a placement.
	 *
	 * @param object $post Candidate query row.
	 * @return array Location fields.
	 */
	private function post_location( $post ) {
		return array(
			'postId'   => (int) $post->ID,
			'postType' => $post->post_type,
			'title'    => $post->post_title,
			'url'      => get_permalink( $post->ID ),
		);
	}

	/** Find quiz links in classic menu item URLs. @return array Placement rows. */
	private function menu_links() {
		global $wpdb;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Live inventory of classic menu item URLs.
		$items = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT p.ID, p.post_title, m.meta_value FROM {$wpdb->posts} p INNER JOIN {$wpdb->postmeta} m ON m.post_id = p.ID WHERE p.post_type = 'nav_menu_item' AND m.meta_key = '_menu_item_url' AND m.meta_value LIKE %s",
				'%' . $wpdb->esc_like( '#quiz-' ) . '%'
			)
		);
		$rows  = array();
		foreach ( $items as $item ) {
			$rows = array_merge(
				$rows,
				$this->quiz_links(
					$item->meta_value,
					array(
						'postId'   => (int) $item->ID,
						'postType' => 'nav_menu_item',
						'title'    => $item->post_title,
						'url'      => null,
					),
					'menu-link'
				)
			);
		}
		return $rows;
	}

	/** Find saved Elementor data on published posts. @return array Placement rows. */
	private function elementor() {
		global $wpdb;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Read Elementor placements without depending on Elementor or rendering a page.
		$posts = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT p.ID, p.post_type, p.post_title, m.meta_value FROM {$wpdb->posts} p INNER JOIN {$wpdb->postmeta} m ON m.post_id = p.ID WHERE p.post_status = 'publish' AND m.meta_key = '_elementor_data' AND (m.meta_value LIKE %s OR m.meta_value LIKE %s)",
				'%' . $wpdb->esc_like( 'product_recommendation_quiz' ) . '%',
				'%' . $wpdb->esc_like( '#quiz-' ) . '%'
			)
		);
		$rows  = array();
		foreach ( $posts as $post ) {
			$rows = array_merge( $rows, $this->elementor_rows( json_decode( $post->meta_value, true ), $this->post_location( $post ) + array( 'source' => 'elementor' ) ) );
		}
		return $rows;
	}

	/**
	 * Extract shortcode and link occurrences from the decoded JSON's string values.
	 *
	 * @param mixed $value Decoded Elementor data.
	 * @param array $location Location fields.
	 * @return array Placement rows.
	 */
	private function elementor_rows( $value, $location ) {
		if ( is_string( $value ) ) {
			return array_merge( $this->shortcodes( $value, $location ), $this->quiz_links( $value, $location ) );
		}
		$rows = array();
		if ( is_array( $value ) ) {
			foreach ( $value as $child ) {
				$rows = array_merge( $rows, $this->elementor_rows( $child, $location ) );
			}
		}
		return $rows;
	}

	/**
	 * Scan post or widget content for blocks, shortcodes and quiz links.
	 *
	 * @param string $content Post/widget content.
	 * @param array  $location Location fields.
	 * @return array Placement rows.
	 */
	private function content( $content, $location ) {
		return array_merge( $this->blocks( parse_blocks( $content ), $location ), $this->shortcodes( $content, $location ), $this->quiz_links( $content, $location ) );
	}

	/**
	 * Extract quiz shortcode occurrences.
	 *
	 * @param string $content Saved content.
	 * @param array  $location Location fields.
	 * @return array Placement rows.
	 */
	private function shortcodes( $content, $location ) {
		$rows = array();
		$tag  = Product_Recommendation_Quiz_For_Ecommerce_Front_Shortcode::TAG;
		if ( has_shortcode( $content, $tag ) && preg_match_all( '/' . get_shortcode_regex( array( $tag ) ) . '/s', $content, $matches, PREG_SET_ORDER ) ) {
			foreach ( $matches as $match ) {
				if ( $tag !== $match[2] || ( '[' === $match[1] && ']' === $match[6] ) ) {
					continue;
				}
				$atts   = shortcode_parse_atts( $match[3] );
				$rows[] = array_merge(
					array(
						'kind'        => 'shortcode',
						'quizId'      => isset( $atts['id'] ) ? $atts['id'] : '',
						'assistantId' => null,
					),
					$location
				);
			}
		}
		return $rows;
	}

	/**
	 * Return one row per #quiz-CODE occurrence.
	 *
	 * @param string $content Saved content or menu URL.
	 * @param array  $location Location fields.
	 * @param string $kind Placement kind.
	 * @return array Placement rows.
	 */
	private function quiz_links( $content, $location, $kind = 'quiz-link' ) {
		$rows = array();
		preg_match_all( '/#quiz-([A-Za-z0-9]+)/', $content, $matches );
		foreach ( $matches[1] as $id ) {
			$rows[] = array_merge(
				array(
					'kind'        => $kind,
					'quizId'      => $id,
					'assistantId' => null,
				),
				$location
			);
		}
		return $rows;
	}

	/**
	 * Walk nested blocks without resolving references (reusable posts are scanned themselves).
	 *
	 * @param array $blocks Parsed blocks.
	 * @param array $location Location fields.
	 * @return array Rows.
	 */
	private function blocks( $blocks, $location ) {
		$kinds = array(
			'revenuehunt/product-recommendation-quiz-for-ecommerce' => 'inline',
			'revenuehunt/link-popup-quiz'  => 'link-popup',
			'revenuehunt/chat-button-quiz' => 'quiz-button',
			'revenuehunt/auto-popup-quiz'  => 'automatic-popup',
			'revenuehunt/assistant'        => 'assistant',
		);
		$rows  = array();
		foreach ( $blocks as $block ) {
			if ( isset( $kinds[ $block['blockName'] ] ) ) {
				$kind   = $kinds[ $block['blockName'] ];
				$atts   = $block['attrs'];
				$key    = 'inline' === $kind ? 'id' : 'quizId';
				$rows[] = array_merge(
					array(
						'kind'        => $kind,
						'quizId'      => 'assistant' === $kind ? null : ( isset( $atts[ $key ] ) ? $atts[ $key ] : '' ),
						'assistantId' => 'assistant' === $kind ? ( isset( $atts['assistantId'] ) ? $atts['assistantId'] : '' ) : null,
					),
					$location
				);
			}
			$rows = array_merge( $rows, $this->blocks( $block['innerBlocks'], $location ) );
		}
		return $rows;
	}
}
