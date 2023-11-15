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
  const [category, setCategory] = useState({ name: '', image: '', description: '' });
  const [categoryerr, setCategoryErr] = useState({ name: '' });
  const defaultTheme = createTheme();
  const [, setCategories] = useState([]);

  useEffect(() => {
    axiosinstance.get('/categories')
      .then((response) => { setCategories(response.data); })
      .catch((error) => { console.error(error); });

    if (props.category) {
      setCategory({
        name: props.category.name || '',
        image: props.category.image || '',
        description: props.category.description || ''
      });
    }
  }, [props.category]);

  const handlechange = (e) => {
    if (e.target.name === 'name') {
      const nameValue = e.target.value.trim();
      if (nameValue.length < 4) {
        setCategoryErr({ ...categoryerr, name: "Must be at least 4 characters" });
      } else {
        setCategoryErr({ ...categoryerr, name: "" });
      }
      setCategory({ ...category, name: e.target.value });
    } else if (e.target.name === 'description') {
      setCategory({ ...category, description: e.target.value });
    } else if (e.target.name === 'image') {
      setCategory({ ...category, image: e.target.files[0] });
    }
  };

  const senddata = (e) => {
    e.preventDefault();
    if (categoryerr.name === "") {
      const formData = new FormData();
      formData.append("name", category.name);
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
                  name="name"
                  required
                  fullWidth
                  id="categoryName"
                  label="Category Name"
                  autoFocus
                  value={category.name}
                  onChange={handlechange}
                  error={Boolean(categoryerr.name)}
                />
                {categoryerr.name && (
                  <Typography variant="caption" color="error">
                    {categoryerr.name}
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
