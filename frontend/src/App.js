import "./App.css";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/home";
import Womenallproducts from "./components/women/Womenallproducts";
import Highendcouture from "./components/women/Highendcouture";
import Sarees from "./components/women/Sarees";
import Lehenga from "./components/women/Lehenga";
import Dresses from "./components/women/Dresses";
import Twinningoutfits from "./components/women/Twinningoutfits";

import Kidsallproducts from "./components/kids/kidsallproducts";
import Girl from "./components/kids/Girl";
import Boy from "./components/kids/Boy";

import Jewelryallcollection from "./components/jewelry/Jewelryallcollection";



import Login from "./components/login";
import Register from "./components/register";
import Customerinfo from "./components/customerdetails/customerinfo";
import Addresses from "./components/customerdetails/addresses";
import Addaddress from "./components/customerdetails/Addaddress";
import Orders from "./components/customerdetails/Orders";
import Changepassword from "./components/customerdetails/Changepassword";
import Productdetails from "./components/Productdetails";

import Aboutus from "./components/Aboutus";
import Contactus from "./components/Contactus";
import Selleraccount from "./components/Selleraccount";
import FAQ from "./components/Faq";
import Emailverification from "./components/Emailverification";
import ProtectedRoute from "./components/ProtectedRoute";
import Notfound from "./Notfound";
import Addnewproduct from "./components/sellerdashboard/Addnewproduct";
import Shipments from "./components/sellerdashboard/Shipments";
import Sellerorders from "./components/sellerdashboard/Sellerorders";
import Sellerproducts from "./components/sellerdashboard/Sellerproducts";
import Acceptproduct from "./components/admindashboard/acceptproduct";
import Checkout from "./components/Checkoutpage";
import Finalcheckoutpage from "./components/finalcheckoutpage";
import Cartitems from "./components/Cartitems";
import Forgotpassword from "./components/Forgotpassword";
import NecklacesChains from "./components/jewelry/NecklacesChains";
import BraceletsBangles from "./components/jewelry/BraceletsBangles";
import Earrings from "./components/jewelry/Earrings";
import Rings from "./components/jewelry/Rings";
import Offers from "./components/sellerdashboard/Offers";
import Search from "./components/Search";
import OrderPage from "./components/customerdetails/OrderPage";
import SellerProfile from "./components/sellerdashboard/SellerProfilePage";

// import axios from "axios";
import Scrolltotop from "./components/Scrolltotop";
import ContactSeller from "./components/sellerdashboard/ContactSeller";
import ReviewRatings from "./components/customerdetails/reviewsRatings";
import CancelOrder from "./components/customerdetails/CancelOrder";
import Refundproducts from "./components/admindashboard/Refundproducts";
import Allsellerproducts from "./components/admindashboard/Allsellerproducts";
import Offeredproductdetails from "./components/sellerdashboard/offeredproductdetails";
import ReturnOrder from "./components/customerdetails/ReturnOder";
import Sellerreturnproducts from "./components/admindashboard/Sellerreturnproducts";
import Shop from "./components/shops";


