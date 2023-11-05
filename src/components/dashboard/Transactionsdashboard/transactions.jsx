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
} from '@mui/material';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    axiosinstance
      .get('/transactions')
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const indexOfLasttransaction = currentPage * itemsPerPage;
  const indexOfFirsttransaction = indexOfLasttransaction - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirsttransaction, indexOfLasttransaction);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSeetransaction = (transactionId) => {
    console.log(`View transaction ID: ${transactionId}`);
    // Implement your logic to view transaction details, e.g., navigate to a separate page.
  };

  // Add sample transactions
  useEffect(() => {
    const sampleTransactions = [
      {
        id: 1,
        transactionId: 'TRA-001',
        SendFrom: 'John Doe',
        SendTo: 'Jane Smith',
        transactionDate: '2023-11-04',
        totalPrice: 99.99,
        status: 'Processing',
      },
      {
        id: 2,
        transactionId: 'TRA-002',
        SendFrom: 'Jane Smith',
        SendTo: 'John Doe',
        transactionDate: '2023-11-05',
        totalPrice: 49.99,
        status: 'Shipped',
      },
      // Add more sample transactions as needed
    ];

    setTransactions(sampleTransactions);
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Send From </TableCell>
              <TableCell>Send To </TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.transactionId}</TableCell>
                <TableCell>{transaction.SendFrom}</TableCell>  
                <TableCell>{transaction.SendTo}</TableCell>
                <TableCell>{transaction.transactionDate}</TableCell>
                <TableCell>${transaction.totalPrice}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleSeetransaction(transaction.transactionId)}
                    variant="outlined"
                    color="primary"
                  >
                    See Transaction
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(transactions.length / itemsPerPage)}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Transactions;
