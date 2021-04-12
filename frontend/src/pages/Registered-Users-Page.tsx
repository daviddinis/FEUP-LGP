import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import './Registered-Users-Page.scss';
import Header from "../components/Header";
import CornerImage from '../components/Corner-Image';



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
      
      <CornerImage/>
    </div>
  );
}

export default RegisteredUsersPage;