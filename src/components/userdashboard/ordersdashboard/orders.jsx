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
    .get('/User/get_user_orders/',{
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer '+localStorage.getItem('dentibask-access-token'),
      },
      withCredentials: true,
    })
    .then((res) => {
        setOrders(res.data);
        setMaxPages(Math.ceil((res.data.count)/12));
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
            {orders && orders.map((order) => (
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
      <Pagination page={pages} onChange={(e, v) => setPages(v)} count={maxpages} color="primary" />

      </div>
    </div>
  );
};

export default Orders;