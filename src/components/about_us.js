/* Created By: Joel Kuruvilla | 2023-June-18 */
import React from 'react';
import './about_us.css';

function AboutUs() {
    return (
        <div className='AboutUs'>
            <h1 className='AboutUs_Titles'> About ShopAesthetics </h1>
            <p className='AboutUs_ContentMain'>
                ShopAesthetics is Group24's proposed online marketplace where authenticity and security of a monitored
                 marketplace meets a community of people who want to enhance their aesthetic lifestyle. In today's age of
                  the internet, many online marketplaces exist but all lack the comfort for people to safely grow their
                   aesthetic lifestyle. <br/> (Excerpt from Project Proposl Introduction - D1_xProj-Group-24)
            </p>
            <h2 className='AboutUs_Titles'> Meet the ShopAesthetics Team </h2>
            <ul className='AboutUs_ContentTeam'>
                <li> Pranav Mahindru - Full Stack Developer </li>
                <li> Joel Kuruvilla - TBD. </li>
                <li> Saiz Charolia - TBD. </li>
                <li> Patrick Wooden - TBD. </li>
                <li> Parth Patel - TBD. </li>
                <br></br>
                <h3> Project Overseen by (Course Admin.): </h3>
                <li> Gabriella Mosquera - Professor </li>
                <li> Mugdha Agharkar - Project TA </li>
            </ul>
            <p className='AboutUs_ContentDisclaimers'>
                Websute created as a part of a course project for CSCI 4177 Advanced Web Services at Dalhousie University.
                <br/>
                Postal: 6056 University Ave, Halifax, NS B3H 1W5
            </p>
        </div>
    );
}

export default AboutUs;
