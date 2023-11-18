// import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Dashboard from "./components/dashboard/navandside/Dashboard";
// import { useState } from "react";
// import { Theme } from "./components/themecontext";
// import { Lang } from "./components/langcontext";
// import Router from "./Router/Router";
// import UserDashboard from "./components/userdashboard/navandside/UserDashboard";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// function App() {
//   const [theme, setTheme] = useState(false);
//   const [lang, setLang] = useState(false);
//   return (
//     <BrowserRouter>
//       <Theme.Provider value={{ theme, setTheme }}>
//         <Lang.Provider value={{ lang, setLang }}>
//         <PayPalScriptProvider options={{ "client-id": process.env.CLIENT_ID, 'currency':'USD', }}>
//           <div className="App">
//             <Routes>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/*" element={<Router />} />
//             </Routes>
//           </div>
//           </PayPalScriptProvider>
//         </Lang.Provider>
//       </Theme.Provider>
//     </BrowserRouter>
//   );
// }

// export default App;


import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/navandside/Dashboard";
import { useState } from "react";
import { Theme } from "./components/themecontext";
import { Lang } from "./components/langcontext";
import Router from "./Router/Router";
import UserDashboard from "./components/userdashboard/navandside/UserDashboard";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CLIENT_ID } from "./Config/Config";

function App() {
  const [theme, setTheme] = useState(false);
  const [lang, setLang] = useState(false);

  return (
    <BrowserRouter>
      <Theme.Provider value={{ theme, setTheme }}>
        <Lang.Provider value={{ lang, setLang }}>
          <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <div className="App">
              <Routes>
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/*" element={<Router />} />
              </Routes>
            </div>
          </PayPalScriptProvider>
        </Lang.Provider>
      </Theme.Provider>
    </BrowserRouter>
  );
}

export default App;

