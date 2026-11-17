<?php
/**
 * Batched Action Scheduler exports and one-use downloads.
 *
 * @package Product_Recommendation_Quiz_For_Ecommerce
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

/** Owns an export's private file and small resumable manifest. */
class Product_Recommendation_Quiz_For_Ecommerce_V2_Catalog {
	/** Schedule each night independently so 03:00 follows DST, not a 24h interval. @return void */
	public function schedule_nightly() {
		if ( ! as_has_scheduled_action( 'prq_v2_catalog_nightly', array(), 'prq' ) ) {
			$next = new DateTimeImmutable( 'today 03:00', wp_timezone() );
			if ( $next->getTimestamp() <= time() ) {
				$next = $next->modify( '+1 day' );
			}
			as_schedule_single_action( $next->getTimestamp(), 'prq_v2_catalog_nightly', array(), 'prq' );
		}
	}

	/** Queue the nightly export with the last selection. @return void */
	public function nightly() {
		if ( ! Product_Recommendation_Quiz_For_Ecommerce_V2::connection( true ) ) {
			return;
		}
		// The current action is still running, so schedule tomorrow explicitly.
		$next = new DateTimeImmutable( 'tomorrow 03:00', wp_timezone() );
		as_schedule_single_action( $next->getTimestamp(), 'prq_v2_catalog_nightly', array(), 'prq' );
		$this->start( get_option( 'prq_v2_picked_metafields', array() ) );
	}

	/**
	 * Sync now, authenticated by the V2 permission callback.
	 *
	 * @param WP_REST_Request $request Export request.
	 * @return WP_REST_Response|WP_Error Accepted or validation error.
	 */
	public function queue( $request ) {
		$picked = $request->get_param( 'picked_metafields' );
		if ( ! is_array( $picked ) || count( $picked ) > 100 || count( array_filter( $picked, 'is_string' ) ) !== count( $picked ) ) {
			return new WP_Error( 'prq_invalid_metafields', 'picked_metafields must be an array of at most 100 strings.', array( 'status' => 400 ) );
		}
		update_option( 'prq_v2_picked_metafields', $picked, false );
		return new WP_REST_Response( array( 'queued' => $this->start( $picked ) ), 202 );
	}

	/**
	 * Create one export at a time. A random name is not the access control.
	 *
	 * The PHP exit guard prevents direct HTTP reads even without Apache deny rules;
	 * only the authenticated REST download skips it. The response itself is JSONL.
	 *
	 * @param array $picked Selected custom fields.
	 * @return bool Whether a new export was queued.
	 */
	public function start( $picked ) {
		$id = bin2hex( random_bytes( 24 ) );
		if ( ! add_option( 'prq_v2_catalog_active', $id, '', false ) ) {
			return false;
		}
		$uploads = wp_upload_dir();
		$path    = $uploads['basedir'] . '/prq-catalog-' . $id . '.php';
		$state   = array(
			'path'     => $path,
			'page'     => 1,
			'products' => 0,
			'keys'     => array(),
			'picked'   => $picked,
			'offset'   => 0,
		);
		add_option( 'prq_v2_export_' . $id, $state, '', false );
		as_schedule_single_action( time() + 3600, 'prq_v2_catalog_cleanup', array( $id ), 'prq' );
		as_enqueue_async_action( 'prq_v2_catalog_batch', array( $id ), 'prq' );
		return true;
	}

