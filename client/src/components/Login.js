import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';
import '../styles/Login.css';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event)
    console.log(email)
    console.log(password)
    // login function
    API.login(email, password)
      .then((response) => {
        console.log(response)
        if (response.data.success === true) {
          console.log(response)
          setIsLoggedIn(true);
        } else {
          // setIsError(true);
        };
      })
      .catch(() => {
        // setIsError(true);
      });
  };

  useEffect(() => {

  }, []);

  if (isLoggedIn) {
    return <Redirect to='/members' />;
  }

  return (
    <form className='login-form'>
      <div className='login-form-title'>LOGIN</div>
      <div className='login-row'>
        <input type='text' className='login-field' id='login-username' placeholder='Email' value={email} onChange={(event) => {setEmail(event.target.value)} } />
      </div>
      <div className='login-row'>
        <input type='password' className='login-field' id='login-password' placeholder='Password' value={password} onChange={(event) => {setPassword(event.target.value)} } />
      </div>
      <div className='login-row'>
        <button type='submit' className='login-button' onClick={handleSubmit}>LOGIN</button>
      </div>
      <div>Not a member? <a href='/signup'>Signup.</a></div>
    </form>
  );
};

export default Login;
