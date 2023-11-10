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
import ContactUs from '../pages/ContactUs';
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
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
