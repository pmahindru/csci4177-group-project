/* Created By: Pranav Mahindru*/
import "./orders_seller.css";
import React, { useEffect } from "react";
import { getAllPostedAd } from "../../../api";

function SellerCompletePage() {
    const getLocalStorage = localStorage.getItem("user_info");
    const user_data =  JSON.parse(getLocalStorage)
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getAllPostedAd({"user_id": user_data["_id"]});
                console.log(res)
            } catch (e) {
                console.error('Error', e)
            }
        }
        getData();
    }, [user_data])

    return (
        <div className='order-seller-page-main-container'>
            <div className='order-seller-page-section2'>
                <h2>Active Ads</h2>
            </div>
             <div className='order-seller-page-section3'>
                <h2>Active Ads</h2>
            </div>
        </div>
    );
}; 

export default SellerCompletePage;