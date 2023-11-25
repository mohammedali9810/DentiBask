// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import axiosinstance from "../axiosconfig";
// import Container from "@mui/material/Container";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";

// const ResetPasswordConfirm = () => {
//   const { uidb64, token } = useParams();
//   const navigate = useNavigate();
//   const [isValidToken, setIsValidToken] = useState(true); // Assume the token is initially valid
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     getValues,
//   } = useForm();

//   useEffect(() => {
//     // Validate the token by sending a request to the backend
//     const validateToken = async () => {
//       try {
//         const response = await axiosinstance.post(
//           `http://localhost:8000/User/reset-password/confirm/${uidb64}/${token}/`
//         );

//         // Check the response status to ensure the token is valid
//         if (response.status === 200) {
//           console.log("Token is valid");
//         } else {
//           console.error("Token validation failed", response.data);
//           setIsValidToken(false);
//         }
//       } catch (error) {
//         console.error("Token validation failed", error);
//         setIsValidToken(false);
//       }
//     };

//     validateToken();
//   }, [uidb64, token]);

//   const onSubmit = async (data) => {
//     try {
//       // Use the new endpoint for password update
//       const response = await axiosinstance.post(
//         "http://localhost:8000/User/update-password/",
//         {
//           user_id: uidb64,
//           new_password: data.password,
//           confirm_password: data.confirmPassword,
//         }
//       );

//       if (response.status === 200) {
//         console.log("Password reset successfully");
//         // You can redirect to a success page or handle it as needed
//         navigate("/Login"); // Replace "/success" with the actual success page URL
//       } else {
//         console.error("Password reset failed", response.data);
//         // Handle the failure, e.g., display an error message
//       }
//     } catch (error) {
//       console.error("Password reset failed", error);
//       // Handle the failure, e.g., display an error message
//     }
//   };

//   if (!isValidToken) {
//     // Display an error message for an invalid token
//     return (
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Typography component="h1" variant="h5">
//             Invalid or expired link
//           </Typography>
//         </Box>
//       </Container>
//     );
//   }

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
//           Reset Password
//         </Typography>
//         <Box
//           component="form"
//           noValidate
//           onSubmit={handleSubmit(onSubmit)}
//           sx={{ mt: 3 }}
//         >
//           {/* Password Field */}
//           <TextField
//             required
//             fullWidth
//             name="password"
//             label="New Password"
//             type="password"
//             id="password"
//             autoComplete="new-password"
//             {...register("password", {
//               required: "Password is required",
//               minLength: {
//                 value: 8,
//                 message: "Password must be at least 8 characters long",
//               },
//             })}
//           />
//           {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}

//           {/* Confirm Password Field */}
//           <TextField
//             required
//             fullWidth
//             name="confirmPassword"
//             label="Confirm Password"
//             type="password"
//             id="confirmPassword"
//             {...register("confirmPassword", {
//               validate: (value) =>
//                 value === getValues("password") || "Passwords do not match",
//             })}
//           />
//           {errors.confirmPassword && (
//             <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
//           )}

//           {/* Submit Button */}
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Reset Password
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default ResetPasswordConfirm;



import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axiosinstance from "../axiosconfig";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Green check mark icon

const ResetPasswordConfirm = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(true);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  // Check for existing access token on component mount
  useEffect(() => {
    const accessToken = localStorage.getItem("dentibask-access-token");
    if (accessToken) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axiosinstance.post(
          `http://localhost:8000/User/reset-password/confirm/${uidb64}/${token}/`
        );

        if (response.status === 200) {
          console.log("Token is valid");
        } else {
          console.error("Token validation failed", response.data);
          setIsValidToken(false);
        }
      } catch (error) {
        console.error("Token validation failed", error);
        setIsValidToken(false);
      }
    };

    validateToken();
  }, [uidb64, token]);

  const onSubmit = async (data) => {
    try {
      const response = await axiosinstance.post(
        "http://localhost:8000/User/update-password/",
        {
          user_id: uidb64,
          new_password: data.password,
          confirm_password: data.confirmPassword,
        }
      );

      if (response.status === 200) {
        console.log("Password reset successfully");
        setShowSuccessDialog(true);
      } else {
        console.error("Password reset failed", response.data);
        // Handle the failure, e.g., display an error message
      }
    } catch (error) {
      console.error("Password reset failed", error);
      // Handle the failure, e.g., display an error message
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    navigate("/login"); // Redirect to the login page after success
  };

  if (!isValidToken) {
    // Display an error message for an invalid token
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
            Invalid or expired link
          </Typography>
        </Box>
      </Container>
    );
  }

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
          Reset Password
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          {/* Password Field */}
          <TextField
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="new-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}

          {/* Confirm Password Field */}
          <TextField
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
        </Box>
      </Box>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onClose={handleCloseSuccessDialog}>
        <DialogContent>
          <CheckCircleIcon sx={{ color: "green", fontSize: 64 }} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Password Updated Successfully!
          </Typography>
          <Button onClick={handleCloseSuccessDialog} fullWidth variant="contained" sx={{ mt: 2 }}>
            Continue to Login
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ResetPasswordConfirm;
