import React, {useEffect, useState} from 'react'
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
import "./products.css";
const Productcard = (props) => {
  const { theme } = useContext(Theme);
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const handleOpenAddProductDialog = () => {
    setOpenAddProductDialog(true);
  };

  const handleCloseAddProductDialog = () => {
    setOpenAddProductDialog(false);
  };
  return (
  <Card sx={{ maxWidth: 345 }}>
  <CardActionArea>
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
        <p style={{fontWeight:"bold", fontSize:"1rem"}}>Category: {props.product.Categ_id['name']}</p>
        <p style={{fontWeight:"bold", fontSize:"1rem"}}>Stock: {props.product.stock}</p>
      </CardContent>
    </CardActionArea>
    <CardActions  className={theme && "darkcard"}>
      <Button size="large" color="success" onClick={handleOpenAddProductDialog}>
        Edit
      </Button>
      <Button size="large" color="error">
        Delete
      </Button>
    </CardActions>
    <Dialog open={openAddProductDialog} onClose={handleCloseAddProductDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Editproduct product={props.product} />
        </DialogContent>
      </Dialog>
  </Card>
  )
}

export default Productcard;