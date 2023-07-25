/* Created By: Pranav Mahindru*/
/* Updated by Joel Kuruvilla for Assignment 3 | 2023-07-25 */
import React, {useState} from 'react';
import './profileSettings.css';
import { profileUserDetails } from '../../api.js';
import Switch from 'react-switch';
import { redirect } from 'react-router-dom';

function ProfileSettings() {
    const currentUserID = localStorage.getItem('userID');

    console.log(currentUserID, localStorage.getItem("user_info"));
    const userData = JSON.parse(localStorage.getItem("user_info"));
    
    const [email2FAEnabled, setEmail2FAEnabled] = useState();
    const [phone2FAEnabled, setPhone2FAEnabled] = useState();
    const [authenticationApp2FAEnabled, setAuthenticationApp2FAEnabled] = useState();
    const [currentLocationEnabled, setCurrentLocationEnabled] = useState();
    const [disableAccountEnabled, setDisableAccountEnabled] = useState();

    async function handleEmailToggleSwitch(status) { 
        setEmail2FAEnabled(status);
        updateProfileConfigurations();
    }
    async function handlePhoneToggleSwitch(status) { 
        setPhone2FAEnabled(status); 
        updateProfileConfigurations();
    }
    async function handleAuthenticationAppToggleSwitch(status) { 
        setAuthenticationApp2FAEnabled(status);
        updateProfileConfigurations();
    }
    async function handleCurrentLocationToggleSwitch(status) {
        setCurrentLocationEnabled(status);
        updateProfileConfigurations();
    }
    async function handleDisableAccountToggleSwitch(status) {
        setDisableAccountEnabled(status);
        updateProfileConfigurations();
    }

    async function updateProfileConfigurations() {
        
        let udateStatus = true;
        const settings  = await profileUserDetails({ udateStatus, currentUserID, email2FAEnabled, phone2FAEnabled, authenticationApp2FAEnabled, currentLocationEnabled, disableAccountEnabled });
        console.log(settings);
    }


    return (
        <div className='profileSettings'>
            <h2> Profile Settings </h2>
            <div className='profileSettings-general'>
                <h3> General </h3>
                <form className='profileSettings-general-form' onSubmit={updateProfileConfigurations}>
                    <li> Full Name: <input placeholder={userData.firstName + " " + userData.lastName} disabled/> </li>
                    <li> Email: <input placeholder={userData.email} disabled/> </li>
                    <li> Address: <input placeholder={userData.location || "No address inputted"} disabled/> </li>
                    <li> Phone Number: <input placeholder={userData.phone || "No Phone Number inputted"} disabled/> </li>
                    <li> Online Status:  
                        <select> 
                            <option disabled> active </option>
                       </select>
                    </li>
                        <button id="updateButtons" onClick={() => alert("General Settings have been updated.")}> UPDATE </button>
                </form>
            </div>
            <div className='profileSettings-setPassword'>
                <h3> Set Password </h3>
                <form className='profileSettings-setPassword-form' onSubmit={updateProfileConfigurations}>
                    <li> New Password <input/> </li>
                    <li> Confirm Password: <input/> </li>
                    <button id="updateButtons" onClick={() => alert("Your Password has been updated.")}> UPDATE </button>
                </form>
            </div>
            <div className='profileSettings-twoFactorAuthentication'>
                <h3> Two Factor Authentication </h3>
                <form className='profileSettings-twoFactorAuthentication-form'>
                    <li> Email: <Switch className="profileSettings-toggle" onChange={handleEmailToggleSwitch}
                     checked={email2FAEnabled} borderRadius={12} /></li>
                    <li> Phone: <Switch className="profileSettings-toggle" onChange={handlePhoneToggleSwitch}
                     checked={phone2FAEnabled} borderRadius={12} /> </li>
                    <li> Authentication App: <Switch className="profileSettings-toggle" onChange={handleAuthenticationAppToggleSwitch}
                     checked={authenticationApp2FAEnabled} borderRadius={12} /> </li>
                </form>
            </div>
            <div className='profileSettings-setLocation'>
                <h3> Set Current Loation </h3>
                <form className='profileSettings-setLocation-form'>
                    <li> Location: <Switch className="profileSettings-toggle" onChange={handleCurrentLocationToggleSwitch}
                     checked={currentLocationEnabled} borderRadius={2} /> </li>
                </form>
            </div>
            <div className='profileSettings-danger'>
                <h3> Danger </h3>
                <form className='profileSettings-danger-form'>
                    <li> Disable Account <Switch className="profileSettings-toggle" onChange={handleDisableAccountToggleSwitch}
                     checked={disableAccountEnabled} borderRadius={2} onColor='ff0000'/> </li>
                </form>
            </div>
            <div className='profileSettings-delete'>
                <form className='profileSettings-delete-form'>
                    <button><b> DELETE ACCOUNT </b></button>
                </form>
            </div>
        </div>
    );
};

export default ProfileSettings;