	/**
	 * Append up to 100 products. Truncate to the saved offset on retry.
	 *
	 * @param string $id Random export id.
	 * @return void
	 * @throws RuntimeException On I/O or notification failure (visible in Scheduled Actions).
	 */
	public function batch( $id ) {
		$state = get_option( 'prq_v2_export_' . $id );
		if ( ! $state || ! Product_Recommendation_Quiz_For_Ecommerce_V2::connection( true ) ) {
			return;
		}
		if ( isset( $state['expires'] ) ) {
			$this->notify( $id, $state );
			return;
		}
		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fopen -- Private local streaming file; WP_Filesystem cannot seek/truncate.
		$file = fopen( $state['path'], 'c+b' );
		if ( ! $file ) {
			throw new RuntimeException( 'Cannot open catalogue export.' );
		}
		try {
			if ( ! ftruncate( $file, $state['offset'] ) || 0 !== fseek( $file, $state['offset'] ) ) {
				throw new RuntimeException( 'Cannot resume catalogue export.' );
			}
			if ( 0 === $state['offset'] ) {
				$this->write( $file, "<?php exit; __halt_compiler(); ?>\n" );
				$this->line(
					$file,
					array(
						'format'      => 'rh-catalog',
						'version'     => 1,
						'platform'    => 'woocommerce',
						'generatedAt' => gmdate( 'Y-m-d\TH:i:s\Z' ),
						'currency'    => get_woocommerce_currency(),
						'locale'      => get_locale(),
					)
				);
			}
			$query  = new WP_Query(
				array(
					'post_type'      => 'product',
					'post_status'    => array( 'publish', 'draft', 'pending', 'private', 'future' ),
					'fields'         => 'ids',
					'posts_per_page' => 100,
					'paged'          => $state['page'],
					'orderby'        => 'ID',
					'order'          => 'ASC',
					'no_found_rows'  => true,
				)
			);
			$mapper = new Product_Recommendation_Quiz_For_Ecommerce_V2_Catalog_Product();
			foreach ( $query->posts as $product_id ) {
				$product = wc_get_product( $product_id );
				if ( ! $product ) {
					continue;
				}
				$this->line( $file, $mapper->line( $product, $state['picked'] ) );
				++$state['products'];
				foreach ( get_post_meta( $product_id ) as $key => $values ) {
					$value = maybe_unserialize( $values[0] );
					if ( Product_Recommendation_Quiz_For_Ecommerce_V2_Catalog_Product::eligible_meta( $key, $value ) ) {
						$state['keys'][ $key ] = ( $state['keys'][ $key ] ?? 0 ) + 1;
					}
				}
			}
			if ( 100 === count( $query->posts ) ) {
				++$state['page'];
				$state['offset'] = ftell( $file );
				update_option( 'prq_v2_export_' . $id, $state, false );
				// An active multi-hour export must not be mistaken for a stalled job.
				as_unschedule_all_actions( 'prq_v2_catalog_cleanup', array( $id ), 'prq' );
				as_schedule_single_action( time() + 3600, 'prq_v2_catalog_cleanup', array( $id ), 'prq' );
				as_enqueue_async_action( 'prq_v2_catalog_batch', array( $id ), 'prq' );
				return;
			}
			$keys = array();
			ksort( $state['keys'] );
			foreach ( $state['keys'] as $key => $count ) {
				$keys[] = array(
					'key'   => $key,
					'count' => $count,
				);
			}
			$this->line(
				$file,
				array(
					'type' => 'metafield_keys',
					'keys' => $keys,
				)
			);
			$terms = get_terms(
				array(
					'taxonomy'   => 'product_cat',
					'hide_empty' => false,
				)
			);
			if ( is_wp_error( $terms ) ) {
				throw new RuntimeException( 'Cannot read catalogue categories.' );
			}
			foreach ( $terms as $term ) {
				$line = array(
					'type'   => 'collection',
					'id'     => 'gid://woocommerce/Collection/' . $term->term_id,
					'title'  => $term->name,
					'handle' => $term->slug,
				);
				if ( $term->parent ) {
					$line['parent'] = 'gid://woocommerce/Collection/' . $term->parent;
				}
				$this->line( $file, $line );
			}
		} finally {
			// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fclose -- Paired with streaming fopen above.
			fclose( $file );
		}
		$state['expires'] = time() + 3600;
		update_option( 'prq_v2_export_' . $id, $state, false );
		// Cleanup is measured from readiness, not the beginning of a long export.
		as_unschedule_all_actions( 'prq_v2_catalog_cleanup', array( $id ), 'prq' );
		as_schedule_single_action( $state['expires'], 'prq_v2_catalog_cleanup', array( $id ), 'prq' );
		delete_option( 'prq_v2_catalog_active' );
		$this->notify( $id, $state );
	}

	/**
	 * Write an entire string or fail the action.
	 *
	 * @param resource $file File handle.
	 * @param string   $bytes Bytes to append.
	 * @return void
	 * @throws RuntimeException On a short write.
	 */
	private function write( $file, $bytes ) {
		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fwrite -- Streaming export.
		if ( fwrite( $file, $bytes ) !== strlen( $bytes ) ) {
			throw new RuntimeException( 'Cannot write catalogue export.' );
		}
	}

	/**
	 * Write compact UTF-8 JSONL, failing rather than publishing invalid data.
	 *
	 * @param resource $file File handle.
	 * @param array    $line Payload.
	 * @return void
	 * @throws RuntimeException On invalid JSON.
	 */
	private function line( $file, $line ) {
		$json = wp_json_encode( $line, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES );
		if ( false === $json ) {
			throw new RuntimeException( 'Cannot encode catalogue line.' );
		}
		$this->write( $file, $json . "\n" );
	}

