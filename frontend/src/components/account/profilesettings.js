/* Created By: Pranav Mahindru*/
/* Updated by Joel Kuruvilla for Assignment 3 | 2023-07-25 */
import React, {useState, useEffect} from 'react'
import './profileSettings.css';
import { userProfileSettingsRead, userProfileSettingsUpdate, userSignUpUpdate } from '../../api.js';
import Switch from 'react-switch';

function ProfileSettings() {
    const userData = JSON.parse(localStorage.getItem("user_info"));
    const userID = userData._id;

    //Signup Configurations
    const [locationAddress, setlocationAddress] = useState(userData.address);
    const [phoneNumber, setPhoneNumber] = useState(userData.phone);

    //Profile Setting Configurations
    const [email2FAEnabled, setEmail2FAEnabled] = useState(false);
    const [phone2FAEnabled, setPhone2FAEnabled] = useState(false);
    const [authenticationApp2FAEnabled, setAuthenticationApp2FAEnabled] = useState(false);
    const [currentLocationEnabled, setCurrentLocationEnabled] = useState(false);
    const [disableAccountEnabled, setDisableAccountEnabled] = useState(false);

    useEffect(() => {
        const readProfileConfigurations = async () => {
            try {
                const profileSettingsReading  = await userProfileSettingsRead(userID);
                
                setEmail2FAEnabled(profileSettingsReading.email_auth);
                setPhone2FAEnabled(profileSettingsReading.phone_auth);
                setAuthenticationApp2FAEnabled(profileSettingsReading.auth_app);
                setCurrentLocationEnabled(profileSettingsReading.set_location);
                setDisableAccountEnabled(profileSettingsReading.disable_account);
            } 
            catch (error) {
                return error;
            }
        };
        readProfileConfigurations();
    }, [userID]);


    const handleAddressInput = (e) => {
        setlocationAddress(e.target.value);
    }
    const handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    }

    const handleEmailToggleSwitch = (e) => { 
        setEmail2FAEnabled(e);
    }
    const handlePhoneToggleSwitch = (e) => {  
        setPhone2FAEnabled(e); 
    }
    const handleAuthenticationAppToggleSwitch = (e) => {  
        setAuthenticationApp2FAEnabled(e);
    }
    const handleCurrentLocationToggleSwitch = (e) => { 
        setCurrentLocationEnabled(e);
    }
    const handleDisableAccountToggleSwitch = (e) => { 
        setDisableAccountEnabled(e);
    }

    const updateProfileConfigurations = async () => {
        const settingsStatus = ({"email_auth": email2FAEnabled, "phone_auth":phone2FAEnabled,
         "auth_app": authenticationApp2FAEnabled, "set_location": currentLocationEnabled, 
         "disable_account": disableAccountEnabled });
        /*const updateStatus = */await userProfileSettingsUpdate(userID, settingsStatus);
        // console.log(JSON.stringify(updateStatus));
        alert("Settings applied successfully");
        window.location.reload();
    }

    const updateSignUpData_General = async () => {
        const settingsStatus_general = ({"address": locationAddress, "phone": phoneNumber });
        alert("General Settings have been updated! Logout and Relog back in to see changes!");
        await userSignUpUpdate(userID, settingsStatus_general);
        window.location.reload();
    }

    const updateSignUpData_Password = async () => {
        // const settingsStatus_password = ({"password": });
        alert("Your password has been updated! Logout and Relog back in to see changes!");
        // await userSignUpUpdate(userID, settingsStatus_password);
        window.location.reload();
    }

    return (
        <div className='profileSettings'>
            <div className='save-profile-settings-button'>
                <h2> Profile Settings </h2>
                <button type='button' onClick={updateProfileConfigurations}> Save Profile Settings </button>
            </div>
            <div className='profileSettings-general'>
                <h3> General </h3>
                <form className='profileSettings-general-form'>
                    <li> Full Name: <input placeholder={userData.firstName + " " + userData.lastName} disabled/> </li>
                    <li> Email: <input placeholder={userData.email} disabled/> </li>
                    <li> Address: <input placeholder={locationAddress || "No address inputted"} onChange={(handleAddressInput)}/> </li>
                    <li> Phone Number: <input placeholder={phoneNumber || "No Phone Number inputted"} onChange={(handlePhoneNumber)}/> </li>
                    <li> Online Status:  
                        <select> 
                            <option disabled> active </option>
                       </select>
                    </li>
                        <button id="updateButtons" onClick={updateSignUpData_General}> UPDATE GENERAL </button>
                </form>
            </div>
            <div className='profileSettings-setPassword'>
                <h3> Set Password </h3>
                <form className='profileSettings-setPassword-form'>
                    <li> Old Password <input/> </li>
                    <li> New Password <input/> </li>
                    <li> Confirm Password: <input/> </li>
                    <button id="updateButtons" onClick={updateSignUpData_Password}> UPDATE PASSWORD </button>
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
