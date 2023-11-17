import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axiosinstance from '../../../axiosconfig';
import Typography from '@mui/material/Typography'; 
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useNavigate} from "react-router-dom";


const Addcategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: '', image: '', desc: '', });
  const [categoryerr, setCategoryErr] = useState({ name: '',image:'',desc:'' });
  
  

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
    }else if (e.target.name === 'desc') {
      if(e.target.value.trim().length ===0){
        setCategoryErr({...categoryerr,desc:"Please enter a desc"})
      }
      else{
        setCategoryErr({...categoryerr,desc:""});
      }
      setCategory({ ...category, desc: e.target.value });
    }
  };
  const senddata = async (e) => {
    e.preventDefault();
    if(category.image === ""){
      setCategoryErr({...categoryerr,image:"Image must be added"});
    }
    else{
      setCategoryErr({...categoryerr,image:""});
    }
    if(categoryerr.name==="" &&  categoryerr.desc==="" && categoryerr.image ===""){
      const csrfToken = await axiosinstance.get("/Products/get_csrf_token/");
    axiosinstance
      .post('/Products/category/', category, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken.data.csrfToken,
          'Authorization': 'Bearer '+localStorage.getItem('dentibask-access-token'),
        },
        withCredentials: true,
      })
      .then(() => {
        navigate("/dashboard")
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
              </Grid>

            </Grid>
          

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
