import React from "react";
import { Route, Routes } from "react-router-dom";
import Products from "../pages/Products";

import Register from "../pages/Register";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Dashboard from "../components/dashboard/navandside/Dashboard";
import ProductDetails from "../pages/productDetails";
import NotFound from "../pages/NotFound";
import Header from "../components/Header/Header";
// import ContactUs from '../pages/ContactUs';
// import AboutUs from '../pages/AboutUs';
import Activate from "../pages/activate";
import Footer from "../components/footer/footer";
import AboutUs from '../pages/AboutUs';

export default function Router() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Products/products/:id" element={<ProductDetails />} />
        <Route
          path="/activate/User/activate/:token1/:token2"
          element={<Activate />}
        />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