	/**
	 * Announce readiness with the canonical plugin-to-V2 request signature.
	 *
	 * @param string $id Export id.
	 * @param array  $state Export manifest.
	 * @return void
	 * @throws RuntimeException When V2 does not accept the notification.
	 */
	private function notify( $id, $state ) {
		$connection = Product_Recommendation_Quiz_For_Ecommerce_V2::connection();
		$signature  = hash_hmac( 'sha256', $id . '.' . $state['expires'], $connection['shared_secret'] );
		$url        = add_query_arg(
			array(
				'id'        => $id,
				'expires'   => $state['expires'],
				'signature' => $signature,
			),
			rest_url( 'prq/v3/catalog/download' )
		);
		$body       = wp_json_encode(
			array(
				'shop'       => $connection['shop'],
				'url'        => $url,
				'expires_at' => $state['expires'],
				'products'   => $state['products'],
			)
		);
		$timestamp  = (string) time();
		$route      = '/api/woocommerce/catalog_ready';
		$response   = wp_remote_post(
			$connection['api_url'] . $route,
			array(
				'headers' => array(
					'Content-Type'    => 'application/json',
					'X-PRQ-Timestamp' => $timestamp,
					'X-PRQ-Signature' => Product_Recommendation_Quiz_For_Ecommerce_V2::sign( $connection['shared_secret'], $timestamp, 'POST', $route, array(), $body ),
				),
				'body'    => $body,
				'timeout' => 30,
			)
		);
		if ( is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) < 200 || wp_remote_retrieve_response_code( $response ) >= 300 ) {
			throw new RuntimeException( 'V2 did not accept catalog_ready.' );
		}
	}

	/**
	 * Authenticate a signed URL; no timestamp header is needed for this capability.
	 *
	 * @param WP_REST_Request $request Download request.
	 * @return bool Whether the unconsumed export exists and its URL is valid.
	 */
	public function authorize_download( $request ) {
		$id         = (string) $request->get_param( 'id' );
		$expires    = (string) $request->get_param( 'expires' );
		$connection = Product_Recommendation_Quiz_For_Ecommerce_V2::connection();
		if ( ! $connection || ! preg_match( '/^[a-f0-9]{48}$/', $id ) || ! ctype_digit( $expires ) ) {
			return false;
		}
		$state = get_option( 'prq_v2_export_' . $id );
		return $state && isset( $state['expires'] ) && (int) $expires === $state['expires'] && time() < (int) $expires
			&& ! get_option( 'prq_v2_download_' . $id )
			&& hash_equals( hash_hmac( 'sha256', $id . '.' . $expires, $connection['shared_secret'] ), (string) $request->get_param( 'signature' ) );
	}

	/**
	 * Atomically consume, then stream without loading the catalogue into memory.
	 *
	 * @param WP_REST_Request $request Download request.
	 * @return WP_Error Only on failure; a successful stream exits REST rendering.
	 */
	public function download( $request ) {
		$id = (string) $request->get_param( 'id' );
		if ( ! $this->authorize_download( $request ) || ! add_option( 'prq_v2_download_' . $id, true, '', false ) ) {
			return new WP_Error( 'prq_download_used', 'Download expired or already used.', array( 'status' => 403 ) );
		}
		$state = get_option( 'prq_v2_export_' . $id );
		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fopen -- Streaming local private file.
		$file = fopen( $state['path'], 'rb' );
		if ( ! $file ) {
			return new WP_Error( 'prq_download_missing', 'Export file is missing.', array( 'status' => 404 ) );
		}
		fgets( $file ); // Skip the PHP exit guard; the download is pure JSONL.
		nocache_headers();
		header( 'Content-Type: application/x-ndjson; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename="catalog.jsonl"' );
		header( 'X-Content-Type-Options: nosniff' );
		fpassthru( $file );
		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fclose -- Paired streaming open.
		fclose( $file );
		$this->cleanup( $id );
		exit;
	}

	/** Remove all guarded export files and resumable state after canceling jobs. @return void */
	public function cleanup_all() {
		global $wpdb;
		$uploads = wp_upload_dir();
		$pattern = $uploads['basedir'] . '/prq-catalog-' . str_repeat( '[a-f0-9]', 48 ) . '.php';
		foreach ( glob( $pattern ) as $path ) {
			wp_delete_file( $path );
		}
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- Uncached option-name discovery; delete_option below handles each option's cache.
		$keys = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT option_name FROM {$wpdb->options} WHERE option_name LIKE %s OR option_name LIKE %s",
				$wpdb->esc_like( 'prq_v2_export_' ) . '%',
				$wpdb->esc_like( 'prq_v2_download_' ) . '%'
			)
		);
		foreach ( $keys as $key ) {
			delete_option( $key );
		}
		delete_option( 'prq_v2_catalog_active' );
	}

	/**
	 * Remove stale files and manifests, including failed jobs.
	 *
	 * @param string $id Export id.
	 * @return void
	 */
	public function cleanup( $id ) {
		$state = get_option( 'prq_v2_export_' . $id );
		if ( $state ) {
			wp_delete_file( $state['path'] );
		}
		delete_option( 'prq_v2_export_' . $id );
		delete_option( 'prq_v2_download_' . $id );
		if ( get_option( 'prq_v2_catalog_active' ) === $id ) {
			delete_option( 'prq_v2_catalog_active' );
		}
	}
}
