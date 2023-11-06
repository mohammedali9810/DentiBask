import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';
import axiosinstance from "../../../axiosconfig";
import Customercard from './customercard';
const Customers = () => {
    const [customer, setCustomer] = useState({});
    const [pages, setPages] = useState(1);
    const [maxpages, setMaxPages] = useState(1);
    useEffect(()=>{
        axiosinstance.get(`/customers?page=${pages}`)
        .then(res=>{setCustomer(res.data.customers); setMaxPages(res.data.maxpages)})
        .catch(err=>{console.error(err)});
    }
    ,[pages])
  return (
    <div style={{display:"flex", alignItems:"center", flexDirection:"column" }}>
        <div className='productsgrid'>
            <Customercard/>
            <Customercard/>
            <Customercard/>
            <Customercard/>
            <Customercard/>
            <Customercard/>
            <Customercard/>
            <Customercard/>
        </div>
            <Pagination page={pages} onChange={(e,v)=>{setPages(v)}} count={maxpages} color="primary" />

    </div>
    
  )
}

export default Customers