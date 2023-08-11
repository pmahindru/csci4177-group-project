/* Created By: Pranav Mahindru*/
import React, { useState, useEffect } from "react";
import './dashboard_seller.css'
import Facebook from '../../icons/facebook';
import Instagram from '../../icons/insta';
import Twitter from '../../icons/twitter';
import Github from '../../icons/github';
import StackOverflow from '../../icons/stackoverflow';
import Vimeo from '../../icons/vimeo';
import { getAllPostedAd } from "../../../api";

function DashBoardSeller() {
    const [getArrayObjects, setArrayObjects] = useState(0);
    const getLocalStorage = localStorage.getItem("user_info");
    const user_data = JSON.parse(getLocalStorage);

    useEffect(() => {
        const getData = async () => {
            const res = await getAllPostedAd({"user_id": user_data["_id"], "isActive": true});
            if (!res.address) {
                setArrayObjects(Object.keys(res).length);
            }
        }
        getData();
    }, [user_data])
    return (
        <div className='dashboardSeller-main-container'>
            <div className='dashboardSeller-section1'>
                <h2>Welcome</h2>
            </div>
            <div className='dashboardSeller-section2'>
                <div className='active-order'>
                    <h3>Active Orders</h3>
                    <h3>{getArrayObjects}</h3>
                </div>
                <div className='dashboardSeller-section3'>
                    <h5>There are no new Active Orders</h5>
                </div>
            </div>
            <div className='dashboardSeller-section4'>
                <h3>Recent Messages</h3>
                <div className='dashboardSeller-section3'>
                    <h5>There are no new Messages</h5>
                </div>
            </div>
            <div className='dashboardSeller-section5'>
                <h3>Link to Social Media</h3>
                <div className='dashboardSeller-section3 social-media-links-dashboard'>
                    <i className='dashboardSeller-footer'><Facebook/></i>
                    <i className='dashboardSeller-footer'><Instagram/></i>
                    <i className='dashboardSeller-footer'><Twitter/></i>
                    <i className='dashboardSeller-footer'><Github/></i>
                    <i className='dashboardSeller-footer'><StackOverflow/></i>
                    <i className='dashboardSeller-footer'><Vimeo/></i>
                </div>
            </div>
            <div className='dashboardSeller-section6'>
                <h3>Earnings</h3>
                <div className='dashboardSeller-section3'>
                    <h5>There are no Earnings</h5>
                </div>
            </div>
        </div>
    );
};

export default DashBoardSeller;
