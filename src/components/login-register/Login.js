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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    window.location.href = '/';

    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="login-container">
      <div className="company-info">
        <div className="company">
          <div className="headlines">
            {/* 
              Image referred from icon8
              URL: https://icons8.com/illustrations/illustration/taxi-online-shop
              Date Accessed: 06/11/2023            
            */}
            <img src={limage} alt="Image1" />
          </div>
        </div>
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
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
