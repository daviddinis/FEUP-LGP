import React from 'react';
import "./Authentication.scss";
import map from 'shared/images/mapa1.svg';
import Auth from '../../auth/auth';

function RegisterPage(): JSX.Element {
  const handleOnRegister = async (e : any) => {
    e.preventDefault();
    const username = document.getElementById('username') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const user : any = await Auth.registerUser(username.value, email.value, password.value);

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
      <p className="text-authentication">Join us</p>

      <div className="authentication-content">
        <form 
          onSubmit={ handleOnRegister }
          className="struct-form">
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