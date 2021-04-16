import React from 'react';
import cornerImage from '../../shared/icons/canto.png';
import './BottomCornerImage.scss';


const Component = (): JSX.Element => {
   return (
        <div style={{backgroundImage: "url(" + cornerImage + ")"}} className={'bottom-corner-image'}></div>
    );
}

export default Component;