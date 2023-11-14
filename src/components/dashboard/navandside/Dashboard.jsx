import * as React from "react";
import { styled,alpha } from "@mui/material/styles";
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
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import logo from "./logo.png";
import darklogo from "./darklogo.png";
import { useContext } from "react";
import { Theme } from "../../themecontext";
import "./dashboard.css";
import CategoryIcon from "@mui/icons-material/Category";
import PaidIcon from "@mui/icons-material/Paid";
import {Lang} from "../../langcontext";
import logouticon from "./logout.svg";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseMedicalFlag } from '@fortawesome/free-solid-svg-icons';


import Products from "../productsdashboard/products";
import Customers from "../customers/customers";
import Settings from "../settings/settings";
import Categories from "../categoriesdashboard/category";
import Orders from "../ordersdashboard/orders";
import Transactions from "../Transactionsdashboard/transactions";
import Rents from "../rentsdashboard/rents";
import Clinic from "../clinic/clinic";

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
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '35ch',
      },
    },
  },
}));
export default function Dashboard() {
  const {lang} = useContext(Lang);
  const [ selected , setSelected] = React.useState("Products");
  const { theme } = useContext(Theme);
  const mode = theme ? "darkmode" : "lightmode";
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [view,setView] = React.useState(<Products/>);
  //////////////////////////////////////////////////////////////////////////////
  const mainListItems = (
    <React.Fragment>
      <ListItemButton
      sx={{
        opacity: "1",
        cursor:"default",
        color:"#0096FF"
      }}
      >
        <ListItemIcon>
          <DashboardIcon style={{color:"#0096FF"}}/>
        </ListItemIcon>
        <ListItemText primary={lang ? " لوحة القياده" : "Dashboard"}  />
      </ListItemButton>
      <Divider sx={{ my: 1, opacity:"1" }} />
      <ListItemButton
       onClick={() => {setView(<Products/>) ;return setSelected("Products")}}
       sx={{
         backgroundColor: selected === "Products" && "#CDCDCD",
         opacity: selected === "Products" && "1",
       }}
       className="sidebtn"
      >
        <ListItemIcon>
          <ShoppingCartIcon className={theme && "darkicon"} />
        </ListItemIcon>
        
        <ListItemText primary={lang ? "المنتجات" : "Products"}  />
      </ListItemButton>
      <ListItemButton
       onClick={() => {setView(<Categories/>) ;return setSelected("Category")}}
       sx={{
         backgroundColor: selected === "Category" && "#CDCDCD",
         opacity: selected === "Category" && "1",
       }}
       className="sidebtn"
      >
        <ListItemIcon>
          <CategoryIcon className={theme && "darkicon"}/>
        </ListItemIcon>
        <ListItemText primary={lang ? "الأنواع" : "Category"} />
      </ListItemButton>
      
      <ListItemButton
       onClick={() => {setView(<Customers/>) ;return setSelected("Customers")}}
       sx={{
         backgroundColor: selected === "Customers" && "#CDCDCD",
         opacity: selected === "Customers" && "1",
       }}
       className="sidebtn"
      >
        <ListItemIcon>
          <PeopleIcon  className={theme && "darkicon"} />
        </ListItemIcon>
        <ListItemText primary={lang ? "المستخدمين" : "Customers"} />
      </ListItemButton>
      <ListItemButton
       onClick={() => setSelected("Orders")}
       sx={{
         backgroundColor: selected === "Orders" && "#CDCDCD",
         opacity: selected === "Orders" && "1",
       }}
       className="sidebtn"
      >
        <ListItemIcon>
          <BarChartIcon  className={theme && "darkicon"} />
        </ListItemIcon>
        <ListItemText onClick={()=>{setView(<Orders/>)}} primary={lang ? "الطلبات" : "Orders"} />
      </ListItemButton>


      <ListItemButton
       onClick={() => {setView(<Clinic/>) ;return setSelected("Clinic")}}
       sx={{
         backgroundColor: selected === "Clinic" && "#CDCDCD",
         opacity: selected === "Clinic" && "1",
       }}
       className="sidebtn"
      >
        <ListItemIcon>
        <FontAwesomeIcon icon={faHouseMedicalFlag} className={theme ? "darkicon" : ""} />
        </ListItemIcon>
        <ListItemText onClick={()=>{
        }}
         primary={lang ? "العيادات" : "Clinic"}/>
      </ListItemButton>


      <ListItemButton
       onClick={() => {setView(<Rents/>) ;return setSelected("Rents")}}
       sx={{
         backgroundColor: selected === "Rents" && "#CDCDCD",
         opacity: selected === "Rents" && "1",
       }}
       className="sidebtn"
      >
        <ListItemIcon>
          <LayersIcon  className={theme && "darkicon"} />
        </ListItemIcon>
        <ListItemText primary={lang ? "الإيجارات" : "Rents"}/>
      </ListItemButton>
  
      <ListItemButton
       onClick={() => {setView(<Transactions/>);setSelected("Transactions")}}
       sx={{
         backgroundColor: selected === "Transactions" && "#CDCDCD",
         opacity: selected === "Transactions" && "1",
       }}
       className="sidebtn"
      >
        <ListItemIcon>
          <PaidIcon className={theme && "darkicon"} />
        </ListItemIcon>
        <ListItemText primary={lang ? "التحويلات" : "Transactions"} />
      </ListItemButton>   
    </React.Fragment>
  );
  const secondaryListItems = (
    <React.Fragment>
      <ListItemButton
       onClick={() => {setView(<Settings/>); return setSelected("Settings");}}
       sx={{
         backgroundColor: selected === "Settings" && "#CDCDCD",
         opacity: selected === "Settings" && "1",
       }}
       className="sidebtn"
      >
        <ListItemIcon>
          <AssignmentIcon  className={theme && "darkicon"} />
        </ListItemIcon>
        <ListItemText primary={lang ? "الإعدادات" : "Settings"} />
      </ListItemButton>
      <ListItemButton
      className="sidebtn"
      >
        <ListItemIcon>
          <img src={logouticon} alt="logouticon"  className={theme && "darkicon"} />
        </ListItemIcon>
        <ListItemText primary={lang ? "الخروج" : "Logout"} />
      </ListItemButton>
    </React.Fragment>
  );
////////////////////////////////////////////////////////////////////////////
  return (

      <Box className={mode} sx={{ display: "flex", flexDirection: lang ? "row-reverse" : "row" }}>
        <CssBaseline />
        <AppBar  position="absolute" open={open}
        className={lang ? "app-bar-right" : "app-bar-left"}
        >
          <Toolbar
          className={theme ? "darknav" : "lightnav"}
            sx={{
              pr: "24px",
            }}
          >
           <div className="dashboardtitle">
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
</div>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, fontSize:"2rem", fontWeight:"bold" }}
              className="dashboardtitle"
            >
              {selected === "Dashboard"? lang ? " لوحة القياده" : "Dashboard" : null }
              {selected === "Products"? lang ? " المنتجات" : "Products" : null }
              {selected === "Category"? lang ? " الانواع" : "Category" : null }
              {selected === "Rents"? lang ? "الإيجارات" : "Rents" : null }
              {selected === "Settings"? lang ? " الإعدادات " : "Settings" : null }
              {selected === "Orders"? lang ? " الطلبات " : "Orders" : null }
              {selected === "Customers"? lang ? " المستخدمين " : "Customers" : null }
              {selected === "Transactions"? lang ? " التحويلات " : "Transactions" : null }
              {selected === "Clinic"? lang ? " العيادات " : "Clinic" : null }
            </Typography>
            <Search style={{backgroundColor:"white"}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}/>
          </Search>

            <IconButton color="inherit">
              <Badge badgeContent={1} color="secondary">
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
            {open && <img src={theme ? darklogo :logo} alt="logo" style={{marginTop:"1rem"}} />}
            <IconButton  onClick={toggleDrawer} >
              {lang ? null : <ChevronLeftIcon  className={theme && "darkicon"} />}
            </IconButton>
            
          </Toolbar>

          <List style={{height:"100%"}} component="nav" className={theme ? "darkmodesidebar" : "lightsidebar"}>

            {mainListItems}
            <Divider sx={{ my: 1, opacity:"1" }} />
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
    backgroundColor: mode === 'darkmode' ? 'black' : '#CDCDCD', 
    color: mode === 'darkmode' ? 'green' : '', 
  }}
>
  {view}
</Paper>
        </Box>
      </Box>
  );
}