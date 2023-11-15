import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductsList from "../components/products/productsList";
import RentSection from "../components/rent/rentSection";
import Footer from "../components/footer/footer";
export default function products() {
  return (
    <>
      <div className="row">
        <ProductsList />
      </div>
      <div
        className="row my-5"
        style={{
          height: "65vh",
        }}
      >
        <RentSection />
      </div>

      {/* <Footer/> */}
    </>
  );
}
