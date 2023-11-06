import { BrowserRouter} from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header/Header";
import Router from "./Router/Router";
import "./App.css";
import { Theme } from "./components/themecontext";
import { Lang } from "./components/langcontext";

function App() {
  
  const [theme, setTheme] = useState(false);
  const [lang, setLang] = useState(false);
    return(
    <BrowserRouter>
    <Theme.Provider value={{ theme, setTheme }}>
        <Lang.Provider value={{ lang, setLang }}>
        <Header />
        <Router />
        </Lang.Provider>
      </Theme.Provider>
    </BrowserRouter>

  );
}

export default App;
