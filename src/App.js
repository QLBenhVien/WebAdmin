import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Screens/Login/Login";

import LeTanRoles from "./Screens/LeTan/LeTanRoles";

const App = () => {
  // const location = useLocation();
  // const isAuthPage =
  //   location.pathname === "/" ||
  //   location.pathname === "/register" ||
  //   location.pathname === "/resetpassword";
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/Letan" element={<LetanPage />} /> */}
      </Routes>
      <LeTanRoles />
    </div>
  );
};

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
