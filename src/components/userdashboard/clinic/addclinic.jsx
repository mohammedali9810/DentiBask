import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axiosinstance from '../../../axiosconfig';
import Typography from '@mui/material/Typography'; 



const Addclinic = ({ handleClose }) => {
  const [product, setProduct] = useState({ title: '', price: 0, image: '', desc: '', location:'',area:0 });
  const [producterr, setProductErr] = useState({ title: '', price: "",location:'',area:'' });

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
    } else if (e.target.name === 'desc') {
      setProduct({ ...product, desc: e.target.value });
    }

    else if (e.target.name === 'location') {
      const titleValue = e.target.value.trim();
      if (titleValue.length < 4) {
        setProductErr({ ...producterr, location: "Must be at least 4 characters" });
      } else {
        setProductErr({ ...producterr, location: "" });
      }
      setProduct({ ...product, location: e.target.value });
    } 

    else if (e.target.name === 'area') {
      const input = e.target.value.trim();
      if (input === '') {
        setProductErr({ ...producterr, area: "Required" });
      } else {
        const numericValue = parseFloat(input);
  
        if (isNaN(numericValue) || numericValue <= 0) {
          setProductErr({ ...producterr, area: "Must be a positive number" });
        } else {
          setProductErr({ ...producterr, area: "" });
          setProduct({ ...product, area: numericValue });
        }
      }
      setProduct({ ...product, area: e.target.value });
    }


  };


const senddata = async (e) => {
  e.preventDefault();
  try {

    const csrfToken = await axiosinstance.get("/Products/get_csrf_token/");
    console.log(localStorage.getItem('dentibask-access-token'));
    const response = await axiosinstance.post('/User/addclinic/', product, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': csrfToken.data.csrfToken,
        'Authorization': 'Bearer '+localStorage.getItem('dentibask-access-token'),
      },
      withCredentials: true,
    });

    // Handle the response as needed
    console.log(response);

  } catch (error) {
    console.error(error);
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
                  label="Clinic Title"
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
                  id="Location"
                  label="Location"
                  name="location"
                  value={product.location}
                  onChange={handlechange}
                  error={Boolean(producterr.location)}
                />
                 {producterr.location && (
                  <Typography variant="caption" color="error">
                    {producterr.location}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                 multiline
                  rows={3}
                  required
                  fullWidth
                  id="desc"
                  label="Descreption"
                  name="desc"
                  value={product.desc}
                  onChange={handlechange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Area"
                  label="Area"
                  name="area"
                  value={product.area}
                  onChange={handlechange}
                  error={Boolean(producterr.area)}
                />
                 {producterr.area && (
                  <Typography variant="caption" color="error">
                    {producterr.area}
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
              Add Clinic
            </Button>
          </Box>
        </Box>
      </Container>
  );
};

export default Addclinic;
