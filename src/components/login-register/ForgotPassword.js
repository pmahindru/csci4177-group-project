// Forgot password referred from codevoweb
// URL: https://codevoweb.com/forgot-reset-password-in-reactjs-and-axios/
// Date Accessed: 06/13/2023

// OTP verification method referred from makeuseof (although not yet implemented)
// URL: https://www.makeuseof.com/password-reset-forgot-react-node-how-handle/
// Date Accessed: 06/13/2023

import React, { useState } from 'react';
import './ForgotPassword.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import fimage from '../images/forgot.png';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCodeChange = (event) => {
    setResetCode(event.target.value);
  };

  const handleSendCode = (event) => {
    event.preventDefault();
    
    setTimeout(() => {
      setIsCodeSent(true);
    }, 2);
  };

  const handleVerifyCode = (event) => {
    event.preventDefault();
    
    if (resetCode === '1234') {
      setIsCodeValid(true);
    } else {
      setIsCodeValid(false);
    }
  };

  const handleResetPassword = (event) => {
    event.preventDefault();
    
    // Regex for password referred from stackoverflow
    // URL: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    // Date Accessed: 06/13/2023
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        'Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character (!@#$%^&*())'
      );
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    window.location.href = '/';
  };
  

  return (
    <div className="forgotpassword-container">
      <div className="company-info">
        <div className="company">
          <div className="headlines">
            {/* 
              Image referred from icon8
              URL: https://icons8.com/illustrations/illustration/abstract-password-recovery
              Date Accessed: 06/13/2023 
          */}
          <img src={fimage} alt="Image3 " />
          </div>
        </div>
      </div>

      <div className="forgotpassword-form">
        <div className='forgotpassword'>
          <h2>Forgot Password</h2>
          {!isCodeSent && (
          
          // Form referred from sectio.io
          // URL: https://www.section.io/engineering-education/registration-form-react.js-firebase/
          // Date Accessed: 06/12/2023
      
            <form onSubmit={handleSendCode}>
              <label>
                Registered Email:
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </label>
              <br />
              <button type="submit">Send Reset Code</button>
            </form>
          )}

          {isCodeSent && !isCodeValid && (
            <form onSubmit={handleVerifyCode}>
              <label>
                Reset Code:
                <input
                  type="text"
                  value={resetCode}
                  onChange={handleCodeChange}
                  placeholder="Enter 1234"
                  required
                />
              </label>
              <br />
              <button type="submit">Verify Code</button>
            </form>
          )}

          {isCodeValid && (
            <form onSubmit={handleResetPassword}>
              <label>New Password:</label>
              <div className="password-input">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {/* 
                    Eye Splash and Eye icon referred from fontawesome
                    URL: https://fontawesome.com/v4/icon/eye-slash 
                          https://fontawesome.com/v4/icon/eye
                    Date Accessed: 06/13/2023
                  */}
                  <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                </span>
              </div>
              <br />
              <label>Confirm Password:</label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </span>
              </div>
              <br />
              <button type="submit">Reset Password</button>
              {passwordError && <p>{passwordError}</p>}
            </form>
          )}

        </div>
      </div>
    </div>
    
  );
}

export default ForgotPassword;
