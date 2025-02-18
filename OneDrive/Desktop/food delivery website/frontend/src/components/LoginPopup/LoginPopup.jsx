import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {

    const[currstate,setCurrState]=useState("Sign Up")

  return (
    <div className='login-popup'>
        <form className='login-popup-container'>
            <div className='login-popup-title'>
                <h2>{currstate}</h2>
                <img onClick={()=>setShowLogin(false)}src={assets.cross_icon} alt=""/>
            </div>
        </form>
    </div>
  )
}

export default LoginPopup // 21:19.