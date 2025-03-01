import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
          <NavLink to="/add" className="sidebar-option">
            <img className='image-resize' src={assets.add_icon} alt=""/>
            <p className='sidebar-text'>Add Items</p>
          </NavLink>
          <NavLink to="/list" className="sidebar-option">
            <img className='image-resize' src={assets.order_icon} alt=""/>
            <p className='sidebar-text'>List Items</p>
          </NavLink>
          <NavLink to ='/orders' className="sidebar-option">
            <img className='image-resize' src={assets.order_icon} alt=""/>
            <p className='sidebar-text'>Orders</p>
          </NavLink>
        </div>
    </div>
  )
}

export default Sidebar