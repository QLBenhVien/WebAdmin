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
        height: "100vh",
        backgroundColor: "#f0f8ff",
      }}
    >
      <div style={{ flex: "2" }}>
        <SlideMenu />
      </div>

      <div style={{ flex: "8" }}>
        {/* <Header /> */}
        <Routes>
          <Route path="/nhanvien" element={<QuanTri />} />
          <Route path="/benhnhan" element={<QuanTriBN />} />
        </Routes>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid #DDD",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  userAvatar: {
    width: "60px",
    height: "60px",
    background: "#D9D9D9",
    borderRadius: "50%",
    marginRight: "20px",
  },
  userName: {
    fontSize: "20px",
    fontWeight: "bold",
  },
};

export default DoctorRoles;
