import React, {useState} from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
export default function Rentcard(props) {
  const { productData } = props;
  const dispatch = useDispatch();
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
  
  const handleOpenAddCategoryDialog = () => {
    setOpenAddCategoryDialog(true);
  };

  const handleCloseAddCategoryDialog = () => {
    setOpenAddCategoryDialog(false);
  };

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
          marginBottom: "30px",
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
            <span className="badge text-bg-success">Is Available</span>
          ) : (
            <span className="badge text-bg-secondary">Not Available</span>
          )}
          <div className="row">
            <div className="col-6">
              <Link
                style={{ textDecoration: "none" }}
                to={`/Products/product_detail/${productData.id}`}
              >
                <b style={{ fontSize: "1rem" }} className="card-title">
                  {productData.title}{" "}
                </b>
              </Link>
            </div>
            <b
              style={{ fontSize: ".9rem" }}
              className="col-4 d-flex justify-content-end"
            >
              {productData.price} $
            </b>
            <b
              style={{ fontSize: "1rem" }}
              className="col-12 d-flex justify-content-center"
            >
                Location : {productData.location}
            </b>
          </div>
          <div className={`card-text text-truncate`}>{productData.desc}</div>
          <div className="row d-flex justify-content-center">
          <button
            style={{
              width: "80vw",
              maxWidth: "250px",
              fontSize: ".9rem",
              borderRadius: "30px",
              backgroundColor: "green",
              color: "white",
              marginTop: "10px",
            }}
            className="btn add-to-cart-button this is is not "
            onClick={() =>
              {handleOpenAddCategoryDialog()}
            }
          >
            Contact Owner
          </button>
          </div>
        </div>
      </Card>
      <Dialog open={openAddCategoryDialog} onClose={handleCloseAddCategoryDialog}>
        <DialogTitle>Owner Info</DialogTitle>
        <DialogContent>
          <div>
            <div style={{display:"flex", justifyContent:"space-around", fontSize:"1.5rem",fontWeight:"bold"}}>
            <FontAwesomeIcon icon={faEnvelope}  style={{ color: "#2196f3", textAlign:"left", marginRight:"1rem" }} />
            <p>Email: {productData.user.email}</p>
            </div>
            <div style={{display:"flex", justifyContent:"space-around", fontSize:"1.5rem",fontWeight:"bold"}}>
            <FontAwesomeIcon icon={faPhone} style={{ color: "#2196f3", textAlign:"left", marginRight:"1rem" }} />
            <p>Phone: {productData.user.phone}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
