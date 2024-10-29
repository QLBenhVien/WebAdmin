import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import QuanTri from "./QuanTri";
import QuanTriBN from "./QuanTriBN";

// import Header from "./Header";
import SlideMenu from "../../components/SlideMenu";
// import Login from "../Login/Login";
const DoctorRoles = () => {
  return (
    <div
      style={{
        display: "flex",
        maxHeight: "100vh",
        backgroundColor: "#f0f8ff",
      }}
    >
      <div style={{ flexBasis: "20%" }}>
        <SlideMenu />
      </div>

      <div style={{ flexBasis: "80%" }}>
        {/* <Header /> */}
        <Routes>
          <Route path="/nhanvien" element={<QuanTri />} />
          <Route path="/benhnhan" element={<QuanTriBN />} />
        </Routes>
      </div>
    </div>
  );
};

export default DoctorRoles;
