import React from "react";
import "pages/HomePage/HomePage.scss";

function AdminFeed(): JSX.Element {
  return (
    <div className='home-page'>
      <header className="home-header">
      <button className = "log-in">Log in</button>
        <button className="sign-up">Sign Up</button>
      </header>
      <body className="home-body">
        <h1>Know your costumer on the news</h1>
        <p>The tool that recognizes and validates sections in a<br/>document and highlights important information.</p>
        <p>Relieves the burden from an entity and<br/>make the process easier to the client.</p>
        <div className = "emailArea">
            <input type="text" className="emailInput" placeholder="Email"></input>
            <button className="emailButton">Sign up</button>
        </div>
      </body>
    </div>
  );
}

export default AdminFeed;