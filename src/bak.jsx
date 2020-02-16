import { registerBlockType } from '@wordpress/blocks';

import {
	RichText,
	AlignmentToolbar,
	BlockControls,
} from '@wordpress/block-editor';

import { SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

registerBlockType( 'cb-blocks/media-text-tile', {
    title: 'Media & Text Tile',
    icon: 'image-flip-horizontal',
    category: 'layout',
    attributes: {
		content: {
			type: 'string',
			default: 'hello',
		},
		alignment: {
			type: 'string',
			default: 'left',
		},
	},
    edit: ( props ) => {
		// button options
		const options = [
			{
				value: 'left',
				label: 'Left',
			},
			{
				value: 'right',
				label: 'Right',
			}
		];

		const onChangeAlignment = ( newAlignment ) => {
			props.setAttributes( { alignment: newAlignment === undefined ? 'none' : newAlignment } );
		};



		
		const [ , setMediaAlign ] = useState();
		return (
			<SelectControl
				label="Media Alignment"
				options={ options }
				onChange={ ( { selectedItem } ) => setMediaAlign( selectedItem ) }
			/>
		);		
	},
	save: ( props ) => {
		return (
			<div
				className= { `cb-blocks-media-${ props.attributes.alignment }` }
			>
				<RichText
					tagName="p"
					value={ props.attributes.content }
				/>
			</div>
		);
	},
} );