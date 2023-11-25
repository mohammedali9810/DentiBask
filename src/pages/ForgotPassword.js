// import React, { useState , useEffect} from "react";
// import { useForm } from "react-hook-form";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import axiosinstance from "../axiosconfig";
// import Container from "@mui/material/Container";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';

// export default function ForgotPassword() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [dialogMessage, setDialogMessage] = useState("");
//   const [dialogTitle, setDialogTitle] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);
//   const navigate = useNavigate(); // Add useNavigate hook

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//     navigate("/login"); // Redirect to the login page
//   };

//   const onSubmit = async (data) => {
//     try {
//       // Fetch CSRF token
//       const csrfTokenResponse = await axiosinstance.get(
//         "http://127.0.0.1:8000/User/get_csrf_token/"
//       );
//       const csrfToken = csrfTokenResponse.data.csrfToken;

//       // Include CSRF token in the headers for the forgot password request
//       const response = await axiosinstance.post(
//         "http://127.0.0.1:8000/User/reset-password/",
//         data,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "X-CSRFToken": csrfToken,
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 200) {
//         // Password reset email sent successfully
//         setDialogTitle("Success");
//         setDialogMessage("An Email with Password Reset Info has been sent to your Mail.");
//       } else {
//         // Password reset request failed
//         setDialogTitle('Failure');
//         setDialogMessage('Password Reset Email could not be sent. Please try again.');
//       }

//       // Open the dialog
//       setDialogOpen(true);
//     } catch (error) {
//       console.error("Error during forgot password request:", error);
//       // Handle other errors
//     }
//   };

//   useEffect(() => {
//     // Check for access token in local storage
//     const accessToken = localStorage.getItem("dentibask-access-token");
//     if (accessToken) {
//       // If access token is found, redirect to the desired page
//       navigate("/");
//     }
//   }, [navigate]);

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <Box
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Typography component="h1" variant="h5">
//           Forgot Password
//         </Typography>
//         <Box
//           component="form"
//           noValidate
//           onSubmit={handleSubmit(onSubmit)}
//           sx={{ mt: 3 }}
//         >
//           <TextField
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//                 message: "Invalid email address",
//               },
//             })}
//           />
//           {errors.email && <span>{errors.email.message}</span>}
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Reset Password
//           </Button>
//           <Grid container justifyContent="flex-end">
//             <Grid item>
//               <RouterLink to="/login" variant="body2">
//                 Back to Sign In
//               </RouterLink>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
     
//         {/* Render icon conditionally based on dialogTitle */}
//         {dialogTitle === 'Success' ? (
//           <CheckCircleIcon sx={{ color: 'green', fontSize: 64 }} />
//         ) : (
//           dialogTitle === 'Failure' && (
//             <CancelIcon sx={{ color: 'red', fontSize: 64 }} />
//           )
//         )}

//         {/* Render Dialog conditionally */}
//         <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//           <DialogTitle>{dialogTitle}</DialogTitle>
//           <DialogContent>{dialogMessage}</DialogContent>
//         </Dialog>
//    </Container>
//   );
// }


import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axiosinstance from "../axiosconfig";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const navigate = useNavigate(); // Add useNavigate hook

  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate("/login"); // Redirect to the login page
  };

  const onSubmit = async (data) => {
    try {
      // Fetch CSRF token
      const csrfTokenResponse = await axiosinstance.get(
        "http://127.0.0.1:8000/User/get_csrf_token/"
      );
      const csrfToken = csrfTokenResponse.data.csrfToken;

      // Include CSRF token in the headers for the forgot password request
      const response = await axiosinstance.post(
        "http://127.0.0.1:8000/User/reset-password/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // Password reset email sent successfully
        setDialogTitle("Success");
        setDialogMessage("An Email with Password Reset Info has been sent to your Mail.");
      } else {
        // Password reset request failed
        setDialogTitle('Failure');
        setDialogMessage('Password Reset Email could not be sent. Please try again.');
      }

      // Open the dialog
      setDialogOpen(true);
    } catch (error) {
      console.error("Error during forgot password request:", error);
      // Handle other errors
    }
  };

  useEffect(() => {
    // Check for access token in local storage
    const accessToken = localStorage.getItem("dentibask-access-token");
    if (accessToken) {
      // If access token is found, redirect to the desired page
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <RouterLink to="/login" variant="body2">
                Back to Sign In
              </RouterLink>
            </Grid>
          </Grid>
        </Box>

        {/* Render icon and Dialog conditionally */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          {/* Render icon conditionally based on dialogTitle */}
          {dialogTitle === 'Success' ? (
            <CheckCircleIcon sx={{ color: 'green', fontSize: 64 }} />
          ) : (
            dialogTitle === 'Failure' && (
              <CancelIcon sx={{ color: 'red', fontSize: 64 }} />
            )
          )}
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>{dialogMessage}</DialogContent>
        </Dialog>
      </Box>
    </Container>
  );
}
