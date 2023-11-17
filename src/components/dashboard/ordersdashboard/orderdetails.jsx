import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axiosinstance from '../../../axiosconfig';

const Orderdetails = () => {
    const param = useParams();
    const [orderitems,setOrderitems] = useState([]);
    useEffect(()=>{
        axiosinstance(`/User/get_order_items_admin/?order_id=${param.id}`,
        {headers:{'Content-Type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('dentibask-access-token')},
    withCredentials:true})
        .then((response)=>{setOrderitems(response.data); console.log(response.data)})
        .catch((error)=>{console.log(error)});
    }
    ,[])
  return (
    <div>Orderdetails</div>
  )
}

export default Orderdetails