function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const checkUserToken = () => {
    const userToken = sessionStorage.getItem("user-token");
    if (!userToken || userToken === "undefined") {
      setIsUserLoggedIn(false);
    }
    setIsUserLoggedIn(true);
  };

  useEffect(() => {
    checkUserToken();
  }, [isUserLoggedIn]);



  return (
    <>
      <BrowserRouter >
        <Scrolltotop />
        <Routes>
          {/* Login routes */}
          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="acceptproduct" element={<Acceptproduct/>}></Route>
          <Route path="checkoutpage" element={<Checkout/>}></Route>
      
          <Route
            path="emailverification"
            element={<Emailverification />}
          ></Route>

          <Route
            path="cartitems"
            element={<Cartitems />}
          ></Route>

          <Route
            path="customerinfo"
            element={
              <ProtectedRoute>
                {isUserLoggedIn && <Customerinfo />}
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="addresses"
            element={
              <ProtectedRoute>{isUserLoggedIn && <Addresses />}</ProtectedRoute>
            }
          ></Route>
          <Route
            path="addaddress"
            element={
              <ProtectedRoute>
                {isUserLoggedIn && <Addaddress />}
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="orders"
            element={
              <ProtectedRoute>{isUserLoggedIn && <Orders />}</ProtectedRoute>
            }
          ></Route>
          <Route
            path="changepassword"
            element={
              <ProtectedRoute>
                {isUserLoggedIn && <Changepassword />}
              </ProtectedRoute>
            }
          ></Route>
          <Route path="offers" element={<Offers/>}></Route>
          <Route path="offeredproductdetails/:id" element={<Offeredproductdetails/>}></Route>
          <Route path="aboutus" element={<Aboutus />}></Route>
          <Route path="contactus" element={<Contactus />}></Route>
          <Route
            path="selleraccount"
            element={
              <ProtectedRoute>
                {isUserLoggedIn && <Selleraccount />}
              </ProtectedRoute>
            }
          ></Route>
          <Route path="faq" element={<FAQ />}></Route>

          {/* Women components routes */}
          <Route path="/" element={<Home/>}></Route>
          <Route path="women" element={<Womenallproducts />}></Route>
          <Route path="product/:id" element={<Productdetails />}></Route>
          <Route path="highendcouture" element={<Highendcouture />}></Route>
          <Route path="sarees" element={<Sarees />}></Route>
          <Route path="lehenga" element={<Lehenga />}></Route>
          <Route path="dresses" element={<Dresses />}></Route>
          <Route path="twinningoutfits" element={<Twinningoutfits />}></Route>

          {/* Kids components routes */}
          <Route path="kids" element={<Kidsallproducts />}></Route>
          <Route path="girl" element={<Girl />}></Route>
          <Route path="boy" element={<Boy />}></Route>

          {/* Jewelery components routes */}
          <Route path="jewellery" element={<Jewelryallcollection />}></Route>
          <Route path="necklaces" element={<NecklacesChains/>}></Route>
          <Route path="bangles" element={<BraceletsBangles />}></Route>
          <Route path="earrings" element={<Earrings />}></Route>
          <Route path="rings" element={<Rings />}></Route>

        
          {/* Seller account routes */}
          <Route
            path="addnewproduct"
            element={
              <ProtectedRoute>
                {isUserLoggedIn && <Addnewproduct />}
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="shipments"
            element={
              <ProtectedRoute>{isUserLoggedIn && <Shipments />}</ProtectedRoute>
            }
          ></Route>
          <Route
            path="sellerorders"
            element={
              <ProtectedRoute>
                {isUserLoggedIn && <Sellerorders />}
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="sellerproducts"
            element={
              <ProtectedRoute>
                {isUserLoggedIn && <Sellerproducts />}
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="finalcheckoutpage"
            element={
              <ProtectedRoute>
                {isUserLoggedIn && <Finalcheckoutpage />}
              </ProtectedRoute>
            }
          ></Route>
          <Route path="forgotpassword" element={<Forgotpassword />}></Route>
          <Route path="*" element={<Notfound />}></Route>
          <Route path="/search" element={<Search/>} />
          <Route path="/orderpage" element={<OrderPage/>} />
          <Route path="/sellerprofile/:sellerId" element={<SellerProfile/>} />
          <Route path="/contactseller" element={<ContactSeller/>}/>
          <Route path="/feedback" element={<ReviewRatings/>}/>

          <Route path="/cancelorder" element={
                              <ProtectedRoute>
                              {isUserLoggedIn && <CancelOrder />}
                            </ProtectedRoute>
              
              } />
              <Route path="/returnorder" element={
                              <ProtectedRoute>
                              {isUserLoggedIn && <ReturnOrder />}
                            </ProtectedRoute>
              
              } />

                      <Route path="refundsproduct" element={<Refundproducts />}/>
                      <Route path="sellerreturnproducts" element={<Sellerreturnproducts />}/>

                      <Route path="allsellerproducts" element={<Allsellerproducts/>}/>
                      <Route path="shop" element={<Shop/>}/>


        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
