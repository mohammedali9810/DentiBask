import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import axiosinstance from '../../../axiosconfig';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

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
  }, []);

  const fetchOrders = () => {
    axiosinstance
    .get('/User/userorder/')
    .then((res) => {
        setOrders(res.data.orders);
        setMaxPages(Math.ceil((res.data.count)/12));
      })
      .catch((err) => {
        console.error(err);
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

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.orderId !== orderId);
    setOrders(updatedOrders);
  };
  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.map((order) => {
      if (order.orderId === orderId) {
        return { ...order, status: 'Cancelled' };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const handleSeeOrder = (order) => {
    setSelectedOrder(order);
    fetchOrderItems(order.id); // Fetch items for the selected order
    setOpenSeeOrderDialog(true);
  };

  const handleCloseSeeOrderDialog = () => {
    setOpenSeeOrderDialog(false);
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
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{order.id}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}} >{order.user}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{order.created_at}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>${order.totalPrice}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>
                  <span
                    style={{
                      color:
                        order.status === 'Canceled'
                          ? 'red'
                          : order.status === 'Processing'
                            ? 'blue'
                            : order.status === 'Shipped'
                              ? 'gray'
                              : order.status === 'Delivered'
                                ? 'green'
                                : 'black', // Default color
                    }}
                  >
                    {order.status}

                  </span>
                </TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>
                  <Button
                    onClick={() => handleSeeOrder(order)}
                    variant="outlined"
                    color="primary"
                  >
                    See Order
                  </Button>
                </TableCell>

                <TableCell>
                  {order.status === 'Delivered' || order.status === 'Cancelled' ? (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteOrder(order.orderId)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleCancelOrder(order.orderId)}
                      startIcon={<CancelIcon />}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination page={pages} onChange={(e, v) => setPages(v)} count={maxpages} color="primary" />

      </div>

      <Dialog
        open={openSeeOrderDialog}
        onClose={handleCloseSeeOrderDialog}

        style={{ minWidth: 700 }}

        >        <DialogTitle>Order Detail</DialogTitle>
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