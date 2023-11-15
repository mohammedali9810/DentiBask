import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import axiosinstance from '../../../axiosconfig';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

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
  const [openSeeTransactionDialog, setOpenSeeTransactionDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    axiosinstance
      .get('/User/usertransaction/')
      .then((res) => {
        setTransactions(res.data.transactions);
      })
      .catch((err) => {
        console.error(err);
      });
  };


  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSeeTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenSeeTransactionDialog(true);
  };
  

  const handleCloseSeeTransactionDialog = () => {
    setOpenSeeTransactionDialog(false);
  };
  

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.created_at}</TableCell>
                <TableCell>${transaction.amount}</TableCell>
                <TableCell>                  <span
                    style={{
                      color:
                      transaction.status === 'Canceled'
                          ? 'red'
                          : transaction.status === 'Processing'
                            ? 'blue'
                              : transaction.status === 'Delivered'
                                ? 'green'
                                : 'black', // Default color
                    }}
                  >
                    {transaction.status}

                  </span>
                  </TableCell>
                <TableCell>
                <Button
                    onClick={() => handleSeeTransaction(transaction)}
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

      <Dialog open={openSeeTransactionDialog} onClose={handleCloseSeeTransactionDialog}>
  <DialogTitle>Transaction Details</DialogTitle>
  <DialogContent>
    {/* Display transaction details here */}
    {selectedTransaction && (
      <div>
        <p>Transaction ID: {selectedTransaction.transactionId}</p>
        <p>Send From: {selectedTransaction.SendFrom}</p>
        <p>Date: {selectedTransaction.transactionDate}</p>
        <p>Total Price: ${selectedTransaction.totalPrice}</p>
        <p>Status: {selectedTransaction.status}</p>
        {/* Add more transaction details here */}
      </div>
    )}
  </DialogContent>
</Dialog>

    </div>
    
  );
};

export default Transactions;
