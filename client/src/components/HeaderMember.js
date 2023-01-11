import React from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import '../styles/HeaderMember.css';

const HeaderMember = () => {
  return (
    <div className='header-container'>
      <div className='header-left header-title'>SportsBook</div>
      <div className='header-right header-links'>
        <Button className='user-button'>
          <FontAwesomeIcon icon={faUser} />
        </Button>
      </div>
    </div>
  );
};

export default HeaderMember;
