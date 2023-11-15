import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axiosinstance from '../../../axiosconfig';
import Typography from '@mui/material/Typography'; 
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const Addcategory = ({ handleClose }) => {
  const [category, setCategory] = useState({ title: '', image: '', description: '', });
  const [categoryerr, setCategoryErr] = useState({ title: '', });
  const [ setCategories] = useState([]);

  useEffect(() => {
    axiosinstance.get('/categories')
      .then((response) => { setCategories(response.data); })
      .catch((error) => { console.error(error); });
  }, [setCategories]);
  
  

  const handlechange = (e) => {
    if (e.target.name === 'title') {
      const titleValue = e.target.value.trim();
      if (titleValue.length < 4) {
        setCategoryErr({ ...categoryerr, title: "Must be at least 4 characters" });
      } else {
        setCategoryErr({ ...categoryerr, title: "" });
      }
      setCategory({ ...category, title: e.target.value });
    } else if (e.target.name === 'image') {
      setCategory({ ...category, image: e.target.files[0] });
    }else if (e.target.name === 'description') {
      setCategory({ ...category, description: e.target.value });
    }
    if(e.target.name === 'category') {
        if(e.target.value.trim().length === 0){
            setCategoryErr({ ...categoryerr, category: "Category must be added" });
        }
        else{
            setCategoryErr({ ...categoryerr, category: "" });
        }
        setCategory({ ...category, category: e.target.value });
    }
  };
  const senddata = (e) => {
    e.preventDefault();
    if(categoryerr.category==="" &&  categoryerr.title===""){
    const formData = new FormData();
    formData.append("title", category.title);
    formData.append("description", category.description);
    formData.append("image", category.image);

    axiosinstance
      .post('/addcategory', formData, {
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
              Add Category
            </Button>
          </Box>
        </Box>
      </Container>
  );
};

export default Addcategory;
