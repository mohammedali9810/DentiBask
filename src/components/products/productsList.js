import React, { useEffect, useState } from 'react';
import ProductCard from './productCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Category from './catogery';


function ProductsList() {
  const navigate = useNavigate();
  const [productsList, setProductsList] = useState([]);
  const [category, setCategory] = useState('smartphones');

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/category/${category}/`)
      .then(response => {
        const { products } = response.data;
        setProductsList(products);
      })
      .catch(error => {
        console.error(error);
      });
  }, [category]);

  const redirectToDetails = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <>
      <Category updateCategory={setCategory} />
      <div className='d-flex justify-content-center mt-3 '>

      <Row xs={1} sm={2} md={2} lg={4} className="g-3">
        {/* loop on the all list of products come from the api */}
        {productsList && productsList?.map((product, index) => (
          <Col key={index}>
            <div className="" key={product.id}>
              <ProductCard
                productData={product}
                handleNavigate={(id) => redirectToDetails(id)}
              />
            </div>
          </Col>
        ))}
      </Row>
      </div>
    </>
  );
}

export default ProductsList;
