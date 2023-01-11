import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';
import '../styles/SignUp.css';

const SignUp = () => {
  const [user, setUser] = useState(
    {
      'first_name': '',
      'last_name': '',
      'email': '',
      'address': '',
      'city': '',
      'state': '',
      'zipcode': '',
      'password': '',
      'confirm_password': ''
    },
  );
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (event) => { // function to handle sign up button
    event.preventDefault();

    API.signup(user).then(response => {  // calls function to register a new user
      if (response.status === 200) {
        // console.log(response)
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: response.data.user_id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            // address: address,
            // city: city,
            // state: state,
            // zipcode: zipcode
          })
        );
        setRedirect(true);
      };

    })
    .catch(err => {
      console.log(err);
    });
  };

  // useEffect(() => {

  // }, [])

  if (redirect) {
    return <Redirect to='/members' />;
  }

return (
  <div className='signup-container'>
    <div className='signup-form'>
      <div className='signup-form-header'>
        <div className='signup-title'>Register</div>
      </div>
      <div className='signup-body'>
        <input type='text' className='signup-field' id='first-name' value={user.first_name} placeholder='First Name' onChange={(e) => setUser({...user, 'first_name': e.target.value})} />
        <input type='text' className='signup-field' id='last-name' value={user.last_name} placeholder='Last Name' onChange={(e) => setUser({...user, 'last_name': e.target.value})} />
        <input type='text' className='signup-field' id='email' value={user.email} placeholder='Email' onChange={(e) => setUser({...user, 'email': e.target.value})} />
        <input type='text' className='signup-field' id='address' value={user.address} placeholder='Address' onChange={(e) => setUser({...user, 'address': e.target.value})} />
        <input type='text' className='signup-field' id='city' value={user.city} placeholder='City' onChange={(e) => setUser({...user, 'city': e.target.value})} />
        <input type='text' className='signup-field' id='state' value={user.state} placeholder='State' onChange={(e) => setUser({...user, 'state': e.target.value})} />
        <input type='text' className='signup-field' id='zipcode' value={user.zipcode} placeholder='Zipcode' onChange={(e) => setUser({...user, 'zipcode': e.target.value})} />
        <input type='password' className='signup-field' id='password' value={user.password} placeholder='Password' onChange={(e) => setUser({...user, 'password': e.target.value})} />
        <input type='password' className='signup-field' id='confirm-password' value={user.confirm_password} placeholder='Confirm Password' onChange={(e) => setUser({...user, 'confirm_password': e.target.value})} />
        <div className='signup-submit'>
          <button type='submit' onClick={handleSubmit} className='signup-button'>SIGN UP</button>
        </div>
        <div className='login-portal'>Already a member? <a href='/login'>Login.</a></div>
      </div>
    </div>
  </div>
);
};

export default SignUp;
