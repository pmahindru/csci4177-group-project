<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use ---> 
<!--- You may delete any comments in this sample README.md file. If needing to use as a .txt file then simply delete all comments, edit as needed, and save as a README.txt file --->

# Assignment 3 | xProj-Group-24 - ShopAesthetics

For Assignment 3 I worked on the 'Account Management' feature as outlined in my team's previous deliverables primarily as outlined in our Project Proposal and implemented as I have planned out and discussed in my Assignment 2 submission.
The structure of our project models that of a MVC; Model View Controller architecture, due to which much of the backend code is written integrated with respective files created by team members for this purpose.
- Files Woked on for A3:
    - frontend\src\components\account\ **notificationSettings** - both JS and CSS files.
    - frontend\src\components\account\ **profileSettings** - both JS and CSS files.
    - frontend\src\components\account\ **aboutUs.js** - both JS and CSS files. Page completed by time of Project Proposal.
    - backend\controller\controller.js - code related to passing data to DB.
    - backend\model\model.js - code related to passing data to DB.


* *Date Created*: 18 JUL 2023
* *Last Modification Date*: 25 JUL 2023
* *Deployment URL*: https://csci-4177-grp-project-xproj-group-24.netlify.app/
* *Git URL*: https://git.cs.dal.ca/mahindru/csci-4177-5709-xproj-group-24

## Authors

### A3
* [Joel Kuruvilla](jl567056@dal.ca) -  *Full Stack Developer*

### Course Project - ShopeAseeethics
* [Pranav Mahindru](pranav.mahindru@dal.ca) - *Full Stack Developer*
* [Patrick Wooden](pt308649@dal.ca) -  *Full Stack Developer*
* [Joel Kuruvilla](jl567056@dal.ca) -  *Full Stack Developer*
* [Saiz Charolia](sz500426@dal.ca) -  *Full Stack Developer*
* [Parth Patel](pr715312@dal.ca) -  *Full Stack Developer*


## Deployment
Deployed using Netlify - link available in line #10 of README; aka the Deployment Link URL!

## Built With

* [React](https://react.dev/) - The web framework used
* [npm](https://www.npmjs.com/) - Dependency Management
* [MongoDB](https://www.mongodb.com/) - The database used/connected with

## Sources Used

In completing Assignment 3 related to implementing the backend of a feature of my teams course project, I have used interpretations of other peoples code to implement the tasks I had.

### notificationSettings.js

*Lines 2-62*

```
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

```

The code above was created by adapting the code in [npmjs - react-switch](https://www.npmjs.com/package/react-switch) as shown below: 

```
import React, { Component } from "react";
import Switch from "react-switch";

class SwitchExample extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <label>
        <span>Switch with default style</span>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
      </label>
    );
  }
}

```

- <!---How---> The code in [npmjs - react-switch](https://www.npmjs.com/package/react-switch) was implemented by copying specifically the code <Switch> tag code to add the toggle swith for this particular page. I also followed conceptually in adding the onchange and checking status; as they were required anyways, to implement its frontend implementation.
- <!---Why---> [npmjs - react-switch](https://www.npmjs.com/package/react-switch)'s Code was used because it provided a quick, effective and efficient manner in which our team can implement toggle switches into our project.
- <!---How---> [npmjs - react-switch](https://www.npmjs.com/package/react-switch)'s Code was modified by converting the code to use useStates in being able to pass and save the changes on a React project properly. 



### profileSettings.js

*Lines 4 - 27, 56-58, 64, & 70*

```
import Switch from 'react-switch';

function ProfileSettings() {
    const [email2FAEnabled, setEmail2FAEnabled] = useState();
    const [phone2FAEnabled, setPhone2FAEnabled] = useState();
    const [authenticationApp2FAEnabled, setAuthenticationApp2FAEnabled] = useState();
    const [currentLocationEnabled, setCurrentLocationEnabled] = useState();
    const [disableAccount, setDisableAccountEnabled] = useState();

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

    ....

    <li> Email: <Switch className="profileSettings-toggle" onChange={handleEmailToggleSwitch} checked={email2FAEnabled} /></li>
                    <li> Phone: <Switch className="profileSettings-toggle" onChange={handlePhoneToggleSwitch} checked={phone2FAEnabled} /> </li>
                    <li> Authentication App: <Switch className="profileSettings-toggle" onChange={handleAuthenticationAppToggleSwitch} checked={authenticationApp2FAEnabled} /> </li>

    ....

    <li> Location: <Switch className="profileSettings-toggle" onChange={handleCurrentLocationToggleSwitch} checked={authenticationApp2FAEnabled} /> </li>

    ....

    <li> Disable Account <Switch className="profileSettings-toggle" onChange={handleDisableAccountToggleSwitch} checked={authenticationApp2FAEnabled} /> </li>

```

The code above was created by adapting the code in [npmjs - react-switch](https://www.npmjs.com/package/react-switch) as shown below: 

```
import React, { Component } from "react";
import Switch from "react-switch";

class SwitchExample extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <label>
        <span>Switch with default style</span>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
      </label>
    );
  }
}

```

- <!---How---> The code in [npmjs - react-switch](https://www.npmjs.com/package/react-switch) was implemented by copying specifically the code <Switch> tag along with 'onchange' and 'checking' status. As was done for the notification settings page initially.
- <!---Why---> [npmjs - react-switch](https://www.npmjs.com/package/react-switch)'s Code was used because it provided a quick, effective and efficient manner in which our team can implement toggle switches into our project.
- <!---How---> [npmjs - react-switch](https://www.npmjs.com/package/react-switch)'s Code was modified by converting the code to use useStates in being able to pass and save the changes on a React project properly.


## Acknowledgments

* This Assignment was completed individually but contributes to a collective team project by Team 24!
