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
  const [categories,setCategories] = useState([]);
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);

  useEffect(() => {
    axiosinstance
      .get(`/Products/get_products/?page=${pages}`,
      {headers: {'Content-Type': 'application/json', 
    }})
      .then((res) => {
        setProducts(res.data.results);
        console.log(res.data.results);
        setMaxPages(Math.ceil((res.data.count)/12));
      })
      .catch((err) => {
        console.error(err);
      });
      axiosinstance.get('/Products/get_categories/')
      .then((res)=>{setCategories(res.data); console.log(res.data);})
      .catch((err) => {console.log(err);});
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
          products.map((product, index) => <Productcard key={index} product={product} categories={categories} />)}
      </div>
      <Pagination page={pages} onChange={(e, v) => setPages(v)} count={maxpages} color="primary" />
      <Dialog open={openAddProductDialog} onClose={handleCloseAddProductDialog}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <Addproduct handleClose={handleCloseAddProductDialog} categories={categories}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
