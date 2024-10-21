// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext"; // Import NotificationProvider
import Login from "./Screens/Login/Login";
import LeTanRoles from "./Screens/LeTan/LeTanRoles";
import DoctorRoles from "./Screens/TrangBacSi/DoctorRoles";
import QuanTriRoles from "./Screens/QuanTri/QuanTriRoles";
import Notfound from "./Screens/NotFound/Notfound";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Letan/*" element={<LeTanRoles />} />
        <Route path="/Bacsi/*" element={<DoctorRoles />} />
        <Route path="/QuanTri/*" element={<QuanTriRoles />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </div>
  );
};

export default function AppWrapper() {
  return (
    <Router>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </Router>
  );
}
