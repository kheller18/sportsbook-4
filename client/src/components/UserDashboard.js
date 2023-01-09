import React, { useEffect, useState } from 'react';
import API from '../utils/API';
import Chart from 'react-apexcharts';
import Button from './Button';
import UserDropdown from './UserDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../styles/UserDashboard.css'

const UserDashboard = () => {
  const [bets, setBets] = useState([]);
  const [user, setUser] = useState('');
  const [account_valu, setAccountValue] = useState('');
  const [dropdown, showDropdown] = useState(false);
  const [account, setAccount] = useState({
    series: [
      {
        name: "Account Value",
        data: []
      }
    ],
    options: {
      xaxis: {
        caregories: []
      }
    }
  })
  const account_value = {
      series: [
        {
          name: "Account",
          data: [0, 40, 33, 18, 100, 90]
        }
      ],
      options: {
        xaxis: {
          categories: ["2022-12-16", "2022-12-17", "2022-12-18", "2022-12-19", "2022-12-20", "2022-12-21"]
        }
      }
  }

  // BREAK down bet type and percentage
  // useEffect(() => {
  //   // function to get user data for indiviaulized dashboard
  //   const userData = async () => {
  //     const userData = JSON.parse(localStorage.getItem('user'));
  //     setUser(userData.firstName);
  //     const userId = userData._id;
  //     console.log(userId)
  //     await API.getBets(userId)
  //       .then(res => {
  //         console.log(res.data)
  //         setBets(res.data);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  //   }
  //   userData()
  // }, []);

  useEffect(() => {
    // function to get user data for indiviaulized dashboard
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData.user_id;
    setUser(userData.firstName);
    setAccountValue(userData.account_value)
    API.getBets(userId).then(res => {
      console.log(res.data)
      setBets(res.data)
    })
      .catch((err) => console.log(err))
    // const userData = async () => {
    //   const userData = JSON.parse(localStorage.getItem('user'));
    //   setUser(userData.firstName);
    //   const userId = userData._id;
    //   console.log(userId)
    //   await API.getBets(userId)
    //     .then(res => {
    //       console.log(res.data)
    //       setBets(res.data);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     })
    // }
    // userData();
  }, []);


  return (
    <div className='dashboard-container'>
      <div className='dashboard-header'>
        <div className='dashboard-title'>Welcome, {user} {account_valu}!</div>
        <div className='dashboard-right'>
          <Button>
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </div>
      </div>
      <div className='dashboard-body'>
        {/* <Chart type='line' series={series} options={options} height='100%'/> */}
        <Chart type='line' series={account_value.series} options={account_value.options} height='100%'/>
      </div>
    </div>
  );
};

export default UserDashboard;
