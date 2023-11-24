import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Products from "../pages/Products";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPasswordConfirm from "../pages/ResetPasswordConfirm";
import Cart from "../pages/Cart";
import Dashboard from "../components/dashboard/navandside/Dashboard";
import ProductDetails from "../pages/productDetails";
import NotFound from "../pages/NotFound";
import Header from "../components/Header/Header";
import Activate from "../pages/activate";
import Footer from "../components/footer/footer";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Orderdetails from "../components/dashboard/ordersdashboard/orderdetails";
import Orderdetailsuser from "../components/userdashboard/ordersdashboard/orderdetails";

export default function Router() {
  const navigate = useNavigate();
  const [redirectRoute, setRedirectRoute] = useState(null);

  useEffect(() => {
    if (redirectRoute) {
      navigate(redirectRoute, { replace: true });
    }
  }, [redirectRoute, navigate]);

  const handleRedirect = (response) => {
    if (response && response.redirect) {
      setRedirectRoute(response.redirect);
    }
  };
  return (
    <>
      <Header />
      <Routes>
      <Route path="/" element={<Products handleRedirect={handleRedirect} />} />
        <Route path="/Register" element={<Register handleRedirect={handleRedirect} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/confirm/:uidb64/:token" element={<ResetPasswordConfirm />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/orderdetails/:id" element={<Orderdetails />} />
        <Route path="/orderdetailsuser/:id" element={<Orderdetailsuser />} />
        <Route
          path="/Products/product_detail/:id"
          element={<ProductDetails />}
        />
        <Route
          path="/activate/User/activate/:token1/:token2"
          element={<Activate />}
        />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
