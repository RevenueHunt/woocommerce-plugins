<?php
/**
 * The shared V2 navigation advertised to the WordPress host.
 *
 * @package Product_Recommendation_Quiz_For_Ecommerce
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

/** Fetches the public menu and resolves only advertised destinations. */
class Product_Recommendation_Quiz_For_Ecommerce_V2_Admin_Nav {

	/**
	 * Menus already resolved during this request, keyed by admin URL and locale.
	 *
	 * @var array<string, array<array{path: string, label: string}>>
	 */
	private static $request_items = array();

	/**
	 * Memoize the menu per request; cache success a day and failure five minutes.
	 *
	 * @return array<array{path: string, label: string}> Validated menu items.
	 */
	public static function items() {
		$connection = Product_Recommendation_Quiz_For_Ecommerce_V2::connection();
		if ( ! $connection ) {
			return array();
		}
		$locale = get_locale();
		$key    = 'prq_v2_admin_nav_' . md5( $connection['admin_url'] . '|' . $locale );
		if ( isset( self::$request_items[ $key ] ) ) {
			return self::$request_items[ $key ];
		}
		$cached = get_transient( $key );
		if ( ! is_array( $cached ) ) {
			$fetched = self::fetch_items( $connection['admin_url'], $locale );
			$cached  = $fetched ?? array();
			set_transient( $key, $cached, null === $fetched ? 5 * MINUTE_IN_SECONDS : DAY_IN_SECONDS );
		}
		self::$request_items[ $key ] = $cached;
		return $cached;
	}

	/**
	 * Fetch and validate the advertised menu, distinguishing failure from an empty list.
	 *
	 * @param string $admin_url Connected V2 admin URL.
	 * @param string $locale WordPress locale.
	 * @return array<array{path: string, label: string}>|null Menu items, or null on failure.
	 */
	private static function fetch_items( $admin_url, $locale ) {
		$query    = http_build_query(
			array(
				'platform' => 'woocommerce',
				'locale'   => $locale,
			),
			'',
			'&',
			PHP_QUERY_RFC3986
		);
		$response = wp_remote_get(
			rtrim( $admin_url, '/' ) . '/api/admin-nav?' . $query,
			array(
				'timeout'             => 2,
				'redirection'         => 0,
				'limit_response_size' => 32768,
			)
		);
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			return null;
		}
		$data = json_decode( wp_remote_retrieve_body( $response ), true );
		if ( ! is_array( $data ) || ! isset( $data['items'] ) || ! is_array( $data['items'] ) || array_values( $data['items'] ) !== $data['items'] ) {
			return null;
		}
		$items = array();
		$paths = array();
		foreach ( $data['items'] as $item ) {
			if ( ! is_array( $item ) || ! isset( $item['path'], $item['label'] ) || ! is_string( $item['path'] ) || ! is_string( $item['label'] ) ||
				! preg_match( '~\A/[a-z0-9/-]*\z~', $item['path'] ) || '' === $item['label'] || sanitize_text_field( $item['label'] ) !== $item['label'] || isset( $paths[ $item['path'] ] ) ) {
				return null;
			}
			$paths[ $item['path'] ] = true;
			$items[]                = array(
				'path'  => $item['path'],
				'label' => $item['label'],
			);
		}
		return $items;
	}

	/**
	 * Select an exact advertised path; the main menu opens the first item.
	 *
	 * @return string The advertised destination, or empty for V2's fallback.
	 */
	public static function selected_path() {
		$items = self::items();
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Read-only navigation, not an action.
		if ( ! isset( $_GET['path'] ) ) {
			return $items[0]['path'] ?? '';
		}
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended,WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- The exact advertised-path lookup below is the sanitizer.
		$path = wp_unslash( $_GET['path'] );
		foreach ( $items as $item ) {
			if ( $path === $item['path'] ) {
				return $path;
			}
		}
		return '';
	}

	/**
	 * WordPress query slugs keep every submenu on the same page callback.
	 *
	 * @param string $path An advertised path.
	 * @return string WordPress submenu slug.
	 */
	public static function menu_slug( $path ) {
		$items = self::items();
		return isset( $items[0] ) && $path === $items[0]['path'] ? 'prqfw' : 'prqfw&path=' . rawurlencode( $path );
	}
}
