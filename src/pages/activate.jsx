import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosinstance from '../axiosconfig';
import logoimg from './logo.png';

const Activate = () => {
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = `User/activate/${param.token1}/${param.token2}`;

    axiosinstance
      .get(`/${token}/`)
      .then((res) => {
        setTimeout(() => {
          // Use navigate function to redirect
          navigate('/Login');
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param.token1, param.token2, navigate]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: '3rem',
        marginBottom: '3rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'column',
          alignItems: 'center',
          border: 'solid 2px black',
          borderRadius: '45px',
          width: '50%',
          padding: '5px',
          height: '23rem',
        }}
      >
        <p style={{ fontWeight: 'bold', fontSize: '2rem', color: 'green' }}>
          Your email Has Been Verified!
        </p>
        <img src={logoimg} alt="logo image" />
        <p style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'black' }}>
          Redirecting to login...
        </p>
      </div>
    </div>
  );
};

export default Activate;
