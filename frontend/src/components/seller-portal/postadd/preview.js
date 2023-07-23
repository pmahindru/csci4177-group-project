/* Created By: Pranav Mahindru*/
import React, { useState } from 'react';
import './preview.css'
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { addNewPostAd, savePostAd } from '../../../api';
import ReactLoading from "react-loading";

function Preview() {
    const getLocationState = useLocation().state;
    const navigate = useNavigate();
    const [checkPublish, setPublish] = useState(false);

    if (getLocationState === null || getLocationState === undefined) {
        if (checkPublish === true) {
            return(
                <div className='preview-loading'>
                    <h2>
                        Take couple of minutes
                        <br/>
                        <br/>
                        <ReactLoading type="bars" color="#3f1a6b" height={200} width={100}/>
                    </h2>
                </div>
            );
        }
        return(
            <div className='customerSupport-main-container'>
                <div className='customerSupport-section1'>
                    <h2>
                        Something Went Wrong
                        <br/> 
                        Please Try Again
                    </h2>
                </div>
                <div className='customerSupport-section1'>
                    <a href="/dashboard">
                        Go To Main Page
                    </a>
                </div>
            </div>
        );
    }

    const getPostDetails = getLocationState.data;
    
    // get the local storage item
    const getLocalStorage = localStorage.getItem("user_info");
    
    const userInfo = JSON.parse(getLocalStorage);
    if (Object.keys(getLocalStorage)) {
        var getUserFullName = userInfo["firstName"] + " " + userInfo["lastName"];
        var getUserEmail = userInfo["email"];

        var getUserFullAddress;
        if (userInfo["address"]) {
            getUserFullAddress = userInfo["address"];
        }
        else{
            getUserFullAddress = "-";
        }

        var getUserPhoneNumber;
        if (userInfo["phone"]) {
            getUserPhoneNumber = userInfo["phone"];
        }
        else{
            getUserPhoneNumber = "-";
        }
    }

    const addToDb = async (table_name) => {
        const data = {
            "user_id": userInfo["_id"],
            "image" : getPostDetails[0]['sendImageFiles'],
            "title" : getPostDetails[1]['sendTitle'],
            "price" : getPostDetails[2]['sendPrice'],
            "description" : getPostDetails[3]['sendDescription'],
            "prod_tags" : getPostDetails[4]['sendProduct_tag'] ?? "No Tags",
            "location" : getPostDetails[5]['sendLocation'],
            "condition" : getPostDetails[6]['sendCondition'],
            "payments_type" : getPostDetails[7]['sendPayments'],
            "type" : getPostDetails[8]['category'],
            "category" : getPostDetails[9]['type'],
            "status" : table_name === "save_ad" ? "draft" : "approved"
        };

        setPublish((prevState) => !prevState);

        var res = table_name === "save_ad" ? await savePostAd(data) : await addNewPostAd(data);

        if (res.response === undefined) {
            alert(res.message);
            navigate('/dashboard');
        } 
        else {
            alert(res.message);
            navigate('/dashboard');
        }
    }

    const handleSaveAd = (e) =>{
        e.preventDefault();
        addToDb("save_ad");
    };

    const handlePreview = (e) =>{
        e.preventDefault();
        addToDb("post_ad");
    };

    return (
        <div className='previewAd-main-container'>
            
            {/* heading */}
            <div className='previewAd-section1'>
                <h2>Preview Ad</h2>
            </div>

            {/* show images */}
            <div className='previewAd-section2'>
                <div className='previewAd-section3'>
                    {
                        getPostDetails[0]['sendImageFiles'].map((images,index)=>(
                            <div key={index} className='showImage'>
                                <img src={getPostDetails[0]['sendImageFiles'][index]} width={150} alt='postAdImage'/>
                            </div>
                        ))
                    }
                </div>

                {/* line */}
                <hr className='hr-postAd'/>

                {/* show all other content specific to the add */}
                <div className='previewAd-section4'>
                    <div>
                        <h2>
                            Title: {getPostDetails[1]['sendTitle']}
                            <span className='condition-preview'>{getPostDetails[6]['sendCondition']}</span>
                        </h2>
                    </div>
                    <div>
                        <h3> Price: {getPostDetails[2]['sendPrice']}</h3>
                    </div>
                    <div>
                        <span> <b>Description:</b> {getPostDetails[3]['sendDescription']}</span>
                    </div>
                    <div>
                        <span>{getPostDetails[4]['sendProduct_tag'] ? getPostDetails[4]['sendProduct_tag'] : 'No Tags'}</span>
                    </div>
                    <div>
                        <span> <b>Location:</b> {getPostDetails[5]['sendLocation']}</span>
                    </div>
                </div>
            </div>

            {/* show seller information */}
            <div className='previewAd-section5'>
                <div>
                    <h3>Seller Information</h3>
                </div>
                <br></br>
                <div className='previewAd-section6'>
                    <span>
                        Seller Name: <b>{getUserFullName}</b>
                    </span>
                    <span>
                        Seller Address: <b>{getUserFullAddress}</b>
                    </span>
                    <span>
                        Seller Email Address: <b>{getUserEmail}</b>
                    </span>
                    <span>
                        Seller Phone Number: <b>{getUserPhoneNumber}</b>
                    </span>
                    <span>
                        Types Of Payments: <b>{getPostDetails[7]['sendPayments']}</b>
                    </span>
                </div>
            </div>

            {/* button to save or publish  */}
            <div className='preview-button'>
                <button type='button' onClick={handleSaveAd}><NavLink> Save Ad </NavLink></button>
                <button type='button' onClick={handlePreview}><NavLink> Publish Ad </NavLink></button>
            </div>
        </div>
    );
};

export default Preview;