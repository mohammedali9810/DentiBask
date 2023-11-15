import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Editclinic from "./editclinic";
import { useContext } from "react";
import { Theme } from "../../themecontext";
import axiosinstance from '../../../axiosconfig';
const Cliniccard = (props) => {
  const { theme } = useContext(Theme);
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const handleOpenAddProductDialog = () => {
    setOpenAddProductDialog(true);
  };

  const handleCloseAddProductDialog = () => {
    setOpenAddProductDialog(false);
  };
  return (
    <Card  sx={{ width:345 }}>
    <CardActionArea >
      <CardMedia
        component="img"
        style={{ height:"15rem",objectFit: 'contain' }}
        image={props.clinic.image}
        alt="green iguana"
      />
      <CardContent className={theme && "darkcard"} style={{ height:"16rem",objectFit: 'contain' }}>
        <Typography style={{fontWeight:"bold"}} gutterBottom variant="h5" component="div">
        {props.clinic.title}
        </Typography>
        <span style={{fontSize:"1rem", fontWeight:"bold"}}>
        {props.clinic.desc}
        </span>
        <p style={{fontWeight:"bold", fontSize:"1rem"}}>{props.clinic.price} $</p>
        <p style={{fontWeight:"bold", fontSize:"1rem"}}>{props.clinic.area} m2</p>
        <p style={{fontWeight:"bold", fontSize:"1rem"}}>Location: {props.clinic.location}</p>
      </CardContent>
    </CardActionArea>
    <CardActions  className={theme && "darkcard"}>
      <Button size="large" color="success" onClick={handleOpenAddProductDialog}>
        Edit
      </Button>
      <Button onClick={()=>{axiosinstance.delete('User/delete_clinic/',
  {
    data: { clinic_id: props.clinic.id },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('dentibask-access-token'),
    },
    withCredentials: true,

  })}} size="large" color="error">
        Delete
      </Button>
    </CardActions>
    <Dialog open={openAddProductDialog} onClose={handleCloseAddProductDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Editclinic clinic={props.clinic} />
        </DialogContent>
      </Dialog>
  </Card>
  )
}

export default Cliniccard;