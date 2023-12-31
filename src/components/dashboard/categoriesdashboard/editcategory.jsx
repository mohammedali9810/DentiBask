import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axiosinstance from '../../../axiosconfig';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Editcategory = (props) => {
  const [category, setCategory] = useState({ name:'', image:'', desc:'' });
  const [categoryerr, setCategoryErr] = useState({ name:'', desc:'' });

  useEffect(() => {
    setCategory({ name: props.category.name, image: props.category.image, desc: props.category.desc });
  }, [props.category.name, props.category.image, props.category.desc]);
  

  const handlechange = (e) => {
    if (e.target.name === 'name') {
      const nameValue = e.target.value.trim();
      if (nameValue.length < 4) {
        setCategoryErr({ ...categoryerr, name: "Must be at least 4 characters" });
      } else {
        setCategoryErr({ ...categoryerr, name: "" });
      }
      setCategory({ ...category, name: e.target.value });
    } else if (e.target.name === 'image') {
      setCategory({ ...category, image: e.target.files[0] });
    } else if (e.target.name === 'desc') {
      if(e.target.value.trim() ===''){
        setCategoryErr({ ...categoryerr, desc: "Descriptin is required" });
      }
      else{
        setCategoryErr({ ...categoryerr, desc: "" });
      }
      setCategory({ ...category, desc: e.target.value });
    }

  };
  const senddata = async (e) => {
    e.preventDefault();
    if (categoryerr.name === "" && categoryerr.desc ==="") {
      const csrfToken = await axiosinstance.get("/Products/get_csrf_token/");
      axiosinstance
        .patch(`/Products/update_category/`, {"category_id":props.category.id,...category}, {
          headers: {
            'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken.data.csrfToken,
          'Authorization': 'Bearer '+localStorage.getItem('dentibask-access-token'),
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          if(res.status ===200){
            props.handleCloseAddCategoryDialog();
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
          <Grid item xs={12}>
            <img name="image" src={category.image} alt="Category image" 
            style={{ width: '100%',height:"20rem", objectFit: "contain" }}
            onChange={handlechange}
            rows={2} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="categoryname"
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
              <Grid item xs={12} sm={6}>
            <label style={{height:"100%", width:"100%"}}>
  <Button
    style={{height:"100%", width:"100%"}}
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
            </Grid>
        
              <Grid item xs={12}>
                <TextField
                 multiline
                  rows={3}
                  required
                  fullWidth
                  id="desc"
                  label="Description"
                  name="desc"
                  value={category.desc}
                  onChange={handlechange}
                />
                 {categoryerr.desc && (
                  <Typography variant="caption" color="error">
                    {categoryerr.desc}
                  </Typography>
                )}
              </Grid>
             

            </Grid>
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
  );
};

export default Editcategory;
