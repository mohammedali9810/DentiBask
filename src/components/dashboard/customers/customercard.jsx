import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import userimage from "./logo.png";
import axiosinstance from "../../../axiosconfig";
const Customercard = (props) => {
  return (
    <Card sx={{ width: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={props.customer.image ? props.customer.image : userimage}
          alt="Customer Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.customer.name} 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {props.customer.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Phone: {props.customer.phone}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="large" color="success">
          See Orders
        </Button>
        <Button onClick={()=>{
          axiosinstance.delete(`/User/delete_user/`, {
            data: { customer_email: props.customer.email }, // Pass data like this
            headers: {
              'Content-Type': 'application/json', // Set content type to JSON
              'Authorization': 'Bearer ' + localStorage.getItem('dentibask-access-token'),
            },
          })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.error(err);
          });
          
        }} size="large" color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Customercard;
