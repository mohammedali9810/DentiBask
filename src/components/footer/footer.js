import React from 'react';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#2196F3', color: '#fff', py: 4 }}>
      <Container maxWidth="lg">
      <img
            src="https://i.pinimg.com/originals/9c/87/99/9c879909741ebaa6b7a614071079e542.jpg"
            alt="Logo"
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
        <Typography variant="h6" align="center" gutterBottom>
          DentiBask
        </Typography>
        <Typography variant="subtitle1" align="center" component="div">
          We are so pleased for your visit
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <IconButton color="inherit" href="https://www.youtube.com/" target="_blank">
            <YouTubeIcon />
          </IconButton>
          <IconButton color="inherit" href="https://www.facebook.com/" target="_blank">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" href="https://www.instagram.com/" target="_blank">
            <InstagramIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Typography variant="body2" color="inherit" component={RouterLink} to="/AboutUs" sx={{ mr: 2 }}>
            About Us
          </Typography>
          <Typography variant="body2" color="inherit" component={RouterLink} to="/ContactUs">
            Contact Us
          </Typography>
        </Box>
        <Typography variant="body2" align="center" mt={2}>
          {'Copyright © '}
          <Link color="inherit" href="https://yourwebsite.com/">
            DentiBask
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
