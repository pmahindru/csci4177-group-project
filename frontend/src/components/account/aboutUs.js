/* Created By: Joel Kuruvilla | 2023-June-18 */
import React from 'react';
import './aboutUs.css';

function AboutUs() {
    return (
        <div className='aboutUs'>
            <h1 className='aboutUs-titles'> About ShopAesthetics </h1>
            <p className='aboutUs_contentMain'>
                ShopAesthetics is Group24's proposed online marketplace where authenticity and security of a monitored
                 marketplace meets a community of people who want to enhance their aesthetic lifestyle. In today's age of
                  the internet, many online marketplaces exist but all lack the comfort for people to safely grow their
                   aesthetic lifestyle. <br/> (Excerpt from Project Proposl Introduction - D1_xProj-Group-24)
            </p>
            <h2 className='aboutUs-titles'> Meet the ShopAesthetics Team </h2>
            <ul className='aboutUs-content-team'>
                <li> Pranav Mahindru - Full Stack Developer </li>
                <li> Joel Kuruvilla - Full Stack Developer </li>
                <li> Saiz Charolia - Full Stack Developer </li>
                <li> Patrick Wooden - Full Stack Developer </li>
                <li> Parth Patel - Full Stack Developer </li>
                <br></br>
                <h3> Project Overseen by (Course Admin.): </h3>
                <li> Gabriella Mosquera - Professor </li>
                <li> Mugdha Agharkar - Project TA </li>
            </ul>
            <p className='aboutUs-content-disclaimers'>
                Websute created as a part of a course project for CSCI 4177 Advanced Web Services at Dalhousie University.
                <br/>
                Postal: 6056 University Ave, Halifax, NS B3H 1W5
            </p>
        </div>
    );
}

export default AboutUs;