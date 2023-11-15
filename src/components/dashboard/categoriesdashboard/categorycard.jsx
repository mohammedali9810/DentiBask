import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button, CardActions, Dialog, DialogContent, DialogTitle } from '@mui/material';
import axiosinstance from '../../../axiosconfig';
import Editcategory from './editcategory';

const Categorycard = (props) => {
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    // Fetch category data when the component mounts
    if (props.category) {
      axiosinstance.get(`/Products/category/${props.category.categoryId}`)
        .then((response) => {
          setCategoryData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching category data:', error);
        });
    }
  }, [props.category]);

  const handleOpenAddCategoryDialog = () => {
    setOpenAddCategoryDialog(true);
  };

  const handleCloseAddCategoryDialog = () => {
    setOpenAddCategoryDialog(false);
  };

  const handleCloseShowProductsDialog = () => {
    setShowProducts(false);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      // Make API call to delete category
      await axiosinstance.delete(`/Products/category/${categoryId}`);
      // Handle category deletion in UI if needed
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* ... Existing code ... */}
      <Dialog open={openAddCategoryDialog} onClose={handleCloseAddCategoryDialog}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <Editcategory category={categoryData} />
        </DialogContent>
      </Dialog>

      <Dialog open={showProducts} onClose={handleCloseShowProductsDialog} style={{ minWidth: 700 }}>
        {/* Render category details */}
        {categoryData && (
          <div>
            <Typography variant="h5" component="div">
              {categoryData.name}
            </Typography>
            <Typography variant="body1" component="div">
              {categoryData.desc}
            </Typography>
            <Typography variant="body1" component="div">
              Ordered: {categoryData.numberOfProduct} times
            </Typography>

            {/* Render products */}
            {categoryData.products.map((product, index) => (
              <Card key={index} sx={{ minWidth: 600 }}>
                {/* Render product details */}
                {/* ... */}
              </Card>
            ))}
          </div>
        )}
      </Dialog>
    </Card>
  );
};

export default Categorycard;
