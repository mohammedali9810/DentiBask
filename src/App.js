import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/navandside/Dashboard";
import { useState } from "react";
import { Theme } from "./components/themecontext";
import { Lang } from "./components/langcontext";

function App() {
  const [theme, setTheme] = useState(false);
  const [lang, setLang] = useState(false);
  return (
    <BrowserRouter>
      <Theme.Provider value={{ theme, setTheme }}>
        <Lang.Provider value={{ lang, setLang }}>
          <div className="App">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </Lang.Provider>
      </Theme.Provider>
    </BrowserRouter>
  );
}

export default App;
