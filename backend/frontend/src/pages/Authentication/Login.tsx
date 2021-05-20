import React from 'react';
import "pages/Authentication/Authentication.scss";
import PropTypes from 'prop-types';
import axios from "axios";
import map from 'shared/images/mapa1.svg';
import { Link } from "react-router-dom";


// This interface is to be used for what comes from the backend login service
// interface LoginParams {
//     _id: string;
//     username: string;
//     password: string;
//     logged: boolean;
// }

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

      if (request) {
        // When backend service exists, we should not send request but intead only what is necessary, like for example:
        // setUser({ name: request.user.name, request.user.id });
        setUser(request);
      }

    } catch (error) {
      console.log(error);

      alert(`login failed with ${error.message}`);
    }
  }

  return (
    <div className="login-page">
      <img className={ 'login-map' } src={ map }/>
      <h1 className="title-page">
        Know your customer on the news
      </h1>
      <p className="text-login">Log in</p>

      <div className="login-content">
        <form 
          onSubmit={ handleOnLogin }
          className="struct-form">
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