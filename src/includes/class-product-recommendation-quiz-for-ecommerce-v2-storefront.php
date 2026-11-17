<?php
/**
 * Signed store-copy delivery and the small storefront manifest.
 *
 * @package Product_Recommendation_Quiz_For_Ecommerce
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

/** Store published artifacts locally; never download executable code. */
class Product_Recommendation_Quiz_For_Ecommerce_V2_Storefront {
	const QUIZZES    = 'prq_v2_quizzes';
	const STOREFRONT = 'prq_v2_storefront';
	const ASSISTANTS = 'prq_v2_assistants';

	/** Read the bundled artifact contract version. @return int Runtime version. */
	public static function runtime() {
		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents -- Bundled local JSON, never a remote URL.
		$manifest = json_decode( file_get_contents( dirname( __DIR__ ) . '/assets/v2/runtime.json' ), true );
		return (int) $manifest['runtime'];
	}

	/**
	 * Save a signed published quiz, replacing each JSON file atomically.
	 *
	 * @param WP_REST_Request $request Signed push.
	 * @return array|WP_Error Result.
	 */
	public function put_quiz( $request ) {
		$id   = $request->get_param( 'sqid' );
		$body = $request->get_json_params();
		if ( ! is_string( $id ) || ! preg_match( '/^[A-Za-z0-9]+$/D', $id ) || ! is_array( $body ) ||
			! isset( $body['name'], $body['version'], $body['runtime'], $body['scripts'], $body['artifact'] ) ||
			! is_string( $body['name'] ) || ( ! is_string( $body['version'] ) && ! is_int( $body['version'] ) ) || ! is_int( $body['runtime'] ) || $body['runtime'] < 1 || ! is_bool( $body['scripts'] ) ||
			! $this->is_artifact( $body['artifact'] ) || ( isset( $body['treatment'] ) && ! $this->is_artifact( $body['treatment'] ) ) ) {
			return new WP_Error( 'prq_invalid_quiz', 'Invalid published HTML quiz.', array( 'status' => 400 ) );
		}
		$uploads = wp_upload_dir();
		$dir     = $uploads['basedir'] . '/prq-v2';
		if ( ! empty( $uploads['error'] ) || ! wp_mkdir_p( $dir ) ) {
			return new WP_Error( 'prq_store_copy_failed', 'Cannot create store-copy directory.', array( 'status' => 500 ) );
		}
		$path = $dir . '/quiz-' . $id;
		if ( ! $this->write_file( $path . '.html.json', wp_json_encode( $body['artifact'] ) ) ||
			( ! empty( $body['treatment'] ) && ! $this->write_file( $path . '-treatment.html.json', wp_json_encode( $body['treatment'] ) ) ) ) {
			return new WP_Error( 'prq_store_copy_failed', 'Cannot write store copy.', array( 'status' => 500 ) );
		}
		if ( empty( $body['treatment'] ) ) {
			wp_delete_file( $path . '-treatment.html.json' );
		}
		$quizzes        = get_option( self::QUIZZES, array() );
		$quizzes[ $id ] = array(
			'name'       => $body['name'],
			'version'    => $body['version'],
			'runtime'    => $body['runtime'],
			'scripts'    => $body['scripts'],
			'experiment' => isset( $body['experiment'] ) ? $body['experiment'] : null,
		);
		update_option( self::QUIZZES, $quizzes, true );
		return array( 'ok' => true );
	}

	/**
	 * Check the Shopify public artifact envelope.
	 *
	 * @param mixed $artifact Decoded JSON value.
	 * @return bool Whether this is an HTML artifact.
	 */
	private function is_artifact( $artifact ) {
		return is_array( $artifact ) && isset( $artifact['format'], $artifact['html'] ) && 'html' === $artifact['format'] && is_string( $artifact['html'] );
	}

	/**
	 * Write in the destination directory so rename is an atomic local operation.
	 *
	 * @param string       $path Destination.
	 * @param string|false $contents Public artifact bytes, or failed JSON encoding.
	 * @return bool Whether committed.
	 */
	private function write_file( $path, $contents ) {
		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_tempnam -- Same filesystem required for atomic rename.
		$temp = tempnam( dirname( $path ), '.prq-' );
		if ( false === $temp ) {
			return false;
		}
		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents -- Local public artifact, atomically replaced.
		$written = false !== $contents && strlen( $contents ) === file_put_contents( $temp, $contents );
		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_chmod -- Public upload must be readable by the web server (tempnam creates 0600).
		$readable = chmod( $temp, 0644 );
		// phpcs:ignore WordPress.WP.AlternativeFunctions.rename_rename -- Atomic replacement on the same filesystem.
		if ( $written && $readable && rename( $temp, $path ) ) {
			return true;
		}
		wp_delete_file( $temp );
		return false;
	}

	/**
	 * Remove a published quiz and its treatment.
	 *
	 * @param WP_REST_Request $request Signed deletion.
	 * @return array|WP_Error Result.
	 */
	public function delete_quiz( $request ) {
		$id = $request->get_param( 'sqid' );
		if ( ! is_string( $id ) || ! preg_match( '/^[A-Za-z0-9]+$/D', $id ) ) {
			return new WP_Error( 'prq_invalid_quiz', 'Invalid quiz id.', array( 'status' => 400 ) );
		}
		$uploads = wp_upload_dir();
		$path    = $uploads['basedir'] . '/prq-v2/quiz-' . $id;
		wp_delete_file( $path . '.html.json' );
		wp_delete_file( $path . '-treatment.html.json' );
		$quizzes = get_option( self::QUIZZES, array() );
		unset( $quizzes[ $id ] );
		update_option( self::QUIZZES, $quizzes, true );
		return array( 'ok' => true );
	}

