// Code referred from Assignment 1 (Individual Submission)
// URL: https://git.cs.dal.ca/charolia/csci-4177-5709-assignments/-/tree/main/Assignment1
// Author: Saiz Charolia
// Date Accessed: 06/11/2023 

// Login page and validation referred from Contact Mentor
// URL: https://contactmentor.com/login-form-react-js-code/
// Date Accessed: 06/11/2023

import React, { useState } from 'react';
import './Login.css';
import limage from '../images/login.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { getAllUser } from '../../api';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    const t = await getAllUser();
    console.log(t);
    e.preventDefault();
    /**
     * Pranav Mahindru added the regex and check for login page
     * regex take from online reference are in the README FILE  
     * validate register form
    */
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Regex for password referred from stackoverflow
    // URL: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    // Date Accessed: 06/12/2023
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,}$/;
    if (email === '' || password === '')
    {
        alert('Form is Empty');
        return;
    }
    if (!(emailRegex).test(email))
    {
        alert('Email is not valid');
        return;
    }
    if (!(passwordRegex).test(password))
    {
        alert('Password is not valid');
        return;
    }

    /**
     * set it empty and show alert 
     */
    setEmail('');
    setPassword('');
    alert("Successfully login");

    window.location.href = '/';
  };

  return (
    <div className="login-container">
      <div className="login-text-image">
          {/* 
            Image referred from icon8
            URL: https://icons8.com/illustrations/illustration/taxi-online-shop
            Date Accessed: 06/11/2023            
          */}
          <img src={limage} alt="Image1" className="login-image" />
          <h3>
            Discover the extraordinary on our ShopAesthetics where rare gems defy the norm and unleash your unique style
          </h3>
      </div>
      <div className="login-form">
        <div className="login">
          <h2>Login</h2>
          {/* 
            Form referred from handsonreact
            URL: https://handsonreact.com/docs/forms
            Date Accessed: 06/11/2023
          */}
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password:</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* 
                  Eye Splash and Eye icon referred from fontawesome
                  URL: https://fontawesome.com/v4/icon/eye-slash 
                       https://fontawesome.com/v4/icon/eye
                  Date Accessed: 06/11/2023
                  */}
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            <div className="forgot-password">
              <a href="/ForgotPassword">Forgot Password?</a>
            </div>
            <button type="submit">Login</button>
            <div className="signup-link">
              Don't have an account? <a href="/Signup">Sign up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
