import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Router from "./Router/Router";
import "./App.css";
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import {Theme} from './components/themecontext.jsx'

function App() {
  

  return(
    <BrowserRouter>
    {/* <ThemeProvider theme={Theme}> */}
          <Header />
          <Router />

          {/* </ThemeProvider> */}
    </BrowserRouter>
  );
}

export default App;
