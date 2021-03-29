import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import Component from "../components/TestComponent";
import axios from "axios";

interface IUser {
  username: string
}

function App() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    axios.get("/users").then(res => {      
      setUsers(res.data);
      console.log(res.data);
    })
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <Component requiredProp={99} optionalProp="Hi"/>

        {users.map(user => {
          return (
            <div className="user" key={user.username}>
              <span className="square"></span>
              {user.username}
            </div>
          )
        })}        
      </header>
    </div>
  );
}

export default App;
