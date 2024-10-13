import React from "react";
import { useNavigate } from "react-router-dom";
import "./Doctor.css";

const ResultTesting = () => {
  const navigate = useNavigate();
  const handleExport = () => {
    const confirmExport = window.confirm("Bạn có chắc muốn xuất phiếu không?");
    if (confirmExport) {
      alert("Xuất phiếu thành công!");
      navigate("/referrals");
    } else {
    }
  };

  const handleClose = () => {
    navigate("/referrals");
  };

  return (
    <div className="outer">
      <div className="patient-header">
        <div className="patient-header-title">KẾT QUẢ XÉT NGHIỆM</div>
        <div className="patient-header-breadcrumb">
          <span>
            <strong>Gửi yêu cầu xét nghiệm / </strong>
          </span>
          <span className="patient-breadcrumb-secondary">
            Kết quả xét nghiệm{" "}
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
          <h2 style={styles.sectionTitle}>Kết quả xét nghiệm</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>STT</th>
                <th style={styles.th}>Tên xét nghiệm</th>
                <th style={styles.th}>Kết quả</th>
                <th style={styles.th}>Đơn vị</th>
                <th style={styles.th}>Trị số tham chiếu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>1</td>
                <td style={styles.td}>Cholesteron toàn phần</td>
                <td style={styles.td}>6.01</td>
                <td style={styles.td}>Viên</td>
                <td style={styles.td}>3,6 - 5,4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="patient-list-search-filter2">
        <div className="patient-search-buttonn" onClick={handleExport} >
          Xuất phiếu
        </div>
        <div className="patient-search-buttonn" onClick={handleClose}>
          Đóng
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
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

export default ResultTesting;
