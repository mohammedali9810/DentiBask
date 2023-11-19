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

const Rents = () => {
  const [rents, setRents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [pages, setPages] = useState(1);
  const [maxpages, setMaxPages] = useState(1);

  useEffect(() => {
    fetchRents();
  }, []);

  const fetchRents = () => {
    axiosinstance
    .get('/User/userrent/')
      .then((res) => {
        setRents(res.data.rents);
        setMaxPages(Math.ceil((res.data.count)/12));
      })
      .catch((err) => {
        console.error(err);
      });
  };



  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };



  const handleDeleteRent = (rentId) => {

    const updatedRents = rents.filter((rent) => rent.rentId !== rentId);
    setRents(updatedRents);
  };

  const handleCancelRent = (rentId) => {
    const updatedRents = rents.map((rent) => {
      if (rent.rentId === rentId) {
        return { ...rent, status: 'Cancelled' };
      }
      return rent;
    });
    setRents(updatedRents);
  };

  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead  style={{backgroundColor:"#2196f3", width:"100%"}}>
            <TableRow>
            <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Rent ID</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Renter</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Start Date</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>End Date</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Duration Months</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Price</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Created At</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rents.map((rent) => (
              <TableRow key={rent.id}>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{rent.id}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{rent.renter}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{rent.start_date}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{rent.end_date}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{rent.duration_months}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>${rent.price}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{rent.created_at}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>      
                  <span
                    style={{
                      color:
                        rent.status === 'The rental is over'
                          ? 'red'
                          : rent.status === 'Renting is ongoing'
                          ? 'green'
                          : 'black',
                    }}
                  >
                  {rent.status}
                  
                  </span>

                  </TableCell>
                  <TableCell>
                  {rent.status === 'The rental is over'  || rent.status === 'Cancelled'? (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteRent(rent.rentId)}
                      startIcon={<DeleteIcon />}

                    >
                      Delete Rent
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleCancelRent(rent.rentId)}
                      startIcon={<CancelIcon />}

                    >
                      Cancel Rent
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

export default Rents;