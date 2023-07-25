/* Created By: Pranav Mahindru*/
import React, {useState} from 'react';
import './profileSettings.css';
import Switch from 'react-switch';

function ProfileSettings() {
    const [email2FAEnabled, setEmail2FAEnabled] = useState();
    const [phone2FAEnabled, setPhone2FAEnabled] = useState();
    const [authenticationApp2FAEnabled, setAuthenticationApp2FAEnabled] = useState();
    const [currentLocationEnabled, setCurrentLocationEnabled] = useState();
    const [disableAccountEnabled, setDisableAccountEnabled] = useState();

    function handleEmailToggleSwitch(status) { 
        setEmail2FAEnabled(status); 
    }
    function handlePhoneToggleSwitch(status) { 
        setPhone2FAEnabled(status); 
    }
    function handleAuthenticationAppToggleSwitch(status) { 
        setAuthenticationApp2FAEnabled(status);
    }
    function handleCurrentLocationToggleSwitch(status) {
        setCurrentLocationEnabled(status);
    }
    function handleDisableAccountToggleSwitch(status) {
        setDisableAccountEnabled(status);
    }

    return (
        <div className='profileSettings'>
            <h2> Profile Settings </h2>
            <div className='profileSettings-general'>
                <form className='profileSettings-general-form'>
                    <li> Full Name: <input disabled/> </li>
                    <li> Email: <input disabled/> </li>
                    <li> Address: <input disabled/> </li>
                    <li> Online Status:  
                        <select> 
                            <option> TBD. </option>
                       </select>
                    </li>
                        <button id="updateButtons"> UPDATE </button>
                </form>
            </div>
            <div className='profileSettings-setPassword'>
                <h3> Set Password </h3>
                <form className='profileSettings-setPassword-form'>
                    <li> New Password <input/> </li>
                    <li> Confirm Password: <input/> </li>
                    <button id="updateButtons"> UPDATE </button>
                </form>
            </div>
            <div className='profileSettings-twoFactorAuthentication'>
                <h3> Two Factor Authentication </h3>
                <form className='profileSettings-twoFactorAuthentication-form'>
                    <li> Email: <Switch className="profileSettings-toggle" onChange={handleEmailToggleSwitch} checked={email2FAEnabled} /></li>
                    <li> Phone: <Switch className="profileSettings-toggle" onChange={handlePhoneToggleSwitch} checked={phone2FAEnabled} /> </li>
                    <li> Authentication App: <Switch className="profileSettings-toggle" onChange={handleAuthenticationAppToggleSwitch} checked={authenticationApp2FAEnabled} /> </li>
                </form>
            </div>
            <div className='profileSettings-setLocation'>
                <h3> Set Current Loation </h3>
                <form className='profileSettings-setLocation-form'>
                    <li> Location: <Switch className="profileSettings-toggle" onChange={handleCurrentLocationToggleSwitch} checked={currentLocationEnabled} /> </li>
                </form>
            </div>
            <div className='profileSettings-danger'>
                <h3> Danger </h3>
                <form className='profileSettings-danger-form'>
                    <li> Disable Account <Switch className="profileSettings-toggle" onChange={handleDisableAccountToggleSwitch} checked={disableAccountEnabled} /> </li>
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
