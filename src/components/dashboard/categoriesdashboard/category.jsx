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
  const [pages, setPages] = useState(1);
  const [maxpages, setMaxPages] = useState(1);
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);

  useEffect(() => {
    const sampleCategories = [
      {
        id: 1,
        categoryId: 'CAT-001',
        customerName: 'Eq',
        numberOfProduct: 12,
      },
      {
        id: 2,
        categoryId: 'CAT-002',
        customerName: 'Jane Smith',
        numberOfProduct: 10,
      },
      // Add more sample categories as needed
    ];

    setCategories(sampleCategories);
  }, []);

  useEffect(() => {
    axiosinstance
      .get(`/categories?page=${pages}`)
      .then((res) => {
        setCategories(res.data.categories);
        setMaxPages(res.data.maxpages);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [pages]);

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
        {Array.isArray(categories) &&
          categories.map((category, index) => <Categorycard key={index} category={category} />)}
      </div>
      <Pagination page={pages} onChange={(e, v) => setPages(v)} count={maxpages} color="primary" />
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
