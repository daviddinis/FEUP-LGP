import React from "react";
import "pages/HomePage/HomePage.scss";
import map from 'shared/images/mapa.svg';

function AdminFeed(): JSX.Element {
  return (
    <div className='home-page'>
      <header className="home-header">
      <button className = "log-in">Log in</button>
        <button className="sign-up">Sign Up</button>
      </header>
      <body className="home-body">
        <h1 className="home-title">Know your costumer on the news</h1>
        <p className="home-text">The tool that recognizes and validates sections in a<br/>document and highlights important information.</p>
        <p className="home-text">Relieves the burden from an entity and<br/>make the process easier to the client.</p>
        <div className = "emailArea">
            <input type="text" className="emailInput" placeholder="Email"></input>
            <button className="emailButton">Sign up</button>
            <img className={ 'home-map' } src={ map }/>
        </div>
      </body>
    </div>
  );
}

export default AdminFeed;