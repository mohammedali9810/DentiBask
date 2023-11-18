import React from 'react';
import { Container, Typography, Grid, Card, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import { Icon } from '@iconify/react';

const useStyles = makeStyles((theme) => ({
  section: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  heading: {
    marginBottom: theme.spacing(5),
    fontFamily: 'Roboto, sans-serif', 
    fontWeight: 'bold',
  },
  subheading: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    fontFamily: 'Roboto, sans-serif', 
  },
  content: {
    marginBottom: theme.spacing(4),
    fontFamily: 'Roboto, sans-serif',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    // background: '#f2f2f2',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      textDecoration: 'underline',
      background: '#e0e0e0',
    },
    fontFamily: 'Roboto, sans-serif', // Customize the font family
  },
  whatsappIcon: {
    marginRight: theme.spacing(2),
     fontSize: '4em' 
  },
  imageContainer: {
    width: '100%',
    height: '400px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: theme.spacing(3),
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(4),
    height: '100%',
  },

  phoneCard: {
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    justifyContent: 'center',
  },
  emailCard: {
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    justifyContent: 'center',
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

      <Grid item xs={12} sm={12}>
        <Typography variant="h4" className={classes.subheading} gutterBottom>
          Welcome to our Contact Us page.
          If you have any questions or inquiries, please feel free to
          reach out to us using the following contact details
        </Typography>

        <Typography variant="h5" className={classes.subheading} gutterBottom>
          DentiBask Contact Information
        </Typography>
      </Grid>


      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card className={classes.phoneCard}>
          <Icon icon="mdi:whatsapp" className={classes.whatsappIcon}  />
            <Typography variant="h3" className={classes.content}>
              Talk to Sales
            </Typography>
            <Typography variant="h5" className={classes.content}>
              interested in DentiBask ? Just pick up the phone to chat with a member of our sales team
            </Typography>
            <Typography variant="body1" className={classes.link} onClick={handleWhatsAppClick}>
              011213289444 
            </Typography>

          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card className={classes.emailCard}>
            <EmailIcon className={classes.whatsappIcon}  />
            <Typography variant="h3" className={classes.content}>
              Contact customer service
            </Typography>
            <Typography variant="h5" className={classes.content}>
             You cau  contact by sending a message to our mail 
            </Typography>

            <Typography variant="body1" className={classes.link} onClick={handleEmailClick}>
              info@dentibask.com 
            </Typography>

          </Card>
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
