import React from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Doctor.css";

const ResultTesting = () => {
  const navigate = useNavigate();

  const handleExport = () => {
    const confirmExport = window.confirm("Bạn có chắc muốn xuất phiếu không?");
    if (confirmExport) {
      const input = document.getElementById("pdf-content");

      const hospitalNameElement = document.querySelector(".hospital-name-pdf");
      hospitalNameElement.style.display = "block"; // Temporarily show it
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("ket_qua_xet_nghiem.pdf");

        hospitalNameElement.style.display = "none"; 
      });

      alert("Xuất phiếu thành công!");
      navigate("/Bacsi/referrals");
    }
  };

  const handleClose = () => {
    navigate("/Bacsi/referrals");
  };

  return (
    <div className="outer">
      <div id="pdf-content" className="container3">
        {/* Hospital Name for PDF Export (Hidden on Website) */}
        <div className="hospital-name-pdf">
        <div style={styles.sidebarHeader}>
        <img src="logo.png" alt="Logo" style={styles.logo} />
        <span style={styles.sidebarTitle}>Phòng khám UCM</span>
      </div>
        </div>

        {/* Patient Information Section */}
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

        {/* Test Results Section */}
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

      {/* Buttons for Export and Close */}
      <div className="patient-list-search-filter2">
        <div className="patient-search-buttonn" onClick={handleExport}>
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
  hospitalName: {
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
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

  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    marginTop: "50px",
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
    fontSize: "50px",
    fontWeight: "bold",
    color: "#22668E",
  },
  
};

export default ResultTesting;
