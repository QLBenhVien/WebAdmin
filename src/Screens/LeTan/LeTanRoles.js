import React from "react";
import { Route, Routes } from "react-router-dom";
import LetanPage from "./TrangLeTan/LetanPage";
import QuanLyDatKham from "./QuanLyDatKham/QuanLyDatKham";
import NavLeTan from "../../components/NavLeTan";
import LapPhieuKhamBenh from "./LapPhieuKhamBenh/LapPhieuKhamBenh";
import ThongTinDatKham from "./ThongTinDatKham/ThongTinDatkham";
const LeTanRoles = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f0f8ff",
      }}
    >
      <div style={{ flex: "3" }}>
        <NavLeTan />
      </div>

      <div style={{ flex: "7" }}>
        <div style={styles.navbar}>
          <div style={styles.userInfo}>
            <div style={styles.userAvatar}></div>
            <div style={styles.userName}>BS. Nguyễn Văn A</div>
          </div>
        </div>
        <Routes>
          <Route path="/Letan" element={<LetanPage />} />
          <Route path="/qlDatkham" element={<QuanLyDatKham />} />
          <Route path="/lapphieukhambenh" element={<LapPhieuKhamBenh />} />
          <Route path="/chitietphieukham" element={<ThongTinDatKham />} />
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

export default LeTanRoles;