	/**
	 * Store only the public assistant shell, never instructions or skills.
	 * A rollout retains metadata but removes the shell so V2 selects the version.
	 *
	 * @param WP_REST_Request $request Signed assistant push.
	 * @return array|WP_Error Result.
	 */
	public function put_assistant( $request ) {
		$id         = $request->get_param( 'sqid' );
		$body       = $request->get_json_params();
		$experiment = isset( $body['experiment'] ) ? $body['experiment'] : null;
		if ( ! is_string( $id ) || ! preg_match( '/^[A-Za-z0-9]+$/D', $id ) || ! is_array( $body ) ||
			! isset( $body['name'], $body['version'], $body['runtime'] ) || ! array_key_exists( 'shell', $body ) ||
			! is_string( $body['name'] ) || ( ! is_string( $body['version'] ) && ! is_int( $body['version'] ) ) || ! is_int( $body['runtime'] ) || $body['runtime'] < 1 ||
			( null !== $experiment && ! is_array( $experiment ) ) ||
			( ! is_string( $body['shell'] ) && null !== $body['shell'] ) ) {
			return new WP_Error( 'prq_invalid_assistant', 'Invalid published assistant shell.', array( 'status' => 400 ) );
		}
		$uploads = wp_upload_dir();
		$dir     = $uploads['basedir'] . '/prq-v2';
		$path    = $dir . '/assistant-' . $id . '.html';
		if ( null === $body['shell'] ) {
			wp_delete_file( $path );
		} elseif ( ! empty( $uploads['error'] ) || ! wp_mkdir_p( $dir ) || ! $this->write_file( $path, $body['shell'] ) ) {
			return new WP_Error( 'prq_store_copy_failed', 'Cannot write assistant store copy.', array( 'status' => 500 ) );
		}
		$assistants        = get_option( self::ASSISTANTS, array() );
		$assistants[ $id ] = array(
			'name'       => $body['name'],
			'version'    => $body['version'],
			'runtime'    => $body['runtime'],
			'experiment' => $experiment,
		);
		update_option( self::ASSISTANTS, $assistants, true );
		return array( 'ok' => true );
	}

	/**
	 * Remove a public assistant shell and its picker entry.
	 *
	 * @param WP_REST_Request $request Signed deletion.
	 * @return array|WP_Error Result.
	 */
	public function delete_assistant( $request ) {
		$id = $request->get_param( 'sqid' );
		if ( ! is_string( $id ) || ! preg_match( '/^[A-Za-z0-9]+$/D', $id ) ) {
			return new WP_Error( 'prq_invalid_assistant', 'Invalid assistant id.', array( 'status' => 400 ) );
		}
		$uploads = wp_upload_dir();
		wp_delete_file( $uploads['basedir'] . '/prq-v2/assistant-' . $id . '.html' );
		$assistants = get_option( self::ASSISTANTS, array() );
		unset( $assistants[ $id ] );
		update_option( self::ASSISTANTS, $assistants, true );
		return array( 'ok' => true );
	}

	/**
	 * Store the V2-owned storefront settings, not the V1 WordPress settings.
	 *
	 * @param WP_REST_Request $request Signed settings push.
	 * @return array|WP_Error Result.
	 */
	public function put_storefront( $request ) {
		$body = $request->get_json_params();
		if ( ! is_array( $body ) || ! isset( $body['siteWide'] ) || ! is_array( $body['siteWide'] ) ) {
			return new WP_Error( 'prq_invalid_storefront', 'Invalid storefront settings.', array( 'status' => 400 ) );
		}
		// The assistant push index is the single source for published names.
		unset( $body['assistants'] );
		update_option( self::STOREFRONT, $body, true );
		return array( 'ok' => true );
	}

	/** Return versions and placements for V2 reconciliation. @return array Store inventory. */
	public function get_storefront() {
		$quizzes = array();
		foreach ( get_option( self::QUIZZES, array() ) as $id => $quiz ) {
			$quizzes[ $id ] = $quiz['version'];
		}
		$assistants = array();
		foreach ( get_option( self::ASSISTANTS, array() ) as $id => $assistant ) {
			$assistants[ $id ] = $assistant['version'];
		}
		return array(
			'runtime'    => self::runtime(),
			'quizzes'    => (object) $quizzes,
			'assistants' => (object) $assistants,
			'placements' => ( new Product_Recommendation_Quiz_For_Ecommerce_V2_Placements() )->scan(),
		);
	}

	/** Remove only our generated upload directory and options on uninstall. @return void */
	public static function uninstall() {
		$uploads = wp_upload_dir();
		$dir     = $uploads['basedir'] . '/prq-v2';
		$files   = glob( $dir . '/*' );
		foreach ( false === $files ? array() : $files as $file ) {
			wp_delete_file( $file );
		}
		if ( is_dir( $dir ) ) {
			// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_rmdir -- Empty plugin-owned public artifact directory.
			rmdir( $dir );
		}
		delete_option( self::QUIZZES );
		delete_option( self::ASSISTANTS );
		delete_option( self::STOREFRONT );
	}
}
