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
  Typography,
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

  const handleSeerent = (rentId) => {
    console.log(`View rent ID: ${rentId}`);
    // Implement your logic to view rent details, e.g., navigate to a separate page.
  };

  // Add sample rents
  useEffect(() => {
    const sampleRents = [
      {
        id: 1,
        rentId: 'REN-001',
        customerName: 'John Doe',
        rentDateFrom: '2022-11-04',
        rentDateTo: '2023-10-04',
        totalPrice: 99.99,
        status: 'The rental is over',
      },
      {
        id: 2,
        rentId: 'REN-002',
        customerName: 'Jane Smith',
        rentDateFrom: '2023-10-04',
        rentDateTo: '2024-12-04',
        totalPrice: 49.99,
        status: 'Renting is ongoing',
      },
      // Add more sample rents as needed
    ];

    setRents(sampleRents);
  }, []);

  return (
    <div>
    <Typography variant="h4" gutterBottom>
        Rents Detail
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rent ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date From</TableCell>
              <TableCell>Date To</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRents.map((rent) => (
              <TableRow key={rent.id}>
                <TableCell>{rent.rentId}</TableCell>
                <TableCell>{rent.customerName}</TableCell>
                <TableCell>{rent.rentDateFrom}</TableCell>
                <TableCell>{rent.rentDateTo}</TableCell>
                <TableCell>${rent.totalPrice}</TableCell>
                <TableCell>{rent.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleSeerent(rent.rentId)}
                    variant="outlined"
                    color="primary"
                  >
                    See rent Detail
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
