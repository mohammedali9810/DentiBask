import React, { useEffect, useState } from "react";
import axiosinstance from '../../axiosconfig';
import Pagination from '@mui/material/Pagination';

import { Container, Row, Col } from "react-bootstrap"; // Make sure to import Container
import Rentcard from "./rentcard";
const Rentpage = () => {
    const [clinics, setClinics] = useState([]);
    const [maxpages, setMaxPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        axiosinstance
        .get(`/User/get_all_clinics/`)
        .then((response) => {
            console.log(response.data);
          setClinics(response.data.results);
          setMaxPages(Math.ceil((response.data.count)/12));
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }, []);
    const handlePageChange = (event, page) => {
      setCurrentPage(page);
    };
    return (
      <Container>
        <Row
          className="g-2 justify-content-center mt-3 mx-2 mx-sm-1 mx-md-4 mx-lg-4 mx-xl-5"
          xs={1}
          sm={2}
          lg={3}
          xl={3}
          xxl={4}
        >
          {/* loop on the all list of products come from the api */}
          {clinics?.map((product, index) => (
            <Col key={product.id} className="d-flex">
              {" "}
              {/* Use the product's unique id for the key */}
              <Rentcard
                productData={product}
              />
            </Col>
          ))}
        </Row>
        <div style={{ display: 'flex', justifyContent: 'center' , marginBottom:'10px'}}>
        <Pagination
          page={currentPage}
          onChange={handlePageChange}
          count={maxpages}
          color="primary"
        />
      </div>
      </Container>
    );
  }
  
  export default Rentpage;