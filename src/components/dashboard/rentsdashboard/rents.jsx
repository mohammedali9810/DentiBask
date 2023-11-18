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
    // Make a DELETE request to the backend
    axiosinstance
      .delete(`/api/rents/${rentId}/`) // Adjust the endpoint based on your Django API
      .then((response) => {
        console.log('Rent deleted successfully:', response);
        // Update the local state after successful deletion
        const updatedRents = rents.filter((rent) => rent.id !== rentId);
        setRents(updatedRents);
      })
      .catch((error) => {
        console.error('Error deleting rent:', error);
        // Handle errors as needed
      });
    };

  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rent ID</TableCell>
              <TableCell>Renter</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Duration Months</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rents.map((rent) => (
              <TableRow key={rent.id}>
                <TableCell>{rent.id}</TableCell>
                <TableCell>{rent.renter}</TableCell>
                <TableCell>{rent.start_date}</TableCell>
                <TableCell>{rent.end_date}</TableCell>
                <TableCell>{rent.duration_months}</TableCell>
                <TableCell>${rent.price}</TableCell>
                <TableCell>{rent.created_at}</TableCell>
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