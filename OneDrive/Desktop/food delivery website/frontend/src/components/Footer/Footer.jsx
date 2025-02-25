import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img src={assets.logo} alt=""/>
                <p>We bring you fresh, locally sourced meals from your favorite restaurants. Quality food, quick delivery, and a seamless ordering experience—just for you!</p>
                <div className='footer-social-icons'>
                <div className='footer-social-icons'>
  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
    <img src={assets.facebook_icon} alt="Facebook" />
  </a>
  <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
    <img src={assets.twitter_icon} alt="Twitter" />
  </a>
  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
    <img src={assets.linkedin_icon} alt="LinkedIn" />
  </a>
</div>
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
                    <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=tomatofood@gmail.com">tomatofood@gmail.com</a></li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2025 © Tomato.com - All Right Reserved. </p>
    </div>
  )
}

export default Footer