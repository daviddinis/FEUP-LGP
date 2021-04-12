import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import './Registered-Users-Page.scss';
import Header from "../components/Header";
import CornerImage from '../components/Corner-Image';
import user from '../shared/icons/person.svg';
import flag from '../shared/icons/flag.svg';
import flagSelected from '../shared/icons/flagselected.svg';




interface IUser {
  username: string
}


function RegisteredUsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);

  return (
    <div className="registered-users-page">
      <header className={'header'}>
        <Header
          username="Miller"
          isAdmin={true} />
      </header>
      <div className="users-container">
        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

        <div className="user-item">
          <img src={flag} className="flag-image"/>
          <img src={user} className="user-image"/>
          <p className="user-name">user_name_7</p>
        </div>

      </div>
      <CornerImage/>
    </div>
  );
}

export default RegisteredUsersPage;