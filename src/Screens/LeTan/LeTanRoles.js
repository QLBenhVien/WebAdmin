import React from "react";
import { Route, Routes } from "react-router-dom";
import LetanPage from "./TrangLeTan/LetanPage";
import QuanLyDatKham from "./QuanLyDatKham/QuanLyDatKham";
import NavLeTan from "../../components/NavLeTan";
import LapPhieuKhamBenh from "./LapPhieuKhamBenh/LapPhieuKhamBenh";
import ThongTinDatKham from "./ThongTinDatKham/ThongTinDatkham";

import DanhSachBenhNhan from "./DanhSachBenhNhan/DanhSachBenhNhan";
import DanhSachHoaDon from "./DanhSachHoaDon/DanhSachHoaDon";
import Header from "../TrangBacSi/Header";
const LeTanRoles = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f0f8ff",
      }}
    >
      <div style={{ flexBasis: "30%" }}>
        <NavLeTan />
      </div>

      <div style={{ flexBasis: "70%" }}>

        <Header />
        <Routes>
        <Route path="/danhsachhoadon" element={<DanhSachHoaDon/>} />
          <Route path="/Letan" element={<LetanPage />} />
          <Route path="/danhsachbenhnhan" element={<DanhSachBenhNhan/>} />
          <Route path="/qlDatkham" element={<QuanLyDatKham />} />
          <Route path="/lapphieukhambenh" element={<LapPhieuKhamBenh />} />
          <Route path="/chitietphieukham/:id" element={<ThongTinDatKham />} />
        </Routes>
      </div>
    </div>
  );
};

export default LeTanRoles;
