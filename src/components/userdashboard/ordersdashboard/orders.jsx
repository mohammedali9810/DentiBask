import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import axiosinstance from '../../../axiosconfig';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axiosinstance
    .get('/User/get_user_orders/',{
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer '+localStorage.getItem('dentibask-access-token'),
      },
      withCredentials: true,
    })
    .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
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





  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Action</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {orders && orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{new Date(order.created_at).toLocaleDateString('en-GB')}</TableCell>
                <TableCell>{order.total} $</TableCell>
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
                    onClick={() => {navigate(`/orderdetailsuser/${order.id}`)}}
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