import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axiosinstance from '../axiosconfig';
const Activate = () => {
    const param = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(param.token);
        axiosinstance.get(`/User/activate/${param.token}`)
        .then((res)=>{navigate('/');})
        .catch((err)=>{console.log(err);});
    },[])
  return (
    <div>Your email has been Activated</div>
  )
}

export default Activate