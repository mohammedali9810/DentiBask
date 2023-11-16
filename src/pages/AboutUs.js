// // AboutUs.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
// import './AboutUs.css';

// const teamMembers = [
//   { id: 1, name: 'Mohammed Ali', image: '/images/1.jpeg',phoneNumber: '01149444026' },
//   { id: 2, name: 'Yehia Mohammed', image: '/images/2.jpeg',phoneNumber: '01156929289' },
//   { id: 3, name: 'Mohammed Ashraf', image: '/images/3.jpeg' ,phoneNumber: '01111143574'},
//   { id: 4, name: 'Mohammed Sayed', image: '/images/4.jpeg',phoneNumber: '01113289444' },
//   { id: 5, name: 'Shaher Emad', image: '/images/5.jpeg',phoneNumber: '01112424042' },
// ];
const teamMembers = [
  { id: 1, name: 'Mohammed Ali', image: '/1.jpeg',phoneNumber: '01149444026' },
  { id: 2, name: 'Yehia Mohammed', image: '/2.jpeg',phoneNumber: '01156929289' },
  { id: 3, name: 'Mohammed Ashraf', image: '/3.jpeg' ,phoneNumber: '01111143574'},
  { id: 4, name: 'Mohammed Sayed', image: '/4.jpeg',phoneNumber: '01113289444' },
  { id: 5, name: 'Saher Emad', image: '/5.jpeg',phoneNumber: '01112424042' },
];


const AboutUs = () => {
  return (
    <div>
      <img
            src="https://i.pinimg.com/originals/9c/87/99/9c879909741ebaa6b7a614071079e542.jpg"
            alt="Logo"
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
      <h1>About Us</h1>
      <p>
        Welcome to DentiBask! We are dedicated to providing quality services and products. Learn more about our
         team behind DentiBask.
      </p>

      <Grid container spacing={3}>
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={member.id}>
            <Card>
              <CardMedia
                component="img"
                alt={member.name}
                height="280"
                image={member.image}
              />
              
              <CardContent>
                <Typography variant="h6" component="div">
                  {member.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Phone: {member.phoneNumber}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
    </div>
    
  );
};

export default AboutUs;
