import { useState } from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const NavLeTan = () => {
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState("/Letan");

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
            backgroundColor: activeItem === "/Letan" ? "#FFFFFF" : "#578EAF",
            color: activeItem === "/Letan" ? "#000000" : "#FFFFFF",
          }}
          onClick={() => navigateTo("/Letan")}
        >
          Trang chủ
        </li>
        <li
          style={{
            ...styles.sidebarItem,
            backgroundColor:
              activeItem === "/qlDatkham" ? "#FFFFFF" : "#578EAF",
            color: activeItem === "/qlDatkham" ? "#000000" : "#FFFFFF",
          }}
          onClick={() => navigateTo("/qlDatkham")}
        >
          Quản lý đặt khám
        </li>
        <li
          style={{
            ...styles.sidebarItem,
            backgroundColor:
              activeItem === "/lapphieukhambenh" ? "#FFFFFF" : "#578EAF",
            color: activeItem === "/lapphieukhambenh" ? "#000000" : "#FFFFFF",
          }}
          onClick={() => navigateTo("/lapphieukhambenh")}
        >
          Lập phiếu khám bệnh
        </li>
        <li
          style={{
            ...styles.sidebarItem,
            backgroundColor:
              activeItem === "/danhsachbenhnhan" ? "#FFFFFF" : "#578EAF",
            color: activeItem === "/danhsachbenhnhan" ? "#000000" : "#FFFFFF",
          }}
          onClick={() => navigateTo("/danhsachbenhnhan")}
        >
          Danh sách bệnh nhân
        </li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "90%",
    backgroundColor: "#22668E",
    padding: "20px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
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

export default NavLeTan;
