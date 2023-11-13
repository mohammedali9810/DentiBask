import React from 'react';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Rating from "./Rating";
import { Container } from "react-bootstrap";
import './ProductCard.css';
import { useDispatch } from 'react-redux';
import {addToCart} from '../../store/slices/cartslice';

export default function ProductCard(props) {
  const { productData } = props;
  
  //handle the add to cart button
  const dispatch = useDispatch()


  return (
    <Container className="card-hover-grow">
      <Card style={{
        boxShadow: "7px 7px 10px rgba(0, 149, 175, 0.5)",
        borderRadius: '15px',
        padding: '5px',
        height:'62vh'
      }} className="my-product-card mt-3">
        <img style={{
          maxHeight: '35vh',
          minHeight:'35vh',
          objectFit: 'contain'

        }} src={productData.image} className="card-img-top img-fluid" alt="..." />
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
            <div className="col-8"><Link style={{textDecoration:'none'}} to={`/Products/products/${productData.id}`}>
              <b style={{ fontSize: '1.1rem' }} className="card-title">{productData.name} </b>
            </Link> </div>
            <b style={{ fontSize: '1.4rem' }} className="col-4 d-flex justify-content-end">
              {productData.price} $
            </b>
          </div>

        <div className={`card-text text-truncate`}>
            {productData.desc}
          </div>
          
          <div className="rating mt-2">
            <Rating rating={4}/>
          </div>
          <button style={{
                width: '90%',
                fontSize: '1rem',
                borderRadius: '30px',
                backgroundColor: 'rgb(0, 183, 255)', // Set the button background color to blue
                color: 'white', // Set the text color to white
                marginTop: '10px',
                position:'absolute',
                top:'89%',
                
              }} className="btn add-to-cart-button" onClick={() =>
            dispatch(addToCart({
              id: productData.id,
              title: productData.name,
              image: productData.image,
              price: productData.price,
              stock: productData.stock,
              description: productData.desc,
              quantity: productData.unit
            }))
          }>
            Add To Cart
          </button>
        </div>
      </Card>
    </Container>
  );
}

// import React from 'react';
// import { Link } from "react-router-dom";
// import Card from 'react-bootstrap/Card';
// import Rating from "./Rating";
// import { Container } from "react-bootstrap";

// import { useDispatch } from 'react-redux';
// import { addToCart } from '../../store/slices/cartslice';
// import './ProductCard.css'; // Import a CSS file for custom styles

// export default function ProductCard(props) {
//   const { productData } = props;
//   const dispatch = useDispatch();

//   return (
//     <Container>
//       <Card className="product-card"> {/* Apply custom class */}
//         <img src={productData.images[0]} className="card-img-top img-fluid" alt="..." />
//         <div className="card-body">
//           {productData.stock !== 0 ? (
//             <span className="badge text-success">On stock</span>
//           ) : (
//             <span className="badge text-secondary">out of stock</span>
//           )}
//           <div className="row">
//             <div className="col-8">
//               <Link style={{ textDecoration: 'none' }} to={`/product-details/${productData.id}`}>
//                 <h6 className="card-title">{productData.title}</h6>
//               </Link>
//             </div>
//             <div className="col-4 d-flex justify-content-end">
//               {productData.price} $
//             </div>
//           </div>
//           <div className="card-text text-truncate">
//             {productData.description}
//           </div>
//           <div className="rating">
//             <Rating rating={productData.rating} color="lightblue" />
//           </div>
//           <button className="btn add-to-cart-button" onClick={() =>
//             dispatch(addToCart({
//               id: productData.id,
//               title: productData.title,
//               image: productData.images[0],
//               price: productData.price,
//               stock: productData.stock,
//               description: productData.description,
//               quantity: productData.quantity
//             }))
//           }>
//             Add To Cart
//           </button>
//         </div>
//       </Card>
//     </Container>
//   );
// }
