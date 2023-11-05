import React, {useState} from 'react'
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
    <Card  sx={{ maxWidth: 345 }}>
    <CardActionArea >
      <CardMedia
        component="img"
        height="200"
        image={props.product.thumbnail}
        alt="green iguana"
      />
      <CardContent className={theme && "darkcard"}>
        <Typography style={{fontWeight:"bold"}} gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <span style={{fontSize:"1rem", fontWeight:"bold"}}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </span>
        <p style={{fontWeight:"bold", fontSize:"1rem"}}>Price: 200 $</p>
        <p style={{fontWeight:"bold", fontSize:"1rem"}}>Category: Instrument</p>
        <p style={{fontWeight:"bold", fontSize:"1rem"}}>Ordered: 3000 times</p>
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