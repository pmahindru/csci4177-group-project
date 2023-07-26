/* Created By: Pranav Mahindru*/
import React from 'react';
import './customer_support.css'
import { useState } from "react";
import CustomerPhone from '../icons/phone';
import CustomerEmail from '../icons/email';

function CustomerSupport() {
    const [openDropDown, setShowDropDown] = useState(false);
    const [openDropDown1, setShowDropDown1] = useState(false);
    const [openDropDown2, setShowDropDown2] = useState(false);
    const [openDropDown3, setShowDropDown3] = useState(false);
    const [openDropDown4, setShowDropDown4] = useState(false);

    // dropdown toggle
    const handleDropDownToggle = (index) => {
        if(index === 1){
            setShowDropDown1((prevState) => !prevState);
        }
        else if(index === 2){
            setShowDropDown2((prevState) => !prevState);
        }
        else if(index === 3){
            setShowDropDown3((prevState) => !prevState);
        }
        else if(index === 4){
            setShowDropDown4((prevState) => !prevState);
        }
        else{
            setShowDropDown((prevState) => !prevState);
        }
    };

    return (
        <div className='customerSupport-main-container'>
            <div className='customerSupport-section1'>
                <h2>Contact Us</h2>
            </div>
            <div className='customerSupport-section2' id="ContactUs">
              <div>
                <span>
                    <h4>If have any question please call us or Email us from 9:00am - 9:00pm</h4>
                </span>
                <br/>
                <span>
                    <h4><CustomerPhone/> +1902-952-3128</h4>
                </span>
                <br/>
                <span>
                    <h4><CustomerEmail/> shppaesthetics@outlook.ca</h4>
                </span>
                <br/>
                <span>
                    <h4>Address: Postal: 6056 University Ave, Halifax, NS B3H 1W5</h4>
                </span>
                <br/>
              </div>
            </div>

            <br/>
            <br/>
            
            <div className='customerSupport-section1'>
                <h2>Ask Frequent Questions</h2>
            </div>
            <div className='customerSupport-section2'>
               <div className="customerSupport-main-dropdown">
                 <section onClick={() => handleDropDownToggle(0)} className={`customerSupport-dropdown ${openDropDown ? "open" : ""}`}>
                    <div className='active-order'>
                        <span> Q. How do I create an account on the Marketplace? </span>
                        <span> + </span>
                    </div>
                    <div className={`customerSupport-dropdown-menu ${openDropDown ? "show" : ""}`}>
                        <hr/>
                        <span>Click on teh Sign Up / Sign In button in the navigation and click on the sign up. Fill the information appropriately.</span>
                    </div>
                </section>
               </div>
                <div className="customerSupport-main-dropdown">
                 <section onClick={() => handleDropDownToggle(1)} className={`customerSupport-dropdown ${openDropDown1 ? "open" : ""}`}>
                    <div className='active-order'>
                        <span> Q. How can I see the Order History Page? </span>
                        <span> + </span>
                    </div>
                    <div className={`customerSupport-dropdown-menu ${openDropDown ? "show" : ""}`}>
                        <hr/>
                        <span>Click on the Order in the navigation.</span>
                    </div>
                </section>
               </div>
                <div className="customerSupport-main-dropdown">
                 <section onClick={() => handleDropDownToggle(2)} className={`customerSupport-dropdown ${openDropDown2 ? "open" : ""}`}>
                    <div className='active-order'>
                        <span> Q. How can Sign up for Seller Portal? </span>
                        <span> + </span>
                    </div>
                    <div className={`customerSupport-dropdown-menu ${openDropDown ? "show" : ""}`}>
                        <hr/>
                        <span>Go to the Account and it will prompt for the some documents related to government policy Once you are fill the information and reviewed/approved by the admin. You will receive an email and also get an access to the Seller portal  </span>
                    </div>
                </section>
               </div>
               <div className="customerSupport-main-dropdown">
                 <section onClick={() => handleDropDownToggle(3)} className={`customerSupport-dropdown ${openDropDown3 ? "open" : ""}`}>
                    <div className='active-order'>
                        <span> Q. How can make my payments and track my payments? </span>
                        <span> + </span>
                    </div>
                    <div className={`customerSupport-dropdown-menu ${openDropDown ? "show" : ""}`}>
                        <hr/>
                        <span>we are working on this section. We will let you know, If have any other question Please <a href="#ContactUs">Contact Us</a>. Thank you for your patience</span>
                    </div>
                </section>
               </div>
                <div className="customerSupport-main-dropdown">
                 <section onClick={() => handleDropDownToggle(4)} className={`customerSupport-dropdown ${openDropDown4 ? "open" : ""}`}>
                    <div className='active-order'>
                        <span> Q. How can I Advance filter in the Search option? </span>
                        <span> + </span>
                    </div>
                    <div className={`customerSupport-dropdown-menu ${openDropDown ? "show" : ""}`}>
                        <hr/>
                        <span>we are working on this section. We will let you know once it is completed or implemented. Thank you for your patience</span>
                    </div>
                </section>
               </div>
            </div>
            <br/>
        </div>
    );
};

export default CustomerSupport;