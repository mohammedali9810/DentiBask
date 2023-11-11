import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import axiosinstance from '../../../axiosconfig';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


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
  const [selectedOrderProducts, setSelectedOrderProducts] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axiosinstance
      .get('/orders')
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };



  const handleSeeOrder = (order) => {
    setSelectedOrder(order);
    setSelectedOrderProducts(generateSampleProducts(order.numberOfProduct));
    setOpenSeeOrderDialog(true);
  };

  const handleCloseSeeOrderDialog = () => {
    setOpenSeeOrderDialog(false);
  };

  const generateSampleProducts = (numberOfProducts) => {
    const sampleProducts = [];
    for (let i = 0; i < numberOfProducts; i++) {
      sampleProducts.push({
        id: i,
        name: `Product ${i + 1}`,
        description: `Description of Product ${i + 1}`,
        price: 200,
        category: 'Instrument',
        ordered: 3000,
        thumbnail: 'image_url_here',
      });
    }
    return sampleProducts;
  };
  // Add sample orders
  useEffect(() => {
    const sampleOrders = [
      {
        id: 1,
        orderId: 'ORD-001',
        customerName: 'John Doe',
        created_at: '2023-11-04',
        totalPrice: 99.99,
        status: 'Processing',
        numberOfProduct: '3',

      },
      {
        id: 2,
        orderId: 'ORD-002',
        customerName: 'Jane Smith',
        created_at: '2023-11-05',
        totalPrice: 49.99,
        status: 'Shipped',
        numberOfProduct: '3',

      },
      // Add more sample orders as needed
    ];



    setOrders(sampleOrders);
  }, []);

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
            {currentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.created_at}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell>
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

                {selectedOrderProducts.map((product) => (
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