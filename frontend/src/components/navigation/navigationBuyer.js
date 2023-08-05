/* Created By: Pranav Mahindru*/
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./navigation.css";
import NavigationIcon from "../icons/navigationIcon";
import CloseIcon from "../icons/closeIcon";
import MessageIcon from "../icons/messageIcon";
import Notification from "../icons/notificationIcon";
import SearchIcon from "../icons/searchIcon";

function NavBarBuyer() {
  const [clicked, setClicked] = useState(false);
  const [openDropDown, setShowDropDown] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const getLocation = useLocation();

  // active navigation
  const handleOnClickNavBar = (e) => {
    if (openDropDown === true) {
      setShowDropDown((prevState) => !prevState);
    }
    setClicked((prevState) => !prevState);
  };

  const navigate = useNavigate();
  // get the local storage item
  const getLocalStorage = localStorage.getItem("isLoggedIn");
  const handleOnClickNavBarReload = (e) => {
    if(e === "/dashboard"){
      // check if the local storage is null or not
      if (getLocalStorage === false || getLocalStorage === null) {
        alert("Make sure you Login in");
        navigate("/login");
        window.location.reload();
        return;
      }
    }
    if(e === "/logout"){
      localStorage.clear();
      navigate("/");
      window.location.reload();
      return;
    }
    navigate(e);
    window.location.reload();
  };

   // dropdown toggle
  const handleDropDownToggle = () => {
    setShowDropDown((prevState) => !prevState);
  };

  // make sure the active page should be current
  useEffect(() => {
    setCurrentLocation(window.location.pathname);
    if (getLocation.hash !== window.location.hash) {
      if (getLocation.pathname === currentLocation) {
        setClicked((prevState) => !prevState);
      }
    }
  }, [openDropDown, getLocation, currentLocation]);

  return (
    <nav>
      {/* logo */}
      <div className="navbar-website-name" onClick={handleOnClickNavBar}>
        <li className="navbar-website-name-text">
          <NavLink onClick={() => handleOnClickNavBarReload("/")}>ShopAesthetics</NavLink>
        </li>
      </div>

      {/* search */}
      <div className="navbar-search">
        <div className="navbar-search-input">
          <input type="text" placeholder="Search..." />
          <i>
            <SearchIcon />
          </i>
        </div>
      </div>

      {/* navigation link */}
      <div>
        <ul className={`navbar-links + ${clicked ? "active_navigation" : ""}`}>
          <li className={currentLocation === "/" ? "active_page_navigation" : ""} onClick={handleOnClickNavBar}>
            <NavLink to="/"> Categories </NavLink>
          </li>
          <li className={currentLocation === "/orders" ? "active_page_navigation" : ""} onClick={handleOnClickNavBar}>
            <NavLink to="/orders"> Orders </NavLink>
          </li>
          <li>
            <NavLink to="/analytics/chat">
              <MessageIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to="/notifications">
              <Notification />
            </NavLink>
          </li>
          <li className={`dropdown ${openDropDown ? "open" : ""}`} onClick={handleDropDownToggle}>
            <NavLink> Account </NavLink>
            <div className={`dropdown-menu ${openDropDown ? "show" : ""}`}>
             <ul>
                <li>
                  <NavLink onClick={() => handleOnClickNavBarReload("/dashboard")}> 
                    Switch to Seller 
                  </NavLink>
                </li>
                <li className={currentLocation === "/profile_setting" ? "active_page_navigation" : ""} onClick={handleOnClickNavBar}>
                  <NavLink to="/profile_setting"> Profile Setting </NavLink>
                </li>
                <li className={currentLocation === "/notification_setting" ? "active_page_navigation" : ""} onClick={handleOnClickNavBar}>
                  <NavLink to="/notification_setting"> Notification Setting </NavLink>
                </li>
                <li className={currentLocation === "/about_us" ? "active_page_navigation" : ""} onClick={handleOnClickNavBar}>
                  <NavLink to="/about_us" > About Us </NavLink>
                </li>
                <li className={currentLocation === "/customer_support" ? "active_page_navigation" : ""} onClick={handleOnClickNavBar}>
                  <NavLink to="/customer_support"> Customer Support </NavLink>
                </li>
             </ul>
            </div>
          </li>
          {getLocalStorage ? (
            <li to="/" onClick={() => handleOnClickNavBarReload("/logout")}>
              <NavLink to="/">
                Logout
              </NavLink>
            </li>
          ) : (
            <li to="/login" className={currentLocation === "/login" ? "active_page_navigation" : ""} onClick={handleOnClickNavBar}>
              <NavLink to="/login">
                Sign In
                <br />
                Sign Up
              </NavLink>
            </li>
          )}
        </ul>
      </div>

       {/* mobile version links */}
      <div className="mobile-version" onClick={handleOnClickNavBar}>
        <i className={clicked ? "close_icon" : "navigation_icon"}></i>
        {clicked ? <CloseIcon /> : <NavigationIcon />}
      </div>
    </nav>
  );
}

export default NavBarBuyer;

