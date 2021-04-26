import React, {useEffect, useState} from "react";
import "./RegisteredUsers.scss";
import Header from "components/Header/Header";
import BottomCornerImage from "components/BottomCornerImage/BottomCornerImage";
import person from "shared/icons/person.svg";
import search from "shared/icons/search.svg";
import Flag from "components/Flag/Flag";
import axios from "axios";
import {Link} from "react-router-dom";

interface User {
  _id: string;
  username: string;
  flagged: boolean;
}

function RegisteredUsersPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get("/users").then((res) => setUsers(res.data));
  }, [])

  const searchUsers = (allUsers: User[]): User[] =>
      allUsers.filter((val) => {
      if (val.username.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
        return val;
    });

  const userItem = (user: User) => (
      <div className="user-item" key={user._id}>
          <Flag flagged={user.flagged} />
          <img src={person} className="user-image" />

          <Link to={`/users/${user._id}/submissions`}>
              <p className="user-name">{user.username}</p>
          </Link>
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
          {searchUsers(users).map((user) => userItem(user))}
        </div>
      </div>
      <BottomCornerImage />
    </div>
  );
}

export default RegisteredUsersPage;
