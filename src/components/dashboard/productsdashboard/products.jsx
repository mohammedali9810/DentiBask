import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';
import axiosinstance from "../../../axiosconfig";
const Products = () => {
    const [products, setProducts] = useState({});
    useEffect(()=>{
        axiosinstance.get('/products').then(res=>{setProducts(res.data);}).catch(err=>{console.error(err)});
    }
    ,[])
  return (
    <div style={{display:"flex", justifyContent:"center"}}>

            <Pagination count={10} color="primary" />

    </div>
    
  )
}

export default Products