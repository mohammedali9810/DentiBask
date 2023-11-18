import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Rating from "../components/products/Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setQuantity } from "../store/slices/cartslice";
import { Button } from "react-bootstrap";
import "./style.css";
import { Link } from 'react-router-dom';

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const categories = [
    {
      "id": 3,
      "name": "Endodontics"
    },
    {
      "id": 6,
      "name": "Equipment"
    },
    {
      "id": 7,
      "name": "Instruments"
    },
    {
      "id": 8,
      "name": "Prosthesis"
    },
    {
      "id": 4,
      "name": "Surgery"
    },
    {
      "id": 5,
      "name": "Restorations"
    },
    {
      "id": 1,
      "name": "Consumble"
    }
  ];
  
  let params = useParams();
  const dispatch = useDispatch();
  const cartQuantity = useSelector(
    (state) => state.cart[productDetails.id]?.quantity || 0
  );

  useEffect(() => {
    console.log(productDetails);
    if (params.id) {
      axios
        .get(`http://127.0.0.1:8000/Products/product_detail/?id=${params.id}`)
        .then((res) => {
          setProductDetails(res.data);
          setSelectedImage(res.data.image);
        })
        .catch((err) => console.log(err));
    }
  }, [params.id, productDetails.id]);
  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleIncrement = () => {
    dispatch(
      setQuantity({ id: productDetails.id, quantity: cartQuantity + 1 })
    );
  };

  const handleDecrement = () => {
    if (cartQuantity > 1) {
      dispatch(
        setQuantity({ id: productDetails.id, quantity: cartQuantity - 1 })
      );
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: productDetails.id,
        title: productDetails.title,
        image: productDetails.images ? productDetails.images[0] : "",
        price: productDetails.price,
        stock: productDetails.stock,
        description: productDetails.description,
        quantity: cartQuantity,
      })
    );
  };

  return (
    <Container className="my-margin-top my-border p-3">
      <div className="row">
        <div className="col-lg-6">
          <img
            style={{
              width: "100%",
              maxHeight: "45vh",
              transition: "transform 0.3s",
            }}
            src={selectedImage}
            alt={productDetails.title}
            className="my-border zoom-image"
          />
          <div className="d-flex flex-wrap justify-content-center">
            {productDetails.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={productDetails.name}
                style={{
                  width: "5vw",
                  margin: "5px",
                  boxShadow: "",
                  borderRadius: "5px",
                  border: "1px solid black",
                  cursor: "pointer",
                }}
                onClick={() => handleThumbnailClick(image)}
              />
            ))}
          </div>
        </div>
        <div className="col-lg-5 my-5 mx-2 ">
          <h3>{productDetails.name}</h3>
          <p className="m-3">{productDetails.desc}</p>
          <div className="m-3">
            <Rating rating={productDetails.rating} />
          </div>

          <span className="btn border-info border-1 rounded-pill">
  <strong>Category: </strong>
  {/* to={`/Products/products_catgory/?name=${categories.find(category => category.id === productDetails.Categ_id)?.name || 'new'}`} */}
  <Link >
    {categories.find(category => category.id === productDetails.Categ_id)?.name || "Unknown"}
  </Link>
</span>

          <hr></hr>

          <div className="row m-3 mt-5">
            <div className="">
              <b>{productDetails.price} $</b>

              <span className="ms-5">
                {productDetails.stock !== 0 ? (
                  <span className="badge text-bg-success">On stock</span>
                ) : (
                  <span className="badge text-bg-secondary">Out of stock</span>
                )}
              </span>
            </div>

            <div className="m-2 d-flex justify-content-center">
              <Button
                  variant="outline-danger"
                  className="ml-2" onClick={handleDecrement}>
                -
              </Button>
              <b className="m-2">{cartQuantity}</b>
              <Button variant="outline-success"
               className="ml-2" onClick={handleIncrement}>
                +
              </Button>
            </div>
          </div>

          <div className="d-flex justify-content-center pt-5">
            <Button
              style={{
                width: "50%",
                fontSize: "0.9rem",
                borderRadius: "30px",
                backgroundColor: "#56b0e4",
              }}
              className="btn  text-center  my-2 "
              onClick={() =>
                dispatch(
                  addToCart({
                    id: productDetails.id,
                    title: productDetails.name,
                    image: productDetails.image,
                    price: productDetails.price,
                    stock: productDetails.stock,
                    description: productDetails.desc,
                    quantity: productDetails.unit,
                  })
                )
              }
            >
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
