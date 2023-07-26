/* 
  Created By: Pranav Mahindru
  update by others with respect to their pages
*/
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavBarSeller from "./components/navigation/navigationSeller.js";
import NavBarBuyer from "./components/navigation/navigationBuyer.js";
import Footer from "./components/footer/footer.js";
import DashBoardSeller from "./components/seller-portal/dashboard-seller/dashboard_seller";
import Preview from "./components/seller-portal/postadd/preview";
import CreateNewAd from "./components/seller-portal/postadd/createnewads";
import DashBoardBuyer from "./components/buyers-portal/dashboard/dashboard-buyer";
import AboutUs from "./components/account/about_us";
import ProfileSetting from "./components/account/profilesetting";
import AnalyticalDashboard from "./components/seller-portal/analytics-seller/Analytic_dashboard";
import ActiveAdsPage from "./components/seller-portal/analytics-seller/ActiveAdsPage";
import DeletePage from "./components/seller-portal/analytics-seller/DeletePage";
import DraftsPage from "./components/seller-portal/analytics-seller/DraftsPage";
import Chat from "./components/seller-portal/analytics-seller/Chat";
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
import OrdersBuyers from "./components/buyers-portal/orders-buyers/orders-buyers";
import CreateReview from "./components/buyers-portal/orders-buyers/review/create-review";
import EditAd from "./components/seller-portal/postadd/editAd";
import UpdatePreview from "./components/seller-portal/postadd/updatePreview";
import DraftEdit from "./components/seller-portal/postadd/draftEdit";
import UpdateDraftPreview from "./components/seller-portal/postadd/draftUpdate";

function App() {
  // this array contains only seller portal
  const array = ["/dashboard", "/analytics", "/business_orders", "/postAd", "/preview",
                "/analytics/active-ads", "/analytics/delete-ads", "/analytics/draft-ads", "/analytics/chat", 
                "/analytics/seller-rating", "/analytics/renew", "/analytics/sold"];
  
  const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigation Bar */}
        {array.includes(window.location.pathname) ? (
          <NavBarSeller />
        ) : (
          <NavBarBuyer />
        )}
        <h1>{userLoggedIn}</h1>
        <Routes>
          {/* For Login and Register Pages */}
          <Route path='/login' element={userLoggedIn ? <Navigate to="/"/> : <Login/>}/> 
          <Route path='/signup' element={userLoggedIn ? <Navigate to="/"/> : <Signup/>}/>
          <Route path='/forgotpassword' element={userLoggedIn ? <Navigate to="/"/> : <ForgotPassword/>}/>

          {/* For Buyer's Portal */}
          <Route path='/' element={<DashBoardBuyer/>}/>
          <Route path='/orders' element={userLoggedIn ? <OrdersBuyers/> : <Navigate to="/login"/>}/>
          <Route path='/createreview' element={userLoggedIn ? <CreateReview/> : <Navigate to="/login"/>}/>
          
          {/* For Seller's Portal */}
          <Route path="/dashboard" element={userLoggedIn ? <DashBoardSeller/> : <Navigate to="/login"/>}/>
          <Route path="/postAd" element={userLoggedIn ? <CreateNewAd/> : <Navigate to="/login"/>}/>
          <Route path="/preview" element={userLoggedIn ? <Preview/> : <Navigate to="/login"/>}/>
          <Route path='/business_orders' element={userLoggedIn ? <OrderSeller/> : <Navigate to="/login"/>}/>
          <Route path='/edit/:id' element={userLoggedIn ? <EditAd/> : <Navigate to="/login"/>}/>
          <Route path='/draftEdit/:id' element={userLoggedIn ? <DraftEdit/> : <Navigate to="/login"/>}/>
          <Route path='/draftUpdate/:id' element={userLoggedIn ? <UpdateDraftPreview/> : <Navigate to="/login"/>}/>
          <Route path='/update_edit/:id' element={userLoggedIn ? <UpdatePreview/> : <Navigate to="/login"/>}/>
          <Route path="/analytics" element={userLoggedIn ? <AnalyticalDashboard/> : <Navigate to="/login"/>}/>
          <Route path="/analytics/active-ads" element={userLoggedIn ? <ActiveAdsPage/> : <Navigate to="/login"/>}/>
          <Route path="/analytics/delete-ads" element={userLoggedIn ? <DeletePage/> : <Navigate to="/login"/>}/>
          <Route path="/analytics/draft-ads" element={userLoggedIn ? <DraftsPage/> : <Navigate to="/login"/>}/>
          <Route path="/analytics/chat" element={userLoggedIn ? <Chat/> : <Navigate to="/login"/>}/>
          <Route path="/analytics/seller-rating" element={userLoggedIn ? <SellerRatingPage/> : <Navigate to="/login"/>}/>
          <Route path="/analytics/renew" element={userLoggedIn ? <RenewPage/> : <Navigate to="/login"/>}/>
          <Route path="/analytics/sold" element={userLoggedIn ? <SoldPage/> : <Navigate to="/login"/>}/>

          {/* commons page for the both portal */}
          <Route path='/about_us' element={<AboutUs/>}/>
          <Route path='/customer_support' element={<CustomerSupport/>}/>
          <Route path='/profile_setting' element={userLoggedIn ? <ProfileSetting/> : <Navigate to="/login"/>}/>
          <Route path='/notification_setting' element={userLoggedIn ? <NotificationSetting/> : <Navigate to="/login"/>}/>

          {/* error handle */}
          {/* [1] M. Gathoni, “How to create a 404 page in react using react router,” MUO, 
          https://www.makeuseof.com/react-router-404-page-create/ (accessed Jun. 20, 2023). */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
