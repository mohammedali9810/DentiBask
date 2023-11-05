import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Charts from "./Chart";
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import logo from "./logo.png";
import darklogo from "./darklogo.png";
import { useContext } from "react";
import { Theme } from "../../themecontext";
import "./dashboard.css";

import Products from "../productsdashboard/products";
import Customers from "../customers/customers";
import Settings from "../settings/settings";


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));



export default function Dashboard() {
  const { theme } = useContext(Theme);
  const mode = theme ? "darkmode" : "lightmode";
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [view,setView] = React.useState(<Charts/>);
  //////////////////////////////////////////////////////////////////////////////
  const mainListItems = (
    <React.Fragment >
      <ListItemButton >
        <ListItemIcon>
          <DashboardIcon style={{color:"#0096FF"}}/>
        </ListItemIcon>
        <ListItemText primary="Dashboard"  />
      </ListItemButton>



      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon className={theme && "darkicon"} />
        </ListItemIcon>
        
        <ListItemText onClick={()=>{setView(<Products/>)}} primary="Products"  />
      </ListItemButton>


      <ListItemButton>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText onClick={()=>{setView(<Categories/>)}} primary="Category" />
      </ListItemButton>
      
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon  className={theme && "darkicon"} />
        </ListItemIcon>
        <ListItemText onClick={()=>{setView(<Customers/>)}} primary="Customers" />
      </ListItemButton>


      
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon  className={theme && "darkicon"} />
        </ListItemIcon>
        <ListItemText onClick={()=>{setView(<Orders/>)}} primary="Orders" />
      </ListItemButton>

<<<<<<< HEAD
=======

>>>>>>> origin/msayed
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon  className={theme && "darkicon"} />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <LayersIcon  className={theme && "darkicon"} />
        </ListItemIcon>
        <ListItemText onClick={()=>{setView(<Rents/>)}} primary="Rents" />
      </ListItemButton>
  
      <ListItemButton>
        <ListItemIcon>
<<<<<<< HEAD
          <LayersIcon  className={theme && "darkicon"} />
=======
          <PaidIcon />
>>>>>>> origin/msayed
        </ListItemIcon>
        <ListItemText onClick={()=>{setView(<Transactions/>)}} primary="Transactions" />
      </ListItemButton>
<<<<<<< HEAD

=======
  
>>>>>>> origin/msayed
      
    </React.Fragment>
  );
  
  const secondaryListItems = (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon  className={theme && "darkicon"} />
        </ListItemIcon>
        <ListItemText onClick={()=>{setView(<Settings/>)}} primary="Settings" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon  className={theme && "darkicon"} />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  );

////////////////////////////////////////////////////////////////////////////


  return (

      <Box className={mode} sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar  position="absolute" open={open}>
          <Toolbar
          className={theme && "darknav"}
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
              
              
            </IconButton>
            <IconButton color="inherit">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
            className={theme ? "darkmodesidebar" : "lightsidebar"}
          >
          <img src={theme ? darklogo :logo} alt="logo" style={{marginTop:"1rem"}} />
            <IconButton  onClick={toggleDrawer} >
              <ChevronLeftIcon  className={theme && "darkicon"} />
            </IconButton>
            
          </Toolbar>

          <List style={{height:"100%"}} component="nav" className={theme ? "darkmodesidebar" : "lightsidebar"}>

            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Paper
  className={`${mode} ${mode === 'darkmode' ? 'dark-paper' : ''}`} 
  sx={{
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: mode === 'darkmode' ? 'black' : '', 
    color: mode === 'darkmode' ? 'white' : '', 
  }}
>
  {view}
</Paper>



        </Box>
      </Box>
  );
}
