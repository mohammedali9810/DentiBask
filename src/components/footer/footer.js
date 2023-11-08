// import React from 'react';
// import { Box, Container, Typography, Link } from '@mui/material';

// const Footer = () => {
//   return (
//     <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
//       <Container maxWidth="lg">
//         <Typography variant="h6" align="center" gutterBottom>
//           Footer Title
//         </Typography>
//         <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
//           Something here to give the footer a purpose!
//         </Typography>
//         <Typography variant="body2" color="text.secondary" align="center">
//           {'Copyright © '}
//           <Link color="inherit" href="https://yourwebsite.com/">
//             Your Website
//           </Link>{' '}
//           {new Date().getFullYear()}
//           {'.'}
//         </Typography>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;

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
          <Typography variant="body2" color="inherit" component={RouterLink} to="/about-us" sx={{ mr: 2 }}>
            About Us
          </Typography>
          <Typography variant="body2" color="inherit" component={RouterLink} to="/contact-us">
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



// 
// import * as React from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// // TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

// export default function StickyFooter() {
//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           minHeight: '100vh',
//         }}
//       >
//         <CssBaseline />
//         <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
//           <Typography variant="h2" component="h1" gutterBottom>
//             Sticky footer
//           </Typography>
//           <Typography variant="h5" component="h2" gutterBottom>
//             {'Pin a footer to the bottom of the viewport.'}
//             {'The footer will move as the main element of the page grows.'}
//           </Typography>
//           <Typography variant="body1">Sticky footer placeholder.</Typography>
//         </Container>
//         <Box
//           component="footer"
//           sx={{
//             py: 3,
//             px: 2,
//             mt: 'auto',
//             backgroundColor: (theme) =>
//               theme.palette.mode === 'light'
//                 ? theme.palette.primary.main
//                 : theme.palette.secondary.main, // Change the background color
//             color: (theme) =>
//               theme.palette.mode === 'light'
//                 ? theme.palette.common.white
//                 : theme.palette.common.black, // Change the text color
//           }}
//         >
//           <Container maxWidth="sm">
//             <Typography variant="body1">
//               My sticky footer can be found here.
//             </Typography>
//             <Copyright />
//           </Container>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }