import React, { useEffect, useState } from 'react';
import '../Table.scss';
import './AdminFeed.scss';
import axios from "axios";
import SubmitionLine from '../../components/SubmitionLine';
import Header from '../../components/Header/Header';

interface IUser {
  username: string
}

interface File {
  _id: string,
  path: string,
  name: string
}

function App() {
  const [files, setUsers] = useState<File[]>([]);

  useEffect(() => {
    axios.get("/files").then(res => {      
      setUsers(res.data);
      console.log(res.data);
    })
  }, []);


  const submitions: any[] = [{id: "1", isFlaged: true, user: "filipasenra", documentName: "anualreportdocura", type: "extract", format: "pdf", date: "25-03-2021",},
  {id: "2", isFlaged: false, user: "claudiasilva", documentName: "IDClaudia", type: "pdf", format: "jpeg", date: "21-03-2021",}];

  for(let i = 0; i != files.length; i++) {
    const id = files[i]._id;
    const name = files[i].name;

    submitions.push({id: id, isFlaged: false, user: "pc", documentName: name, type: "extract", format: "pdf", date: "30-01-2012"});

    console.log(submitions);
  }

  return (

    <div className="Admin-Page">
      <Header username="gingerAle" isAdmin={ true }/>

      <div className="content">
      <table className={'submitions'}>
      <tr className={'column-names'}>
          <th></th>
          <th>name</th>
          <th>name</th>
          <th>type</th>
          <th>format</th>
          <th>date</th>
      </tr>

        {submitions.map(submition => { return (
          <SubmitionLine key={submition.id} isFlaged={submition.isFlaged} user={submition.user} documentName={submition.documentName} type={submition.type} format={submition.format} date={submition.date}/>
        )})}

    </table>

    </div>
    </div>
  );
}

export default App;
