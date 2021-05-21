import React from 'react';
import "pages/Authentication/Authentication.scss";
import map from 'shared/images/mapa1.svg';
import { Link } from "react-router-dom";
import Auth from '../../auth/auth';

function LoginPage(): JSX.Element {
  const handleOnLogin = async (e : any) => {
    e.preventDefault();
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const user : any = await Auth.logUser(email.value, password.value);

    if (user)
        window.location.href = user.isAdmin ? "/admin" : "/user";
    else alert("Invalid credentials");
  }

  return (
    <div className="authentication-page">
      <img className={ 'authentication-map' } src={ map }/>
      <h1 className="title-page">
        Know your customer on the news
      </h1>
      <p className="text-authentication">Log in</p>

      <div className="authentication-content">
        <form 
          onSubmit={ handleOnLogin }
          className="struct-form">
          <p>email</p>
          <input id="email"/>
          <p>password</p>
          <input id="password" type="password"/>
          <button type="submit">Log in</button>
        </form>
      </div>
      <Link to={ '/login' } className={ 'signup-link' } >New here? Create account</Link>
    </div>
  );
}


export default LoginPage;