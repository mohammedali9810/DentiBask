import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import axiosinstance from '../../../axiosconfig';
import Categorycard from './categorycard';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './categories.css';
import Addcategory from './addcategory';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);

  useEffect(() => {
    axiosinstance.get(`/Products/get_categories/`)
    .then((res)=>{setCategories(res.data);
    })
    .catch((err) => {console.log(err);});
  }, []);

  const handleOpenAddCategoryDialog = () => {
    setOpenAddCategoryDialog(true);
  };

  const handleCloseAddCategoryDialog = () => {
    setOpenAddCategoryDialog(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Button
        style={{ backgroundColor: 'blue', width: '60%', fontSize: '1.5rem', marginBottom: '2rem' }}
        variant="contained"
        color="success"
        onClick={handleOpenAddCategoryDialog}
      >
        Add Category
      </Button>
      <div className='categoriesgrid'>
        {categories &&
          categories.map((category, index) => <Categorycard key={index} category={category} />)}
      </div>
      <Dialog open={openAddCategoryDialog} onClose={handleCloseAddCategoryDialog}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <Addcategory handleClose={handleCloseAddCategoryDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;
