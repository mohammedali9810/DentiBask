import React from 'react';
import Slider from 'react-slick';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const teamMembers = [
  { id: 1, name: 'Mohammed Ali', image: '/1.jpeg',
   phoneNumber: '01149444026', email: 'Muhammed.alyaleem@gmail.com',
    github: 'https://github.com/muhammedalyaleem', linkedin: 'https://www.linkedin.com/in/muhammedalyaleem/',
     cvLink: '/cv-mohammed-ali.pdf' },
  { id: 2, name: 'Yehia Mohammed', image: '/2.jpeg', phoneNumber: '01156929289', email: 'yehia.mohammed@gmail.com',
   github: 'https://github.com/yahyamohmuedpro99', linkedin: 'https://www.linkedin.com/in/yahya-mohmued-6a0394174/',
    cvLink: 'yahya99resume.pdf' },
  { id: 3, name: 'Mohammed Ashraf', image: '/3.jpeg', phoneNumber: '01111143574', email: 'mohammedaly9810@gmail.com',
   github: 'https://github.com/mohammedali9810', linkedin: 'https://www.linkedin.com/in/mohammed-aly-9810/',
    cvLink: '/Mohammed_Ashraf_Resume.pdf' },
  { id: 4, name: 'Mohammed Sayed', image: '/4.jpg', phoneNumber: '01113289444', email: 'Mohamed.sayed@gmail.com',
   github: 'https://github.com/Mohamedsayed10', linkedin: 'https://www.linkedin.com/in/mohamed-sayed99/',
    cvLink: 'Mohamed Sayed Resume.pdf' },
  { id: 5, name: 'Saher Emad', image: '/5.jpeg', phoneNumber: '01112424042', email: 'Shaher.emad@gmail.com',
   github: 'https://github.com/Shaher2018', linkedin: 'https://www.linkedin.com/in/shaher-emad-211852223', 
   cvLink: '/Shaher Emad Mohammed.pdf' },
];

const AboutUs = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,          
    autoplaySpeed: 3000,    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
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
      fontSize: '1em'
    },
  }));

  const classes = useStyles();

  const handleEmailClick = (email) => {
    // Use mailto: to open the default email client
    window.location.href = `mailto:${email}`;
  };

  const handleWhatsAppClick = (phoneNumber) => {
    const formattedPhoneNumber = phoneNumber.replace(/^0+/, '');
    window.location.href = `https://wa.me/${formattedPhoneNumber}`;
  };

  const handleLinkedInClick = (linkedin) => {
    window.open(linkedin, '_blank');
  };

  const handleGitHubClick = (github) => {
    window.open(github, '_blank');
  };

  const handleCVClick = (cvLink) => {
    window.open(cvLink, '_blank');
  };

  return (
    <div>
      <img
        src="https://i.pinimg.com/originals/9c/87/99/9c879909741ebaa6b7a614071079e542.jpg"
        alt="Logo"
        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
      />
     <Typography variant="h3" className={classes.heading} gutterBottom style={{ fontFamily: 'Garamond', fontWeight: '600' }}>
        Welcome to DentiBask!
      </Typography>

      <Typography variant="h4" className={classes.heading} gutterBottom style={{ fontFamily: 'YourFont', fontWeight: '500' }}>
        About DentiBask: Your Trusted E-commerce Platform for Dentists
      </Typography>

      <Typography variant="h4" className={classes.heading} gutterBottom style={{ fontFamily: 'YourFont', fontWeight: '500' }}>
        We are dedicated to providing quality services and products.
      </Typography>

      <Typography
        variant="body1"
        className={classes.content}
        gutterBottom
        style={{
          paddingLeft: '100px',
          paddingRight: '100px',
          fontFamily: 'Lucida Handwriting',
          fontSize: '1.3rem',
        }}
      >
    <b>Welcome to DentiBask, your one-stop-shop for all your dental product needs. With our specialized focus on the dental industry, we cater to the unique requirements of dentists and dental professionals. Our mission is to provide a comprehensive range of high-quality products and services to support and enhance your dental practice.</b>      </Typography>

      <Typography
        variant="body1"
        className={classes.content}
        gutterBottom
        style={{
          paddingLeft: '100px',
          paddingRight: '100px',
          fontFamily: 'Lucida Handwriting',
          fontWeight: '400',
        }}
      >
        At DentiBask, we understand the importance of precision, reliability, and efficiency in the field of dentistry. That's why we have curated a wide selection of products specifically tailored to meet the needs of dentists like you. From dental instruments and supplies to cutting-edge technology and equipment, we strive to offer everything you need to deliver exceptional dental care to your patients.
      </Typography>

      <Typography
        variant="h4"
        className={classes.heading}
        gutterBottom
        style={{ marginBottom: '50px', fontFamily: 'YourFont', fontWeight: '500' }}
      >
        Learn more about our team behind DentiBask.
      </Typography>


      <Slider {...settings}>
        {teamMembers.map((member) => (
          <div key={member.id}>
            <Card style={{marginLeft:"3rem"}}>
              <CardMedia component="img" alt={member.name} height="420" image={member.image} />
              <CardContent>
                <Typography variant="body2" color="textSecondary" onClick={() => handleEmailClick(member.email)}>
                  <MdEmail className={classes.whatsappIcon} />
                  {member.email}
                </Typography>
                <Typography variant="body2" color="textSecondary" onClick={() => handleWhatsAppClick(member.phoneNumber)}>
                  <Icon icon="mdi:whatsapp" className={classes.whatsappIcon} />
                  {member.phoneNumber}
                </Typography>
                <Typography variant="body2" color="textSecondary" onClick={() => handleGitHubClick(member.github)}>
                  <FaGithub className={classes.whatsappIcon} />
                  {member.github}
                </Typography>
                <Typography variant="body2" color="textSecondary" onClick={() => handleLinkedInClick(member.linkedin)}>

                  <FaLinkedin className={classes.whatsappIcon} />
                  {member.linkedin}
                </Typography>
                <Typography variant="body2" color="textSecondary" onClick={() => handleCVClick(member.cvLink)}>
                  <FaRegNewspaper className={classes.whatsappIcon} />
                  Show CV
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>

      <Typography variant="h4" gutterBottom style={{ marginTop: '50px' }}>
        Drop us a follow
      </Typography>

      <Typography variant="h5" gutterBottom style={{ marginBottom: '50px' }}>
        Follow us on{' '}
        <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
          Twitter
        </Link>
        ,{' '}
        <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
          Facebook
        </Link>
        , and{' '}
        <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer">
          Instagram
        </Link>
        .
      </Typography>

    </div>
  );
};

export default AboutUs;
