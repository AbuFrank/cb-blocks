import { ColorPicker } from '@wordpress/components';
import { withState } from '@wordpress/compose';
 
export const CbColorPicker = withState( {
    color: '#f00',
} )( ( { color, setState } ) => {
    return (
        <ColorPicker
            color={ color }
            onChangeComplete={ ( value ) => setState( value.hex ) }
            disableAlpha
        />
    );
} );