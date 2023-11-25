// import React, { useState, useEffect } from "react";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { useForm } from "react-hook-form";
// import Container from "@mui/material/Container";
// import { Link as RouterLink } from "react-router-dom";
// import axiosinstance from "../axiosconfig";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import { useNavigate } from "react-router-dom";
// import Emailsent from "./emailsent";

// export default function SignUp() {
//   const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
//   const navigate = useNavigate();
//   const handleOpenAddProductDialog = () => {
//     setOpenAddProductDialog(true);
//   };

//   const handleCloseAddProductDialog = () => {
//     setOpenAddProductDialog(false);
//   };
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     getValues,
//   } = useForm();

//   useEffect(() => {
//     const accessToken = localStorage.getItem("dentibask-access-token");
//     if (accessToken) {
//       navigate("/");
//     }
//   }, [navigate]);

//   const onSubmit = async (data) => {
//     console.log("Form Data:", data);
//     try {
//       // Fetch CSRF token
//       const csrfTokenResponse = await axiosinstance.get(
//         "http://127.0.0.1:8000/User/get_csrf_token/"
//       );
//       const csrfToken = csrfTokenResponse.data.csrfToken;
//       //data['csrfmiddlewaretoken'] = csrfToken;
//       console.log(csrfToken);

//       const response = await axiosinstance.post(
//         "http://127.0.0.1:8000/User/register/",
//         data,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "X-CSRFToken": csrfToken,
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 201) {
//         handleOpenAddProductDialog();
//       } else {
//         // Handle registration error
//         console.error("Registration failed");
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//     }
//   };

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
//         <img
//           src="https://i.pinimg.com/originals/9c/87/99/9c879909741ebaa6b7a614071079e542.jpg"
//           alt="Logo"
//           style={{ width: "100px", height: "100px", borderRadius: "50%" }}
//         />
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>
//         <Box
//           component="form"
//           noValidate
//           onSubmit={handleSubmit(onSubmit)}
//           sx={{ mt: 3 }}
//         >
//           <Grid container spacing={2}>
//             {/* Name Field */}
//             <Grid item xs={12} sm={12}>
//               <TextField
//                 autoComplete="given-name"
//                 name="name"
//                 required
//                 fullWidth
//                 id="name"
//                 label="Name"
//                 autoFocus
//                 {...register("name", {
//                   required: "Name is required",
//                   pattern: {
//                     value: /^[A-Za-z]+$/,
//                     message: "Invalid Name",
//                   },
//                 })}
//               />
//               {errors.name && <span>{errors.name.message}</span>}
//             </Grid>
//             {/* Email Field */}
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//                     message: "Invalid email address",
//                   },
//                 })}
//               />
//               {errors.email && <span>{errors.email.message}</span>}
//             </Grid>
//             {/* Password Field */}
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="new-password"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 8,
//                     message: "Password must be at least 8 characters long",
//                   },
//                 })}
//               />
//               {errors.password && <span>{errors.password.message}</span>}
//             </Grid>
//             {/* Confirm Password Field */}
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 name="confirmPassword"
//                 label="Confirm Password"
//                 type="password"
//                 id="confirmPassword"
//                 {...register("confirmPassword", {
//                   validate: (value) =>
//                     value === getValues("password") || "Passwords do not match",
//                 })}
//               />
//               {errors.confirmPassword && (
//                 <span>{errors.confirmPassword.message}</span>
//               )}
//             </Grid>
//             {/* Phone Number Field */}
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 name="phone"
//                 label="Phone Number"
//                 id="phone"
//                 {...register("phone", {
//                   pattern: {
//                     value: /^(01)[0-9]{9}$/,
//                     message: "Invalid phone number",
//                   },
//                 })}
//               />
//               {errors.phone && <span>{errors.phone.message}</span>}
//             </Grid>
//             <Grid item xs={12}>
//               <FormControlLabel
//                 control={<Checkbox value="allowExtraEmails" color="primary" />}
//                 label="I want to receive inspiration, marketing promotions and updates via email."
//               />
//             </Grid>
//           </Grid>
//           {/* Submit Button */}
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Sign Up
//           </Button>
//           <Grid
//             container
//             justifyContent="center"
//             alignItems="center"
//             sx={{ mt: 2 }}
//           >
//             <Grid item>
//               <RouterLink to="/login" variant="body2">
//                 Already have an account? Sign in
//               </RouterLink>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//       <Dialog open={openAddProductDialog} onClose={handleCloseAddProductDialog}>
//         <DialogTitle>Verify Email</DialogTitle>
//         <DialogContent>
//           <Emailsent handleClose={handleCloseAddProductDialog} />
//         </DialogContent>
//       </Dialog>
//     </Container>
//   );
// }
import React, { useState , useEffect} from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import Container from "@mui/material/Container";
import { Link as RouterLink , useNavigate} from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Emailsent from "./emailsent";
import axios from "axios";
import axiosinstance from "../axiosconfig";

export default function SignUp() {
  const { control, handleSubmit, trigger, formState: { errors }, getValues, register } = useForm();
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const [emailStatus, setEmailStatus] = useState("default");
  const [isEmailTaken, setIsEmailTaken] = useState(false);
  const navigate = useNavigate();

  const checkEmailAvailability = async (email) => {
    try {
      setEmailStatus("loading");

      const response = await axios.get(`http://localhost:8000/User/checkreg/?email=${email}`);

      if (response.status === 200) {
        setEmailStatus("available");
        setIsEmailTaken(false);
      } else if (response.status === 400) {
        setEmailStatus("taken");
        setIsEmailTaken(true);
      } else {
        console.error("Unexpected HTTP status code:", response.status);
        setEmailStatus("default");
        setIsEmailTaken(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response = error.response;
        if (response.status === 400) {
          setEmailStatus("taken");
          setIsEmailTaken(true);
        } else {
          console.error("Unexpected HTTP status code:", response.status);
          setEmailStatus("default");
          setIsEmailTaken(false);
        }
      } else {
        console.error("Non-Axios error:", error);
        setEmailStatus("default");
        setIsEmailTaken(false);
      }
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

  const handleEmailBlur = () => {
    const email = getValues("email");
    if (email) {
      checkEmailAvailability(email);
    }
  };

  const handleOpenAddProductDialog = () => {
    setOpenAddProductDialog(true);
  };

  const handleCloseAddProductDialog = () => {
    setOpenAddProductDialog(false);
  };

  const onSubmit = async (data) => {
    // Trigger form validation
    const isValid = await trigger();
  
    if (isValid) {
      console.log("Form Data:", data);
  
      try {
        const csrfTokenResponse = await axiosinstance.get(
          "http://127.0.0.1:8000/User/get_csrf_token/"
        );
        const csrfToken = csrfTokenResponse.data.csrfToken;
        console.log(csrfToken);
  
        const fullName = `${data.firstName} ${data.lastName}`;
  
        const response = await axiosinstance.post(
          "http://127.0.0.1:8000/User/register/",
          { ...data, name: fullName },
          {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken,
            },
            withCredentials: true,
          }
        );
  
        if (response.status === 201) {
          handleOpenAddProductDialog();
        } else {
          console.error("Registration failed");
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    } else {
      console.log("Form validation failed");
    }
  };

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
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                {...register("firstName", {
                  required: "First Name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Invalid First Name",
                  },
                })}
              />
              {errors.firstName && <span>{errors.firstName.message}</span>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="family-name"
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                {...register("lastName", {
                  required: "Last Name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Invalid Last Name",
                  },
                })}
              />
              {errors.lastName && <span>{errors.lastName.message}</span>}
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    {...field}
                    value={getValues("email")}
                    onChange={(e) => {
                      const email = e.target.value;
                      if (email) {
                        checkEmailAvailability(email);
                      }
                      field.onChange(e); // manually trigger the onChange event
                    }}
                    onBlur={handleEmailBlur}
                    InputProps={{
                      style: {
                        color: emailStatus === "taken" ? 'red' : emailStatus === "available" ? 'green' : 'black',
                      },
                    }}
                    error={emailStatus === "taken"}
                    helperText={
                      (emailStatus === "taken" && "Email is already taken") ||
                      (emailStatus === "available" && "Email is available")
                    }
                  />
                )}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
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
              {errors.password && <span>{errors.password.message}</span>}
            </Grid>
            <Grid item xs={12}>
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
                <span>{errors.confirmPassword.message}</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phone"
                label="Phone Number"
                id="phone"
                {...register("phone", {
                  pattern: {
                    value: /^(01)[0-9]{9}$/,
                    message: "Invalid phone number",
                  },
                })}
              />
              {errors.phone && <span>{errors.phone.message}</span>}
            </Grid>
            {/* Add other form fields as needed */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={emailStatus === "taken" || emailStatus === "loading"}
          >
            Sign Up
          </Button>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Grid item>
              <RouterLink to="/login" variant="body2">
                Already have an account? Sign in
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Dialog open={openAddProductDialog} onClose={handleCloseAddProductDialog}>
        <DialogTitle>Verify Email</DialogTitle>
        <DialogContent>
          <Emailsent handleClose={handleCloseAddProductDialog} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
