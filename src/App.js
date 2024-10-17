import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Screens/Login/Login";
import LeTanRoles from "./Screens/LeTan/LeTanRoles";
import DoctorRoles from "./Screens/TrangBacSi/DoctorRoles";
import QuanTriRoles from "./Screens/QuanTri/QuanTriRoles";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Letan/*" element={<LeTanRoles />} />
        <Route path="/Bacsi/*" element={<DoctorRoles />} />
        <Route path="/QuanTri/*" element={<QuanTriRoles />} />
      </Routes>
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
