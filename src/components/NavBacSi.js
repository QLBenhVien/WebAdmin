import { useState, useEffect } from "react";
import logo from "../images/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const NavBacSi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname); // Đặt activeItem là đường dẫn hiện tại

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
            backgroundColor: activeItem.startsWith("/Bacsi/home")
              ? "#FFFFFF"
              : "#578EAF",
            color: activeItem.startsWith("/Bacsi/home")
              ? "#000000"
              : "#FFFFFF",
          }}
          onClick={() => navigateTo("/Bacsi/home")}
        >
          Trang chủ
        </li>
        <li
          style={{
            ...styles.sidebarItem,
            backgroundColor: activeItem.startsWith("/Bacsi/medicalRecord")
              ? "#FFFFFF"
              : "#578EAF",
            color: activeItem.startsWith("/Bacsi/medicalRecord")
              ? "#000000"
              : "#FFFFFF",
          }}
          onClick={() => navigateTo("/Bacsi/medicalRecord")}
        >
          Danh sách bệnh nhân
        </li>
        <li
          style={{
            ...styles.sidebarItem,
            backgroundColor: activeItem.startsWith("/Bacsi/referrals")
              ? "#FFFFFF"
              : "#578EAF",
            color: activeItem.startsWith("/Bacsi/referrals")
              ? "#000000"
              : "#FFFFFF",
          }}
          onClick={() => navigateTo("/Bacsi/referrals")}
        >
          Gửi yêu cầu xét nghiệm
        </li>
        <li
          style={{
            ...styles.sidebarItem,
            backgroundColor: activeItem.startsWith("/Bacsi/examinationForm")
              ? "#FFFFFF"
              : "#578EAF",
            color: activeItem.startsWith("/Bacsi/examinationForm")
              ? "#000000"
              : "#FFFFFF",
          }}
          onClick={() => navigateTo("/Bacsi/examinationForm")}
        >
          Phiếu khám bệnh
        </li>
        {/* <li
          style={{
            ...styles.sidebarItem,
            backgroundColor: activeItem.startsWith("/Bacsi/patientList")
              ? "#FFFFFF"
              : "#578EAF",
            color: activeItem.startsWith("/Bacsi/patientList")
              ? "#000000"
              : "#FFFFFF",
          }}
          onClick={() => navigateTo("/Bacsi/patientList")}
        >
          Danh sách bệnh nhân
        </li> */}
        <li
          style={{
            ...styles.sidebarItem,
            backgroundColor: activeItem.startsWith("/Bacsi/schedule")
              ? "#FFFFFF"
              : "#578EAF",
            color: activeItem.startsWith("/Bacsi/schedule")
              ? "#000000"
              : "#FFFFFF",
          }}
          onClick={() => navigateTo("/Bacsi/schedule")}
        >
          Đăng ký lịch làm việc
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

export default NavBacSi;
