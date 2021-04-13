import React from "react";
import './Header.scss';
import person from '../../shared/icons/person.svg';

interface User {
    username: string,
    isAdmin: boolean,
}



const HeaderBase = (user : User) => {

    return (
        <header className={ 'page-header' }>
            <h1 className={ 'page-title' }>
                 Know your customer on the news
            </h1>
            <nav>
            <p className={ 'username' }>
                {user.username}
                <img
                    className={ 'icon user' }
                    src={ person }/>
            </p>
            </nav>
        </header>
    )
}


export default HeaderBase;