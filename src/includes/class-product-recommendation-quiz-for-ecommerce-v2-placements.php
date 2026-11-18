<?php
/**
 * Read-only placement inventory for V2's Storefront page.
 *
 * @package Product_Recommendation_Quiz_For_Ecommerce
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

/** One candidate query, then WordPress's own block and shortcode parsers. */
class Product_Recommendation_Quiz_For_Ecommerce_V2_Placements {
	/** Scan published content and block widgets. @return array Placement rows. */
	public function scan() {
		global $wpdb;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Live reconciliation, one bounded candidate query across all supported post types.
		$posts = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT ID, post_type, post_title, post_content FROM {$wpdb->posts} WHERE post_status = 'publish' AND post_type IN ('post', 'page', 'wp_template', 'wp_template_part', 'wp_block') AND (post_content LIKE %s OR post_content LIKE %s)",
				'%' . $wpdb->esc_like( 'product_recommendation_quiz' ) . '%',
				'%' . $wpdb->esc_like( 'wp:revenuehunt/' ) . '%'
			)
		);
		$rows  = array();
		foreach ( $posts as $post ) {
			$rows = array_merge(
				$rows,
				$this->content(
					$post->post_content,
					array(
						'postId'   => (int) $post->ID,
						'postType' => $post->post_type,
						'title'    => $post->post_title,
						'url'      => get_permalink( $post->ID ),
					)
				)
			);
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
		return $rows;
	}

	/**
	 * Extract shortcode occurrences once and recurse through nested blocks.
	 *
	 * @param string $content Post/widget content.
	 * @param array  $location Location fields.
	 * @return array Rows.
	 */
	private function content( $content, $location ) {
		$rows = $this->blocks( parse_blocks( $content ), $location );
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
