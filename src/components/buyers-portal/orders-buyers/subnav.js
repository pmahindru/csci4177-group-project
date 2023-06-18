import React, { useState, useEffect } from 'react';
import { useLocation, NavLink, useNavigate } from "react-router-dom";

import '../orders-buyers/subnav.css';

function SubNavBar() {
  const [clicked, setClicked] = useState(true);
  const [openDropDown, setShowDropDown] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const getLocation = useLocation();

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
    <nav className="custom-subnav">
      {/* navigation link */}
      <div>
        <ul className={`custom-navbar-links ${clicked ? "active_navigation" : ""}`} onClick={handleOnClickNavBar}>
          <li className={currentLocation === "/" ? "active_page_navigation" : ""} onClick={handleOnClickNavBar}>
            <NavLink to="/orderhistory"> Order History </NavLink>
          </li>
          <li className={currentLocation === "/" ? "active_page_navigation" : ""} onClick={handleOnClickNavBar}>
            <NavLink to="/trackorders"> Track Orders </NavLink>
          </li>
          <li className={currentLocation === "/" ? "active_page_navigation" : ""} onClick={handleOnClickNavBar}>
            <NavLink to="/favourites"> Favourites </NavLink>
          </li>
          <li className={currentLocation === "/" ? "active_page_navigation" : ""} onClick={handleOnClickNavBar}>
            <NavLink to="/"> Payments </NavLink>
          </li>
          <li className={currentLocation === "/" ? "active_page_navigation" : ""} onClick={handleOnClickNavBar}>
            <NavLink to="/"> Rating/Review </NavLink>
          </li>
          <li className={currentLocation === "/" ? "active_page_navigation" : ""} onClick={handleOnClickNavBar}>
            <NavLink to="/"> Cart </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default SubNavBar;