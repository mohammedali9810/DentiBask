import React, {useState, useEffect} from 'react';
import "./clinic.css";
import Pagination from '@mui/material/Pagination';
import axiosinstance from '../../../axiosconfig';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Cliniccard from './cliniccard';
import Addclinic from './addclinic';

const Clinic = () => {
    const [clinics, setClinics] = useState([]);
    const [pages, setPages] = useState(1);
    const [maxpages, setMaxPages] = useState(1);
    const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  
    useEffect(() => {
      axiosinstance
        .get(`/products?page=${pages}`)
        .then((res) => {
          setClinics(res.data.products);
          setMaxPages(res.data.maxpages);
        })
        .catch((err) => {
          console.error(err);
        });
    }, [pages]);
  
    const handleOpenAddProductDialog = () => {
      setOpenAddProductDialog(true);
    };
  
    const handleCloseAddProductDialog = () => {
      setOpenAddProductDialog(false);
    };
  
    return (
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Button
          style={{ backgroundColor: 'blue', width: '60%', fontSize: '1.5rem', marginBottom: '2rem' }}
          variant="contained"
          color="success"
          onClick={handleOpenAddProductDialog}
        >
          Add Clinic
        </Button>
        <div className='clinicgrid'>
          {Array.isArray(clinics) &&
            clinics.map((clinic, index) => 
            <Cliniccard key={index} clinic={clinic} />
            )}
        </div>
        <Pagination page={pages} onChange={(e, v) => setPages(v)} count={maxpages} color="primary" />
        <Dialog open={openAddProductDialog} onClose={handleCloseAddProductDialog}>
          <DialogTitle>Add Clinic</DialogTitle>
          <DialogContent>
            <Addclinic handleClose={handleCloseAddProductDialog} />
          </DialogContent>
        </Dialog>
      </div>
    );
}

export default Clinic