(function(blocks, editor, element, components) {
	
	var el 					= wp.element.createElement;
	var registerBlockType 	= wp.blocks.registerBlockType;
	var PlainText 			= wp.blockEditor.PlainText;
	var RichText 			= wp.blockEditor.RichText;
	var ButtonGroup 		= wp.components.ButtonGroup;
	var Button 				= wp.components.Button;
	var ColorPicker 		= wp.components.ColorPicker;
	var Toolbar				= wp.components.Toolbar;
	// var withState			= wp.compose.withState;

	registerBlockType( 'cb-blocks/cb-block-1', {

		title: 'CB Block',
		category: 'common',

		attributes: {
			text: {
				source: 'children',
				selector: 'p',
				default: ''
			}
		},

		edit: function( props ) {
			var attributes = props.attributes;
			
			function updateContent( event ) {
				props.setAttributes({ content: event.target.value })
			}
			function updateColor(value) {
				props.setAttributes({ color: value.hex })
			}
			

			return (
				el( 'div', { className: props.className },
					el( MyToolbar ),
					el( RichText, {
						tagName: 'h2',
						inline: true,
						placeholder: 'Example Text',
						value: attributes.title,
						onChange: function( value ) {
							props.setAttributes( { title: value });
						},
					} ),
					el( ButtonGroup, { className: 'dis-here-buttongroup' },
						el( Button, { 
							title: 'Push Left',
							isPressed: true,
							icon: 'dashicons-editor-outdent',
							value: 'left-align',
							isPrimary: true,
						} ),
						el( Button, {
							title: 'Push Right',
							icon: 'dashicons-editor-indent',
							value: 'right-align',
							isSecondary: true,
						}),
					)
				)
			)
		},

		save: function( props ) {
			return el(
				'p',
				{ className: 'cb-block' },
				props.attributes.text,
			)
		},

	} );

})();






var MyToolbar = withState( {
    activeControl: 'up',
} )( ( { activeControl, setState } ) => { 
	function createThumbsControl( thumbs ) {
		return {
			icon: `thumbs-${ thumbs }`,
			title: `Thumbs ${ thumbs }`,
			isActive: activeControl === thumbs,
			onClick: () => setState( { activeControl: thumbs } ),
		};
	}
 
	return (
		el( Toolbar, {
			controls: ['up','down'].map( createThumbsControl )
		})
	);
} );

