import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import axiosinstance from '../../../axiosconfig';
import Productcard from './productcard';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './products.css';
import Addproduct from './addproduct';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [maxpages, setMaxPages] = useState(1);
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);

  useEffect(() => {
    axiosinstance
      .get(`/Products/products/?page=${pages}`,
      {headers: {'Content-Type': 'application/json', 
      Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5ODY4MzEwLCJpYXQiOjE2OTk4NjgwMTAsImp0aSI6ImM2NjhiM2M4M2JkYTQ2YTU5MWI3MjY3ZDdkYTZjN2Y0IiwidXNlcl9pZCI6NX0.I0S8S26HNC4Q1iLqdjXK4nYMIfl-ZOZ7NV6h06jXUNE'
    },
  withCredentials:true})
      .then((res) => {
        setProducts(res.data.results);
        setMaxPages(Math.ceil((res.data.count)/12));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [pages,products]);

  const handleOpenAddProductDialog = () => {
    setOpenAddProductDialog(true);
  };

  const handleCloseAddProductDialog = () => {
    setOpenAddProductDialog(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Button
        style={{ backgroundColor: 'blue', width: '60%', fontSize: '1.5rem', marginBottom: '2rem' }}
        variant="contained"
        color="success"
        onClick={handleOpenAddProductDialog}
      >
        Add Product
      </Button>
      <div className='productsgrid'>
        {Array.isArray(products) &&
          products.map((product, index) => <Productcard key={index} product={product} />)}
      </div>
      <Pagination page={pages} onChange={(e, v) => setPages(v)} count={maxpages} color="primary" />
      <Dialog open={openAddProductDialog} onClose={handleCloseAddProductDialog}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <Addproduct handleClose={handleCloseAddProductDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
