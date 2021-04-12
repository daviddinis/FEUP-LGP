import React from 'react';
import cornerImage from '../shared/icons/corner.png';
import './Corner-Image.scss';


const Component = () => {
   return (
         <div style={{backgroundImage: "url(" + cornerImage + ")"}} className={'corner-image'}></div>
    );
}

export default Component;