import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import './Registered-Users-Page.scss';
import Header from "../components/Header";
import CornerImage from '../components/CornerImage';
import person from '../shared/icons/person.svg';
import flag from '../shared/icons/flag.svg';
import flagSelected from '../shared/icons/flagselected.svg';
import search from '../shared/icons/pesquisa.svg';

interface User {
  id: string,
  name: string,
  flagged: number
}

//TODO: erase users content after we have a seed in db
const users : User[] = [
  { id: "0", name: 'user_name_1', flagged: 0 },
  { id: "1", name: 'user_name_2', flagged: 0 },
  { id: "2", name: 'user_name_3', flagged: 0 },
  { id: "3", name: 'user_name_4', flagged: 0 },
  { id: "4", name: 'user_name_5', flagged: 0 },
  { id: "5", name: 'user_name_6', flagged: 0 },
  { id: "6", name: 'user_name_7', flagged: 0 },
  { id: "7", name: 'user_name_8', flagged: 0 },
  { id: "8", name: 'user_name_9', flagged: 0 },
  { id: "9", name: 'user_name_10', flagged: 0 },
  { id: "10", name: 'user_name_11', flagged: 0 },
  { id: "11", name: 'user_name_12', flagged: 0 },
  { id: "12", name: 'user_name_13', flagged: 0 },
  { id: "13", name: 'user_name_14', flagged: 0 },
  { id: "14", name: 'user_name_15', flagged: 0 },
  { id: "15", name: 'user_name_16', flagged: 0 },
  { id: "16", name: 'user_name_17', flagged: 0 },
  { id: "17", name: 'user_name_18', flagged: 0 },
  { id: "18", name: 'user_name_19', flagged: 0 },
  { id: "19", name: 'user_name_20', flagged: 0 },
  { id: "20", name: 'user_name_21', flagged: 0 },
  { id: "21", name: 'user_name_22', flagged: 0 },
  { id: "22", name: 'user_name_23', flagged: 1 },
  { id: "23", name: 'user_name_24', flagged: 0 },
  { id: "24", name: 'user_name_25', flagged: 0 },
];

function RegisteredUsersPage() {

  const [searchTerm, setSearchTerm] = useState("");
  const [changeFlag, setChangeFlag] = useState(false);
  const [hoverFlag, setHoverFlag] = useState(false);

  return (
    <div className="registered-users-page">
      <header className={'header'}>
        <Header
          username="Miller"
          isAdmin={true} />
      </header>
      <div className="body-container">
        <div className="search-bar">
          <img src={search} className="search-image"/>
          <input type="text" className="search-name" placeholder="search name..." 
            onChange={
              (event => {
                setSearchTerm(event.target.value)
              })}/>

        </div>
        <div className="users-container">
          
          {users
            .filter(val => 
            {
              if(val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
                return val
            })
            .reverse()
            .sort(
              (a,b) => b.flagged - a.flagged
            )
            .map(user => 
              (
              <div className="user-item" key={user.id}>
              <img src={(user.flagged || hoverFlag)? flagSelected: flag} className="flag-image" 
                onClick={(event => {
                  user.flagged == 1? user.flagged = 0: user.flagged = 1; 
                  setChangeFlag(!changeFlag)
                })}
                />
              <img src={person} className="user-image"/>
              <p className="user-name">{user.name}</p>
            </div>
          ))}

        </div>
      </div>
      <CornerImage/>
    </div>
  );
}

export default RegisteredUsersPage;