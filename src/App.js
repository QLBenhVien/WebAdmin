import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import Login from "./Screens/Login/Login";
import LeTanRoles from "./Screens/LeTan/LeTanRoles";
import DoctorRoles from "./Screens/TrangBacSi/DoctorRoles";

const App = () => {
  const location = useLocation(); // Get current location

  const isLoginPage = location.pathname === "/";

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      {/* <Route path="/Letan" element={<LeTanRoles />} /> */}
      {!isLoginPage && <DoctorRoles />}
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
