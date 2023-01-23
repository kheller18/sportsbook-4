import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import '../styles/DashboardChart.css';

const DashboardChart = (props) => {
  // const [dropdown, showDropdown] = useState(false);
  // const [state, setState] = useState({});

  // const handleChartChange = () => {

  // }
  console.log(props)

  useEffect(() => {

  }, [props])

  return (
    <div className='dashboard-chart-container'>
      {/* hello charts board */}
      <Chart type='line' series={props.data.series} options={props.data.options} height='100%' />

    </div>
  );
};

export default DashboardChart;
