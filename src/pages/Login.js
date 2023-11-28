// import React, { useState, useEffect } from "react"; // Import useEffect here
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import "./SignInStyles.css";
// import axiosinstance from "../axiosconfig";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="#">
//         DentiBask
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const defaultTheme = createTheme();

// export default function SignIn() {
//   const navigate = useNavigate();
//   const [user, setUser] = React.useState({ username: "", password: "" });
//   const [userErr, setUserErr] = React.useState({ username: "", password: "" });

//   const handlechange = (e) => {
//     if (e.target.name === "email") {
//       const email = e.target.value.trim();
//       if (email.length < 3) {
//         setUserErr({ ...userErr, username: "Email is Required" });
//       } else {
//         setUserErr({ ...userErr, username: "" });
//       }
//       setUser({ ...user, username: e.target.value });
//     }
//     if (e.target.name === "password") {
//       setUser({ ...user, password: e.target.value });
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

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axiosinstance
//       .get(`/User/checkemail/?username=${user.username}`)
//       .catch((err) => {
//         setUserErr({ ...userErr, username: "email not found" });
//       });
//     if (userErr.username === "" && userErr.password === "") {
//       axiosinstance
//         .post("/User/login/", user, {
//           Headers: { "Content-Type": "application/json" },
//         })
//         .then((res) => {
//           localStorage.setItem(
//             "dentibask-access-token",
//             res.data.token["access"]
//           );
//           localStorage.setItem(
//             "dentibask-refresh-token",
//             res.data.token["refresh"]
//           );
//           localStorage.setItem(
//             "dentibask-role",
//             res.data.role
//           );
//           navigate("/");
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
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
//           <img
//             src="https://i.pinimg.com/originals/9c/87/99/9c879909741ebaa6b7a614071079e542.jpg"
//             alt="Logo"
//             style={{ width: "100px", height: "100px", borderRadius: "50%" }}
//           />
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             noValidate
//             sx={{ mt: 1 }}
//           >
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={user.username}
//               onChange={handlechange}
//               error={Boolean(userErr.username)}
//             />
//             {userErr.username && (
//               <Typography variant="caption" color="error">
//                 {userErr.username}
//               </Typography>
//             )}
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={user.password}
//               onChange={handlechange}
//               error={Boolean(userErr.password)}
//             />
//             {userErr.password && (
//               <Typography variant="caption" color="error">
//                 {userErr.password}
//               </Typography>
//             )}
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="/forgot-password" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <RouterLink to="/Register" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </RouterLink>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 8, mb: 4 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }



import React, { useState, useEffect } from "react";
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
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import axiosinstance from "../axiosconfig";
import { jwtDecode } from 'jwt-decode';
import { CLIENT_ID } from "../Config/Config";
// import { Routes, Route } from "react-router-dom";
// import UserDashboard from "./UserDashboard";
// import Dashboard from "./Dashboard";
// import Router from "./Router"; // Make sure to import your Router component

function SignIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });
  const [userErr, setUserErr] = useState({ username: "", password: "" });

  const handleChange = (e) => {
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

  useEffect(() => {
    // Check for access token in local storage
    const accessToken = localStorage.getItem("dentibask-access-token");
    if (accessToken) {
      // If access token is found, redirect to the desired page
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosinstance.get(`/User/checkemail/?username=${user.username}`).catch((err) => {
      setUserErr({ ...userErr, username: "email not found" });
    });
    if (userErr.username === "" && userErr.password === "") {
      axiosinstance
        .post("/User/login/", user, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          localStorage.setItem("dentibask-access-token", res.data.token["access"]);
          localStorage.setItem("dentibask-refresh-token", res.data.token["refresh"]);
          localStorage.setItem("dentibask-role", res.data.role);
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleGoogleLoginSuccess = (CredentialResponse) => {
    try {
      const tokenId = CredentialResponse;
      console.log(tokenId);
  
      // if (!tokenId || typeof tokenId !== 'string') {
      //   throw new Error('Invalid or missing token');
      // }
  
      const decodedToken = jwtDecode(tokenId.credential);

      // Extract the relevant information from the decoded token
      const { sub: userId, email, name } = decodedToken;

    // Now you can use the decoded information as needed
    console.log('Decoded Token:', decodedToken);

    // Example: Send the decoded data to Django backend for sign-in
    axiosinstance
      .post("/User/google-signin/", {token: tokenId.credential })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("dentibask-access-token", res.data.access);
        localStorage.setItem("dentibask-refresh-token", res.data.refresh);
        localStorage.setItem("dentibask-role", "user");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  
      // Rest of your logic with decodedToken
    } catch (error) {
      console.error('Error decoding token:', error.message);
      // Handle the error as needed
    }
    
  };

  return (
    <GoogleOAuthProvider clientId="211650131656-10hp9abqvemrbvo7v13o62hq48bs5ouk.apps.googleusercontent.com">
      <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
        <ThemeProvider theme={createTheme()}>
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
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign In
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{
                      borderTop: "1px solid #ccc",
                      width: "40%",
                      height: 0,
                      margin: "0 10px",
                    }}
                  />
                  <Typography variant="body2" color="textSecondary" sx={{ flexGrow: 1, textAlign: "center" }}>
                    OR
                  </Typography>
                  <Box
                    sx={{
                      borderTop: "1px solid #ccc",
                      width: "40%",
                      height: 0,
                      margin: "0 10px",
                    }}
                  />
                </Box>
                <Box sx={{margin: "12px 0", display: "flex", alignItems: "center", justifyContent: "center", height : 60}}>
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  shape="pill"
                  width={396}
                  size="large"
                  theme="filled_black"
                  render={(renderProps) => (
                    <Button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="w-full"
                      variant="contained"
                    >
                      Sign In with Google
                    </Button>
                  )}
                />
                </Box>
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
          </Container>
        </ThemeProvider>
      </PayPalScriptProvider>
    </GoogleOAuthProvider>
  );
}

export default SignIn;

