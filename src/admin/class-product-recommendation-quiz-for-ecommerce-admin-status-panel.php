<?php
/**
 * The native at-a-glance status panel.
 *
 * Renders connection state and the detected environment (versions, translation
 * and multi-currency plugins, base language/currency) natively in the admin,
 * above the management iframe. Reads through the Connection and Environment
 * seams, so it reports a V1 (admin.revenuehunt.com) connection today and a
 * future V3 (cloud.revenuehunt.com) connection without changing.
 *
 * @link       https://revenuehunt.com/
 * @since      2.4.0
 *
 * @package    Product_Recommendation_Quiz_For_Ecommerce
 * @subpackage Product_Recommendation_Quiz_For_Ecommerce/admin
 */

// Prevent direct access.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Renders the native connection/environment status panel.
 *
 * @package    Product_Recommendation_Quiz_For_Ecommerce
 * @subpackage Product_Recommendation_Quiz_For_Ecommerce/admin
 */
class Product_Recommendation_Quiz_For_Ecommerce_Admin_Status_Panel {

	/**
	 * The backend connection.
	 *
	 * @since 2.4.0
	 * @var Product_Recommendation_Quiz_For_Ecommerce_Connection
	 */
	private $connection;

	/**
	 * The environment detector.
	 *
	 * @since 2.4.0
	 * @var Product_Recommendation_Quiz_For_Ecommerce_Environment
	 */
	private $environment;

	/**
	 * Initialize with the connection + environment collaborators.
	 *
	 * @since 2.4.0
	 * @param Product_Recommendation_Quiz_For_Ecommerce_Connection|null  $connection  Backend connection.
	 * @param Product_Recommendation_Quiz_For_Ecommerce_Environment|null $environment Environment detector.
	 */
	public function __construct( $connection = null, $environment = null ) {
		$this->connection  = $connection ? $connection : new Product_Recommendation_Quiz_For_Ecommerce_Oauth_Connection();
		$this->environment = $environment ? $environment : new Product_Recommendation_Quiz_For_Ecommerce_Environment();
	}

	/**
	 * Render the status panel.
	 *
	 * @since 2.4.0
	 * @return void
	 */
	public function render() {
		$translation   = $this->environment->get_translation_plugin();
		$multicurrency = $this->environment->get_multicurrency_plugin();
		$wc_version    = $this->environment->get_woocommerce_version();
		$currency      = $this->environment->get_base_currency();
		?>
		<div class="prq-status-panel">
			<h2 class="prq-status-title"><?php esc_html_e( 'Connection status', 'product-recommendation-quiz-for-ecommerce' ); ?></h2>
			<ul class="prq-status-list">
				<li>
					<span class="prq-status-label"><?php esc_html_e( 'Connection', 'product-recommendation-quiz-for-ecommerce' ); ?></span>
					<span class="prq-status-value">
					<?php
					if ( $this->connection->is_connected() ) {
						printf(
							/* translators: %s: backend host the store is connected to. */
							esc_html__( 'Connected to %s', 'product-recommendation-quiz-for-ecommerce' ),
							esc_html( $this->connection->get_target() )
						);
					} else {
						esc_html_e( 'Not connected', 'product-recommendation-quiz-for-ecommerce' );
					}
					?>
					</span>
				</li>
				<li>
					<span class="prq-status-label"><?php esc_html_e( 'Store domain', 'product-recommendation-quiz-for-ecommerce' ); ?></span>
					<span class="prq-status-value"><?php echo esc_html( $this->connection->get_domain() ); ?></span>
				</li>
				<li>
					<span class="prq-status-label"><?php esc_html_e( 'WordPress version', 'product-recommendation-quiz-for-ecommerce' ); ?></span>
					<span class="prq-status-value"><?php echo esc_html( $this->environment->get_wordpress_version() ); ?></span>
				</li>
				<li>
					<span class="prq-status-label"><?php esc_html_e( 'WooCommerce version', 'product-recommendation-quiz-for-ecommerce' ); ?></span>
					<span class="prq-status-value"><?php echo '' !== $wc_version ? esc_html( $wc_version ) : esc_html__( 'None detected', 'product-recommendation-quiz-for-ecommerce' ); ?></span>
				</li>
				<li>
					<span class="prq-status-label"><?php esc_html_e( 'Translation plugin', 'product-recommendation-quiz-for-ecommerce' ); ?></span>
					<span class="prq-status-value"><?php echo null !== $translation ? esc_html( $translation ) : esc_html__( 'None detected', 'product-recommendation-quiz-for-ecommerce' ); ?></span>
				</li>
				<li>
					<span class="prq-status-label"><?php esc_html_e( 'Multi-currency plugin', 'product-recommendation-quiz-for-ecommerce' ); ?></span>
					<span class="prq-status-value"><?php echo null !== $multicurrency ? esc_html( $multicurrency ) : esc_html__( 'None detected', 'product-recommendation-quiz-for-ecommerce' ); ?></span>
				</li>
				<li>
					<span class="prq-status-label"><?php esc_html_e( 'Base language', 'product-recommendation-quiz-for-ecommerce' ); ?></span>
					<span class="prq-status-value"><?php echo esc_html( $this->environment->get_base_language() ); ?></span>
				</li>
				<li>
					<span class="prq-status-label"><?php esc_html_e( 'Base currency', 'product-recommendation-quiz-for-ecommerce' ); ?></span>
					<span class="prq-status-value"><?php echo '' !== $currency ? esc_html( $currency ) : esc_html( '—' ); ?></span>
				</li>
			</ul>
		</div>
		<?php
	}
}
