import React, { useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Editproduct from "./editproduct";
import { useContext } from "react";
import { Theme } from "../../themecontext";
import axiosinstance from '../../../axiosconfig';
import "./products.css";
import { useNavigate } from 'react-router-dom';
const Productcard = (props) => {
  const navigate = useNavigate();
  const { theme } = useContext(Theme);
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const handleOpenAddProductDialog = () => {
    setOpenAddProductDialog(true);
  };

  const handleCloseAddProductDialog = () => {
    setOpenAddProductDialog(false);
  };
  const deleteproduct = () =>{
    axiosinstance
      .delete(`/Products/products/${props.product.id}/`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('dentibask-access-token'),
        },
        withCredentials: true,
      })
      .then(() => {
        navigate("/dashboard")
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
  <Card sx={{ maxWidth: 345, opacity:props.product.stock > 0 ? "1": ".6" }} >
  <CardActionArea onClick={()=>{navigate(`/Products/products/${props.product.id}`)}}>
    <CardMedia
      component="img"
      style={{ height:"15rem",objectFit: 'contain' }}
      image={props.product.image}
      alt="Product Image"
    />
      <CardContent className={theme && "darkcard"} style={{ height:"16rem",objectFit: 'contain' }}>
        <Typography style={{fontWeight:"bold"}} gutterBottom variant="h5" component="div">
        {props.product.name}
        </Typography>
        <span style={{fontSize:"1rem", fontWeight:"bold"}}>
        {props.product.desc}
        </span>
        <p style={{fontWeight:"bold", fontSize:"1rem"}}>Price: {props.product.price} $</p>
        <p style={{fontWeight:"bold", fontSize:"1rem"}}>Per: {props.product.unit}</p>
        <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
  Category: {props.categories
    .filter(category => category.id === props.product.Categ_id)
    .map(category => category.name)}
</p>

        <p style={{fontWeight:"bold", fontSize:"1rem"}}>Stock: {props.product.stock}</p>
      </CardContent>
    </CardActionArea>
    <CardActions  className={theme && "darkcard"}>
      <Button size="large" color="success" onClick={handleOpenAddProductDialog}>
        Edit
      </Button>
      <Button size="large" color="error" onClick={()=>{deleteproduct()}}>
        Delete
      </Button>
    </CardActions>
    <Dialog open={openAddProductDialog} onClose={handleCloseAddProductDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
        <Editproduct handleClose={setOpenAddProductDialog} product={props.product} categories={props.categories} />
        </DialogContent>
      </Dialog>
  </Card>
  )
}

export default Productcard;