import React from "react";
import { Route, Routes } from "react-router-dom";
import LetanPage from "./TrangLeTan/LetanPage";
import QuanLyDatKham from "./QuanLyDatKham/QuanLyDatKham";
import NavLeTan from "../../components/NavLeTan";
import LapPhieuKhamBenh from "./LapPhieuKhamBenh/LapPhieuKhamBenh";
import ThongTinDatKham from "./ThongTinDatKham/ThongTinDatkham";
import DanhSachBenhNhan from "./DanhSachBenhNhan/DanhSachBenhNhan";
import DanhSachHoaDon from "./DanhSachHoaDon/DanhSachHoaDon";
import Header from "../../components/Header";
import ChiTietBenhNhan from "./ChiTietBenhNhan/MedicalRecordsDetail";
const LeTanRoles = () => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#f0f8ff",
        maxHeight: "100vh",
      }}
    >
      <div style={{ flexBasis: "20%" }}>
        <NavLeTan />
      </div>

      <div style={{ flexBasis: "80%", marginLeft: "0.5%" }}>
        <Header />
        <Routes>
          <Route path="danhsachhoadon" element={<DanhSachHoaDon />} />
          <Route path="/" element={<LetanPage />} />
          <Route path="danhsachbenhnhan" element={<DanhSachBenhNhan />} />
          <Route path="qlDatkham" element={<QuanLyDatKham />} />
          <Route path="lapphieukhambenh" element={<LapPhieuKhamBenh />} />
          <Route path="chitietdatkham/:id" element={<ThongTinDatKham />} />
          <Route path="chitietphieukham/:id" element={<ChiTietBenhNhan />} />
        </Routes>
      </div>
    </div>
  );
};

export default LeTanRoles;
