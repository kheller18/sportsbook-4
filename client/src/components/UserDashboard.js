import React, { useEffect, useState } from 'react';
import API from '../utils/API';
import Chart from 'react-apexcharts';
import Button from './Button';
import UserDropdown from './UserDropdown';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../styles/UserDashboard.css'

const UserDashboard = () => {
  const [bets, setBets] = useState([]);
  // const [user, setUser] = useState('');
  const [user, setUser] = useState({name: '', account_value: '', account_value_history: [], bets: []});
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
  const account_valuee = {
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
    // const graph = userData.account_value_history.map((item) => {
    //   console.log(item.date)
    // })

    // const groups = userData.account_value_history.reduce((acc, item) => {
    //   // console.log(acc)
    //   console.log(item)
    //   // create a composed key: 'year-week'
    //   // const yearWeek = `${moment(item.date).year()}-${moment(item.date).week()}`;
    //   const yearWeek = `${moment(item.date).year()}-${moment(item.date).month()}-${moment(item.date).day()}`;

    //   // add this key as a property to the result object
    //   if (!acc[yearWeek]) {
    //     acc[yearWeek] = [];
    //   }

    //   // push the current date that belongs to the year-week calculated befor
    //   // acc[yearWeek].push(item.date);
    //   // console.log(acc[yearWeek]);


    //   return acc;

    // }, {});
    const groups = userData.account_value_history.reduce((acc, item) => {
      // console.log(acc)
      console.log(item)
      // create a composed key: 'year-week'
      // const yearWeek = `${moment(item.date).year()}-${moment(item.date).week()}`;
      const yearWeek = `${moment(item.date).year()}-${moment(item.date).month()}-${moment(item.date).day()}`;

      // add this key as a property to the result object
      if (!acc[yearWeek]) {
        acc[yearWeek] = [];
      }

      // push the current date that belongs to the year-week calculated befor
      // acc[yearWeek][0]
      // console.log(acc[yearWeek]);


      return acc;

    }, {});

    console.log(groups)
    // setUser(userData.firstName);
    // setUser({name: userData.firstName, account_value: userData.account_value, account_value_history: userData.account_value_history});
    // setAccountValue(userData.account_value)
    API.getBets(userId).then(res => {
      // console.log(res.data)
      setUser({name: userData.firstName, account_value: userData.account_value, account_value_history: userData.account_value_history, bets: res.data});
      // setBets(res.data)
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
        <div className='dashboard-title'>Welcome, {user.name} {user.account_value}!</div>
        <div className='dashboard-right'>
          <Button>
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </div>
      </div>
      <div className='dashboard-body'>
        {/* <Chart type='line' series={series} options={options} height='100%'/> */}
        <Chart type='line' series={account_valuee.series} options={account_valuee.options} height='100%'/>
      </div>
    </div>
  );
};

export default UserDashboard;
