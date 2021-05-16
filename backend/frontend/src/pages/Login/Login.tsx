import React from 'react';
import "pages/Login/Login.scss";
import PropTypes from 'prop-types';
import map from 'shared/images/mapa1.svg';

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
      <button>New here? Create account</button>
    </div>
  );
}

export default LogginPage;