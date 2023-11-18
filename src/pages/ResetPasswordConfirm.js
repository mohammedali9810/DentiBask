import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axiosinstance from "../axiosconfig";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const ResetPasswordConfirm = () => {
  const { uidb64, token } = useParams();
  const [isValidToken, setIsValidToken] = useState(true); // Assume the token is initially valid
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    // Validate the token by sending a request to the backend
    const validateToken = async () => {
        try {
          const response = await axiosinstance.get(
            `http://localhost:8000/User/reset-password/confirm/${uidb64}/${token}/`
          );
      
          // Check the response status or data to ensure the token is valid
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
    // Handle the form submission, e.g., send a request to update the password
    console.log("Form Data:", data);
    // Add your logic here for updating the password
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
          {errors.password && <span>{errors.password.message}</span>}

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
            <span>{errors.confirmPassword.message}</span>
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
    </Container>
  );
};

export default ResetPasswordConfirm;
