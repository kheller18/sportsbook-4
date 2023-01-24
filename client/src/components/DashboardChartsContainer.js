import React, { useState } from 'react';
import DashboardChart from './DashboardChart';
import Chart from 'react-apexcharts';
import moment from 'moment';
import '../styles/DashboardChartsContainer.css';

const DashboardChartsContainer = (props) => {
  const [dropdown, showDropdown] = useState(false);
  const [state, setState] = useState({

  });
  let account_value;
  console.log(props.user)
  const handleChartChange = () => {

  }
  const groups = props.user.account_value_history.balance.reduce((acc, item) => {
    console.log(item)
    const ex = `${moment(item.date).format('L')}`
    console.log(ex)
    // const yearWeek = `${moment(item.date).year()}-${moment(item.date).month()+1}-${moment(item.date).day()+1}`;
    // console.log(yearWeek)
    // add this key as a property to the result object
    if (!acc[ex]) {
      acc[ex] = 0;
    }

    acc[ex] = parseFloat(item.value);
    return acc;

  }, {});
  const groups2 = props.user.account_value_history.pending.reduce((acc, item) => {
    console.log(item)
    const ex = `${moment(item.date).format('L')}`
    console.log(ex)
    // const yearWeek = `${moment(item.date).year()}-${moment(item.date).month()+1}-${moment(item.date).day()+1}`;
    // console.log(yearWeek)
    // add this key as a property to the result object
    if (!acc[ex]) {
      acc[ex] = 0;
    }

    acc[ex] = parseFloat(item.value);
    return acc;

  }, {});

  console.log(Object.keys(groups))
  account_value = {
    series: [
      {
        name: "Balance",
        data: Object.values(groups)
      },
      {
        name: "Pending",
        data: Object.values(groups2)
      }
    ],
    options: {
      xaxis: {
        // categories: ["2022-12-16", "2022-12-17", "2022-12-18", "2022-12-19", "2022-12-20", "2022-12-21"]
        categories: Object.keys(groups)
      }
    }
  }


  return (
    <div className='dashboard-charts-container'>
      {/* hello charts board */}
      <DashboardChart data={account_value} />
      {/* <Chart type='line' series={account_valuee.series} options={account_valuee.options} height='100%' /> */}

    </div>
  );
};

export default DashboardChartsContainer;
