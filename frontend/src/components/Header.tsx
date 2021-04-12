import React from "react";
import './Header.scss';
import person from '../shared/icons/person.svg';

interface Props {
    username: string,
    isAdmin: boolean,
}

const Component = (props : Props) => {
    

    return (
        <nav className={ 'navigation' }>
            <p className={ 'page-title' }>
                Know your customer on the news
            </p>
            <p className={ 'username' }>
                {props.username}
                <img
                    className={ 'user-icon' }
                    src={ person }/>
            </p>
        </nav>
    )
}


export default Component;