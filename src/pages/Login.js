import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import "./SignInStyles.css";
import axiosinstance from "../axiosconfig";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        DentiBask
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({ username: "", password: "" });
  const [userErr, setUserErr] = React.useState({ username: "", password: "" });

  const handlechange = (e) => {
    if (e.target.name === "email") {
      const email = e.target.value.trim();
      if (email.length < 3) {
        setUserErr({ ...userErr, username: "Email is Required" });
      } else {
        setUserErr({ ...userErr, username: "" });
      }
      setUser({ ...user, username: e.target.value });
    }
    if (e.target.name === "password") {
      setUser({ ...user, password: e.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosinstance
      .get(`/User/checkemail/?username=${user.username}`)
      .catch((err) => {
        setUserErr({ ...userErr, username: "email not found" });
      });
    if (userErr.username === "" && userErr.password === "") {
      axiosinstance
        .post("/User/login/", user, {
          Headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          localStorage.setItem(
            "dentibask-access-token",
            res.data.token["access"]
          );
          localStorage.setItem(
            "dentibask-refresh-token",
            res.data.token["refresh"]
          );
          localStorage.setItem(
            "dentibask-role",
            res.data.role
          );
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.username}
              onChange={handlechange}
              error={Boolean(userErr.username)}
            />
            {userErr.username && (
              <Typography variant="caption" color="error">
                {userErr.username}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={handlechange}
              error={Boolean(userErr.password)}
            />
            {userErr.password && (
              <Typography variant="caption" color="error">
                {userErr.password}
              </Typography>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <RouterLink to="/Register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
