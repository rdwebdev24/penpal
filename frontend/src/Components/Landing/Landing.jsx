import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {RiTaskFill} from 'react-icons/ri'
import { Button } from '@mui/material'
import './Landing.css'
const Landing = () => {
     const navigate = useNavigate();
  return (
    <div className='LandingWrapper'>
     <div className="social-icons">
          <i className="fa-brands fa-linkedin"></i>
          <i className="fa-brands fa-youtube"></i>
          <i className="fa-brands fa-github"></i>
          <i className="fa-brands fa-twitter"></i>
     </div>
          <div className="landing-info">
               <h1>Create. Organize.<br/>Share. Easy</h1>
               <p>A digital space that helps you ti visually organise your ideas , to share with your friends </p>
               <div className="landing-btn-div">
                    <button onClick={()=>navigate('/register')}>Try now</button>
               </div>
          </div>
    </div>
  )
}

export default Landing
