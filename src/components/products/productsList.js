import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap"; // Make sure to import Container
import Category from "./catogery";

function ProductsList() {
  const navigate = useNavigate();
  const [productsList, setProductsList] = useState([]);
  const [category, setCategory] = useState("Consumble");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/Products/products_catgory/?name=${category}`)
      .then((response) => {
        const products = response.data;

        if (products) {
          console.log(products);
          setProductsList(products);
        } else {
          console.error("Results property not found in the response.");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [category]);

  const redirectToDetails = (id) => {
    navigate(`/Products/products/${id}`);
  };

  return (
    <Container>
      {" "}
      {/* Use Container for centered and responsive padding */}
      <Category updateCategory={setCategory} />
      <Row
        className="g-2 justify-content-center mt-3 mx-2 mx-sm-1 mx-md-4 mx-lg-4 mx-xl-5"
        xs={1}
        sm={2}
        lg={3}
        xl={3}
        xxl={4}
      >
        {/* loop on the all list of products come from the api */}
        {productsList?.map((product, index) => (
          <Col key={product.id} className="d-flex">
            {" "}
            {/* Use the product's unique id for the key */}
            <ProductCard
              productData={product}
              handleNavigate={() => redirectToDetails(product.id)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductsList;
