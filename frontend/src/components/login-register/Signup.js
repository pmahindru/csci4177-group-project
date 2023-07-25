//Code extended from previous Assignment submissions by Saiz Charolia

// Registeration form referred from geeksforgeeks
// URL: https://www.geeksforgeeks.org/how-to-develop-user-registration-form-in-reactjs/
// Date Accessed: 06/12/2023

import React, { useState } from 'react';

import './Signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import simage from '../images/signup.png';
import { createUser } from '../../api';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    
    // Regex for password referred from stackoverflow
    // URL: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    // Date Accessed: 06/12/2023
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character (!@#$%^&*())');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // API calling referred from Blogs
    // URL: https://blog.hubspot.com/website/api-calls
    // Date Accessed: 07/23/2023
    
    const addr = null;
    const phone = null;
    const loc = null;
 
    const data = await createUser({firstName, lastName, email, password, addr, phone, loc});
    
    if (data.response === undefined){
      alert('User registered successful');
      navigate("/login");
      return;
    }
    else {
      alert(data.response.data.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-text-image">
          {/* 
              Image referred from icon8
              URL: https://icons8.com/illustrations/illustration/bloom-online-store
              Date Accessed: 06/12/2023 
          */}
          <img src={simage} alt="Image2" className="signup-image"/>
          <h3>
            Join us today<br/>Become a part of our vibrant ShopAesthetics
          </h3>
      </div>
      <div className="signup-form">
        <div className="signup">
          <h1>Register</h1>
          {/* 
          Form referred from sectio.io
          URL: https://www.section.io/engineering-education/registration-form-react.js-firebase/
          Date Accessed: 06/12/2023
          */}
          <form onSubmit={handleRegister}>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
            <button type="submit">Register</button>
            <button><a href="/login"> Back to Login </a></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
