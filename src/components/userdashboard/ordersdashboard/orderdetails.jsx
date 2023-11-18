import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axiosinstance from '../../../axiosconfig';
import { Paper } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const Orderdetails = () => {
  const param = useParams();
  const [orderitems, setOrderitems] = useState([]);
  const [order, setOrder] = useState({});
  const [customer_email, setCustomerEmail] = useState("");

  useEffect(() => {
    axiosinstance(`/User/get_order_items_user/?order_id=${param.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('dentibask-access-token'),
      },
      withCredentials: true,
    })
      .then((response) => {
        setOrderitems(response.data.seriallized_items);
        console.log(response.data.customer_email);
        setCustomerEmail(response.data.customer_email);
        setOrder(response.data.order);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Paper
        elevation={3}
        style={{
          marginTop: '1rem',
          width: '98%',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          color: 'black',
          flexDirection: 'column',
          justifyContent: 'space-around',
          marginBottom:"2rem",
         backgroundColor:"beige", 
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', justifyContent: 'space-around',
         alignItems: 'center', width: '100%', textAlign:"center" }}>
          <p style={{ fontSize: '1.5rem' }}>Order Deatils:</p>
          <p><u>Customer</u> : {customer_email.length > 0 && customer_email} </p>
          <p><u>Date</u> : {orderitems.length > 0 && new Date(orderitems[0].created_at).toLocaleDateString('en-GB')}</p>
          <p><u>Total Amount</u> : {order.total > 0 && order.total} $</p>
        </div>

        {orderitems.length > 0 && orderitems.map((orderitem, index) => (
          <Paper
            elevation={4}
            key={index}
            style={{
              marginTop: '1rem',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              color: 'black',
              padding: '16px',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
          >
            <Card sx={{ display: 'flex', width: '100%' }}>
              <CardMedia
                component="img"
                height="150"
                image={orderitem.product_id.image}
                alt={orderitem.product_id.name}
                sx={{ width: '30%', objectFit: 'contain' }}
              />
              <CardContent sx={{ flex: 1, color:"#2196f3", fontWeight:"bold" }}>
                <Typography gutterBottom variant="h4" component="div">
                  {orderitem.product_id.name}
                </Typography>
                <Typography variant="p" color="text.secondary">
                  {orderitem.product_id.desc}
                </Typography>
                <div style={{display:"flex", justifyContent:"space-around",alignItems:"center", fontWeight:"bold", marginTop:"1rem"}}>
                  <Typography variant="p" color="text.secondary">
                  Price per {orderitem.product_id.unit} : {orderitem.price} $
                </Typography>
                <Typography variant="p" color="text.secondary">
                   Quantity : {orderitem.quantity}
                </Typography>
                <Typography variant="p" color="Highlight">
                   Total Price : {orderitem.total} $
                </Typography>
                </div>
                
              </CardContent>
            </Card>
          </Paper>
        ))}
      </Paper>
    </div>
  );
};

export default Orderdetails;
