import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import axiosinstance from '../../../axiosconfig';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Transactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchTransactions();
  }, []);


  const fetchTransactions = () => {
    axiosinstance
    .get('/User/get_user_transactions/',{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer '+localStorage.getItem('dentibask-access-token'),
          },
          withCredentials: true,
        })
      .then((res) => {
        console.log(res.data.transactions);
        setTransactions(res.data.transactions);
      })
      .catch((err) => {
        console.error(err);
      });
  };



  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  
  return (
    <div >
        <Table>
          <TableHead style={{backgroundColor:"#2196f3", width:"100%"}}>
            <TableRow>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Transaction ID</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Send From </TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Date</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Total Price</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction,index) => (
              <TableRow key={transaction.id} style={{textAlign:"center", backgroundColor:index%2 === 0 && "white"}}>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{transaction.id}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{transaction.user}</TableCell>  
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{transaction.created_at}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{transaction.amount} $</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>
                <Button
                    onClick={() => {navigate(`/orderdetailsuser/${transaction.order_id}`)}}
                    variant="outlined"
                    color="primary"

                  >
                    See Order Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>


      <div style={{ display: 'flex', justifyContent: 'center', marginTop:"2rem" }}>
        <Pagination
          count={Math.ceil(transactions.length / itemsPerPage)}
          color="primary"
          page={currentPage}
          onChange={(e, v) => setCurrentPage(v)}
        />
      </div>
    </div>
    
  );
};

export default Transactions;
