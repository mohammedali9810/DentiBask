import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import axiosinstance from '../../../axiosconfig';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea'; 
import Typography from '@mui/material/Typography';
import { Select, MenuItem } from '@mui/material';


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [openSeeOrderDialog, setOpenSeeOrderDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [pages, setPages] = useState(1);
  const [maxpages, setMaxPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const fetchOrders = () => {
    axiosinstance
      .get(`/User/get_all_orders/?page=${currentPage}`)
      .then((res) => {
          setOrders(res.data.orders);
          setMaxPages(Math.ceil((res.data.count)/12));
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
      });
  };

  const fetchOrderItems = (orderId) => {
    axiosinstance
      .get(`/User/get_items_in_order/${orderId}`)
      .then((res) => {
        setOrderItems(res.data.items);
      })
      .catch((err) => {
        console.error('Error fetching order items:', err);
      });
  };


  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSeeOrder = (order) => {
    setSelectedOrder(order);
    fetchOrderItems(order.id); 
    setOpenSeeOrderDialog(true);
  };


  const handleCloseSeeOrderDialog = () => {
    setOpenSeeOrderDialog(false);
  };


  const handleStatusChange = (event, orderId) => {
    const newStatus = event.target.value;
  
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  
    axiosinstance
  .post(`/User/change_order_status/${orderId}/`, { new_status: newStatus })
  .then((res) => {
    console.log('Order status update response:', res.data.order);
  })
  .catch((err) => {
    console.error('Error updating order status:', err);
    // Handle the error gracefully, e.g., show an error message to the user
  });
  };
  
  const handleSaveOrderStatus = (orderId) => {
    // Make an API call to save the updated status in the database
    axiosinstance
      .post(`/User/save_order_status/${orderId}/`)
      .then((res) => {
        console.log('Order status saved successfully:', res.data.order);
      })
      .catch((err) => {
        console.error('Error saving order status:', err);
        // Handle the error gracefully, e.g., show an error message to the user
      });
  };
  

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{backgroundColor:"#2196f3", width:"100%"}}>
            <TableRow>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Order ID</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Customer</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Date</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Total Price</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Status</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{order.id}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{order.user}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{order.created_at}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>${order.total}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>
         <Select
          value={order.status}
          onChange={(e) => handleStatusChange(e, order.id)}
        >

    <MenuItem value="Canceled" style={{ color: 'red' }}>
      Canceled
      
    </MenuItem>
    <MenuItem value="Processing" style={{ color: 'blue' }}>
      Processing
    </MenuItem>
    <MenuItem value="Shipped" style={{ color: 'gray' }}>
      Shipped
    </MenuItem>
    <MenuItem value="Delivered" style={{ color: 'green' }}>
      Delivered
    </MenuItem>
    <MenuItem value="Other" style={{ color: 'black' }}>
      Other
    </MenuItem>
  </Select>
</TableCell>

                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>
                  <Button
                    onClick={() => handleSeeOrder(order)}
                    variant="outlined"
                    color="primary"
                  >
                    See Order
                  </Button>

                  <Button
          onClick={() => handleSaveOrderStatus(order.id)}
          variant="outlined"
          color="primary"
        >
          Save
        </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          page={currentPage}
          onChange={handlePageChange}
          count={maxpages}
          color="primary"
        />
      </div>

      <Dialog
        open={openSeeOrderDialog}
        onClose={handleCloseSeeOrderDialog}
        style={{ minWidth: 700 }}

        >   
        
             <DialogTitle>Order Detail</DialogTitle>
        <DialogContent>
          <DialogContentText
                  style={{ minWidth: 500 }}

          >
            {selectedOrder && (
              <>
                <div>
                  <strong>Order Id:</strong> {selectedOrder.orderId}
                </div>
                <div>
                  <strong>Customer Name:</strong> {selectedOrder.customerName}
                </div>
                <div>
                  <strong>Created At:</strong> {selectedOrder.created_at}
                </div>
                <div>
                  <strong>Total Price:</strong> ${selectedOrder.total}
                </div>
                <div>
                  <strong>Number Of Products:</strong> {selectedOrder.numberOfProduct}
                </div>
                <div>
                  <strong>Status:</strong> {selectedOrder.status}
                </div>

                <Typography variant="h6" gutterBottom>
                  Products
                </Typography>

                {orderItems.map((product) => (
                  <Card key={product.id}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={product.thumbnail}
                        alt={product.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.name}
                        </Typography>
                        <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                          {product.description}
                        </span>
                        <p style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                          Price: ${product.price}
                        </p>
                        <p style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                          Category: {product.category}
                        </p>
                        <p style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                          Ordered: {product.ordered} times
                        </p>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSeeOrderDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Orders;