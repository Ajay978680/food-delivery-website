import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br/>Tomato App</p>
        <div className='app-download-platforms'>
            {/* Play Store link */}
            <a href="https://play.google.com/store/games?hl=en&pli=1" target="_blank" rel="noopener noreferrer">
                <img src={assets.play_store} alt="Download on Play Store" />
            </a>
            {/* App Store link */}
            <a href="https://apps.apple.com/us/app/apple-store/id375380948" target="_blank" rel="noopener noreferrer">
                <img src={assets.app_store} alt="Download on App Store" />
            </a>
        </div>
    </div>
  )
}

export default AppDownload
