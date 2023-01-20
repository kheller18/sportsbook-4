import React, { useState } from 'react';

const Scores = (props) => {
  const [dropdown, showDropdown] = useState(false);
  const [state, setState] = useState({});

  return (
    <div className='scores-container'>
      hello scores
    </div>
  );
};

export default Scores;