import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axiosinstance from '../axiosconfig';
const Activate = () => {
    const param = useParams();
    const navigate = useNavigate();
    useEffect(()=>{const token= 'User/activate/' + param.token1 + '/' + param.token2
        axiosinstance.get(`/${token}/`)
        .then((res)=>{navigate('/');})
        .catch((err)=>{console.log(err);});
    },[])
  return (
    <div>Your email has been Activated</div>
  )
}

export default Activate