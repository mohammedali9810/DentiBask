import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';
import axiosinstance from "../../../axiosconfig";
import Customercard from './customercard';
const Customers = () => {
    const [customers, setCustomer] = useState([]);
    const [pages, setPages] = useState(1);
    const [maxpages, setMaxPages] = useState(1);
    useEffect(()=>{
        axiosinstance.get(`/User/get_all_customers/?page=${pages}`,{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer '+localStorage.getItem('dentibask-access-token'),
          },
          withCredentials: true,
        })
        .then(res=>{console.log(res.data);
          setCustomer(res.data.results); 
          setMaxPages(Math.ceil((res.data.count)/12))
        })
        .catch(err=>{console.error(err)});
    }
    ,[pages])
  return (
    <div style={{display:"flex", alignItems:"center", flexDirection:"column" }}>
        <div className='productsgrid'>
          {customers.length !== 0 ? customers.map((customer, index)=><Customercard key={index} customer={customer}/>):null}
        </div>
            <Pagination page={pages} onChange={(e,v)=>{setPages(v)}} count={maxpages} color="primary" />

    </div>
    
  )
}

export default Customers