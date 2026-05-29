/**
 * Editor script for the Product Recommendation Quiz block.
 *
 * Hand-authored against the global wp.* packages (no JSX, no build step). The
 * block is dynamic: save() returns null and the server render callback emits the
 * delivery markup, so the editor only needs a clean placeholder + the settings.
 *
 * The block name and text domain below are the canonical (eCommerce) tokens; the
 * single-source build substitutes them per distribution, so the editor block
 * name always matches the PHP-registered block.json name for that artifact.
 */
( function ( blocks, element, blockEditor, components, i18n ) {
	'use strict';

	var el = element.createElement;
	var __ = i18n.__;
	var InspectorControls = blockEditor.InspectorControls;
	var useBlockProps = blockEditor.useBlockProps;
	var PanelBody = components.PanelBody;
	var TextControl = components.TextControl;
	var RangeControl = components.RangeControl;
	var Placeholder = components.Placeholder;
	var domain = 'product-recommendation-quiz-for-ecommerce';

	blocks.registerBlockType( 'revenuehunt/product-recommendation-quiz-for-ecommerce', {
		edit: function ( props ) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var blockProps = useBlockProps();

			var inspector = el(
				InspectorControls,
				null,
				el(
					PanelBody,
					{ title: __( 'Quiz settings', domain ), initialOpen: true },
					el( TextControl, {
						label: __( 'Quiz ID', domain ),
						help: __( 'The code from your quiz Share link, e.g. the CODE in /public/quiz/CODE.', domain ),
						value: attributes.id,
						onChange: function ( value ) {
							setAttributes( { id: value } );
						}
					} ),
					el( RangeControl, {
						label: __( 'Height (px)', domain ),
						value: attributes.height,
						min: 200,
						max: 2000,
						step: 10,
						onChange: function ( value ) {
							setAttributes( { height: value } );
						}
					} )
				)
			);

			var placeholder = el(
				Placeholder,
				{
					icon: 'format-chat',
					label: __( 'Product Recommendation Quiz', domain ),
					instructions: attributes.id
						? __( 'Your quiz will appear here on the published page.', domain )
						: __( 'Enter your Quiz ID to display the quiz on this page.', domain )
				},
				el( TextControl, {
					label: __( 'Quiz ID', domain ),
					value: attributes.id,
					onChange: function ( value ) {
						setAttributes( { id: value } );
					}
				} )
			);

			return el( 'div', blockProps, inspector, placeholder );
		},
		save: function () {
			return null;
		}
	} );
} )( window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components, window.wp.i18n );
