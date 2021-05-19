import React, { useEffect, useState } from "react";
import "components/Header/Header.scss";
import "components/Header/Sidebar.scss";
import person from "shared/icons/person.svg";
import Hamburger from "shared/icons/hamburger.svg";
import HamburgerWhite from "shared/icons/hamburger_white.svg";
import { SidebarData } from "components/Header/SidebarData";
import { Link, Redirect } from "react-router-dom";
import BackButton from "components/BackButton/BackButton";
import Auth from "auth/auth";
import User from "models/User";

interface IHeader {
  withBackArrow?: boolean;
  filesOwnerUserName?: string;
}

const HeaderBase = (OHeader: IHeader): JSX.Element => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [user, setUser] = useState<User | undefined>(undefined);

  let toogleSideBar: JSX.Element = <div></div>;
  let sideBar: JSX.Element = <div></div>;

  useEffect(() => {
    const requestedUser = Auth.getLoggedUser();
    if(requestedUser) setUser(requestedUser);

  }, []);

  if (user?.isAdmin) {
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
          <button
            className={"navbar-toggle icon hamburger"}
            onClick={showSidebar}
          >
            <img src={HamburgerWhite} />
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
    { user && <>
      <header className={"page-header"}>
        {toogleSideBar}

        {sideBar}
        <h1 className={`page-title ${sidebar ? "active" : ""}`}>
          Know your customer on the news
        </h1>
        <nav>
          <p className={"username"}>
            {user.username}
            <img className={"icon user"} src={person} />
          </p>
        </nav>
      </header>
      {OHeader.withBackArrow && (
        <div className={`go-back-container ${sidebar ? "active" : ""}`}>
          <BackButton />
          {OHeader.filesOwnerUserName && (
            <p className={"username"}>{OHeader.filesOwnerUserName}</p>
          )}
        </div>
      )}
    </>}</>
  );
};

export default HeaderBase;
