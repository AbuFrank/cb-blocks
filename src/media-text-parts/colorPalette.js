import { ColorPalette } from '@wordpress/components';
import { withState } from '@wordpress/compose';
 
const CbColorPalette = withState( {
    color: '#fff',
} )( ( { color, setState } ) => {
    const colors = [
        { name: 'white', color: '#fff' },
        { name: 'sand', color: '#F2ECE5' },
        { name: 'black', color: '#000' },
    ];
 
    return (
        <ColorPalette
            colors={ colors }
            value={ color }
            onChange={ ( color ) => { 
                setState( { color } );
            } }
        />
    )
} );