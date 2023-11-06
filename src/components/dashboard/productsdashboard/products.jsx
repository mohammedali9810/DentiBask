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
      .get(`/products?page=${pages}`)
      .then((res) => {
        setProducts(res.data.products);
        setMaxPages(res.data.maxpages);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [pages]);

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
