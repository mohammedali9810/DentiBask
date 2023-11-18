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
    axiosinstance
        .delete(`/User/api/delete_order/${orderId}/`)
        .then((response) => {
            console.log(response.data.message);
            fetchOrders(); 
        })
        .catch((error) => {
            console.error('Error deleting order:', error);
        });
};
const handleCancelOrder = (orderId) => {
  axiosinstance
      .post(`/User/api/cancel_order/${orderId}/`)
      .then((response) => {
          console.log(response.data.message);
          fetchOrders(); 
      })
      .catch((error) => {
          console.error('Error canceling order:', error);
      });
};


  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{backgroundColor:"#2196f3", width:"100%"}}>
            <TableRow>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Order ID</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Date</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Total Price</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Status</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Action</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Action</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {orders && orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{order.id}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{new Date(order.created_at).toLocaleDateString('en-GB')}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{order.total} $</TableCell>
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
                    onClick={() => {navigate(`/orderdetailsuser/${order.id}`)}}
                    variant="outlined"
                    color="primary"
                  >
                    See Order
                  </Button>
                </TableCell>

                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>
                  {order.status === 'Delivered' || order.status === 'Cancelled' ? (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteOrder(order.Id)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  ) : (
                    <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleCancelOrder(order.id)}
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