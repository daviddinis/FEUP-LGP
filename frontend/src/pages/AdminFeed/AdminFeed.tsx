import React, { useEffect, useState } from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../Table.scss';
import './AdminFeed.scss';
import axios from "axios";
import SubmitionLine from '../../components/SubmitionLine';
import Header from '../../components/Header/Header';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';



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

  const submitions: any[] = [{id: "1", isFlaged: true, user: "filipasenra", documentName: "anualreportdocura", type: "extract", format: "pdf", date: "25-03-2021",},
  {id: "2", isFlaged: false, user: "claudiasilva", documentName: "IDClaudia", type: "pdf", format: "jpeg", date: "21-03-2021",}];

  return (

    <div className="Admin-Page">
      <Header username="gingerAle" isAdmin={ true }/>

            <SideNav className="sidebar"
          onSelect={(selected) => {
              // Add your code here
          }}
      >
          <SideNav.Toggle />
          <SideNav.Nav className="sidebar" defaultSelected="home">
              <NavItem eventKey="documents" className="navitem">
                  <NavIcon className="navitem">
                      <i className="fa fa-fw documents" style={{ fontSize: '1.75em' }} />
                  </NavIcon>
                  <NavText className="text">
                      Submited Documents
                  </NavText>
              </NavItem>
              <NavItem eventKey="parameters">
                  <NavIcon>
                      <i className="fa fa-fw parameters " style={{ fontSize: '1.75em' }} />
                  </NavIcon>
                  <NavText>
                      Parameters / types
                  </NavText>
              </NavItem>
              <NavItem eventKey="users">
                  <NavIcon>
                      <i className="fa fa-fw users" style={{ fontSize: '1.75em' }} />
                  </NavIcon>
                  <NavText>
                      Registered Users
                  </NavText>
              </NavItem>
          </SideNav.Nav>
      </SideNav>

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
