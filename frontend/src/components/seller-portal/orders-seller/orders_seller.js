/* Created By: Pranav Mahindru*/
import "./orders_seller.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import SellerActivePage from "./seller_active_page";
import SellerInActivePage from "./seller_inactive_page";
import SellerCancelledPage from "./seller_cancelled_page";
import SellerCompletePage from "./seller_complete_page";
import SellerDeliveredPage from "./seller_delivered_page";
import SellerDraftPage from "./seller_draft_page";
import SellerStatusPage from "./seller_status_page";

function OrderSeller() {
    const [savePageName , setPageName] = useState('#Active');
    const [currentLocation, setCurrentLocation] = useState('#Active');
    const handleLocation = (e) => {
        setCurrentLocation(e);
        setPageName(e);
    }
    return (
        <div className='order-seller-page-main-container'>
            <div className='order-seller-page-section1'>
                <h1>Ad listing</h1>
                <br/>
                 <nav className="order-seller-page-navbar">
                    <ul className='order-seller-page-nav-list'>
                        <li className={currentLocation === "#Active" ? "order_seller_page_active_page_navigation" : ""}>
                            <NavLink to="#Active" onClick={() => handleLocation("#Active")}> Active </NavLink>
                        </li>
                        <li className={currentLocation === "#InActive" ? "order_seller_page_active_page_navigation" : ""}>
                            <NavLink to="#InActive" onClick={() => handleLocation("#InActive")}> InActive </NavLink>
                        </li>
                        <li className={currentLocation === "#Delivered" ? "order_seller_page_active_page_navigation" : ""}>
                            <NavLink to="#Delivered" onClick={() => handleLocation("#Delivered")}> Delivered </NavLink>
                        </li>
                        <li className={currentLocation === "#Canceled" ? "order_seller_page_active_page_navigation" : ""}>
                            <NavLink to="#Canceled" onClick={() => handleLocation("#Canceled")}> Canceled </NavLink>
                        </li>
                        <li className={currentLocation === "#Completed" ? "order_seller_page_active_page_navigation" : ""}>
                            <NavLink to="#Completed" onClick={() => handleLocation("#Completed")}> Completed </NavLink>
                        </li>
                        <li className={currentLocation === "#Status" ? "order_seller_page_active_page_navigation" : ""}>
                            <NavLink to="#Status" onClick={() => handleLocation("#Status")}> Status </NavLink>
                        </li>
                        <li className={currentLocation === "#draftAds" ? "order_seller_page_active_page_navigation" : ""}>
                            <NavLink to="#draftAds" onClick={() => handleLocation("#draftAds")}> Draft Ads </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            {savePageName === "#Active" ? (
                <div className='order-seller-page-section2'>
                    <SellerActivePage/>
                </div>
            ) : savePageName === "#InActive" ?  (
                <div className='order-seller-page-section2'>
                    <SellerInActivePage/>
                </div>
            ) : savePageName === "#Delivered" ?  (
                <div className='order-seller-page-section2'>
                    <SellerDeliveredPage/>
                </div>
            ) : savePageName === "#Canceled" ?  (
                <div className='order-seller-page-section2'>
                    <SellerCancelledPage/>
                </div>
            ) : savePageName === "#Completed" ?  (
                <div className='order-seller-page-section2'>
                    <SellerCompletePage/>
                </div>
            ) : savePageName === "#Status" ?  (
                <div className='order-seller-page-section2'>
                    <SellerStatusPage/>
                </div>
            ) :  savePageName === "#draftAds" ?  (
                <div className='order-seller-page-section2'>
                    <SellerDraftPage/>
                </div>
            ) : (
                <div className='order-seller-page-section2'>
                    <h1>ERROR</h1>
                </div>
            )}
        </div>
    );
}; 

export default OrderSeller;
