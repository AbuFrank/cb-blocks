import { registerBlockType } from '@wordpress/blocks';

import {
	BlockControls,
	RichText,
	MediaUpload,
} from '@wordpress/block-editor';

import { SelectControl, Button, ColorPalette } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { withState } from '@wordpress/compose';

// custom media & text components



registerBlockType( 'cb-blocks/media-text-tile', {
    title: 'Media & Text Tile',
    icon: 'image-flip-horizontal',
    category: 'layout',
    attributes: {
    	title: {
			type: 'array',
			source: 'children',
			selector: 'h2',
		},
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		color: {
			type: 'string',
			default: 'white',
		},
		copy: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
		smallPrintLeft: {
			type: 'string',
			source: 'children',
			selector: 'p',
		},
		smallPrintRight: {
			type: 'string',
			source: 'children',
			selector: 'p',
		},
		alignment: {
			type: 'string',
			default: 'left',
		},
	},
    edit: ( props ) => {
		const {
			className,
			attributes: {
				title,
				mediaID,
				mediaURL,
				copy,
				color,
				smallPrintLeft,
				smallPrintRight,
			},
			setAttributes,
		} = props;
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
		// color options
		const colors = [
			{ name: 'white', color: '#fff' },
			{ name: 'sand', color: '#F2ECE5' },
			{ name: 'black', color: '#000' },
		];

		const [ , setMediaAlign ] = useState();

		const onChangeTitle = ( value ) => {
			setAttributes( { title: value } );
		};

		const onSelectImage = ( media ) => {
			setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};
		const onChangeSmallPrintLeft  = ( value ) => {
			setAttributes( { smallPrintLeft: value } );
		};
		

		const onChangeSmallPrintRight = ( value ) => {
			setAttributes( { smallPrintRight: value } );
		};

		const onChangeContent  = ( value ) => {
			setAttributes( { copy: value } );
		};

		return (
			<div className="cb-blocks-media-text">
				<RichText
					tagName="h2"
					placeholder="Title"
					value={ props.attributes.title }
					onChange={ onChangeTitle }
				/>
				<RichText
					tagName="p"
					placeholder="Content"
					value={ props.attributes.copy }
					onChange={ (onChangeContent) => {
						props.setAttributes({ copy: onChangeContent === undefined ? 'none' : onChangeContent })
					}}
				/>
				<RichText
					tagName="p"
					placeholder="Small Print Left"
					onChange={ onChangeSmallPrintLeft }
					value={ smallPrintLeft }
				/>
				<RichText
					tagName="p"
					placeholder="Small Print Right"
					onChange={ onChangeSmallPrintRight }
					value={smallPrintRight}
				/>
				<SelectControl
					label="Media Alignment"
					options={ options }
					onChange={( selectedItem ) => {
						props.setAttributes( { alignment: selectedItem === undefined ? 'none' : selectedItem } );
						setMediaAlign( selectedItem ) 
					}}
				/>

				<ColorPalette
					colors={ colors }
					value={ color }
					onChange={ ( selectedColor ) => {
						props.setAttributes( { color: selectedColor === undefined ? '#fff' : selectedColor } );
					} }
				/>
				<div className="media-text-image">
					<MediaUpload
						onSelect={ onSelectImage }
						allowedTypes="image"
						value={ mediaID }
						render={ ( { open } ) => (
							<Button className={ mediaID ? 'image-button' : 'button button-large' } onClick={ open }>
								{ ! mediaID ? 'Upload Image' : <img src={ mediaURL } className={ `cb-blocks-media-${ props.attributes.alignment }` } alt={ 'Upload Image' } /> }
							</Button>
						) }
					/>
				</div>
			</div>
		);		
	},
	save: ( props ) => {
		const {
			className,
			attributes: {
				title,
				copy,
				color,
				mediaURL,
				smallPrintLeft,
				smallPrintRight,
			},
		} = props;
		return (
			<div className="cb-blocks-media-text">
				
				<div className={ `cb-media-text bg-color-${props.attributes.color}` }>

					{
						mediaURL && (
							<img className={ `cb-blocks-media-${ props.attributes.alignment }` } src={ mediaURL } alt={'Recipe Image'} />
						)
					}
					<div className="title-copy-wrapper">
						<RichText.Content tagName="h2" className="cb-media-title" value={ title } />
						<RichText.Content tagName="p" className="cb-media-copy" value={ copy } />
					</div>

				</div>
				
				smallPrintLeft && {
					<RichText.Content tagName="h6" className="small-print small-print-left" value={ smallPrintLeft } />
				}

				smallPrintRight && {
					<RichText.Content tagName="h6" className="small-print small-print-right" value={ smallPrintRight } />
				}

			</div>
		);
	},
} );