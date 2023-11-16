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

const Rents = () => {
  const [rents, setRents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchRents();
  }, []);

  const fetchRents = () => {
    axiosinstance
    .get('/User/get_all_rents/')
    .then((res) => {
        setRents(res.data.rents);
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


  
  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rent ID</TableCell>
              <TableCell>Renter</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Monthly</TableCell>
              <TableCell>Shift</TableCell>
              <TableCell>Total Revenue</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rents.map((rent) => (
              <TableRow key={rent.id}>
                <TableCell>{rent.rentId}</TableCell>
                <TableCell>{rent.renterName}</TableCell>
                <TableCell>{rent.location}</TableCell>
                <TableCell>${rent.rentMonthly}</TableCell>
                <TableCell>${rent.rentShift}</TableCell>
                <TableCell>${rent.totalPrice}</TableCell>
                <TableCell>          
                  <span
                    style={{
                      color:
                        rent.status === 'The rental is over'
                          ? 'red'
                          : rent.status === 'Renting is ongoing'
                          ? 'green'
                          : 'black', // Default color
                    }}
                  >
                  {rent.status}
                  
                  </span>

                  </TableCell>
                <TableCell>
               
                  <Button
                    onClick={() => handleDeleteRent(rent.rentId)}
                    variant="outlined"
                    color="secondary" // Use a different color to indicate delete action
                  >
                    Delete Rent
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(rents.length / itemsPerPage)}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Rents;