import React from "react";
import {useDropzone} from 'react-dropzone';
import './Header.scss';

interface Props {
    username: string,
    isAdmin: boolean,
    withDropFile: boolean,
}



const Component = (props : Props) => {
    
    return (
        <header className={ 'header' }>
            <nav className={ 'navigation' }>
                <p className={ 'page-title' }>
                    Know your customer on the news
                </p>
                <p className={ 'username' }>
                    {props.username}
                    <img
                        className={ 'user-icon' }
                        src={ '../shared/icons/person.png' }/>
                </p>
            </nav>
            { props.withDropFile && 
                <div className={ 'dropfile-container' }>
                    <img
                        className={ 'document-icon' }
                        src={ '../shared/icons/document.png' }/>
                    <label className={ 'drop-file-label' }><strong>choose a file</strong> or drag it here.</label>
                </div> }
        </header>
    )
}


export default Component;