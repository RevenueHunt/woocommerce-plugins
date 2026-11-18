/** V2 editor cards and preloaded pickers. Plain ES5, no live embeds or network calls. */
( function ( wp, data ) {
	'use strict';
	var el = wp.element.createElement;
	var __ = wp.i18n.__;
	var c = wp.components;
	var editor = wp.blockEditor;
	var titles = {
		inline: __( 'RevenueHunt Quiz', 'product-recommendation-quiz-for-ecommerce' ),
		'link-popup': __( 'RevenueHunt Popup Button', 'product-recommendation-quiz-for-ecommerce' ),
		'chat-button': __( 'RevenueHunt Chat Button', 'product-recommendation-quiz-for-ecommerce' ),
		'automatic-popup': __( 'RevenueHunt Automatic Popup', 'product-recommendation-quiz-for-ecommerce' ),
		assistant: __( 'RevenueHunt Assistant', 'product-recommendation-quiz-for-ecommerce' )
	};
	var defaultLabel = __( 'Store default', 'product-recommendation-quiz-for-ecommerce' );
	var icon = el( 'img', { src: data.iconUrl, alt: '', width: 32, height: 32 } );

	function register( name, kind, idKey ) {
		var assistant = kind === 'assistant';
		var options = [ { label: defaultLabel, value: '' } ];
		if ( assistant ) {
			( data.assistants || [] ).forEach( function ( item ) {
				options.push( { label: item.name, value: item.id } );
			} );
		} else {
			Object.keys( data.quizzes || {} ).forEach( function ( id ) {
				options.push( { label: data.quizzes[ id ].name, value: id } );
			} );
		}
		wp.blocks.registerBlockType( name, {
			apiVersion: 3,
			title: titles[ kind ],
			category: 'widgets',
			icon: icon,
			keywords: ( assistant ? [] : [
				__( 'quiz', 'product-recommendation-quiz-for-ecommerce' ),
				__( 'product finder', 'product-recommendation-quiz-for-ecommerce' )
			] ).concat( [
				__( 'recommendation', 'product-recommendation-quiz-for-ecommerce' ),
				__( 'assistant', 'product-recommendation-quiz-for-ecommerce' ),
				__( 'chat', 'product-recommendation-quiz-for-ecommerce' ),
				__( 'revenuehunt', 'product-recommendation-quiz-for-ecommerce' )
			] ),
			edit: function ( props ) {
				var a = props.attributes;
				function set( key, value ) {
					var change = {};
					change[ key ] = value;
					props.setAttributes( change );
				}
				function text( key, label, number ) {
					return el( c.TextControl, { key: key, label: label, value: a[ key ], type: number ? 'number' : 'text', onChange: function ( value ) { set( key, number ? parseInt( value, 10 ) || 0 : value ); } } );
				}
				function toggle( key, label ) {
					return el( c.ToggleControl, { key: key, label: label, checked: !! a[ key ], onChange: function ( value ) { set( key, value ); } } );
				}
				var controls = [ el( c.SelectControl, {
					key: 'picker',
					label: assistant ? __( 'Assistant', 'product-recommendation-quiz-for-ecommerce' ) : __( 'Quiz', 'product-recommendation-quiz-for-ecommerce' ),
					value: a[ idKey ] || '',
					options: options,
					onChange: function ( value ) { set( idKey, value ); }
				} ) ];
				if ( kind === 'inline' ) {
					controls.push( text( 'height', __( 'Quiz height', 'product-recommendation-quiz-for-ecommerce' ), true ) );
					controls.push( el( c.SelectControl, { key: 'unit', label: __( 'Height unit', 'product-recommendation-quiz-for-ecommerce' ), value: a.heightUnit, options: [ { label: __( 'Pixels (px)', 'product-recommendation-quiz-for-ecommerce' ), value: 'px' }, { label: __( 'Viewport height (vh)', 'product-recommendation-quiz-for-ecommerce' ), value: 'vh' } ], onChange: function ( value ) { set( 'heightUnit', value ); } } ) );
					controls.push( toggle( 'fixedHeight', __( 'Fixed height', 'product-recommendation-quiz-for-ecommerce' ) ) );
					controls.push( toggle( 'autoscroll', __( 'Auto-scroll', 'product-recommendation-quiz-for-ecommerce' ) ) );
					controls.push( toggle( 'fullWidth', __( 'Full width quiz', 'product-recommendation-quiz-for-ecommerce' ) ) );
				}
				if ( kind === 'link-popup' ) {
					controls.push( text( 'label', __( 'Button label', 'product-recommendation-quiz-for-ecommerce' ) ) );
				}
				if ( kind === 'chat-button' ) {
					controls.push( text( 'color', __( 'Button color', 'product-recommendation-quiz-for-ecommerce' ) ) );
					controls.push( text( 'greeting', __( 'Greeting text', 'product-recommendation-quiz-for-ecommerce' ) ) );
				}
				if ( kind === 'automatic-popup' ) {
					controls.push( text( 'timeout', __( 'Delay (seconds)', 'product-recommendation-quiz-for-ecommerce' ), true ) );
					controls.push( toggle( 'exitIntent', __( 'Exit intent', 'product-recommendation-quiz-for-ecommerce' ) ) );
				}
				var selected = options.filter( function ( option ) { return option.value === ( a[ idKey ] || '' ); } )[ 0 ];
				var instructions = selected ? selected.label : defaultLabel;
				if ( ! data.connected ) {
					instructions = assistant
						? __( 'Connect RevenueHunt to show assistants.', 'product-recommendation-quiz-for-ecommerce' )
						: __( 'Connect RevenueHunt to show quizzes.', 'product-recommendation-quiz-for-ecommerce' );
				} else if ( options.length === 1 ) {
					instructions = assistant
						? __( 'Publish an assistant in RevenueHunt to show it here.', 'product-recommendation-quiz-for-ecommerce' )
						: __( 'Publish a quiz in RevenueHunt to show it here.', 'product-recommendation-quiz-for-ecommerce' );
				}
				return el( 'div', editor.useBlockProps(),
					el( editor.InspectorControls, null, el( c.PanelBody, { title: titles[ kind ], initialOpen: true }, controls ) ),
					el( c.Placeholder, { icon: icon, label: titles[ kind ], instructions: instructions },
						el( 'a', { href: data.editUrl }, __( 'Edit in RevenueHunt', 'product-recommendation-quiz-for-ecommerce' ) )
					)
				);
			},
			save: function () { return null; }
		} );
	}
	window.prqV2Blocks = { register: register };
} )( window.wp, window.prqV2BlocksData );
