import React, { useEffect, useState } from 'react';
import API from '../utils/API';
import Chart from 'react-apexcharts';
import '../styles/UserDashboard.css'

function UserDashboard() {
  const [bets, setBets] = useState([]);
  const [user, setUser] = useState('');
  const series = [
    {
      name: "Account",
      data: [0, 40, 33, 18, 100, 90]
    }
  ]

  const options = {
    xaxis: {
      categories: ["2022-12-16", "2022-12-17", "2022-12-18", "2022-12-19", "2022-12-20", "2022-12-21"],
      // labels: {
      //   show: true
      // }
      // title: {
      //   text: "Account Value Over time",
      //   offsetY: 0,
      //   offsetX: 0
      // }
    }
  };

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
      <div className='dashboard-header'>
        <div className='dashboard-title'>Welcome, {user}!</div>
      </div>
      <div className='dashboard-body'>
        <Chart type='line' series={series} options={options} height='100%'/>
      </div>
    </div>
  );
};

export default UserDashboard;
