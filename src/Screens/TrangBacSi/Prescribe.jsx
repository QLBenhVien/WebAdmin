import React, { useState } from "react";
import "./Doctor.css";
import { useNavigate } from "react-router-dom";

const Prescribe = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("chưa khám");
  const [data, setData] = useState([
    { stt: 1, name: "", unit: "", quantity: "", dosage: "" },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  const handleAddRow = () => {
    const newRow = {
      stt: data.length + 1,
      name: "",
      unit: "",
      quantity: "",
      dosage: "",
    };
    setData([...data, newRow]);
  };

  const handleSave = () => {
    const confirmSave = window.confirm("Bạn có muốn lưu lại những thay đổi không?");
    
    if (confirmSave) {
      console.log("Data saved:", data);
      alert("Dữ liệu đã được lưu thành công!");
      navigate("/Bacsi/examinationForm");
    } else {
      
    }
  };

  return (
    <div className="outer">
      <div className="patient-header">
        <div className="patient-header-title">PHIẾU KHÁM BỆNH</div>
        <div className="patient-header-breadcrumb">
          <span>
            <strong><a className="link-xem" href="/examinationForm">Phiếu khám bệnh </a> / </strong>
          </span>
          <span className="patient-breadcrumb-secondary">Phiếu khám bệnh</span>
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
            <input type="text" style={styles.inputField} />
          </div>
        </div>

        <div style={styles.formGroup}>
          <div style={styles.label}>Chuẩn đoán</div>
          <div style={styles.inputContainer}>
            <input type="text" style={styles.inputField} />
          </div>
        </div>

        <div style={styles.formGroup}>
          <div style={styles.label}>Lời dặn của bác sĩ</div>
          <div style={styles.inputContainer}>
            <input type="text" style={styles.inputField} />
          </div>
        </div>

        <div style={styles.infoSection}>
          <h2 style={styles.sectionTitle}>Kê thuốc</h2>

          <table className="medication-table2">
            <thead>
              <tr className="medication-header">
                <th>STT</th>
                <th>Tên thuốc / Hàm lượng</th>
                <th>ĐVT</th>
                <th>Số lượng</th>
                <th>Liều dùng</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <React.Fragment key={item.stt}>
                  <tr className="medication-row">
                    <td>{item.stt}</td>
                    <td>
                      <input
                        type="text"
                        value={item.name}
                        style={{ border: "none", outline: "none" }}
                        onChange={(e) => handleInputChange(index, "name", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.unit}
                        style={{ border: "none", outline: "none" }}
                        onChange={(e) => handleInputChange(index, "unit", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.quantity}
                        style={{ border: "none", outline: "none" }}
                        onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.dosage}
                        style={{ border: "none", outline: "none" }}
                        onChange={(e) => handleInputChange(index, "dosage", e.target.value)}
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <button onClick={handleAddRow} className="add-row-button">
            Thêm hàng
          </button>
        </div>
      </div>

      <div className="patient-list-search-filter2">
        <div onClick={handleSave} className="patient-search-buttonn">Lưu</div>
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
    margin: "30px",
  },
  sectionTitle: {
    padding: "10px",
    fontSize: "26px",
    fontWeight: "bold",
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
    fontSize: 18,
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
    height: 30,
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
