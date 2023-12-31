import React from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./style.css";
import { BsFillTrash3Fill } from "react-icons/bs";
import {
  removeItem,
  decrementQuantity,
  incrementQuantity,
} from "../store/slices/cartslice";
import { Link } from "react-router-dom";

function CartItem({ id, image, title, price, quantity = 0, description }) {
  const dispatch = useDispatch();

  return (
    <div
      className="row d-flex  my-border p-5 m-5"
      style={{ maxHeight: "40vh" ,
               boxShadow: "7px 7px 10px rgba(62, 93, 99, 0.5)",

    }}
      
    >
      <div className="col-6 justify-content-start img-product container">
        <Card.Img
          variant="top"
          src={image}
          alt="item"
          className=" big-img m"
          lg={4}
          style={{
            maxHeight: "25vh",
            width: "100%",
            objectFit: "contain",
            borderRadius: "30px",
          }}
        />
      </div>

      <div className="col-6 col-xs-12">
        <Link
          style={{ textDecoration: "none" }}
          to={`/Products/product_detail/${id}/`}
        >
          <h3 className="card-title">{title}</h3>
        </Link>
        <Card.Text className="mt-2">
          <b>{price} $</b>
          <p>{description}</p>
        </Card.Text>
        <div className="mt-5">
          <Button
            variant="outline-danger"
            className="ml-2"
            onClick={() => dispatch(decrementQuantity(id))}
          >
            -
          </Button>
          <b className="mx-2">{quantity}</b>
          <Button
            variant="outline-success"
            className="ml-2"
            onClick={() => dispatch(incrementQuantity(id))}
          >
            +
          </Button>
          <Button
            variant="outline-danger"
            className="del-item ml-2 m-3 w-50"
            
            onClick={() => dispatch(removeItem(id))}
          >
            <BsFillTrash3Fill />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
