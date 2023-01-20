import React, { useState } from 'react';

const DashboardBetting = (props) => {
  const [dropdown, showDropdown] = useState(false);
  const [state, setState] = useState({});

  return (
    <div className='dashboard-betting-container'>
      hello betting board
    </div>
  );
};

export default DashboardBetting;
