import React from 'react';
import "pages/Authentication/Authentication.scss";
import PropTypes from 'prop-types';
import map from 'shared/images/mapa1.svg';
import { Link } from "react-router-dom";

interface LoginParams {
    _id: string;
    username: string;
    password: string;
    logged: boolean;
}

function LogginPage(): JSX.Element {

    // const handleOnLogin = () => {

    // };

  return (
    <div className="login-page">
      <img className={ 'login-map' } src={ map }/>
      <h1 className="page-title">
        Know your customer on the news
      </h1>
      <p className="text-login">Log in</p>

      <div className="loginContent">
        <form className="struct-form">
          <p>username or email</p>
          <input id="username"/>
          <p>password</p>
          <input id="password" type="password"/>
          <button type="submit">Log in</button>
        </form>
      </div>
      <Link to={ '/login' } className={ 'signup-link' } >New here? Create account</Link>
    </div>
  );
}

export default LogginPage;