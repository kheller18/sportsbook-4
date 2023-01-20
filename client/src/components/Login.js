import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';
import '../styles/Login.css';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({})
  const [bets, setBets] = useState([])
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (event) => { // handles submit button on login
    event.preventDefault();
    await API.login(user).then((response) => { // calls to API once user clicks submit
      if (response.data.success) {
        // console.log(response.data)
        setLoggedInUser(response.data.user)
        setBets(response.data.dbBetSlip)
        setIsLoggedIn(true);
      }
      }).catch((err) => {
        console.log(err);
      });
  };

  if (isLoggedIn) {
    // return <Redirect {{to='/members', state=loggedInUser }}  />;
    return <Redirect to={{
      pathname: '/members',
      state: {user: loggedInUser, bets:bets}
      }}
      />;
  };

  return (
    <form className='login-container'>
      <div className='login-form'>
        <div className='login-form-header'>
          <div className='login-form-title'>LOGIN</div>
        </div>
        <div className='login-form-body'>
          <div className='login-row'>
            <input type='text' className='login-field' id='login-username' placeholder='Email' value={user.email} onChange={(e) => {setUser({...user, 'email': e.target.value})}} />
          </div>
          <div className='login-row'>
            <input type='password' className='login-field' id='login-password' placeholder='Password' value={user.password} onChange={(e) => {setUser({...user, 'password': e.target.value})} } />
          </div>
          <div className='login-row'>
            <button type='submit' className='login-button' onClick={handleSubmit}>LOGIN</button>
          </div>
          <div className='login-form-footer'>Not a member? <a href='/signup'>Sign Up</a></div>
        </div>
      </div>
    </form>
  );
};

export default Login;
