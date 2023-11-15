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


// {
//   "id": 6,
//   "name": "Equipment",
//   "desc": "High Value Equipment for all dental needs.",
//   "image": "https://dentibaskbucket.s3.amazonaws.com/images/category/category_20231110121118.jpg"
// }


const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);

  useEffect(() => {
    console.log('Fetching data from the API...');
    axiosinstance
      .get(`/Products/category/`)
      .then((res) => {
        console.log('API Response:', res.data);
        setCategories(res.data.categories);
        setMaxPages(res.data.maxpages);
      })
      .catch((err) => {
        console.error('API Error:', err);
      });
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
