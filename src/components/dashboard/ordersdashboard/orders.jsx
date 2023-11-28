import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import axiosinstance from '../../../axiosconfig';
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
} from '@mui/material';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [originalOrders, setOriginalOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const fetchOrders = () => {
    axiosinstance
      .get(`/User/get_all_orders/?page=${currentPage}`)
      .then((res) => {
        setOrders(res.data.orders);
        setOriginalOrders(res.data.orders);
        setMaxPages(Math.ceil(res.data.count / 12));
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
      });
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSeeOrder = (order) => {
    // Handle displaying details of the selected order (if needed)
  };

  const handleStatusChange = (event, orderId) => {
    const newStatus = event.target.value;

    // Update the status in the local state
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const isStatusModified = (orderId) => {
    // Check if the status is modified by comparing with the original status
    const originalOrder = originalOrders.find((order) => order.id === orderId);
    const currentOrder = orders.find((order) => order.id === orderId);

    return (
      originalOrder &&
      currentOrder &&
      originalOrder.status !== currentOrder.status
    );
  };

  const handleSaveOrderStatus = async (orderId) => {
    try {
        const csrfToken = await axiosinstance.get("/Products/get_csrf_token/");
        console.log(csrfToken.data.csrfToken);

        await axiosinstance.patch(
            `/User/change_order_status/${orderId}/`,orders.find((order) => order.id === orderId).status,

            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken.data.csrfToken,
                    'Authorization': 'Bearer ' + localStorage.getItem('dentibask-access-token'),
                },
            }
        );
        console.log("done successfully");
    } catch (error) {
        console.error(error);
    }
};
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: '#2196f3', width: '100%' }}>
            <TableRow>
              <TableCell style={{ textAlign: 'center', fontSize: '1.2rem' }}>
                Order ID
              </TableCell>
              <TableCell style={{ textAlign: 'center', fontSize: '1.2rem' }}>
                Customer
              </TableCell>
              <TableCell style={{ textAlign: 'center', fontSize: '1.2rem' }}>
                Date
              </TableCell>
              <TableCell style={{ textAlign: 'center', fontSize: '1.2rem' }}>
                Total Price
              </TableCell>
              <TableCell style={{ textAlign: 'center', fontSize: '1.2rem' }}>
                Status
              </TableCell>
              <TableCell style={{ textAlign: 'center', fontSize: '1.2rem' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell style={{ textAlign: 'center', fontSize: '1.2rem' }}>
                  {order.id}
                </TableCell>
                <TableCell style={{ textAlign: 'center', fontSize: '1.2rem' }}>
                  {order.user}
                </TableCell>
                <TableCell style={{ textAlign: 'center', fontSize: '1.2rem' }}>
                  {order.created_at}
                </TableCell>
                <TableCell style={{ textAlign: 'center', fontSize: '1.2rem' }}>
                  ${order.total}
                </TableCell>
                <TableCell style={{ textAlign: 'center', fontSize: '1.2rem' }}>
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
                <TableCell style={{ textAlign: 'center', fontSize: '1.2rem' }}>
                  <Button
                    onClick={() => handleSeeOrder(order)}
                    variant="outlined"
                    color="primary"
                  >
                    See Order
                  </Button>

                  {isStatusModified(order.id) && (
                    <Button
                      onClick={() => handleSaveOrderStatus(order.id)}
                      variant="outlined"
                      color="primary"
                    >
                      Save
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
          page={currentPage}
          onChange={handlePageChange}
          count={maxPages}
          color="primary"
        />
      </div>
    </div>
  );
};

export default Orders;
