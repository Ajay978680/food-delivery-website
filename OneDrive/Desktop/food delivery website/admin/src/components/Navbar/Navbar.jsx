import React from 'react';
import './Navbar.css';
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      {/* Logo replaced with text "QuickBite" and "Admin" below it */}
      <div className='logo-text'>
        <h1>QuickBite</h1>
        <p>Admin</p>
      </div>
      <img className='profile' src={assets.profile_image} alt="Profile" />
    </div>
  );
}

export default Navbar;
