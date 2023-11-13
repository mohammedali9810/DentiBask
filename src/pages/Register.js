import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axiosinstance from "../axiosconfig";
// import './SignUp.css';
const defaultTheme = createTheme();

export default function SignUp() {
  const [user, setUser] = React.useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const getcsrf = axiosinstance
    .get("/Products/get_csrf_token/")
    .then((response) => {
      return response.data.csrfToken;
    })
    .catch((error) => {
      console.error(error);
    });

  const registerUser = async (userData) => {
    try {
      const response = await fetch("/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const responseData = await response.json();

        // Assuming the response includes activation link details
        const activationLink = responseData.activationLink;

        // Send activation link to user's email or display it in some way
        console.log("Activation Link:", activationLink);

        // Redirect the user or perform other actions as needed
      } else {
        // Handle registration error
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const onSubmit = async (data) => {
    // Call the registerUser function with the form data
    // await registerUser(data);
    axiosinstance
      .post("/api/register/", user, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": getcsrf,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <img
            src="https://i.pinimg.com/originals/9c/87/99/9c879909741ebaa6b7a614071079e542.jpg"
            alt="Logo"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
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
              {/* First Name Field */}
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
              {/* Last Name Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
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
              {/* Email Field */}
              <Grid item xs={12}>
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
              </Grid>
              {/* Password Field */}
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
              {/* Confirm Password Field */}
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
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <span>{errors.confirmPassword.message}</span>
                )}
              </Grid>
              {/* Phone Number Field */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  id="phoneNumber"
                  {...register("phoneNumber", {
                    pattern: {
                      value: /^(01)[0-9]{9}$/,
                      message: "Invalid phone number",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <span>{errors.phoneNumber.message}</span>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
                {/* <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link> */}
                <RouterLink to="/login" variant="body2">
                  Already have an account? Sign in
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
