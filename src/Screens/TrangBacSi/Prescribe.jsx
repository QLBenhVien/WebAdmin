import React from "react";
import "./Doctor.css";

const Prescribe = () => {
  const data = [
    {
      stt: 1,
      name: "Panadol Extra",
      unit: "Viên",
      quantity: 30,
      dosage: "Uống, Sáng 2 viên, Chiều 2 viên",
    },
    {
      stt: 2,
      name: "Aspirin",
      unit: "Viên",
      quantity: 20,
      dosage: "Uống, Sáng 1 viên, Chiều 1 viên",
    },
    {
      stt: 3,
      name: "Aspirin",
      unit: "Viên",
      quantity: 20,
      dosage: "Uống, Sáng 1 viên, Chiều 1 viên",
    },
  ];
  return (
    <div className="outer">
      <div className="patient-header">
        <div className="patient-header-title">PHIẾU KHÁM BỆNH</div>
        <div className="patient-header-breadcrumb">
          <span>
            <strong>Phiếu khám bệnh / </strong>
          </span>
          <span className="patient-breadcrumb-secondary">Phiếu khám bệnh </span>
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
        <div style={styles.formGroup}>
          <div style={styles.label}>Triệu chứng</div>
          <div style={styles.inputContainer}>
            <div style={{ flex: 1 }} />
            <input type="text" style={styles.inputField} />
          </div>
        </div>

        <div style={styles.formGroup}>
          <div style={styles.label}>Chuẩn đoán</div>
          <div style={styles.inputContainer}>
            <div style={{ flex: 1 }} />
            <input type="text" style={styles.inputField} />
          </div>
        </div>

        <div style={styles.formGroup}>
          <div style={styles.label}>Lời dặn của bác sĩ</div>
          <div style={styles.inputContainer}>
            <div style={{ flex: 1 }} />
            <input type="text" style={styles.inputField} />
          </div>
        </div>

        <div style={styles.infoSection}>
          <h2 style={styles.sectionTitle}>Kê thuốc</h2>
          {/* Danh sách bệnh án sẽ được thêm vào đây */}
          <table className="medication-table2">
            <thead>
              <tr className="medication-header">
                <th>STT</th>
                <th>Tên thuốc / Hàm lượng</th>
                <th>ĐVT</th>
                <th>Số lượng</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <React.Fragment key={item.stt}>
                  <tr className="medication-row">
                    <td>{item.stt}</td>
                    <td>{item.name}</td>
                    <td>{item.unit}</td>
                    <td>{item.quantity}</td>
                  </tr>
                  <tr className="medication-dosage-row">
                    <td colSpan="4">{item.dosage}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="patient-list-search-filter2">
        <div className="patient-search-buttonn">Lưu</div>
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
    margin: "30px",
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
  formGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    marginLeft: "30px",
    paddingTop: "10px",
  },
  label: {
    marginBottom: "5px",
    color: "black",
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: "700",
    lineHeight: "30px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    background: "white",
    borderRadius: 7,
    border: "1px solid black",
    padding: "4px 13px",
    width: 723,
    height: 47,
  },
  inputField: {
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
    fontSize: "16px",
    fontFamily: "Roboto",
  },
};

export default Prescribe;
