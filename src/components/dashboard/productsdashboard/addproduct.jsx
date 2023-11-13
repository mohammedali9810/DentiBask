import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axiosinstance from '../../../axiosconfig';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography'; 



const Addproduct = ({ handleClose }) => {
  const [product, setProduct] = useState({ name: '', price: 0, image: '', desc: '', Categ_id: 0,stock:0,unit:"" });
  const [producterr, setProductErr] = useState({ title: '', price: "",category:'' });
  const [categories, setCategories] = useState([]);
  const [csrf_token,setCsrfToken] = useState("");

  useEffect(()=>{
    axiosinstance.get('/Products/category/')
    .then((response)=>{
      console.log(response)
      setCategories(response.data);})
    .catch((error)=>{console.error(error);});

    axiosinstance.get('/Products/get_csrf_token/')
    .then((response) => {
      setCsrfToken(response.data.csrfToken);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  ,[])

  const handlechange = (e) => {
    if (e.target.name === 'title') {
      const titleValue = e.target.value.trim();
      if (titleValue.length < 4) {
        setProductErr({ ...producterr, title: "Must be at least 4 characters" });
      } else {
        setProductErr({ ...producterr, title: "" });
      }
      setProduct({ ...product, name: e.target.value });
    } else if (e.target.name === 'price') {
      const input = e.target.value.trim();
      if (input === '') {
        setProductErr({ ...producterr, price: "Required" });
      } else {
        const numericValue = parseFloat(input);
  
        if (isNaN(numericValue) || numericValue <= 0) {
          setProductErr({ ...producterr, price: "Must be a positive number" });
        } else {
          setProductErr({ ...producterr, price: "" });
          setProduct({ ...product, price: numericValue });
        }
      }
      setProduct({ ...product, price: e.target.value });
    } else if (e.target.name === 'image') {
      setProduct({ ...product, image: e.target.files[0] });
    } else if (e.target.name === 'desc') {
      setProduct({ ...product, desc: e.target.value });
    }
    if(e.target.name === 'category') {
        setProduct({ ...product, Categ_id: e.target.value });
    }
    if(e.target.name === 'stock') {
      setProduct({ ...product, stock: e.target.value });
  }
  if(e.target.name === 'unit') {
    setProduct({ ...product, unit: e.target.value });
}
  };
  const senddata = (e) => {
    e.preventDefault();
    if (producterr.category === "" && producterr.price === "" && producterr.title === "") {
      console.log(product);
      axiosinstance
        .post('/Products/products/', product, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrf_token,
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 201) {
            handleClose();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  
  

  return (

      <Container component="main" maxWidth="l">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Box component="form" noValidate onSubmit={senddata} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="title"
                  required
                  fullWidth
                  id="productTitle"
                  label="Product Title"
                  autoFocus
                  value={product.name}
                  onChange={handlechange}
                  error={Boolean(producterr.title)}
                />
                 {producterr.title && (
                  <Typography variant="caption" color="error">
                    {producterr.title}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Price"
                  label="Price"
                  name="price"
                  value={product.price}
                  onChange={handlechange}
                  error={Boolean(producterr.price)}
                />
                 {producterr.price && (
                  <Typography variant="caption" color="error">
                    {producterr.price}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Stock"
                  label="Stock"
                  name="stock"
                  value={product.stock}
                  onChange={handlechange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Unit"
                  label="Unit"
                  name="unit"
                  value={product.unit}
                  onChange={handlechange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 multiline
                  rows={3}
                  required
                  fullWidth
                  id="desc"
                  label="desc"
                  name="desc"
                  value={product.desc}
                  onChange={handlechange}
                />
              </Grid>
              <Grid item xs={12}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
              required
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={product.Categ_id}
               label="Category"
              name='category'
            onChange={handlechange}
        >
            { categories && categories.map((category,index) =>
             <MenuItem
              key={index} value={category.id}>{category.name}</MenuItem>)}
        </Select>
        </Grid>
            </Grid>
            <label className="custom-upload-button">
  <Button
    sx={{ mt: 3 }}
    fullWidth
    component="span"
    variant="contained"
    startIcon={<CloudUploadIcon />}
  >
    Upload Image
  </Button>
  <input
    type="file"
    name="image"
    onChange={handlechange}
    accept="image/*"
    style={{display:"none"}}
  />
      </label>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Product
            </Button>
          </Box>
        </Box>
      </Container>
  );
};

export default Addproduct;
