import React from "react";
import './Header.scss';

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
                    src={ '../shared/icons/person.png' }/>
            </p>
        </nav>
    )
}


export default Component;