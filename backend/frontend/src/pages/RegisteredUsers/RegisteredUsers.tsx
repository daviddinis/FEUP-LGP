import React, { useEffect, useState } from "react";
import "./RegisteredUsers.scss";
import Header from "components/Header/Header";
import BottomCornerImage from "components/BottomCornerImage/BottomCornerImage";
import person from "shared/icons/person.svg";
import search from "shared/icons/search.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import checkbox from "shared/icons/checkbox.svg";
import checkboxSelected from "shared/icons/checkboxSelected.svg";
import flag from "shared/icons/flag.svg";
import flagSelected from "shared/icons/flagSelected.svg";
import { updateUserFlag } from "components/Flag/Api";

interface User {
  _id: string;
  username: string;
  flagged: boolean;
}

function RegisteredUsersPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
  const [checked, setChecked] = useState(false);

  function setFlag(id: string) {
    const filteredUsers = originalUsers.filter((val) => {
      if (val._id == id) val.flagged = !val.flagged;
      return val;
    });

    setOriginalUsers(filteredUsers);
    updateUserFlag(id);
  }

  useEffect(() => {
    axios.get("/api/users").then((res) => {
      setOriginalUsers(res.data);
      setUsers(res.data);
    });
  }, []);

  function setCheck(originalUsers: User[]) {
    setChecked(!checked);
    const updatedChecked = !checked;

    let filteredUsers = originalUsers;
    if (updatedChecked) {
      filteredUsers = originalUsers.filter((val) => {
        if (val.flagged == updatedChecked) return val;
      });
    }

    setUsers(filteredUsers);
  }

  const customCheckBox = (
    <button onClick={() => setCheck(originalUsers)} className="checkbox">
      <img
        src={checked ? checkboxSelected : checkbox}
        className={checked ? "icon checkbox selected" : "icon checkbox"}
      />
      see only flagged users
    </button>
  );

  const searchUsers = (allUsers: User[]): User[] =>
    allUsers.filter((val) => {
      if (val.username.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
        return val;
    });

  const userItem = (user: User) => (
    <div className="user-item" key={user._id}>
      <button onClick={() => setFlag(user._id)}>
        <img src={user.flagged ? flagSelected : flag} className="icon flag" />
      </button>
      <img src={person} className="user-image" />

      <Link to={`/users/${user.username}/${user._id}/submissions`}>
        <p className="user-name">{user.username}</p>
      </Link>
    </div>
  );

  return (
    <div className="registered-users-page">
      <Header username="Miller" isAdmin={true} />
      <div className="body-container">
        <header>
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
          {customCheckBox}
        </header>
        <div className="users-container">
          {searchUsers(users).map((user) => userItem(user))}
        </div>
      </div>
      <BottomCornerImage />
    </div>
  );
}

export default RegisteredUsersPage;
