/* Created By: Pranav Mahindru*/
/* Updated by Joel Kuruvilla for Assignment 3 | 2023-07-25 */
import React, {useState} from 'react';
import './notificationSettings.css';
import Switch from 'react-switch';
import { notificationProfileUserDetails } from '../../api.js';

function NotificationSettings() {
    const [allNotifcationsEnabled, setAllNotifcationsEnabled] = useState();
    const [inboxNotifcationsEnabled, setInboxNotifcationsEnabled] = useState();
    const [orderMessagsNotifcationsEnabled, setOrderMessagsNotifcationsEnabled] = useState();
    const [orderUpdatesNotifcationsEnabled, setOrderUpdatesNotifcationsEnabled] = useState();
    const [ratingReviewsNotifcationsEnabled, setRatingReviewsNotifcationsEnabled] = useState();
    const [notificationSoundsEnabled, setNotificationSoundsEnabled] = useState();
    const [emailNotifcationsEnabled, setEmailNotifcationsEnabled] = useState();
    const [phoneNotifcationsEnabled, setPhoneNotifcationsEnabled] = useState();

    function handleToggleAllSwitch(status) {
        setAllNotifcationsEnabled(status);
        setInboxNotifcationsEnabled(status);
        setOrderMessagsNotifcationsEnabled(status);
        setOrderUpdatesNotifcationsEnabled(status);
        setRatingReviewsNotifcationsEnabled(status);
        setNotificationSoundsEnabled(status);
        setEmailNotifcationsEnabled(status);
        setPhoneNotifcationsEnabled(status);

        saveNotificationChanges();
    }

    function handleToggleInboxSwitch(status) {
        setInboxNotifcationsEnabled(status);

        saveNotificationChanges();
    }
    function handleToggleOrderMessagesSwitch(status) {
        setOrderMessagsNotifcationsEnabled(status);
        
        saveNotificationChanges();
    }

    function handleOrderUpdatesToggleSwitch(status) {
        setOrderUpdatesNotifcationsEnabled(status);
        
        saveNotificationChanges();
    }
    function handleRatingReviewsToggleSwitch(status) {
        setRatingReviewsNotifcationsEnabled(status);
        
        saveNotificationChanges();
    }
    function handleNotificationSoundsToggleSwitch(status) {
        setNotificationSoundsEnabled(status);
        
        saveNotificationChanges();
    }

    function handleEmailNotificationToggleSwitch(status) {
        setEmailNotifcationsEnabled(status);
        
        saveNotificationChanges();
    }

    function handlPhoneNotificationToggleSwitch(status) {
        setPhoneNotifcationsEnabled(status);
        
        saveNotificationChanges();
    }

    async function saveNotificationChanges() {
        if (allNotifcationsEnabled) {
            const status = await notificationProfileUserDetails(localStorage.getItem('userID'), true, true, true, true, true, true, true, true);
        }
        else {
            const status = await notificationProfileUserDetails(localStorage.getItem('userID'), allNotifcationsEnabled, inboxNotifcationsEnabled,
                 orderMessagsNotifcationsEnabled, orderUpdatesNotifcationsEnabled, ratingReviewsNotifcationsEnabled,
                  notificationSoundsEnabled, emailNotifcationsEnabled, phoneNotifcationsEnabled);
        }
    }

    return (
        <div className='notificationSettings'>
            <h2> Notification Settings </h2>
            <form className='notificationSettings-form'>
                <li> All Notifications: <Switch className="notificationSettings-toggle" id="notification-toggle-all"
                 onChange={handleToggleAllSwitch} checked={allNotifcationsEnabled} borderRadius={12} /> </li>
                <hr/>
                <li> Inbox Messages: <Switch className="notificationSettings-toggle" onChange={handleToggleInboxSwitch}
                 checked={inboxNotifcationsEnabled} borderRadius={12}/>  </li>
                <hr/>
                <li> Order Mesages: <Switch className="notificationSettings-toggle" onChange={handleToggleOrderMessagesSwitch}
                 checked={orderMessagsNotifcationsEnabled} borderRadius={12} /> </li>
                <hr/>
                <li> Order Updates <Switch className="notificationSettings-toggle" onChange={handleOrderUpdatesToggleSwitch}
                 checked={orderUpdatesNotifcationsEnabled} borderRadius={12} /> </li>
                <hr/>
                <li> Rating/Review Notifications: <Switch className="notificationSettings-toggle" onChange={handleRatingReviewsToggleSwitch}
                 checked={ratingReviewsNotifcationsEnabled} borderRadius={12} /> </li>
                <hr/>
                <li> Notification Sounds: <Switch className="notificationSettings-toggle" onChange={handleNotificationSoundsToggleSwitch}
                 checked={notificationSoundsEnabled} borderRadius={12} /> </li>
                <hr/>
                <li> Email Notification: <Switch className="notificationSettings-toggle" onChange={handleEmailNotificationToggleSwitch}
                 checked={emailNotifcationsEnabled} borderRadius={12} /> </li>
                <hr/>
                <li> Phone Notification: <Switch className="notificationSettings-toggle" onChange={handlPhoneNotificationToggleSwitch}
                 checked={phoneNotifcationsEnabled} borderRadius={12} /> </li>
             </form>
        </div>
    );
};

export default NotificationSettings;
