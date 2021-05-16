import React, { useRef } from 'react';
import "pages/Login/Login.scss";
import PropTypes from 'prop-types';
import axios from "axios";
import map from 'shared/images/mapa1.svg';
import { Link } from "react-router-dom";

interface LoginParams {
    _id: string;
    username: string;
    password: string;
    logged: boolean;
}

interface Props {
  setUser: any;
}

interface User {
    name: string;
    id: number;
}

interface Response {
  user: User
}


function LogginPage({ setUser }: Props): JSX.Element {
  const handleOnLogin = async  () => {
    const username = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    try {
      const request = await axios.post<Response>('/api/auth/login', {
        username: username?.value,
        password: password?.value,
      });

      console.log(request);

      // const { user } = request;
      // setUser({ name: user.name, id: user.id });

    } catch (error) {
      console.log(error);

      alert(`login failed with ${error.message}`);
    }
  }

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

LogginPage.propTypes = {
  setUser: PropTypes.func.isRequired,
}

export default LogginPage;