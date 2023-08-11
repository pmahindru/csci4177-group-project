/* Created By: Pranav Mahindru*/
import React, { useState, useEffect } from "react";
import './dashboard-buyer.css'
import { addToUserInteraction, getPostForDashboard } from "../../../api";
import ReactLoading from "react-loading";
import { NavLink, useNavigate } from "react-router-dom";

function DashBoardBuyer() {
    const [loading, setLoading] = useState(true);
    const [getArrayVehicle, setArrayVehicle] = useState([]);
    const [getArrayItems, setArrayItems] = useState([]);
    const [getArrayAccommodation, setArrayAccommodation] = useState([]);
    const getLocalStorage = localStorage.getItem("user_info");
    const user_data = JSON.parse(getLocalStorage);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const res = await getPostForDashboard({});
            if (!res.address) {
                const vehicle = []
                const items = []
                const accommodations = []
                
                for (let i = 0; i < res.length; i++) {
                    if (res[i].type === "vehicle") {
                        vehicle.push(res[i])
                    }
                    else if (res[i].type === "items") {
                        items.push(res[i])
                    }
                    else{
                        accommodations.push(res[i])
                    }
                }
                setArrayVehicle(vehicle)
                setArrayItems(items)
                setArrayAccommodation(accommodations)
                setLoading(false);
            }
        }
        getData();
    }, [])

    const handleClick = async (itemID) => {
        await addToUserInteraction({"user_id": user_data["_id"], "ad_id": itemID, "click": 1})
        navigate(`/${itemID}`);
    }

    return (
        <div className='dashboardBuyer-main-container'>
            <div className='dashboardBuyer-section1'>
                <h2>Prime Ads</h2>
            </div>

            {loading ? (
                <div className='preview-loading'>
                    <ReactLoading type="bars" color="#3f1a6b" height={100} width={50}/>
                </div>
            ) : (
                <>
                    {getArrayVehicle.length > 0 && (
                        <div className='dashboardBuyer-section2'>
                            <h2>Vehicle</h2>
                            <div className='dashboardBuyer-card-list'>
                                {getArrayVehicle.map((item, index) => {
                                    return (
                                        <NavLink onClick={() => handleClick(item._id)} key={item._id}>
                                            <div className="dashboardBuyer-card-view">        
                                                <div className="dashboardBuyer-card-view-text">
                                                    <img src={item.image[0]} width="100" height="100" alt={`Vehicle${item._id}`}/>
                                                    <h3 className="card-title">{item.title}</h3>
                                                </div>
                                            </div>
                                        </NavLink>
                                    );
                                })}
                            </div> 
                        </div>
                    )}
                    
                    {getArrayItems.length > 0 && (
                        <div className='dashboardBuyer-section2'>
                            <h2>Items</h2>
                            <div className='dashboardBuyer-card-list'>
                                {getArrayItems.map((item, index) => {
                                    return (
                                        <NavLink onClick={() => handleClick(item._id)} key={item._id}>
                                            <div className="dashboardBuyer-card-view">        
                                                <div className="dashboardBuyer-card-view-text">
                                                    <img src={item.image[0]} width="100" height="100" alt={`Items${item._id}`}/>
                                                    <h3 className="card-title">{item.title}</h3>
                                                </div>
                                            </div>
                                        </NavLink>
                                    );
                                })}
                            </div> 
                        </div>
                    )}

                    {getArrayAccommodation.length > 0 && (
                        <div className='dashboardBuyer-section2'>
                            <h2>Accommodations</h2>
                                <div className='dashboardBuyer-card-list'>
                                    {getArrayAccommodation.map((item, index) => {
                                        return (
                                            <NavLink onClick={() => handleClick(item._id)} key={item._id}>
                                                <div className="dashboardBuyer-card-view">        
                                                    <div className="dashboardBuyer-card-view-text">
                                                        <img src={item.image[0]} width="100" height="100" alt={`Items${item._id}`}/>
                                                        <h3 className="card-title">{item.title}</h3>
                                                    </div>
                                                </div>
                                            </NavLink>
                                        );
                                    })}
                                </div> 
                        </div>
                    )}
                    
                    {getArrayVehicle.length === 0 && getArrayItems.length === 0 && getArrayAccommodation.length === 0 && (
                        <div className='order-page-section4'>
                            No Ads to show
                        </div>
                    )}
                </>
            )}

        </div>
    );
};

export default DashBoardBuyer;