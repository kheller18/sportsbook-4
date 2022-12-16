import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/SignUp.css';
import API from '../utils/API';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // calls function to register a new user
    API.signup({
      firstName,
      lastName,
      email,
      address,
      city,
      state,
      zipcode,
      password
    })
      .then(response => {
        if (response.status === 200) {
          console.log(response)
          localStorage.setItem(
            'user',
            JSON.stringify({
              id: response.data.user._id,
              firstName: firstName,
              lastName: lastName,
              email: email,
              address: address,
              city: city,
              state: state,
              zipcode: zipcode
            })
          );
          setRedirect(true);
        };

      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {

  }, [])

  if (redirect) {
    return <Redirect to='/members' />;
  }

  return (
    <form className='signup-form'>
      <div className='signup-title'>Register</div>
      <div className='signup-body'>
        <div className='signup-names-fields'>
          <input type='text' className='signup-field' id='first-name' value={firstName} placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} />
          <input type='text' className='signup-field' id='last-name' value={lastName} placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
        </div>
        <br />
        <input type='text' className='signup-field' id='email' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type='text' className='signup-field' id='address' value={address} placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
        <br />
        <input type='text' className='signup-field' id='city' value={city} placeholder='City' onChange={(e) => setCity(e.target.value)} />
        <br />
        <input type='text' className='signup-field' id='state' value={state} placeholder='State' onChange={(e) => setState(e.target.value)} />
        <br />
        <input type='text' className='signup-field' id='zipcode' value={zipcode} placeholder='Zipcode' onChange={(e) => setZipcode(e.target.value)} />
        <br />
        <input type='password' className='signup-field' id='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        <br />
        <input type='password' className='signup-field' id='confirm-password' value={confirmPassword} placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
        <br />
      </div>
      <div className='signup-submit'>
        <button type='submit' onClick={handleSubmit} className='signup-button'>SIGN UP</button>
      </div>
      <div className='login-portal'>Already a member? <a href='/login'>Login.</a></div>
    </form>
  );
};

export default SignUp;
