import React, { useEffect, useState } from 'react';
import './User-Page.scss';
import axios from "axios";
import Header from "../components/Header";

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
    <div className="user-page">
        <Header
          withDropFile={ true }
          username="gingerAle"
          isAdmin={false}/>
    </div>
  );
}

export default App;
