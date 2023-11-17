import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import axiosinstance from '../../../axiosconfig';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardMedia';
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

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axiosinstance
      .get('/User/get_all_orders/')
      .then((res) => {
          setOrders(res.data.orders);
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
        // Handle the error gracefully, e.g., show an error message to the user
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
    fetchOrderItems(order.id); // Fetch items for the selected order
    setOpenSeeOrderDialog(true);
  };


  const handleCloseSeeOrderDialog = () => {
    setOpenSeeOrderDialog(false);
  };
  const handleStatusChange = (event, orderId) => {
    const newStatus = event.target.value;
  
    // Update the order status in the state or make an API call to update it on the server
    // For example, you can update the state like this:
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };
  

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.user}</TableCell>
                <TableCell>{order.created_at}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell>
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

                <TableCell>
                  <Button
                    onClick={() => handleSeeOrder(order)}
                    variant="outlined"
                    color="primary"
                  >
                    See Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(orders.length / itemsPerPage)}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
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
                  <strong>Total Price:</strong> ${selectedOrder.totalPrice}
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