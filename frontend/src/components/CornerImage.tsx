import React from 'react';
import cornerImage from '../shared/icons/corner.png';
import './CornerImage.scss';


const Component = () => {
   return (
         <div style={{backgroundImage: "url(" + cornerImage + ")"}} className={'corner-image'}></div>
    );
}

export default Component;