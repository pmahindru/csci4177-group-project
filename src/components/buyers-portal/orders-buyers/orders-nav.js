import React, { useState, useEffect } from 'react';
import { useLocation, NavLink, useNavigate } from "react-router-dom";

import './orders-nav.css';
import OrderHistoryPage from './orderhistory/order-history';
import TrackOrders from './trackorders/track-orders';
import Favourites from './favourites/favourites';
import RatingAndReviews from './review/ratings-reviews';
import AccountPayments from './payments/payments';
import Cart from './cart/cart';
function OrdersNav() {
  const [clicked, setClicked] = useState(true);
  const [openDropDown, setShowDropDown] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const getLocation = useLocation();
  const [active, setActive] = useState('order-history');
  // active navigation
  const handleOnClickNavBar = (e) => {
    if (openDropDown === true) {
      setClicked((prevState) => !prevState);
      setShowDropDown(false);
    }

    setClicked((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const handleOnClickNavBarReload = (e) => {
    navigate(e);
    window.location.reload();
  };


  // make sure the active page should be current
  useEffect(() => {
    setCurrentLocation(window.location.pathname);
    if (getLocation.pathname === currentLocation) {
      setClicked((prevState) => !prevState);
    }
  }, [openDropDown, getLocation, currentLocation]);

  return (
    <><nav className="orders-nav">
      {/* navigation link */}
      <div classname="subnav-container">
        <ul className={`order-navbar-links ${clicked ? "active_navigation" : ""}`} onClick={handleOnClickNavBar}>
          <li className={currentLocation === "/order-history" ? "active_page_navigation" : ""} onClick={() => setActive('order-history')}>
            <NavLink to=""> Order History </NavLink>
          </li>

          <li className={currentLocation === "/track-orders" ? "active_page_navigation" : ""} onClick={() => setActive('track-orders')}>
            <NavLink to=""> Track Orders </NavLink>
          </li>
          <li className={currentLocation === "/" ? "active_page_navigation" : ""} onClick={() => setActive('favourites')}>
            <NavLink to=""> Favourites </NavLink>
          </li>
          <li className={currentLocation === "/" ? "active_page_navigation" : ""} onClick={() => setActive('payments')}>
            <NavLink to=""> Payments </NavLink>
          </li>
          <li className={currentLocation === "/rating-review" ? "active_page_navigation" : ""} onClick={() => setActive('rating-review')}>
            <NavLink to=""> Rating/Review </NavLink>
          </li>
          <li className={currentLocation === "/" ? "active_page_navigation" : ""} onClick={() => setActive('cart')}>
            <NavLink to=""> Cart </NavLink>
          </li>

        </ul>
      </div>
    </nav>
    <div>
    {active === 'order-history' && <OrderHistoryPage/>}
    {active === 'track-orders' && <TrackOrders/>}
    {active === 'favourites' && <Favourites/>}
    {active === 'payments' && <AccountPayments/>}
    {active === 'rating-review' && <RatingAndReviews/>}
    {active === 'cart' && <Cart/>}
    </div>
    </>
  );
}

export default OrdersNav;