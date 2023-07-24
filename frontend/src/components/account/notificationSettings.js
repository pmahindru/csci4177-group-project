/* Created By: Pranav Mahindru*/
import React, {useState} from 'react';
import './notificationSettings.css';
import Switch from 'react-switch';

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
    }
    function handleToggleInboxSwitch(status) {
        setInboxNotifcationsEnabled(status);
    }
    function handleToggleOrderMessagesSwitch(status) {
        setOrderMessagsNotifcationsEnabled(status);
    }
    function handleOrderUpdatesToggleSwitch(status) {
        setOrderUpdatesNotifcationsEnabled(status);
    }
    function handleRatingReviewsToggleSwitch(status) {
        setRatingReviewsNotifcationsEnabled(status);
    }
    function handleNotificationSoundsToggleSwitch(status) {
        setNotificationSoundsEnabled(status);
    }
    function handleEmailNotificationToggleSwitch(status) {
        setEmailNotifcationsEnabled(status);
    }
    function handlPhoneNotificationToggleSwitch(status) {
        setPhoneNotifcationsEnabled(status);
    }

    return (
        <div className='notificationSettings'>
            <h2> Notification Settings </h2>
            <form className='notificationSettings-form'>
                <li> All Notifications: <Switch className="notificationSettings-toggle" id="notification-toggle-all" onChange={handleToggleAllSwitch} checked={allNotifcationsEnabled} /> </li>
                <hr/>
                <li> Inbox Messages: <Switch className="notificationSettings-toggle" onChange={handleToggleInboxSwitch} checked={inboxNotifcationsEnabled} />  </li>
                <hr/>
                <li> Order Mesages: <Switch className="notificationSettings-toggle" onChange={handleToggleOrderMessagesSwitch} checked={orderMessagsNotifcationsEnabled} /> </li>
                <hr/>
                <li> Order Updates <Switch className="notificationSettings-toggle" onChange={handleOrderUpdatesToggleSwitch} checked={orderUpdatesNotifcationsEnabled} /> </li>
                <hr/>
                <li> Rating/Review Notifications: <Switch className="notificationSettings-toggle" onChange={handleRatingReviewsToggleSwitch} checked={ratingReviewsNotifcationsEnabled} /> </li>
                <hr/>
                <li> Notification Sounds: <Switch className="notificationSettings-toggle" onChange={handleNotificationSoundsToggleSwitch} checked={notificationSoundsEnabled} /> </li>
                <hr/>
                <li> Email Notification: <Switch className="notificationSettings-toggle" onChange={handleEmailNotificationToggleSwitch} checked={emailNotifcationsEnabled} /> </li>
                <hr/>
                <li> Phone Notification: <Switch className="notificationSettings-toggle" onChange={handlPhoneNotificationToggleSwitch} checked={phoneNotifcationsEnabled} /> </li>
             </form>
        </div>
    );
};

export default NotificationSettings;
