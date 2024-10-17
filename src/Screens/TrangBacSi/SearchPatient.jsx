import { useState } from "react";
import "./Doctor.css";
import { useNavigate } from "react-router-dom";

const SearchPatient = () => {
  const [showQueryInfo, setShowQueryInfo] = useState(false);
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate("/medicalRecords/searchPatient");
  };

  const patientData = [
    {
      id: 1,
      maHs: "0000000",
      tenBenhNhan: "Nguyễn Văn A",
      ngayKham: "03/09/2024",
    },
    {
      id: 2,
      maHs: "0000001",
      tenBenhNhan: "Trần Thị B",
      ngayKham: "04/09/2024",
    },
    {
      id: 3,
      maHs: "0000002",
      tenBenhNhan: "Lê Văn C",
      ngayKham: "05/09/2024",
    },
  ];

  const toggleQueryInfo = () => {
    setShowQueryInfo(!showQueryInfo);
  };

  const handleCancel = () => {
    setShowQueryInfo(false);
  };

  return (
    <div className="outer">
      <div className="patient-header">
        <div className="patient-header-title">DANH SÁCH BỆNH NHÂN</div>
        <div className="patient-header-breadcrumb">
          <span>
            <strong>Danh sách bệnh nhân / </strong>
          </span>
          <span className="patient-breadcrumb-secondary">Tra cứu </span>
        </div>
      </div>
      <div className="container2">
        <div className="patient-container">
          <div className="patient-list-search-filter">
            <div className="patient-sort-by">Kết quả cho:</div>
            <div className="search-name">Nguyễn Văn A</div>
            <div className="patient-search-button" onClick={toggleQueryInfo}>
              TRA CỨU
            </div>
          </div>

          {showQueryInfo && (
            <div className="info-container">
              <div className="info-card">
                <div className="info-header">
                  <h2 className="header-title">TRA CỨU THÔNG TIN BỆNH NHÂN</h2>
                </div>
                <div className="search-section">
                  <div className="search-row">
                    <div className="patient-name">Họ và tên bệnh nhân:</div>
                    <div className="search-input">
                      <input
                        type="text"
                        placeholder="Nhập họ tên"
                        className="text-input"
                      />
                    </div>
                  </div>
                  <div className="search-row">
                    <div className="visit-date">Ngày khám bệnh:</div>
                    <div className="date-picker">
                      <input type="date" className="date-input pointer" />
                    </div>
                  </div>
                </div>
                <div className="button-container">
                  <button
                    className="button cancel-button"
                    onClick={handleCancel}
                  >
                    HỦY
                  </button>
                  <button
                    className="button lookup-button"
                    onClick={handleSearch}
                  >
                    TRA CỨU
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="patient-table">
            <div className="patient-table-header">
              <div className="patient-header-cell stt">STT</div>
              <div className="patient-header-cell ma-hs">Mã HS</div>
              <div className="patient-header-cell ten-benh-nhan">
                Tên bệnh nhân
              </div>
              <div className="patient-header-cell ngay-kham">Ngày khám</div>
              <div className="patient-header-cell chi-tiet">Chi tiết</div>
            </div>
            <div className="patient-table">
              {patientData.map((patient) => (
                <div className="patient-table-row" key={patient.id}>
                  <div className="patient-table-cell stt">{patient.id}</div>
                  <div className="patient-table-cell ma-hs">{patient.maHs}</div>
                  <div className="patient-table-cell ten-benh-nhan">
                    {patient.tenBenhNhan}
                  </div>
                  <div className="patient-table-cell ngay-kham">
                    {patient.ngayKham}
                  </div>
                  <div className="patient-table-cell chi-tiet">
                    <a href="/medicalRecordsDetail" className="link-xem">
                      Xem
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPatient;
