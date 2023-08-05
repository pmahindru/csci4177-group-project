/* Created By: Pranav Mahindru*/
/* Updated by Joel Kuruvilla for Assignment 3 | 2023-07-25 */
import React, {useState, useEffect} from 'react'
import './profileSettings.css';
import { getUserWithID, userProfileSettingsRead, userProfileSettingsUpdate, userSignUpUpdate } from '../../api.js';
import Switch from 'react-switch';

function ProfileSettings() {
    const userData = JSON.parse(localStorage.getItem("user_info"));
    const userID = userData._id;
    const userPassword = userData.password;

    //Signup Configurations
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [locationAddress, setlocationAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isActive, setIsActive] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //Profile Setting Configurations
    const [email2FAEnabled, setEmail2FAEnabled] = useState(false);
    const [phone2FAEnabled, setPhone2FAEnabled] = useState(false);
    const [authenticationApp2FAEnabled, setAuthenticationApp2FAEnabled] = useState(false);
    const [currentLocationEnabled, setCurrentLocationEnabled] = useState(false);
    const [disableAccountEnabled, setDisableAccountEnabled] = useState(false);

    useEffect(() => {
        const readProfileConfigurations = async () => {
            const getUsers = await getUserWithID(userID);
            setFullName(getUsers.firstName+" "+getUsers.lastName)
            setEmail(getUsers.email)
            setlocationAddress(getUsers.address)
            setPhoneNumber(getUsers.phone)

            const profileSettingsReading = await userProfileSettingsRead(userID);
            if (profileSettingsReading === null) {
                return;
            }
            if (Object.keys(profileSettingsReading).length !== 0) {
                setEmail2FAEnabled(profileSettingsReading.email_auth);
                setPhone2FAEnabled(profileSettingsReading.phone_auth);
                setAuthenticationApp2FAEnabled(profileSettingsReading.auth_app);
                setCurrentLocationEnabled(profileSettingsReading.set_location);
                setDisableAccountEnabled(profileSettingsReading.disable_account);
            }
        };
        readProfileConfigurations();
    }, [userID]);

    useEffect(() => {
        if (phoneNumber === null) {
            setPhone2FAEnabled(false)
        }
    }, [phone2FAEnabled]);

    const handleAddressInput = (e) => {
        setlocationAddress(e.target.value);
    }
    const handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    }
    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    }
    const handleOldPassword = (e) => {
        setOldPassword(e.target.value);
    }
    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    }
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleEmailToggleSwitch = (e) => { 
        setEmail2FAEnabled(e);
        updateProfileConfigurations({"email_auth": e});
    }
    const handlePhoneToggleSwitch = (e) => {
        if (phoneNumber === null) {
            alert("Cant On there is No Phone number");
            return;
        }
        setPhone2FAEnabled(e); 
        updateProfileConfigurations({"phone_auth": e});
    }
    const handleAuthenticationAppToggleSwitch = (e) => {  
        setAuthenticationApp2FAEnabled(e);
        updateProfileConfigurations({"auth_app": e});
    }
    const handleCurrentLocationToggleSwitch = (e) => { 
        setCurrentLocationEnabled(e);
        updateProfileConfigurations({"set_location": e});
    }
    const handleDisableAccountToggleSwitch = (e) => { 
        setDisableAccountEnabled(e);
        updateProfileConfigurations({"disable_account": e});
    }
    const handleDropdown = (e) => { 
        setIsActive(e.target.value);
    }

    const updateProfileConfigurations = async (data) => {
        await userProfileSettingsUpdate(userID, data);
        alert("Settings applied successfully");
        window.location.reload();
    }

    const updateSignUpData_General = async (e) => {
        e.preventDefault();
        if (phoneNumber.trim().length !== 10  && phoneNumber.trim().length !== 0) {
            alert("Make sure Phone number is 10 digits long.\nAlso ensure that only numbeers are entered! (no '-')");
            return;
        }
        
        await userSignUpUpdate(userID, {"email": email, "address": locationAddress, "phone": phoneNumber});
        alert("Update the General information");
        window.location.reload();
    }

    const updateSignUpData_Password = async (e) => {
        e.preventDefault();
        if (oldPassword.trim().length === 0 || newPassword.trim().length === 0 || confirmPassword.trim().length === 0) {
            alert("One Of the Password Input is empty");
            return;
        }

        if (oldPassword !== userPassword) {
            alert("Old Password do not match");
            return;
        }

        if (oldPassword === newPassword) {
            alert("New password can't be same to old password");
            return;
        }

        // Regex for password referred from stackoverflow
        // URL: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
        // Date Accessed: 08/5/2023
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,}$/;
        if (!(passwordRegex).test(newPassword))
        {
            alert('New Password is not valid');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        await userSignUpUpdate(userID, {"password": newPassword});
        alert("Update the Password");
        window.location.reload();
    }

    return (
        <div className='profileSettings'>
            <div className='save-profile-settings-button'>
                <h2> Profile Settings </h2>
            </div>
            <div className='profileSettings-general'>
                <h3> General </h3>
                <form className='profileSettings-general-form'>
                    <li> Full Name: <input placeholder={fullName || ""} disabled/> </li>
                    <li> Email: <input type="text" value={email  || ""} placeholder="No email Address" onChange={handleEmailInput} /> </li>
                    <li> Address: <input type="text" value={locationAddress  || ""} placeholder="No address found" onChange={handleAddressInput}/> </li>
                    <li> Phone Number: <input type="number" value={phoneNumber  || ""} placeholder="No Phone Number found" onChange={handlePhoneNumber}/> </li>
                    <li> Online Status:  
                        <select value={isActive} onChange={handleDropdown}> 
                            <option value="active"> Active </option>
                            <option value="offline"> Offline </option>
                            <option value="do-not-disturb"> Do Not Disturb </option>
                       </select>
                    </li>
                    <button id="updateButtons" onClick={updateSignUpData_General}> UPDATE GENERAL </button>
                </form>
            </div>
            <div className='profileSettings-setPassword'>
                <h3> Set Password </h3>
                <form className='profileSettings-setPassword-form'>
                    <li> Old Password <input type="password" value={oldPassword} placeholder="Enter old Password" onChange={handleOldPassword} /> </li>
                    <li> New Password <input type="password" value={newPassword} placeholder="Enter New Password" onChange={handleNewPassword} /> </li>
                    <li> Confirm Password: <input type="password" value={confirmPassword} placeholder="Enter confirm Password" onChange={handleConfirmPassword} /> </li>
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
                <h3> Set Current Location </h3>
                <form className='profileSettings-setLocation-form'>
                    <li> Location: <Switch className="profileSettings-toggle" onChange={handleCurrentLocationToggleSwitch}
                     checked={currentLocationEnabled} borderRadius={2} /> </li>
                </form>
            </div>
            <div className='profileSettings-danger'>
                <h3> Danger </h3>
                <form className='profileSettings-danger-form'>
                    <li> Disable Account 
                        <Switch className="profileSettings-toggle" onChange={handleDisableAccountToggleSwitch}
                     checked={disableAccountEnabled} borderRadius={2} onColor='#f00'/>
                     </li>
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
