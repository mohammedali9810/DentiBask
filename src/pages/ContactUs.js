import React from 'react';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import { Icon } from '@iconify/react';

const useStyles = makeStyles((theme) => ({
  section: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  subheading: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  content: {
    marginBottom: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    display: 'flex', // Added to align icon and text horizontally
    alignItems: 'center', // Center icon vertically with text
    background: '#f2f2f2', // Background color for the clickable area
    padding: theme.spacing(1), // Add padding for better readability and touch target
    borderRadius: theme.shape.borderRadius, // Optional: Add border radius for a rounded look
    '&:hover': {
      textDecoration: 'underline',
      background: '#e0e0e0', // Change background color on hover
    },
  },
  whatsappIcon: {
    marginRight: theme.spacing(1), // Add space between icon and text
  },
  imageContainer: {
    width: '100%',
    height: '400px', // Adjust the height as needed
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: theme.spacing(2),
  },
   card: {
    // Add styling for the card
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    height: '100%', // Ensure the card takes full height of its container
  },
}));

const ContactUs = () => {
  const classes = useStyles();

  const handleWhatsAppClick = () => {
    window.location.href = 'https://wa.me/01123456789';
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@dentibask.com';
  };


  return (
    <Container className={classes.section}>

      <div
        className={classes.imageContainer}
        style={{ backgroundImage: `url('https://img1.wsimg.com/isteam/ip/9538b295-048a-48dc-82c0-fba7e8055cac/shutterstock_1497517754.jpg/:/rs=h:1000,cg:true,m')` }}
      />
      <Typography variant="h3" className={classes.heading} gutterBottom>
        Contact Us
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h4" className={classes.subheading} gutterBottom>
            Welcome to our Contact Us page.
            If you have any questions or inquiries, please feel free to
            reach out to us using the following contact details
          </Typography>
          <Typography variant="h5" className={classes.subheading} gutterBottom>
            DentiBask Contact Information
          </Typography>
          <Typography variant="body1" className={classes.content}>
            CONTACT US
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body1"
                className={`${classes.content} ${classes.link}`}
                onClick={handleWhatsAppClick}
              >
                <Icon icon="mdi:whatsapp" className={classes.whatsappIcon} />
                011213289444 (Click to connect on WhatsApp)
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                variant="body1"
                className={`${classes.content} ${classes.link}`}
                onClick={handleEmailClick}
              >
                <EmailIcon className={classes.whatsappIcon} />
                info@dentibask.com (Click to send an email)
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" className={classes.content} style={{ textAlign: 'center' }}>
            Our customer service team is waiting to assist you.
          </Typography>
          <Typography variant="h5" className={classes.content} style={{ textAlign: 'center' }}>
            Please allow up to 2-Business days response time for us to fully address your inquiries.
          </Typography>
          <Typography variant="h5" className={classes.content} style={{ textAlign: 'center' }}>
            You can also check your order status through our website.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
