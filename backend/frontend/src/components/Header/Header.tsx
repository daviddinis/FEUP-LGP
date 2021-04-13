import React, { useState } from "react";
import "components/Header/Header.scss";
import "components/Header/Sidebar.scss";
import person from "shared/icons/person.svg";
import Hamburger from "shared/icons/hamburger.svg";
import HamburgerWhite from "shared/icons/hamburger_white.svg";
import { SidebarData } from "components/Header/SidebarData";

interface User {
  username: string;
  isAdmin: boolean;
}

const HeaderBase = (user: User): JSX.Element => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  let toogleSideBar: JSX.Element = <div></div>;
  let sideBar: JSX.Element = <div></div>;

  if (user.isAdmin) {
    toogleSideBar = (
      <button className={"navbar-toggle"} onClick={showSidebar}>
        <img className={"icon hamburger"} src={Hamburger} />
      </button>
    );

    sideBar = (
      <div>
        <nav
          className={sidebar ? "side-bar active" : "side-bar"}
          onClick={showSidebar}
        >
          <button className={"navbar-toggle"} onClick={showSidebar}>
            <img
              className={"icon hamburger"}
              src={HamburgerWhite}
              onClick={showSidebar}
            />
          </button>
          <ul className="side-bar-items">
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <a href={item.path}>
                    <p>{item.title}</p>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }

  return (
    <header className={"page-header"}>
      {toogleSideBar}

      {sideBar}
      <h1 className={sidebar ? "page-title active" : "page-title"}>Know your customer on the news</h1>
      <nav>
        <p className={"username"}>
          {user.username}
          <img className={"icon user"} src={person} />
        </p>
      </nav>
    </header>
  );
};

export default HeaderBase;
