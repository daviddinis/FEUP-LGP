import React from 'react';
import "./Register.scss";
import PropTypes from 'prop-types';
import map from 'shared/images/mapa1.svg';

interface LoginParams {
    _id: string;
    username: string;
    password: string;
    logged: boolean;
}

function RegisterPage(): JSX.Element {


  return (
    <div className="login-page">
      <img className={ 'login-map' } src={ map }/>
      <h1 className="page-title">
        Know your customer on the news
      </h1>
      <p className="text-login">Join Us</p>

      <div className="register-content">
        <form className="struct-form">
          <p>username</p>
          <input id="username" type="text"/>
          <p>email</p>
          <input id="email" type="email"/>
          <p>password</p>
          <input id="password" type="password"/>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage; 