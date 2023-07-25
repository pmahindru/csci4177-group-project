/* Created By: Pranav Mahindru*/
/* Updated by Joel Kuruvilla for Assignment 3 | 2023-07-25 */
import React, {useState} from 'react';
import './notificationSettings.css';
import Switch from 'react-switch';
import { userNotificationSettingsRead, userNotificationSettingsUpdate } from '../../api.js';

function NotificationSettings() {
    const userData = JSON.parse(localStorage.getItem("user_info"));
    const currentUserID = userData._id;
    console.log("[Notifications-Page] Current Logged-in User: ", currentUserID, userData);


    async function readNotificationsConfigurations() {
        const notificationSettingsReading  = await userNotificationSettingsRead({currentUserID});

        for (var i = 0; i < JSON.stringify(notificationSettingsReading).length; i++) {
            let settingsData = JSON.stringify(notificationSettingsReading[i]);
            if (settingsData.includes(currentUserID)) {
                console.log("Settings retreived?\n" + settingsData);
                localStorage.setItem("user_info_notificationSettings", settingsData);
                break;
            }
        }
    }

    readNotificationsConfigurations();
    const currentUserConfigStatus = JSON.parse(localStorage.getItem("user_info_notificationSettings"));


    const [allNotifcationsEnabled, setAllNotifcationsEnabled] = useState(currentUserConfigStatus.notify_all);
        /* Special Case: When All Notification Settings option is activate, all settings activated */
        if (currentUserConfigStatus.notify_all) {
            currentUserConfigStatus.notify_inbox_messages = true;
            currentUserConfigStatus.notify_order_messages = true;
            currentUserConfigStatus.notify_order_updates = true;
            currentUserConfigStatus.notify_ratings_reviews = true;
            currentUserConfigStatus.notify_sounds = true;
            currentUserConfigStatus.notify_email = true;
            currentUserConfigStatus.notify_phone = true; 
        }
    const [inboxNotifcationsEnabled, setInboxNotifcationsEnabled] = useState(currentUserConfigStatus.notify_inbox_messages);
    const [orderMessagsNotifcationsEnabled, setOrderMessagsNotifcationsEnabled] = useState(currentUserConfigStatus.notify_order_messages);
    const [orderUpdatesNotifcationsEnabled, setOrderUpdatesNotifcationsEnabled] = useState(currentUserConfigStatus.notify_order_updates);
    const [ratingReviewsNotifcationsEnabled, setRatingReviewsNotifcationsEnabled] = useState(currentUserConfigStatus.notify_ratings_reviews);
    const [notificationSoundsEnabled, setNotificationSoundsEnabled] = useState(currentUserConfigStatus.notify_sounds);
    const [emailNotifcationsEnabled, setEmailNotifcationsEnabled] = useState(currentUserConfigStatus.notify_email);
    const [phoneNotifcationsEnabled, setPhoneNotifcationsEnabled] = useState(currentUserConfigStatus.notify_phone);

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
        // const status = await userNotificationSettingsRead({currentUserID, allNotifcationsEnabled, inboxNotifcationsEnabled, 
        //     orderMessagsNotifcationsEnabled, orderUpdatesNotifcationsEnabled, ratingReviewsNotifcationsEnabled,
        //     notificationSoundsEnabled, emailNotifcationsEnabled, phoneNotifcationsEnabled});
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
