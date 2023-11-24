// Products.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductsList from "../components/products/productsList";
import RentSection from "../components/rent/rentSection";

export default function Products({ handleRedirect }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a request to get information about the current user
        const response = await fetch('http://localhost:8000/User/api/current-user/');
        const currentUser = await response.json();

        // Check if the user is authenticated
        if (currentUser.is_authenticated) {
          // Handle the case where the user is authenticated
          console.log('User is authenticated:', currentUser);
        } else {
          // Handle the case where the user is not authenticated
          console.log('User is not authenticated');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [handleRedirect]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
    </>
  );
}
