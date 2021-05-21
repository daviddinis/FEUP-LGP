import React from "react";
import "pages/HomePage/HomePage.scss";
import map from 'shared/images/mapa.svg';
import { Link } from "react-router-dom";

function AdminFeed(): JSX.Element {
  return (
    <div className='home-page'>
      <header className="home-header">
      <Link to={ '/login' } className="log-in">Log in</Link>
      <Link to={ '/register' }className="sign-up">Sign Up</Link>
      </header>
      <div className="home-body">
        <h1 className="home-title">Know your costumer on the news</h1>
        <p className="home-text">The tool that recognizes and validates sections in a<br/>document and highlights important information.</p>
        <p className="home-text">Relieves the burden from an entity and<br/>make the process easier to the client.</p>
        <div className = "email-area">
            <input type="text" className="email-input" placeholder="Email"></input>
            <button className="email-button">Sign up</button>
            <img className={ 'home-map' } src={ map }/>
        </div>
      </div>
    </div>
  );
}

export default AdminFeed;