import React from 'react';
import './preview.css'
import { useLocation, NavLink, useNavigate } from 'react-router-dom';

function Preview() {
    const getLocationState = useLocation().state;
    const navigate = useNavigate();

    if (getLocationState === null || getLocationState === undefined) {
        return(
           <div className='previewAd-main-container'>
                {/* heading */}
                <div className='previewAd-section1'>
                    <h2>Something Went Wrong <br/> Please Try Again </h2>
                </div>
                <a href='/dashboard'>Go To Main Page</a>
            </div>
        );
    }

    const getPostDetails = getLocationState.data;

    var getUserFullName = 'ken';
    var getUserFullAddress = 'halifax';
    var getUserEmail = 'ken@gmail.com';
    var getUserPhoneNumber = '9872536362';

    const handleSaveAd = (e) =>{
        alert("Save Successfully");
        navigate('/dashboard');
    };

    const handlePreview = (e) =>{
        alert("Published Successfully");
        navigate('/dashboard');
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