import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import axiosinstance from '../../../axiosconfig';

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
    setOpenSeeOrderDialog(true);
  };

  const handleCloseSeeOrderDialog = () => {
    setOpenSeeOrderDialog(false);
  };

  // Add sample orders
  useEffect(() => {
    const sampleOrders = [
      {
        id: 1,
        orderId: 'ORD-001',
        customerName: 'John Doe',
        orderDate: '2023-11-04',
        totalPrice: 99.99,
        status: 'Processing',
      },
      {
        id: 2,
        orderId: 'ORD-002',
        customerName: 'Jane Smith',
        orderDate: '2023-11-05',
        totalPrice: 49.99,
        status: 'Shipped',
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
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell>{order.status}</TableCell>
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

      <Dialog open={openSeeOrderDialog} onClose={handleCloseSeeOrderDialog}>
        <DialogTitle>Order Detail</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedOrder && (
              <>
                <div>
                  <strong>Order Id:</strong> {selectedOrder.orderId}
                </div>
                <div>
                  <strong>Customer Name:</strong> {selectedOrder.customerName}
                </div>
                <div>
                  <strong>Order Date:</strong> {selectedOrder.orderDate}
                </div>
                <div>
                  <strong>Total Price:</strong> ${selectedOrder.totalPrice}
                </div>
                <div>
                  <strong>Status:</strong> {selectedOrder.status}
                </div>
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
