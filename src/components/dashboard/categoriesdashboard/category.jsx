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

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axiosinstance
      .get('/categories')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const indexOfLastCategory = currentPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSeeCategory = (categoryId) => {
    console.log(`View Category ID: ${categoryId}`);
    // Implement your logic to view category details, e.g., navigate to a separate page.
  };

  // Add sample categories
  useEffect(() => {
    const sampleCategories = [
      {
        id: 1,
        categoryId: 'CAT-001',
        customerName: 'John Doe',
        categoryDate: '2023-11-04',
        totalPrice: 99.99,
        status: 'Processing',
      },
      {
        id: 2,
        categoryId: 'CAT-002',
        customerName: 'Jane Smith',
        categoryDate: '2023-11-05',
        totalPrice: 49.99,
        status: 'Shipped',
      },
      // Add more sample categories as needed
    ];

    setCategories(sampleCategories);
  }, []);

  return (
    <div>
    <Typography variant="h4" gutterBottom>
        Categories Detail
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.categoryId}</TableCell>
                <TableCell>{category.customerName}</TableCell>
                <TableCell>{category.categoryDate}</TableCell>
                <TableCell>${category.totalPrice}</TableCell>
                <TableCell>{category.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleSeeCategory(category.categoryId)}
                    variant="outlined"
                    color="primary"
                  >
                    See Category
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(categories.length / itemsPerPage)}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
          style={{marginTop:"2rem"}}
        />
      </div>
    </div>
  );
};

export default Categories;