import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';
import '../styles/SignUp.css';

const SignUp = () => {
  const [user, setUser] = useState([
    {
      'first_name': '',
      'last_name': '',
      'email': '',
      'address': '',
      'city': '',
      'state': '',
      'zipcode': '',
      'password': '',
      'confirm_passowrd': ''
    }
  ]
  )
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [address, setAddress] = useState('');
  // const [city, setCity] = useState('');
  // const [state, setState] = useState('');
  // const [zipcode, setZipcode] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // calls function to register a new user
    API.signup({
      user
      // firstName,
      // lastName,
      // email,
      // address,
      // city,
      // state,
      // zipcode,
      // password
    })
      .then(response => {
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

  useEffect(() => {

  }, [])

  if (redirect) {
    return <Redirect to='/members' />;
  }

//   return (
//     <form className='signup-form'>
//       <div className='signup-form-header'>
//         <div className='signup-title'>Register</div>
//       </div>
//       <div className='signup-body'>
//         <input type='text' className='signup-field' id='first-name' value={firstName} placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} />
//         <input type='text' className='signup-field' id='last-name' value={lastName} placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
//         <input type='text' className='signup-field' id='email' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
//         <input type='text' className='signup-field' id='address' value={address} placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
//         <input type='text' className='signup-field' id='city' value={city} placeholder='City' onChange={(e) => setCity(e.target.value)} />
//         <input type='text' className='signup-field' id='state' value={state} placeholder='State' onChange={(e) => setState(e.target.value)} />
//         <input type='text' className='signup-field' id='zipcode' value={zipcode} placeholder='Zipcode' onChange={(e) => setZipcode(e.target.value)} />
//         <input type='password' className='signup-field' id='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
//         <input type='password' className='signup-field' id='confirm-password' value={confirmPassword} placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
//         <div className='signup-submit'>
//           <button type='submit' onClick={handleSubmit} className='signup-button'>SIGN UP</button>
//         </div>
//         <div className='login-portal'>Already a member? <a href='/login'>Login.</a></div>
//       </div>
//     </form>
//   );
// };

return (
  <form className='signup-form'>
    <div className='signup-form-header'>
      <div className='signup-title'>Register</div>
    </div>
    <div className='signup-body'>
      <input type='text' className='signup-field' id='first-name' value={user.first_name} placeholder='First Name' onChange={(e) => setUser(e.target.value)} />
      <input type='text' className='signup-field' id='last-name' value={user.last_name} placeholder='Last Name' onChange={(e) => setUser(e.target.value)} />
      <input type='text' className='signup-field' id='email' value={user.email} placeholder='Email' onChange={(e) => setUser(e.target.value)} />
      <input type='text' className='signup-field' id='address' value={user.address} placeholder='Address' onChange={(e) => setUser(e.target.value)} />
      <input type='text' className='signup-field' id='city' value={user.city} placeholder='City' onChange={(e) => setUser(e.target.value)} />
      <input type='text' className='signup-field' id='state' value={user.state} placeholder='State' onChange={(e) => setUser(e.target.value)} />
      <input type='text' className='signup-field' id='zipcode' value={user.zipcode} placeholder='Zipcode' onChange={(e) => setUser(e.target.value)} />
      <input type='password' className='signup-field' id='password' value={user.password} placeholder='Password' onChange={(e) => setUser(e.target.value)} />
      <input type='password' className='signup-field' id='confirm-password' value={user.confirm_password} placeholder='Confirm Password' onChange={(e) => setUser(e.target.value)} />
      <div className='signup-submit'>
        <button type='submit' onClick={handleSubmit} className='signup-button'>SIGN UP</button>
      </div>
      <div className='login-portal'>Already a member? <a href='/login'>Login.</a></div>
    </div>
  </form>
);
};


export default SignUp;
