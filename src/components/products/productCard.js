import React from 'react';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Rating from "./Rating";
import { Container } from "react-bootstrap";

import { useDispatch } from 'react-redux';
import {addToCart} from '../../store/slices/cartslice';

export default function ProductCard(props) {
  const { productData } = props;
  
  //handle the add to cart button
  const dispatch = useDispatch()


  return (
    <Container>
      <Card style={{
        boxShadow: "7px 7px 10px rgba(0, 149, 175, 0.5)",
        borderRadius: '15px',
        padding: '5px'
      }} className="">
        <img style={{
          maxHeight: '35vh',
          minHeight:'35vh'

        }} src={productData.images[0]} className="card-img-top img-fluid" alt="..." />
        <div className="card-body">
          {/*stock*/}
          {productData.stock !== 0 ? (
            <span className="badge text-bg-success">On stock</span>
          ) : (
            <span className="badge text-bg-secondary">out of stock</span>
          )}

          {/* product title */}
          {/* and make the title link to navigate to the product page in the router */}
          <div className="row" >
            <div className="col-8"><Link style={{textDecoration:'none'}} to={`/product-details/${productData.id}`}>
              <h6 className="card-title">{productData.title} </h6>
            </Link> </div>
            <div className="col-4 d-flex justify-content-end">
              {productData.price} $
            </div>
          </div>

        <div className={`card-text text-truncate  `}>
            {productData.description}
          </div>
          
          <div className="rating"><Rating rating={productData.rating}/></div>
          <button style={{width:'50%',fontSize:'0.5rem' , borderRadius:'30px',border:'2px solid black'} } className="btn  text-center  my-2" onClick={() => 
                  dispatch(addToCart({
                    id: productData.id,
                    title: productData.title,
                    image:productData.images[0],
                    price: productData.price,
                    stock: productData.stock,
                    description: productData.description,
                    quantity: productData.quantity 
                    
                  }))}>Add To Cart
          </button>
        </div>
      </Card>
    </Container>
  );
}
