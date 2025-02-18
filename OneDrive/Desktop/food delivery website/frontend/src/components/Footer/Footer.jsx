import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img src={assets.logo} alt=""/>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. A accusamus doloribus, possimus quidem ipsa quo necessitatibus omnis reprehenderit distinctio voluptatum facere saepe eveniet libero commodi assumenda ipsum laboriosam nostrum ducimus.</p>
                <div className='footer-social-icons'>
                    <img src={assets.facebook_icon} alt=""/>
                    <img src={assets.twitter_icon} alt=""/>
                    <img src={assets.linkedin_icon} alt=""/>

                </div>
            </div>
            <div className='footer-content-center'>
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Orivacy Policy</li>
                </ul>
            </div>
            <div className='footer-content-right'>
                <h2>Get In Touch</h2>
                <ul>
                    <li>+91 6383778586</li>
                    <li>sparkajay001@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2025 © Tomato.com - All Right Reserved. </p>
    </div>
  )
}

export default Footer