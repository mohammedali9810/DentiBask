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

const Categorycard = (props) => {
  const { theme } = useContext(Theme);
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
  const [showProducts, setShowProducts] = useState(false); // State to manage product visibility

  const handleOpenAddCategoryDialog = () => {
    setOpenAddCategoryDialog(true);
  };

  const handleCloseAddCategoryDialog = () => {
    setOpenAddCategoryDialog(false);
  };

  const handleCloseShowProductsDialog = () => {
    setShowProducts(false);
  };

  // Sample categories
  const sampleCategories = [
    {
      id: 1,
      categoryId: 'CAT-001',
      categoryName: 'John Doe',
      categoryDescription: 'Jane Smith',
      categoryImage: 'Jane Smith',
      numberOfProduct: 12,
    },
    {
      id: 2,
      categoryId: 'CAT-002',
      categoryName: 'Jane Smith',
      categoryDescription: 'Jane Smith',
      categoryImage: 'Jane Smith',
      numberOfProduct: 10,
    },
    // Add more sample categories as needed
  ];

  const [categories, setCategories] = useState(sampleCategories);

  const handleDeleteCategory = (categoryId) => {
    const updatedCategories = categories.filter((category) => category.categoryId !== categoryId);
    setCategories(updatedCategories);
  };

  // Generate an array of sample products based on the numberOfProduct value
  const generateSampleProducts = (numberOfProducts) => {
    return Array.from({ length: numberOfProducts }, (_, index) => ({
      id: index,
      name: `Product ${index + 1}`,
      description: 'Description of the product',
      thumbnail: 'data:image/jpeg;base64,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',
    }));
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={props.category.thumbnail}
          alt="Category Thumbnail"
        />
        <CardContent className={theme && "darkcard"}>
          <Typography gutterBottom variant="h5" component="div">
            Category Name
          </Typography>
          <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
            <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
              Category description goes here {props.category.categoryDescription}
            </p>
          </span>
          <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
            Ordered: {props.category.numberOfProduct} times
          </p>
        </CardContent>
      </CardActionArea>
      <CardActions className={theme && "darkcard"}>
        <Button size="large" color="success" onClick={handleOpenAddCategoryDialog}>
          Edit
        </Button>
        <Button size="large" color="primary" onClick={() => setShowProducts(!showProducts)}>
          See Products
        </Button>
        <Button size="large" color="error" onClick={() => handleDeleteCategory(props.category.categoryId)} >
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
            {generateSampleProducts(props.category.numberOfProduct).map((product, index) => (
              <Card key={index} sx={{ minWidth: 600 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="700"
                    image={product.thumbnail}
                    alt={product.name}
                  />
                  <CardContent className={theme && "darkcard"}>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                      {product.description}
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
