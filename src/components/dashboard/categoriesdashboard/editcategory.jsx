import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axiosinstance from '../../../axiosconfig';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Editcategory = (props) => {
  const [category, setCategory] = useState({ title: '', image: '', description: '' });
  const [categoryerr, setCategoryErr] = useState({ title: '' });
  const defaultTheme = createTheme();
  const [, setCategories] = useState([]);

  useEffect(() => {
    axiosinstance.get('/categories')
      .then((response) => { setCategories(response.data); })
      .catch((error) => { console.error(error); });
  
    setCategory({ title: props.category.title, image: props.category.image, description: props.category.description });
  }, [props.category.title, props.category.image, props.category.description]);
  

  const handlechange = (e) => {
    if (e.target.name === 'title') {
      const titleValue = e.target.value.trim();
      if (titleValue.length < 4) {
        setCategoryErr({ ...categoryerr, title: "Must be at least 4 characters" });
      } else {
        setCategoryErr({ ...categoryerr, title: "" });
      }
      setCategory({ ...category, title: e.target.value });
    } else if (e.target.name === 'price') {
      const input = e.target.value.trim();
      if (input === '') {
        setCategoryErr({ ...categoryerr, price: "Required" });
      } else {
        const numericValue = parseFloat(input);

        if (isNaN(numericValue) || numericValue <= 0) {
          setCategoryErr({ ...categoryerr, price: "Must be a positive number" });
        } else if (numericValue < category.collected) {
          setCategoryErr({ ...categoryerr, price: "Can't be less than the collected price" });
        } else {
          setCategoryErr({ ...categoryerr, price: "" });
          setCategory({ ...category, price: numericValue });
        }
      }
      setCategory({ ...category, price: e.target.value });
    } else if (e.target.name === 'image') {
      setCategory({ ...category, image: e.target.files[0] });
    } else if (e.target.name === 'description') {
      setCategory({ ...category, description: e.target.value });
    }

  };
  const senddata = (e) => {
    e.preventDefault();
    if (categoryerr.title === "") {
      const formData = new FormData();
      formData.append("title", category.title);
      formData.append("description", category.description);
      formData.append("image", category.image);

      axiosinstance
        .post('/editcategory', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        })
        .then(() => {

        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  return (
    <ThemeProvider theme={defaultTheme}>
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
              <Grid item xs={12}>
                <img src={category.image} alt="" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="title"
                  required
                  fullWidth
                  id="categoryTitle"
                  label="Category Title"
                  autoFocus
                  value={category.title}
                  onChange={handlechange}
                  error={Boolean(categoryerr.title)}
                />
                {categoryerr.title && (
                  <Typography variant="caption" color="error">
                    {categoryerr.title}
                  </Typography>
                )}
              </Grid>
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
                value={category.description}
                onChange={handlechange}
              />
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
                style={{ display: "none" }}
              />
            </label>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit Category
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Editcategory;
