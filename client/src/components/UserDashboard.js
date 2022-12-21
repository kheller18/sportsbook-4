import React, { useEffect, useState } from 'react';
import API from '../utils/API';
import '../styles/UserDashboard.css'

function UserDashboard() {
  const [bets, setBets] = useState([]);
  const [user, setUser] = useState('');

// BREAK down bet type and percentage
  useEffect(() => {
    // function to get user data for indiviaulized dashboard
    const userData = async () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData.firstName);
      const userId = userData._id;
      await API.getBets(userId)
        .then(res => {
          console.log(res.data)
          setBets(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
    userData()
  }, []);

  return (
    <div className='dashboard-container'>
      <div className='dashboard-body'>
        <div className='dashboard-title'>Welcome, {user}!</div>
        {/* <div className='dashboard-title'>Welcome, {bets}!</div> */}
      </div>
    </div>
  );
};

export default UserDashboard;
