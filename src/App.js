import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/navandside/Dashboard";
import { useState } from "react";
import { Theme } from "./components/themecontext";

function App() {
  const [theme, setTheme] = useState(false);
  return (
    <BrowserRouter>
      <Theme.Provider value={{ theme, setTheme }}>
        <div className="App">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Theme.Provider>
    </BrowserRouter>
  );
}

export default App;
