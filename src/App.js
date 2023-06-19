import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarSeller from "./components/navigation/navigationSeller.js";
import NavBarBuyer from "./components/navigation/navigationBuyer.js";
import Footer from "./components/footer/footer.js";
import DashBoardSeller from "./components/seller-portal/dashboard-seller/dashboard_seller";
import Preview from "./components/seller-portal/postadd/preview";
import CreateNewAd from "./components/seller-portal/postadd/createnewads";
import DashBoardBuyer from "./components/buyers-portal/dashboard/dashboard-buyer";
import OrdersBuyers from "./components/buyers-portal/orders-buyers/orders-buyers";

function App() {
  // this array contains only seller portal
  const array = [
    "/dashboard",
    "/analytics",
    "/business_orders",
    "/postAd"
  ];

  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigation Bar */}
        {array.includes(window.location.pathname) ? <NavBarSeller/> : <NavBarBuyer/>}

        <Routes>
          {/* For Login and Register Pages */}
          {/* <Route path='/login' element={}/> */}
          {/* <Route path='/register' element={}/> */}

          {/* For Buyer's Portal */}
          <Route path='/' element={<DashBoardBuyer/>}/>
          <Route path='/orders' element={<OrdersBuyers/>}/>
          {/* For Seller's Portal */}
          <Route path='/dashboard' element={<DashBoardSeller/>}/>
          <Route path='/postAd' element={<CreateNewAd/>}/>
          <Route path='/preview' element={<Preview/>}/>
          {/* <Route path='/analytics' element={}/> */}
          {/* <Route path='/business_orders' element={}/> */}

          {/* commons page for the both portal */}
          {/* <Route path='/account' element={}/> */}
        </Routes>

        {/* Footer */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
