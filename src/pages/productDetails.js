import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Rating from "../components/products/Rating";
import { useDispatch } from 'react-redux';
import { addToCart , decrementQuantity, incrementQuantity} from '../store/slices/cartslice';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import './style.css'

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Track the selected image
  const params = useParams();

  const quantity = useSelector((state) => state.cart[productDetails.id-1]?.quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${params.id}`)
      .then((res) => {
        setProductDetails(res.data);
        setSelectedImage(res.data.thumbnail); // Set the initial selected image as the thumbnail
      })
      .catch((err) => console.log(err));
  }, [params.id]);

  // Function to handle thumbnail image click
  const handleThumbnailClick = (image) => {
    setSelectedImage(image); // Set the selected image when a thumbnail is clicked
  };

  return (
    <Container className="my-margin-top my-border p-3">
      <div className="row">
        <div className="col-lg-6  ">
          <img 
            style={{
              width: "100%",
              maxHeight:'45vh',
            }}
            src={selectedImage}
            alt={productDetails.title}
            className="my-border"
          />
          <div className="d-flex flex-wrap justify-content-center">
            {productDetails.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={productDetails.title}
                style={{
                  width: "5vw",
                  margin: "5px",
                  boxShadow:"",
                  borderRadius: "5px",
                  border:'1px solid black',
                  cursor: "pointer",
                }}
                onClick={() => handleThumbnailClick(image)} 
              />
            ))}
          </div>
        </div>
        <div className="col-lg-5 my-5 mx-2 ">
          <h3>{productDetails.title}</h3>
          <p className="m-3">{productDetails.description}</p>
          <div className="m-3">
          <Rating rating={productDetails.rating} />
          </div>
          <span className="btn border-info border-1 rounded-pill m-3"><strong>Brand : </strong>{productDetails.brand}</span>
          <span className="btn border-info border-1 rounded-pill "><strong>category : </strong>{productDetails.category}</span>
          <hr></hr>

          <div className="row m-3 mt-5">
            <div  className="">
              {productDetails.discountPercentage > 0 ? (
                
                <span>
                   <span style={{fontSize:'20px' }} className="">Price Now : <b>{(productDetails.price - productDetails.price * productDetails.discountPercentage/100).toFixed(2)}</b> $</span>  
                   <span className="m-1" style={{color:'red'}}> {productDetails.discountPercentage}%</span>
                   <span className="m-1" style={{textDecoration:'line-through'}}>{productDetails.price}</span>
                   
               
                </span>
  
              ):(
                  <span>{productDetails.price}</span>
              )}

              <span className="ms-5">
                    {productDetails.stock !== 0 ? (
                  <d className="badge text-bg-success">On stock</d>
                ) : (
                  <span className="badge text-bg-secondary">out of stock</span>
                )}
              </span>
              
            </div>
            <div className="col-6 m-2">
            
            </div>
            <div className='  m-2 d-flex justify-content-center '>
          <Button variant="danger"  onClick={() => dispatch(decrementQuantity(productDetails.id))}>-</Button>
          <span className='mx-2 '>{quantity}</span>
          <Button variant="success" onClick={() => dispatch(incrementQuantity(productDetails?.id))}>+</Button>
       
        </div>
          </div>
          

        <div className="d-flex justify-content-center pt-5">
        <Button 
         style={{width:'50%',fontSize:'0.9rem' , borderRadius:'30px', backgroundColor:'#3384b3'} } className="btn  text-center  my-2 " onClick={() => 
                  dispatch(addToCart({
                    id: productDetails.id,
                    title: productDetails.title,
                    image:productDetails.images[0],
                    price: productDetails.price,
                    stock: productDetails.stock,
                    description: productDetails.description,
                    
                  }))}>
                    Add To Cart
        </Button>

        </div>
      </div>
      </div>
    </Container>
  );
}
