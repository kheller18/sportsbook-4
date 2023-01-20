import React, { useState } from 'react';

const DashboardCharts = (props) => {
  const [dropdown, showDropdown] = useState(false);
  const [state, setState] = useState({});

  return (
    <div className='dashboard-charts-container'>
      hello charts board
    </div>
  );
};

export default DashboardCharts;
