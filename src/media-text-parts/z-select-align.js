// button options
import { SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { withState } from '@wordpress/compose';


export const CbSelectAlign = withState( {
	align: "left",
} )( ( {align, setState} ) => {
	return (	
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

		const [ , setMediaAlign ] = useState();
		<SelectControl
			label="Media Alignment"
			options={ options }
			onChange={( selectedItem ) => {
				console.log(selectedItem);
				props.setAttributes( { alignment: selectedItem === undefined ? 'none' : selectedItem } );
				setMediaAlign( selectedItem ) 
			}}
		/>
	);
} );