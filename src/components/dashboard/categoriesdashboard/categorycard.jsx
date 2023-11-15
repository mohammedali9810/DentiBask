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

  const showproducts =()=>{
    axiosinstance.get(`get_category_products/?category_id=${props.category.id}`)
    .then((res)=>{setCategoryProducts(res.data);})
    .catch((err)=>{console.log(err);});
    setShowProducts(!showProducts);
  }


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
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
        <Button size="large" color="error" >
          Delete
        </Button>
      </CardActions>
      <Dialog open={openAddCategoryDialog} onClose={handleCloseAddCategoryDialog}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <Editcategory category={props.category} />
        </DialogContent>
      </Dialog>

      <Dialog open={showProducts} onClose={handleCloseShowProductsDialog} style={{ minWidth: 700 }}>
        {props.category.numberOfProduct > 0 && (
          <div>
            {categoryproducts.map((product, index) => (
              <Card key={index} sx={{ minWidth: 600 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="700"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent className={theme && "darkcard"}>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.price}
                    </Typography>
                    <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                      {product.desc}
                    </span>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>
        )}
      </Dialog>
    </Card>
  );
};

export default Categorycard;
