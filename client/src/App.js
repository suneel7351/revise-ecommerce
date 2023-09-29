import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Product from "./components/product/Product";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "./redux/auth/userSlice";
import Products from "./components/product/Products";
import Profile from "./components/account/Profile";
import EditProfile from "./components/account/EditProfile";
import UpdatePassword from "./components/account/UpdatePassword";
import Cart from "./components/cart/Cart";
import ForogtPassword from "./components/account/ForogtPassword";
import PasswordReset from "./components/account/PasswordReset";
import Shipping from "./components/cart/Shipping";
import ConfrimOrder from "./components/cart/ConfrimOrder";

import Payment from "./components/cart/Payment";

import Success from "./components/cart/Success";
import Fail from "./components/cart/Fail";
import Order from "./components/order/Order";
import OrderDetails from "./components/order/OrderDetails";
import data from './data/Data'


import Notfound from "./components/Notfound";
import RegisterSeller from "./components/seller/RegisterSeller";
import SellerLogin from "./components/seller/Login";
import VerifyOtp from "./components/seller/VerifyOtp";
import ProtectSeller from './routes/ProtectSeller'
import { sellerProfile } from "./redux/seller/auth";
import Dashboard from "./components/seller/Dashboard";
import CreateProduct from "./components/seller/CreateProduct";
import SellerAllProducts from "./components/seller/SellerAllProducts";
import UpdateProduct from "./components/seller/UpdateProduct";
import NotificationPage from "./components/seller/NotificationPage";
import Orders from "./components/seller/Orders";
import SellerOrderDetails from "./components/seller/SellerOrderDetails";
import SellerReviews from "./components/seller/SellerReviews";
import Wishlist from "./components/cart/Wishlist";
import ProductCompare from "./components/cart/ProductCompare";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProtectAdmin from "./routes/ProtectAdmin";
import { adminProfile } from "./redux/superAdmin/admin";
import CreateCategory from "./components/admin/CreateCategory";
import AllCategories from "./components/admin/AllCategories";
import UpdateCategory from "./components/admin/UpdateCategory";
import ProtectUser from "./routes/ProtectUser";
import Footer from "./components/Footer";








function App() {
  const dispatch = useDispatch();
  const { isSeller } = useSelector((state) => state.sellerAuth);
  const { isAdmin } = useSelector((state) => state.superAdmin);
  const { isAuthenticated } = useSelector((state) => state.user);


  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);
  useEffect(() => {
    dispatch(sellerProfile());
  }, [dispatch]);


  useEffect(() => {
    dispatch(adminProfile());
  }, [dispatch]);

  // window.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // });



  return (
    <Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header/>
      <div className="bg-gray-50 min-h-[85vh]">
        <Routes>
          <Route path="/admin-login/Jrkjlsx$04949xbuepx9nvxd904irjisjf" element={<AdminLogin />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/compare" element={<ProductCompare />} />
          <Route path="/seller/register" element={<RegisterSeller />} />
          <Route path="/seller/login" element={<SellerLogin />} />




          {/* -----------------> Seller Routes <----------------------- */}
          <Route element={<ProtectSeller isSeller={isSeller} />}>

            <Route path="/seller/product/new" element={<CreateProduct />} />
            <Route path="/seller/products" element={<SellerAllProducts />} />
            <Route path="/seller/orders" element={<Orders />} />
            <Route path="/seller/verify" element={<VerifyOtp />} />
            <Route path="/seller/dashboard" element={<Dashboard />} />
            <Route path="/seller/product/:id" element={<UpdateProduct />} />
            <Route path="/seller/notifications" element={<NotificationPage />} />
            <Route path="/seller/order/:id" element={<SellerOrderDetails />} />
            <Route path="/seller/reviews" element={<SellerReviews />} />

          </Route>




          {/* ------------------>Admin Routes <================== */}

          <Route element={<ProtectAdmin isAdmin={isAdmin} />}>

            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/category/new" element={<CreateCategory />} />
            <Route path="/admin/categories" element={<AllCategories />} />
            <Route path="/admin/category/:id" element={<UpdateCategory />} />


          </Route>




          <Route element={<ProtectUser isUser={isAuthenticated} />}>
            <Route path="/order/:id" element={<OrderDetails />} />

            <Route
              path="/shipping" element={<Shipping />} />
            <Route
              exact
              path="/order/confirm"
              element={< ConfrimOrder />}
            />

            <Route
              path="/process/payment"
              element={

                < Payment />

              }
            />

            <Route
              path="/payment/success"
              element={<Success />}
            />{" "}
            <Route
              path="/payment/fail"
              element={< Fail />}
            />
            <Route path="/orders" element={< Order />} />

            <Route
              path="/profile"
              element={<Profile />}
            />{" "}
            <Route
              path="/update/profile"
              element={< EditProfile />}
            />
            <Route
              path="/update/password"
              element={< UpdatePassword />}
            />
          </Route>





          <Route path="/forgot/password" element={<ForogtPassword />} />
          <Route path="/password/reset/:token" element={<PasswordReset />} />
          <Route path="/cart" element={<Cart />} />




      
   
       
         {/* <Slider start={banner.start} />
          <Offer offer={data.offer} />
          <Heading text="STAR PRODUCTS" />
          <StarProduct StarProduct={data.starProduct} />
          <Heading text="HOT ACCESSORIES " />
          <HotAccessoriesMenu />  */}
          


         {/* <Heading text="REVIEW PRODUCTS" />
          <ProductReviews productReviews={data.productReviews} />
          <Heading text="VIDEOS" />
          <Heading text="IN THE PRESS" />
          <Banner banner={data.banner} />
          <Footer Footer={data.footer} />  */}







          <Route
            path="*"
            element={
              window.location.pathname === "/process/payment" ? null : (
                <Notfound />
              )
            }
          />

          
        </Routes>
      </div>
        <Footer/>
    </Router>
  );
}

export default App;
