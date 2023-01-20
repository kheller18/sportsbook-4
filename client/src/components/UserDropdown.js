import React, { useState } from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const UserDropdown = (props) => {
  const [dropdown, showDropdown] = useState(false);
  const handleClick = (e) => {
    console.log(e.target.value)
    props.setDashboard({active: e.target.value, options: props.dashboard.options})
    showDropdown(false);
  }

  const handleDropdownClick = () => {
    (dropdown) ? showDropdown(false) : showDropdown(true);
  }

  return (
    <div className='user-dropdown-container'>
      <Button className='' onClick={handleDropdownClick}>
        {props.dashboard.active}
        <FontAwesomeIcon icon={faBars} />
      </Button>
      <div>
        {dropdown ? (
          <div>
          {props.dashboard.options.map((option) => {
            if (option !== props.dashboard.active) {
              return (
                <Button onClick={((e) => {handleClick(e)})} value={option}>{option}</Button>
              )
            } else {
              return null;
            }
          })}
          </div>
        ) :
          ''
        }
      </div>
    </div>
  );
};

export default UserDropdown;
