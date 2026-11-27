<?php
/**
 * Signed Media Library routes for the new admin.
 *
 * @package Product_Recommendation_Quiz_For_Ecommerce
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

/** List and add media in the merchant's WordPress library. */
class Product_Recommendation_Quiz_For_Ecommerce_V2_Media {
	/**
	 * List attachments, newest first, with the Media Library's filename search.
	 *
	 * @param WP_REST_Request $request Signed request.
	 * @return array Page of media items.
	 */
	public function list_media( $request ) {
		$type   = 'video' === $request->get_param( 'type' ) ? 'video' : 'image';
		$search = sanitize_text_field( $request->get_param( 'search' ) );
		$page   = max( 1, (int) $request->get_param( 'page' ) );
		$query  = new WP_Query();
		if ( '' !== $search ) {
			add_filter( 'wp_allow_query_attachment_by_filename', '__return_true' );
		}
		try {
			$posts = $query->query(
				array(
					'post_type'      => 'attachment',
					'post_status'    => 'inherit',
					'post_mime_type' => $type,
					's'              => $search,
					'paged'          => $page,
					'posts_per_page' => max( 1, min( 50, (int) ( $request->get_param( 'per_page' ) ?? 30 ) ) ),
					'orderby'        => 'date',
					'order'          => 'DESC',
				)
			);
		} finally {
			if ( '' !== $search ) {
				remove_filter( 'wp_allow_query_attachment_by_filename', '__return_true' );
			}
		}
		$items = array();
		foreach ( $posts as $post ) {
			$items[] = $this->item( $post->ID );
		}
		return array(
			'items'       => $items,
			'page'        => $page,
			'total_pages' => (int) $query->max_num_pages,
		);
	}

	/**
	 * Copy an allowed remote image or video into the merchant's uploads.
	 *
	 * @param WP_REST_Request $request Signed request.
	 * @return WP_REST_Response Created attachment or a bad request.
	 */
	public function add_media( $request ) {
		$body = $request->get_json_params();
		$url  = $body['url'] ?? '';
		if ( ! is_string( $url ) || 'https' !== wp_parse_url( $url, PHP_URL_SCHEME ) || ! filter_var( $url, FILTER_VALIDATE_URL ) ) {
			return $this->invalid( __( 'Use a valid HTTPS media URL.', 'product-recommendation-quiz-for-ecommerce' ) );
		}
		$name = $body['filename'] ?? '';
		if ( ! is_string( $name ) || '' === trim( $name ) ) {
			$name = wp_basename( rawurldecode( (string) wp_parse_url( $url, PHP_URL_PATH ) ) );
		}
		$name = sanitize_file_name( $name );
		$alt  = sanitize_text_field( $body['alt'] ?? '' );

		if ( ! function_exists( 'wp_tempnam' ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
		}
		if ( ! function_exists( 'media_handle_sideload' ) ) {
			require_once ABSPATH . 'wp-admin/includes/media.php';
		}
		if ( ! function_exists( 'wp_generate_attachment_metadata' ) ) {
			require_once ABSPATH . 'wp-admin/includes/image.php';
		}

		// Keep the temporary filename under our control, regardless of the response headers.
		$temp = wp_tempnam();
		if ( ! $temp ) {
			return $this->invalid( __( 'Could not download the media file.', 'product-recommendation-quiz-for-ecommerce' ) );
		}

		$max_video = 100 * MB_IN_BYTES;
		try {
			$response = wp_safe_remote_get(
				$url,
				array(
					'stream'              => true,
					'filename'            => $temp,
					'limit_response_size' => $max_video + 1, // The extra byte detects truncation.
					'timeout'             => 60, // Shorter than the backend's 75-second timeout.
					'redirection'         => 3,
				)
			);
			$status   = is_wp_error( $response ) ? 0 : (int) wp_remote_retrieve_response_code( $response );
			if ( $status < 200 || $status >= 300 ) {
				return $this->invalid( __( 'Could not download the media file.', 'product-recommendation-quiz-for-ecommerce' ) );
			}

			$size = wp_filesize( $temp );
			if ( $size > $max_video ) {
				return $this->invalid( __( 'Media files cannot exceed 100 MB.', 'product-recommendation-quiz-for-ecommerce' ) );
			}
			$allowed = get_allowed_mime_types();
			$checked = wp_check_filetype_and_ext( $temp, $name, $allowed );
			$mime    = $checked['type'];
			$image   = is_string( $mime ) && 0 === strpos( $mime, 'image/' );
			$video   = is_string( $mime ) && 0 === strpos( $mime, 'video/' );
			if ( empty( $checked['ext'] ) || ! in_array( $mime, $allowed, true ) || ( ! $image && ! $video ) ) {
				return $this->invalid( __( 'Use a file type that WordPress allows for images or videos.', 'product-recommendation-quiz-for-ecommerce' ) );
			}
			if ( $image && $size > 20 * MB_IN_BYTES ) {
				return $this->invalid( __( 'Images cannot exceed 20 MB.', 'product-recommendation-quiz-for-ecommerce' ) );
			}

			$id = media_handle_sideload(
				array(
					'name'     => $name,
					'tmp_name' => $temp,
				),
				0
			);
			if ( is_wp_error( $id ) ) {
				return $this->invalid( __( 'Could not save the file to the Media Library.', 'product-recommendation-quiz-for-ecommerce' ) );
			}
			if ( '' !== $alt ) {
				update_post_meta( $id, '_wp_attachment_image_alt', wp_slash( $alt ) );
			}
			return new WP_REST_Response( $this->item( $id ), 201 );
		} finally {
			wp_delete_file( $temp );
		}
	}

	/**
	 * Map a WordPress attachment to the route's wire format.
	 *
	 * @param int $id Attachment ID.
	 * @return array Media item.
	 */
	private function item( $id ) {
		$url  = esc_url_raw( (string) wp_get_attachment_url( $id ), array( 'https', 'http' ) );
		$file = get_attached_file( $id );
		if ( ! $file ) {
			$file = (string) wp_parse_url( $url, PHP_URL_PATH );
		}
		$mime = (string) get_post_mime_type( $id );
		$item = array(
			'id'       => $id,
			'url'      => $url,
			'filename' => wp_basename( $file ),
			'alt'      => sanitize_text_field( get_post_meta( $id, '_wp_attachment_image_alt', true ) ),
			'mime'     => $mime,
			'date'     => get_post_time( DATE_ATOM, true, $id ),
		);
		if ( 0 === strpos( $mime, 'image/' ) ) {
			$metadata       = wp_get_attachment_metadata( $id );
			$item['width']  = (int) ( $metadata['width'] ?? 0 );
			$item['height'] = (int) ( $metadata['height'] ?? 0 );
		}
		return $item;
	}

	/**
	 * Return the same plain error shape for download and upload failures.
	 *
	 * @param string $message Plain error message.
	 * @return WP_REST_Response Invalid media response.
	 */
	private function invalid( $message ) {
		return new WP_REST_Response(
			array(
				'code'    => 'prq_media_invalid',
				'message' => $message,
			),
			400
		);
	}
}
