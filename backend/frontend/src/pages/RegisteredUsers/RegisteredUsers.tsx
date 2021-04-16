import React, { useState } from "react";
import "./RegisteredUsers.scss";
import Header from "components/Header/Header";
import BottomCornerImage from "components/BottomCornerImage/BottomCornerImage";
import person from "shared/icons/person.svg";
import search from "shared/icons/search.svg";
import Flag from "components/Flag/Flag";

interface User {
  id: string;
  name: string;
  flagged: boolean;
}

//TODO: erase users content after we have a seed in db
const users: User[] = [
  { id: "0", name: "user_name_1", flagged: false },
  { id: "1", name: "user_name_2", flagged: false },
  { id: "2", name: "user_name_3", flagged: false },
  { id: "3", name: "user_name_4", flagged: false },
  { id: "4", name: "user_name_5", flagged: false },
  { id: "5", name: "user_name_6", flagged: false },
  { id: "6", name: "user_name_7", flagged: false },
  { id: "7", name: "user_name_8", flagged: false },
  { id: "8", name: "user_name_9", flagged: false },
  { id: "9", name: "user_name_10", flagged: false },
  { id: "10", name: "user_name_11", flagged: false },
  { id: "11", name: "user_name_12", flagged: true },
  { id: "12", name: "user_name_13", flagged: false },
  { id: "13", name: "user_name_14", flagged: false },
  { id: "14", name: "user_name_15", flagged: false },
  { id: "15", name: "user_name_16", flagged: false },
  { id: "16", name: "user_name_17", flagged: false },
  { id: "17", name: "user_name_18", flagged: false },
  { id: "18", name: "user_name_19", flagged: false },
  { id: "19", name: "user_name_20", flagged: false },
  { id: "20", name: "user_name_21", flagged: false },
  { id: "21", name: "user_name_22", flagged: false },
  { id: "22", name: "user_name_23", flagged: false },
  { id: "23", name: "user_name_24", flagged: false },
  { id: "24", name: "user_name_25", flagged: false },
];

function RegisteredUsersPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");

  const usersFinal = (users2: User[]): User[] =>
    users2.filter((val) => {
      if (val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
        return val;
    });

  const userItem = (user: User) => (
    <div className="user-item" key={user.id}>
      <Flag flagged={user.flagged} />
      <img src={person} className="user-image" />
      <p className="user-name">{user.name}</p>
    </div>
  );

  return (
    <div className="registered-users-page">
      <Header username="Miller" isAdmin={true} />
      <div className="body-container">
        <div className="search-bar">
          <img src={search} className="search-image" />
          <input
            type="text"
            className="search-name"
            placeholder="search name..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <div className="users-container">
          {usersFinal(users).map((user) => userItem(user))}
        </div>
      </div>
      <BottomCornerImage />
    </div>
  );
}

export default RegisteredUsersPage;
