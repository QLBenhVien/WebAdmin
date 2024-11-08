import { useState, useEffect } from "react";
import logo from "../images/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const NavKyThuatVien = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname); 

  // Khi đường dẫn thay đổi, cập nhật activeItem
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const navigateTo = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <span style={styles.sidebarTitle}>Phòng khám UCM</span>
      </div>
      <ul style={styles.sidebarList}>
        <li
          style={{
            ...styles.sidebarItem,
            backgroundColor: activeItem.startsWith("/KyThuatVien/home")
              ? "#FFFFFF"
              : "#578EAF",
            color: activeItem.startsWith("/KyThuatVien/home")
              ? "#000000"
              : "#FFFFFF",
          }}
          onClick={() => navigateTo("/KyThuatVien/home")}
        >
          Trang chủ
        </li>
        <li
          style={{
            ...styles.sidebarItem,
            backgroundColor: activeItem.startsWith("/KyThuatVien/requestList")
              ? "#FFFFFF"
              : "#578EAF",
            color: activeItem.startsWith("/KyThuatVien/requestList")
              ? "#000000"
              : "#FFFFFF",
          }}
          onClick={() => navigateTo("/KyThuatVien/requestList")}
        >
          Danh sách yêu cầu
        </li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    backgroundColor: "#22668E",
    padding: "20px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "76.7vw",
    height: "100vh",
    position: "fixed", // Đảm bảo sidebar luôn cố định khi cuộn trang
    top: 0,
    left: 0,
    boxSizing: "border-box", // Đảm bảo padding không làm thay đổi chiều rộng và chiều cao
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
  },
  logo: {
    width: "40px",
    height: "40px",
    marginRight: "10px",
  },
  sidebarTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#22668E",
  },
  sidebarList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    width: "100%",
  },
  sidebarItem: {
    marginBottom: "20px",
    cursor: "pointer",
    textAlign: "center",
    padding: "10px",
    backgroundColor: "#578EAF",
    borderRadius: "10px",
  },
};

export default NavKyThuatVien;
