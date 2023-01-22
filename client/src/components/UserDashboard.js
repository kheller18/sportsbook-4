import React, { useEffect, useState } from 'react';
import API from '../utils/API';
import Chart from 'react-apexcharts';
import Button from './Button';
import UserDropdown from './UserDropdown';
import DashboardBetting from './DashboardBetting';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../styles/UserDashboard.css';

const UserDashboard = (props) => {
  console.log(props)
  const [bets, setBets] = useState([]);//
  // const [user, setUser] = useState('');
  const [dashboard, setDashboard] = useState({active: 'graph', options: ['graph', 'betting']});
  // console.log(user1)
  const [user, setUser] = useState(props.user);
  // const [user, setUser] = useState({name: '', account_value: '', account_value_history: [], bets: user1.bets});
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
          data: [0, 1000, 90]
        }
      ],
      options: {
        xaxis: {
          // categories: ["2022-12-16", "2022-12-17", "2022-12-18", "2022-12-19", "2022-12-20", "2022-12-21"]
          categories: ["2022-12-16", "2022-12-21", "2022-12-17"]
        }
      }
  }
  // console.log(user)

  useEffect(() => {
    // function to get user data for indiviaulized dashboard
    // const userData = JSON.parse(localStorage.getItem('user'));
    // const userId = userData.user_id;
    if (user.user.account_value_history.length > 0) {
      const groups = user.user.account_value_history.reduce((acc, item) => {
        const yearWeek = `${moment(item.date).year()}-${moment(item.date).month()+1}-${moment(item.date).day()+1}`;

        // add this key as a property to the result object
        if (!acc[yearWeek]) {
          acc[yearWeek] = 0;
        }

        acc[yearWeek] = acc[yearWeek] + parseFloat(item.outcome);
        return acc;

      }, {});
      console.log(groups)
    }

  }, []);


//   return (
//     <div className='dashboard-container'>
//       <div className='dashboard-header'>
//         {/* <div className='dashboard-title'>Welcome, {user.first_name} {user.account_value.current} {user.account_value.pending}!</div> */}
//         <div className='dashboard-title'>Welcome, {props.user.user.first_name}! Account Balance: ${props.user.user.account_value.current} Pending: ${props.user.user.account_value.pending}</div>
//         <div className='dashboard-right'>
//           <Button>
//             <FontAwesomeIcon icon={faBars} />
//           </Button>
//         </div>
//       </div>
//       <div className='dashboard-body'>
//         {/* <Chart type='line' series={series} options={options} height='100%'/> */}
//         <Chart type='line' series={account_valuee.series} options={account_valuee.options} height='100%'/>
//       </div>
//     </div>
//   );
// };
  console.log(props)
  return (
    <div className='dashboard-container'>
      <div className='dashboard-header'>
        {/* <div className='dashboard-title'>Welcome, {user.first_name} {user.account_value.current} {user.account_value.pending}!</div> */}
        <div className='dashboard-title'>Welcome, {props.user.user.first_name}! Account Balance: ${props.user.user.account_value.current} Pending: ${props.user.user.account_value.pending}</div>
        <div className='dashboard-right'>
          <UserDropdown dashboard={dashboard} setDashboard={setDashboard} />
          {/* <Button>
            <FontAwesomeIcon icon={faBars} />
          </Button> */}
        </div>
      </div>
      <div className='dashboard-body'>
        {dashboard.active === 'graph' ?
          <Chart type='line' series={account_valuee.series} options={account_valuee.options} height='100%' />
        : ''
        }
        {dashboard.active === 'betting' ?
          <DashboardBetting bets={props.user.bets} games={props.games} />
        : ''
        }
        {/* <Chart type='line' series={series} options={options} height='100%'/> */}
      </div>
    </div>
  );
};


export default UserDashboard;
