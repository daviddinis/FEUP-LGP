import React from "react";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './Sidebar.scss';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';


const Sidebar = () => {

    return (
    <SideNav className="sidebar"
    onSelect={(selected) => {
        // Add your code here
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav className="sidebar" defaultSelected="home">
        <NavItem eventKey="documents" className="navitem">
            <NavIcon>
                <i className="fa fa-fw documents" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText className="text">
             Submitted Documents           
            </NavText>
        </NavItem>
        <NavItem eventKey="parameters" className="navitem">
            <NavIcon>
                <i className="fa fa-fw parameters " style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText className="text">
                Parameters / types
            </NavText>
        </NavItem>
        <NavItem eventKey="users" className="navitem">
            <NavIcon>
                <i className="fa fa-fw users" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText className="text">
                Registered Users
            </NavText>
        </NavItem>
    </SideNav.Nav>
</SideNav>
    )
}

export default Sidebar;

