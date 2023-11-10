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

  useEffect(() => {
    fetchRents();
  }, []);

  const fetchRents = () => {
    axiosinstance
      .get('/rents')
      .then((res) => {
        setRents(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const indexOfLastrent = currentPage * itemsPerPage;
  const indexOfFirstrent = indexOfLastrent - itemsPerPage;
  const currentRents = rents.slice(indexOfFirstrent, indexOfLastrent);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };



  const handleDeleteRent = (rentId) => {
    // Implement the logic to delete the rent with the given rentId.
    // You should remove it from the state or send a delete request to your server.
    // For example, to remove it from the state:
    const updatedRents = rents.filter((rent) => rent.rentId !== rentId);
    setRents(updatedRents);
  };

  const handleCancelRent = (rentId) => {
    // Add logic for cancelling the rent with the given rentId.
    // For example, you can update the status to 'Cancelled'.
    const updatedRents = rents.map((rent) => {
      if (rent.rentId === rentId) {
        return { ...rent, status: 'Cancelled' };
      }
      return rent;
    });
    setRents(updatedRents);
  };

  
  // Add sample rents
  useEffect(() => {
    const sampleRents = [
      {
        id: 1,
        rentId: 'REN-001',
        renterName: 'John Doe',
        location: 'Cairo',
        rentMonthly: 260,
        rentShift: 45,
        totalPrice: 99.99,
        status: 'The rental is over',
      },
      {
        id: 2,
        rentId: 'REN-002',
        renterName: 'Jane Smith',
        location: 'Cairo',
        rentMonthly: 120,
        rentShift: 25,
        totalPrice: 49.99,
        status: 'Renting is ongoing',
      },
      {
        id: 3,
        rentId: 'REN-003',
        renterName: 'Sarah Johnson',
        location: 'New York',
        rentMonthly: 400,
        rentShift: 60,
        totalPrice: 199.99,
        status: 'Renting is ongoing',
      },
      {
        id: 4,
        rentId: 'REN-004',
        renterName: 'Michael Brown',
        location: 'Los Angeles',
        rentMonthly: 350,
        rentShift: 50,
        totalPrice: 159.99,
        status: 'Renting is ongoing',
      },
      // Add more sample rents as needed
    ];

    setRents(sampleRents);
  }, []);
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
            {currentRents.map((rent) => (
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