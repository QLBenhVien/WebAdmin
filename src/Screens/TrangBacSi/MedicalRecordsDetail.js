import React, { useContext } from "react";
// import { Context } from "../main";
import "./Doctor.css";
import { useNavigate } from "react-router-dom";

const MedicalRecordsDetails = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/Bacsi/patientList");
  };
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
  ];

  // Chuyển đổi thành một biến để lấy dữ liệu bệnh nhân
  const patientData = {
    name: "Nguyễn Văn A",
    age: 24,
    gender: "Nữ",
    patientCode: "10392",
    doctorName: "Bác sĩ Nguyễn",
    address: "Ấp 2, Tắc Vân, TP. Cà Mau",
    diagnosis: "Thấp không ảnh hưởng đến tim",
  };

  // const { isAuthenticated, admin } = useContext(Context);

  return (
    <div className="outer">
      <div className="patient-header">
        <div className="patient-header-title">CHI TIẾT BỆNH ÁN</div>
        <div className="patient-header-breadcrumb">
          <span>
            <strong><a className="link-xem" href="/patientList">Danh sách bệnh nhân </a> / </strong>
          </span>
          <span className="patient-breadcrumb-secondary">
            Chi tiết bệnh án{" "}
          </span>
        </div>
      </div>

      <div className="container2">
        <div className="report-container report-container-custom">
          <div className="report-background report-background-custom" />
          <div className="diagnosis-text diagnosis-custom">
            Chuẩn đoán: {patientData.diagnosis}
          </div>

          <div className="patient-info patient-name-custom">
            <span>Tên bệnh nhân: </span>
            <span className="patient-name-highlight">{patientData.name}</span>
          </div>

          <div className="patient-age age-custom">
            <span>Tuổi: </span>
            <span className="age-highlight">{patientData.age}</span>
          </div>

          <div className="patient-gender gender-custom">
            <span>Giới tính: </span>
            <span className="gender-highlight">{patientData.gender}</span>
          </div>

          <div className="patient-code patient-code-custom">
            Mã BN: {patientData.patientCode}
          </div>
          <div className="doctor-name doctor-name-custom">
            Tên bác sĩ: {patientData.doctorName}
          </div>
          <div className="patient-address address-custom">
            Địa chỉ: {patientData.address}
          </div>

          <div className="medication-title medication-title-custom">
            Thuốc đã kê:
          </div>
          <table className="medication-table">
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
        <div className="patient-search-buttonn" onClick={handleClose}>
          Đóng
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordsDetails;
