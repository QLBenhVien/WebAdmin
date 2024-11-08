import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import RequestList from "./DanhSachYeuCau/RequestList";
import Home from "./TrangChu/Home";
import Header from "../TrangBacSi/Header";
import NavKyThuatVien from "../../components/NavKyThuatVien";
import Prescribe from "./DanhSachYeuCau/Prescribe";

const KyThuatVienRole = () => {
    return (
        <div
          style={{
            display: "flex",
            maxHeight: "100vh",
            backgroundColor: "#f0f8ff",
          }}
        >
          <div style={{ flexBasis: "20%" }}>
            <NavKyThuatVien />
          </div>
    
          <div style={{ flexBasis: "80%" }}>
            <Header />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/requestList" element={<RequestList />} />
              <Route path="/prescribe" element={<Prescribe />} />
            </Routes>
          </div>
        </div>
      );
}

export default KyThuatVienRole;