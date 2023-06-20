/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useState, useEffect } from 'react';
import './orders-navbar.css';
import { useLocation, NavLink } from "react-router-dom";
import OrderHistoryPage from './orderhistory/order-history';
import TrackOrders from './trackorders/track-orders';
import Favourites from './favourites/favourites';
import RatingAndReviews from './review/ratings-reviews';
import AccountPayments from './payments/payments';
import Cart from './cart/cart';

const OrdersBuyers = () => {
  const getLocation = useLocation();
  const [active, setActive] = useState('order-history');

  const handleNavLinkClick = (path) => {
    setActive(path);
    console.log(active);
  };

  // make sure the active page should be current
  useEffect(() => {
    console.log('Current Location:', getLocation.pathname);
  }, [getLocation]);

  return (
    <div>
      <nav className="order-navbar">
        <ul className="order-navbar-links">
          <li className={`order-navbar-item ${active === 'order-history' ? 'active_page_navigation' : ''}`}>
            <NavLink href="/order-history" className="simple-navbar-link" onClick={() => handleNavLinkClick('order-history')}>Order History</NavLink>
          </li>
          <li className={`order-navbar-item ${active === 'track-orders' ? 'active_page_navigation' : ''}`}>
            <NavLink href="/track-orders" className="simple-navbar-link" onClick={() => handleNavLinkClick('track-orders')}>Track Orders</NavLink>
          </li>
          <li className={`order-navbar-item ${active === 'favourites' ? 'active_page_navigation' : ''}`}>
            <NavLink href="#" className="simple-navbar-link" onClick={() => handleNavLinkClick('favourites')}>Favourites</NavLink>
          </li>
          <li className={`order-navbar-item ${active === 'payments' ? 'active_page_navigation' : ''}`}>
            <NavLink href="#" className="simple-navbar-link" onClick={() => handleNavLinkClick('payments')}>Payments</NavLink>
          </li>
          <li className={`order-navbar-item ${active === 'rating-review' ? 'active_page_navigation' : ''}`}>
            <NavLink href="#" className="simple-navbar-link" onClick={() => handleNavLinkClick('rating-review')}>Rating/Review</NavLink>
          </li>
          <li className={`order-navbar-item ${active === 'cart' ? 'active_page_navigation' : ''}`}>
            <NavLink href="#" className="simple-navbar-link" onClick={() => handleNavLinkClick('cart')}>Cart</NavLink>
          </li>
        </ul>
      </nav>
      <div className='PageContainer'>
        {active === 'order-history' && <OrderHistoryPage />}
        {active === 'track-orders' && <TrackOrders />}
        {active === 'favourites' && <Favourites />}
        {active === 'payments' && <AccountPayments />}
        {active === 'rating-review' && <RatingAndReviews />}
        {active === 'cart' && <Cart />}
      </div>
    </div>
  );
};

export default OrdersBuyers;