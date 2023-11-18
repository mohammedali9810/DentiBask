import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Rating from "./Rating";
import { Container } from "react-bootstrap";
import "./ProductCard.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartslice";

export default function ProductCard(props) {
  const { productData } = props;
  const dispatch = useDispatch();

  return (
    <Container className="card-hover-grow">
      <Card
        style={{
          boxShadow: "7px 7px 10px rgba(0, 149, 175, 0.5)",
          borderRadius: "15px",
          padding: "5px",
          maxHeight: "60vh",
          position: "relative",
          display: "flex",
          flexDirection: "column", 
          justifyContent: "space-between", 
        }}
        className="my-product-card mt-3"
      >
        <img
          style={{
            maxHeight: "30vh",
            minHeight: "35vh",
            objectFit: "contain",
          }}
          src={productData.image}
          className="card-img-top img-fluid"
          alt="..."
        />
        <div className="card-body">
          {productData.stock !== 0 ? (
            <span className="badge text-bg-success">On stock</span>
          ) : (
            <span className="badge text-bg-secondary">out of stock</span>
          )}
          <div className="row">
            <div className="col-6">
              <Link
                style={{ textDecoration: "none" }}
                to={`/Products/product_detail/${productData.id}`}
              >
                <b style={{ fontSize: "1.1rem" }} className="card-title">
                  {productData.name}{" "}
                </b>
              </Link>
            </div>
            <b
              style={{ fontSize: "1.1rem" }}
              className="col-4 d-flex justify-content-end"
            >
              {productData.price} $
            </b>
          </div>
          <div className={`card-text text-truncate`}>{productData.desc}</div>
          <div className="rating mt-2">
            <Rating rating={4} />
          </div>
          <div className="row d-flex justify-content-center">
          <button
            style={{
              width: "90vw",
              maxWidth: "300px",
              fontSize: "1rem",
              borderRadius: "30px",
              backgroundColor: "rgb(0, 183, 255)",
              color: "white",
              marginTop: "10px",
            }}
            className="btn add-to-cart-button this is is not "
            onClick={() =>
              dispatch(
                addToCart({
                  id: productData.id,
                  title: productData.name,
                  image: productData.image,
                  price: productData.price,
                  stock: productData.stock,
                  description: productData.desc,
                  quantity: productData.unit,
                })
              )
            }
          >
            Add To Cart
          </button>
          </div>
        </div>
      </Card>
    </Container>
  );
}
