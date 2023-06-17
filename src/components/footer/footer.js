import Facebook from '../icons/facebook';
import Instagram from '../icons/insta';
import Twitter from '../icons/twitter';
import './footer.css';
import { NavLink, useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();
    const handleOnClickNavBarReload = (e) => {
        navigate(e);
        window.location.reload();
    };

    return (
        <footer className='footer'>
            {/* links */}
            <div className='footer-text'>
                <span>
                    <NavLink onClick={() => handleOnClickNavBarReload("/")}> Category </NavLink>
                </span>
                <span>
                    <NavLink onClick={() => handleOnClickNavBarReload("/about_us")}> About us </NavLink>
                </span>
                <span className='website-name-footer'>
                    ShopAesthetics
                </span>
                <span>
                    <NavLink onClick={() => handleOnClickNavBarReload("/customer_support")}> Contact us </NavLink>
                </span>
                <span>
                    <NavLink onClick={() => handleOnClickNavBarReload("/customer_support")}> Customer Support </NavLink>
                </span>
            </div>

            {/* horizontal line */}
            <hr className='hr-line-footer'/>

            {/* social media */}
            <div className='social-media-links-footer'>
                <i className='footer-icon'><Facebook/></i>
                <i className='footer-icon'><Instagram/></i>
                <i className='footer-icon'><Twitter/></i>
            </div>

            {/* copy right text */}
            <div className='bottom-text-footer'>
                &copy; 2023 ShopAesthetics. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;