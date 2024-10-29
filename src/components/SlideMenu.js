import { useNavigate, useLocation } from "react-router-dom";
import logo from "../images/logo.png"; // Import đường dẫn logo của bạn

const SlideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
            backgroundColor:
              location.pathname === "/Letan" ? "#FFFFFF" : "#578EAF",
            color: location.pathname === "/Letan" ? "#000000" : "#FFFFFF",
          }}
          onClick={() => navigate("")}
        >
          Trang chủ
        </li>
        <li
          style={{
            ...styles.sidebarItem,
            backgroundColor:
              location.pathname === "/quantri/nhanvien" ? "#FFFFFF" : "#578EAF",
            color:
              location.pathname === "/quantri/nhanvien" ? "#000000" : "#FFFFFF",
          }}
          onClick={() => navigate("/quantri/nhanvien")}
        >
          Quản lý nhân viên
        </li>
        <li
          style={{
            ...styles.sidebarItem,
            backgroundColor:
              location.pathname === "/quantri/benhnhan" ? "#FFFFFF" : "#578EAF",
            color:
              location.pathname === "/quantri/benhnhan" ? "#000000" : "#FFFFFF",
          }}
          onClick={() => navigate("/quantri/benhnhan")}
        >
          Quản lý bệnh nhân
        </li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    // width: "90%", // Nếu muốn sidebar chiếm một phần chiều ngang, bạn có thể điều chỉnh giá trị này
    backgroundColor: "#22668E",
    padding: "20px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

export default SlideMenu;
