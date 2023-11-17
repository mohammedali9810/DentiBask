import React, { useState, } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Dialog, DialogContent, DialogTitle } from '@mui/material';
import Editcategory from "./editcategory";
import { useContext } from "react";
import { Theme } from "../../themecontext";
import "./categories.css";
import axiosinstance from '../../../axiosconfig';

const Categorycard = (props) => {
  const { theme } = useContext(Theme);
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [categoryproducts, setCategoryProducts] = useState([]);

  const handleOpenAddCategoryDialog = () => {
    setOpenAddCategoryDialog(true);
  };

  const handleCloseAddCategoryDialog = () => {
    setOpenAddCategoryDialog(false);
  };

  const handleCloseShowProductsDialog = () => {
    setShowProducts(false);
  };
  const deleteCategory = async () => {
    const csrfToken = await axiosinstance.get("/Products/get_csrf_token/");
    
    axiosinstance
      .delete(`/Products/delete_category/?category_id=${props.category.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken.data.csrfToken,
          'authorization': 'Bearer ' + localStorage.getItem('dentibask-access-token'),
        },
        withCredentials: true,
      })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };
  

  const showproducts =()=>{
    axiosinstance.get(`Products/get_category_products/?category_id=${props.category.id}`)
    .then((res)=>{setCategoryProducts(res.data);})
    .catch((err)=>{console.log(err);});
    setShowProducts(!showProducts);
  }

  const deleteproduct = (id) =>{
    axiosinstance
      .delete(`/Products/products/${id}/`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then(() => {
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Card sx={{ maxWidth: 390 }}>
      <CardActionArea>
      <CardMedia
  component="img"
  height="400"
  style={{ width: '100%', objectFit: 'contain' }}
  image={props.category.image}
  alt="Category Thumbnail"
/>

        <CardContent className={theme && "darkcard"}>
          <Typography gutterBottom variant="h5" component="div">
            {props.category.name}
          </Typography>
          <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
            <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
              {props.category.desc}
            </p>
          </span>
        </CardContent>
      </CardActionArea>
      <CardActions className={theme && "darkcard"}>
        <Button size="large" color="success" onClick={handleOpenAddCategoryDialog}>
          Edit
        </Button>
        <Button size="large" color="primary" onClick={() => {showproducts();}}>
          See Products
        </Button>
        <Button size="large" color="error" onClick={()=>{deleteCategory();
        }} >
          Delete
        </Button>
      </CardActions>
      <Dialog open={openAddCategoryDialog} onClose={handleCloseAddCategoryDialog} maxWidth="lg">
        <DialogTitle>Edit Category: <u>{props.category.name}</u></DialogTitle>
        <DialogContent>
          <Editcategory category={props.category}  handleCloseAddCategoryDialog={handleCloseAddCategoryDialog}/>
        </DialogContent>
      </Dialog>

      <Dialog open={showProducts} onClose={handleCloseShowProductsDialog} fullWidth
  maxWidth="lg">
    <DialogTitle>Products of {props.category.name}</DialogTitle>
    <DialogContent>
  {categoryproducts.length > 0 && (
    <div className='productsgrid' style={{padding:"20px"}}>
      {categoryproducts.map((product, index) => (
        <Card key={index} >
          <CardActionArea>
            <CardMedia
              component="img"
              height="400"
              style={{ width: '100%', objectFit: 'contain' }}
              image={product.image}
              alt={product.name}
            />
            <CardContent className={theme && "darkcard"}>
              <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                {product.desc}
              </p>
              <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                {product.stock}
              </p>
              <Typography gutterBottom variant="h5" component="div">
                {product.price} $
              </Typography>
              <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                per {product.unit}
              </p>
            </CardContent>
            <CardActions  className={theme && "darkcard"}>
      <Button size="large" color="error" onClick={()=>{deleteproduct(product.id)}}>
        Delete
      </Button>
    </CardActions>
          </CardActionArea>
        </Card>
      ))}
    </div>
  )}
  </DialogContent>
</Dialog>

    </Card>
  );
};

export default Categorycard;
