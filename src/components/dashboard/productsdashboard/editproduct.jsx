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

const Editproduct = (props) => {
  const [product, setProduct] = useState({ id:"",title: '', price: 0, image:'',
  description: '',categorry_id:'',stock:0,unit:'' });
  const [producterr, setProductErr] = useState({ title: '', price: "",category:'',stock:'',unit:'' });

  useEffect(()=>{
    setProduct({id:props.product.id,title:props.product.name, price:props.product.price,
    categorry_id:props.product.Categ_id,
    image:props.product.image,description:props.product.desc, stock:props.product.stock, unit:props.product.unit});
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
      setProduct({ ...product, title: e.target.value });
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
    } else if (e.target.name === 'description') {
      setProduct({ ...product, description: e.target.value });
    }
    else if(e.target.name === 'category') {
        setProduct({ ...product, categorry_id: e.target.value });
    }
    else if(e.target.name === 'stock') {
      const stock = parseInt(e.target.value);
      if(isNaN(stock) || stock < 0) {
        setProductErr({ ...producterr, stock: "Stock must be a positive number" });
      }
      else{
        setProductErr({ ...producterr, stock: "" });
      }
      setProduct({ ...product, stock: e.target.value });
  }
  else if(e.target.name === 'unit') {
    setProduct({ ...product, unit: e.target.value });
}
  };
  const senddata = async(e) => {
    e.preventDefault();
    if (producterr.category === "" && producterr.price === "" && producterr.title === "") {
      const csrfToken = await axiosinstance.get("/Products/get_csrf_token/");
      axiosinstance
        .put(`/Products/update_product/`, product, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrfToken,
            'Authorization': 'Bearer '+localStorage.getItem('dentibask-access-token'),
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            props.handleClose(false);
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

          <Box  sx={{ mt: 2 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
              <img src={product.image} alt="" style={{objectFit:"contain"}} />
            </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="title"
                  required
                  fullWidth
                  id="productTitle"
                  label="Product Title"
                  autoFocus
                  value={product.title}
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
              <Grid item xs={12}>
                <TextField
                 multiline
                  rows={3}
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  value={product.description}
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
  value={product.categorry_id}
  label="Category"
  name='category'
  onChange={handlechange}
>
  {props.categories &&
    props.categories.map((category, index) =>
      category.id === props.product.Categ_id ? (
        <MenuItem selected key={index} value={category.id}>
          {category.name}
        </MenuItem>
      ) : (
        <MenuItem key={index} value={category.id}>
          {category.name}
        </MenuItem>
      )
    )
  }
</Select>

        </Grid>
        <Grid item xs={12} sm={6}>
                <TextField
                  name="stock"
                  required
                  fullWidth
                  id="stock"
                  label="Stock"
                  autoFocus
                  value={product.stock}
                  onChange={handlechange}
                  error={Boolean(producterr.stock)}
                />
                 {producterr.stock && (
                  <Typography variant="caption" color="error">
                    {producterr.stock}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="unit"
                  label="Unit"
                  name="unit"
                  value={product.unit}
                  onChange={handlechange}
                  error={Boolean(producterr.unit)}
                />
                 {producterr.unit && (
                  <Typography variant="caption" color="error">
                    {producterr.unit}
                  </Typography>
                )}
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
              onClick={(e) => senddata(e)} 
            >
              Apply Editation
            </Button>
          </Box>
        </Box>
      </Container>
  );
};

export default Editproduct;
