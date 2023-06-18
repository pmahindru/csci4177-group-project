/* 
  Created By: Pranav Mahindru
  update by others with respect to their pages
*/
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarSeller from "./components/navigation/navigationSeller.js";
import NavBarBuyer from "./components/navigation/navigationBuyer.js";
import Footer from "./components/footer/footer.js";
import DashBoardSeller from "./components/seller-portal/dashboard-seller/dashboard_seller";
import Preview from "./components/seller-portal/postadd/preview";
import CreateNewAd from "./components/seller-portal/postadd/createnewads";
import DashBoardBuyer from "./components/buyers-portal/dashboard/dashboard-buyer";
import AboutUs from "./components/account/about_us";
import ProfileSetting from "./components/account/profilesetting";
import Analytical_dashboard from "./components/seller-portal/analytics-seller/Analytic_dashboard";
import ActiveAdsPage from "./components/seller-portal/analytics-seller/ActiveAdsPage";
import DeletePage from "./components/seller-portal/analytics-seller/DeletePage";
import DraftsPage from "./components/seller-portal/analytics-seller/DraftsPage";
import ChatPage from "./components/seller-portal/analytics-seller/ChatPage";
import SellerRatingPage from "./components/seller-portal/analytics-seller/SellerRatingPage";
import RenewPage from "./components/seller-portal/analytics-seller/RenewPage";
import SoldPage from "./components/seller-portal/analytics-seller/SoldPage";
import Login from "./components/login-register/Login";
import Signup from "./components/login-register/Signup";
import ForgotPassword from "./components/login-register/ForgotPassword";
import CustomerSupport from "./components/customer-support/customer_support";
import NotFound from "./components/notfoundpage";
import OrderSeller from "./components/seller-portal/orders-seller/orders_seller";
import NotificationSetting from "./components/account/notificationsetting";
import OrderHistoryPage from "./components/buyers-portal/orders-buyers/orderhistory/orderhistory";
import Favourites from "./components/buyers-portal/orders-buyers/favourites/favourites";
import OrdersBuyers from "./components/buyers-portal/orders-buyers/orders-buyers";
import TrackOrders from "./components/buyers-portal/orders-buyers/trackorders/trackorders";
import CreateReview from "./components/buyers-portal/orders-buyers/review/createreview";

function App() {
  // this array contains only seller portal
  const array = ["/dashboard", "/analytics", "/business_orders", "/postAd", "/preview",
                "/analytics/active-ads", "/analytics/delete-ads", "/analytics/draft-ads", "/analytics/chat", 
                "/analytics/seller-rating", "/analytics/renew", "/analytics/sold"];

  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigation Bar */}
        {array.includes(window.location.pathname) ? (
          <NavBarSeller />
        ) : (
          <NavBarBuyer />
        )}

        <Routes>
          {/* For Login and Register Pages */}
          <Route path='/login' element={<Login/>}/> 
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>

          {/* For Buyer's Portal */}
          <Route path='/' element={<DashBoardBuyer/>}/>
          <Route path='/orders' element={<OrdersBuyers/>}/>
          <Route path='/orderhistory' element={<OrderHistoryPage/>}/>
          <Route path='/favourites' element={<Favourites/>}/>
          <Route path='/trackorders' element={<TrackOrders/>}/>
          <Route path='/createreview' element={<CreateReview/>}/>

          {/* For Seller's Portal */}
          <Route path="/dashboard" element={<DashBoardSeller/>}/>
          <Route path="/postAd" element={<CreateNewAd/>}/>
          <Route path="/preview" element={<Preview/>}/>
          <Route path='/business_orders' element={<OrderSeller/>}/>
          <Route path="/analytics" element={<Analytical_dashboard/>}/>
          <Route path="/analytics/active-ads" element={<ActiveAdsPage/>}/>
          <Route path="/analytics/delete-ads" element={<DeletePage/>}/>
          <Route path="/analytics/draft-ads" element={<DraftsPage/>}/>
          <Route path="/analytics/chat" element={<ChatPage/>}/>
          <Route path="/analytics/seller-rating" element={<SellerRatingPage/>}/>
          <Route path="/analytics/renew" element={<RenewPage/>}/>
          <Route path="/analytics/sold" element={<SoldPage/>}/>

          {/* commons page for the both portal */}
          <Route path='/about_us' element={<AboutUs/>}/>
          <Route path='/customer_support' element={<CustomerSupport/>}/>
          <Route path='/profile_setting' element={<ProfileSetting/>}/>
          <Route path='/notification_setting' element={<NotificationSetting/>}/>

          {/* error handle */}
          {/* [1] M. Gathoni, “How to create a 404 page in react using react router,” MUO, 
          https://www.makeuseof.com/react-router-404-page-create/ (accessed Jun. 20, 2023). */}
          <Route path='*' element={<NotFound/>}/>
        </Routes>

        {/* Footer */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
