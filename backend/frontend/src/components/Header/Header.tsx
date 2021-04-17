import React, { useState } from "react";
import "components/Header/Header.scss";
import "components/Header/Sidebar.scss";
import person from "shared/icons/person.svg";
import Hamburger from "shared/icons/hamburger.svg";
import HamburgerWhite from "shared/icons/hamburger_white.svg";
import { SidebarData } from "components/Header/SidebarData";
import {Link} from "react-router-dom";
import arrow from 'shared/icons/arrow.svg';


interface User {
  username: string;
  isAdmin: boolean;
  withBackArrow?: boolean;
  filesOwnerUserName?: string;
}

const HeaderBase = (user: User): JSX.Element => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  let toogleSideBar: JSX.Element = <div></div>;
  let sideBar: JSX.Element = <div></div>;

  if (user.isAdmin) {
    toogleSideBar = (
      <button className={"navbar-toggle icon hamburger"} onClick={showSidebar}>
        <img src={Hamburger} />
      </button>
    );

    sideBar = (
      <div>
        <nav
          className={sidebar ? "side-bar active" : "side-bar"}
          onClick={showSidebar}
        >
          <button className={"navbar-toggle icon hamburger"} onClick={showSidebar}>
            <img
              src={HamburgerWhite}
            />
          </button>
          <ul className="side-bar-items">
            {SidebarData.map((item, index) => {
              return (
                <Link to={item.path} key={index} className={item.cName}>
                    <p>{item.title}</p>
                </Link>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }

  return (
    <>
      <header className={"page-header"}>
        {toogleSideBar}

        {sideBar}
        <h1 className={`page-title ${ sidebar ? 'active' : '' }`}>Know your customer on the news</h1>
        <nav>
          <p className={"username"}>
            {user.username}
            <img className={"icon user"} src={person} />
          </p>
        </nav>
      </header>
      { user.withBackArrow && 
        <div className={ `go-back-container ${ sidebar ? 'active' : '' }` }>
          <img src={arrow} className="arrow" />
          { user.filesOwnerUserName && <p className={ 'username' }>{user.filesOwnerUserName}</p> }
        </div>  
        }
    </>
  );
};

export default HeaderBase;
