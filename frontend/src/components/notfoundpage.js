/* Created By: Pranav Mahindru*/
import React from 'react';

function NotFound() {
    return (
        <div className='customerSupport-main-container'>
            <div className='customerSupport-section1'>
                <h2>404 Error</h2>
            </div>
             <div className='customerSupport-section1'>
               <a href="/customer_support#ContactUs">
                Click here to Redirect the Contact Us Page
               </a>
            </div>
             <div className='customerSupport-section1'>
               <a href="/login">
                Click here to Redirect the login Page
               </a>
            </div>
        </div>
    );
};

export default NotFound;
