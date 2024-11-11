import React from "react";
import "./Doctor.css";
import { useNavigate } from "react-router-dom";

const InfoMedicalRecords = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/Bacsi/medicalRecord");
  };
  return (
    <div className="outer">
      <div className="patient-header">
        <div className="patient-header-title">THÔNG TIN HỒ SƠ BỆNH ÁN</div>
        <div className="patient-header-breadcrumb">
          <span>
            <strong><a className="link-xem" href="/medicalRecord">Hồ sơ bệnh án </a> / </strong>
          </span>
          <span className="patient-breadcrumb-secondary">
            Xem hồ sơ bệnh án{" "}
          </span>
        </div>
      </div>
      <div className="container3">
        <div style={styles.InfoContainer}>
          <div style={styles.infoSection}>
            <h2 style={styles.sectionTitle}>Thông tin bệnh nhân</h2>
            <p>
              <strong>Mã bệnh nhân:</strong> 0000000
            </p>
            <p>
              <strong>Họ và Tên:</strong> Nguyễn Thị Ngọc Hoài
            </p>
            <p>
              <strong>Ngày sinh:</strong> 20/10/2004
            </p>
            <p>
              <strong>Địa chỉ:</strong> Nguyễn Thái Sơn, Phường 5, Gò Vấp
            </p>
            <p>
              <strong>Giới tính:</strong> Nữ
            </p>
            <p>
              <strong>SDT:</strong> 0987967497
            </p>
          </div>
        </div>
      </div>
      <div className="container3">
        <div style={styles.infoSection}>
          <h2 style={styles.sectionTitle}>Danh sách bệnh án</h2>
          {/* Danh sách bệnh án sẽ được thêm vào đây */}
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>STT</th>
                <th style={styles.th}>Mã HS</th>
                <th style={styles.th}>Tên bệnh nhân</th>
                <th style={styles.th}>Tên bệnh</th>
                <th style={styles.th}>Ngày khám</th>
                <th style={styles.th}>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>1</td>
                <td style={styles.td}>0000000</td>
                <td style={styles.td}>Nguyễn Văn A</td>
                <td style={styles.td}>Đau bụng</td>
                <td style={styles.td}>25/9/2024</td>
                <td style={styles.td}>
                  <div className="patient-table-cell chi-tiet">
                    <a href="/Bacsi/medicalRecordsDetail2" className="link-xem">
                      Xem
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="patient-list-search-filter2">
        <div className="patient-search-buttonn" onClick={handleClose}>
          Đóng
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  homePage: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    background: "#E4F5FF",
    display: "flex",
    flexDirection: "column",
  },
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
  content: {
    display: "flex",
    flex: 1,
  },
  sidebar: {
    width: "300px",
    backgroundColor: "#22668E",
    padding: "20px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  mainContent: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    position: "relative",
  },
  pageContainer: {
    background: "rgba(228, 245, 255, 1)",
    padding: "20px",
    borderRadius: "0 20px 20px 0",
    height: "100%",
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    marginBottom: "20px",
  },
  pageTitleLeft: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#000000",
  },
  pageTitleRight: {
    fontSize: "20px",
    fontWeight: "400",
    color: "#000000",
  },
  whiteContainer: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    height: "100%",
  },
  InfoContainer: {
    backgroundColor: "#ffffff",
    padding: "5px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  infoSection: {
    margin: "20px",
  },
  sectionTitle: {
    padding: "10px",
    fontSize: "26px",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  th: {
    backgroundColor: "#D9D9D9",
    color: "#000000",
    padding: "10px",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
};

export default InfoMedicalRecords;
