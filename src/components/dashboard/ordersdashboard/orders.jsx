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
  Typography,
} from '@mui/material';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  const handleSeeOrder = (orderId) => {
    console.log(`View Order ID: ${orderId}`);
    // Implement your logic to view order details, e.g., navigate to a separate page.
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
    <Typography variant="h4" gutterBottom>
        Orders Detail
      </Typography>
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
                    onClick={() => handleSeeOrder(order.orderId)}
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
    </div>
  );
};

export default Orders;
