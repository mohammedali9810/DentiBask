// import React, { useState } from 'react';
// import { Typography, TextField, Button, Grid, Paper } from '@mui/material';

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Assuming you have an API endpoint to handle form submissions
//       const response = await fetch('https://api.example.com/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         // Handle successful form submission, e.g., show a success message
//         console.log('Form submitted successfully');
//       } else {
//         // Handle errors, e.g., show an error message
//         console.error('Form submission failed');
//       }
//     } catch (error) {
//       console.error('Error submitting form', error);
//     }
//   };

//   return (
//     <div>
//       <img
//             src="https://i.pinimg.com/originals/9c/87/99/9c879909741ebaa6b7a614071079e542.jpg"
//             alt="Logo"
//             style={{ width: '100px', height: '100px', borderRadius: '50%' }}
//             />
//       <h1>Contact Us</h1>
//       <p>If you have any questions or inquiries, please feel free to contact us. We'd love to hear from you!</p>

//       <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Your Name"
//                 fullWidth
//                 variant="outlined"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Your Email"
//                 fullWidth
//                 variant="outlined"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 type="email"
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Message"
//                 fullWidth
//                 multiline
//                 rows={4}
//                 variant="outlined"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button type="submit" variant="contained" color="primary">
//                 Submit
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </div>
//   );
// };

// export default ContactUs;
// ContactUs.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ContactUs = () => {
  return (
    <div>
        <img
         src="https://i.pinimg.com/originals/9c/87/99/9c879909741ebaa6b7a614071079e542.jpg"
             alt="Logo"
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
      <h1>Contact Us</h1>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            DentiBask Contact Information
          </Typography>
          <Typography variant="body1">
            Welcome to our Contact Us page. If you have any questions or inquiries, please feel free to
            reach out to us using the following contact details:
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Name:</strong> DentiBask Team
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Description:</strong> We are team joined together to faclitate your way ro achieve good products in most fast way
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Mission:</strong> Our mission is to provide quality services and products to our
            customers.
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Phone Number:</strong> 01123456789
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Email:</strong> info@dentibask.com
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactUs;
