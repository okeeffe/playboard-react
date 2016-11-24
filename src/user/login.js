import React from 'react';
import config from '../../config';
import { createEncodedFormBody } from '../utils.js';

const Login = ({ currentUser, onSuccessfulLogin }) => {
  const submitUserInfo = evt => {
    evt.preventDefault();
    console.log(onSuccessfulLogin);

    const loginDetails = {
      email: evt.target.email.value,
      password: evt.target.password.value,
    };

    fetch(`${config.apiUrl}/login`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: createEncodedFormBody(loginDetails),
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      onSuccessfulLogin(result.user);
    })
    .catch(err => console.log(err));
  };

  return (
    <div>
      { currentUser ?
        <div>
          <a href={`/users/${currentUser.id}`}>{currentUser.name}</a>
          <button>Logout</button>
        </div>
        : <div>
            <form onSubmit={ submitUserInfo }>
              <input type="text" name="email" placeholder="Email" />
              <input type="password" name="password" placeholder="Password" />
              <button type="submit">Login</button>
            </form>
          </div>
      }
    </div>
  );
}

export default Login;