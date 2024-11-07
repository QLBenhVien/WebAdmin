import { useState } from "react";
import "./Doctor.css";
import { useNavigate } from "react-router-dom";
import dropdown from "../../images/Polygon 1.png";

const PatientList = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showQueryInfo, setShowQueryInfo] = useState(false);
  const [sortOption, setSortOption] = useState("Ngày khám gần nhất");
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleQueryInfo = () => {
    setShowQueryInfo(!showQueryInfo);
  };

  const handleCancel = () => {
    setShowQueryInfo(false);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setDropdownOpen(false);
  };

  const handleSearch = () => {
    navigate("/searchPatient");
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
  const filteredPatients = patientData
  .sort((a, b) => {
    if (sortOption === "Ngày khám gần nhất") {
      return new Date(b.ngayKham) - new Date(a.ngayKham); 
    } else {
      return new Date(a.ngayKham) - new Date(b.ngayKham); 
    }
  });

  const PatientTable = () => {
    const getTinhTrangStyle = (tinhTrang) => {
      return {
        color: tinhTrang === "Chưa khám" ? "red" : "green",
        fontWeight: 400,
      };
    };
    return (
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
        {filteredPatients.map((patient, index) => (
          <div className="patient-table-row" key={patient.id}>
            <div className="patient-table-cell stt">{index + 1}</div>
            <div className="patient-table-cell ma-hs">{patient.maHs}</div>
            <div className="patient-table-cell ten-benh-nhan">
              {patient.tenBenhNhan}
            </div>
            <div className="patient-table-cell ngay-kham">
              {patient.ngayKham}
            </div>
            <div className="patient-table-cell chi-tiet">
              <a href="medicalRecordsDetail" className="link-xem">
                Xem
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
  };

  // const { isAuthenticated, admin } = useContext(Context);

  return (
    <div className="outer">
      <div className="patient-header">
        <div className="patient-header-title">DANH SÁCH BỆNH NHÂN</div>
        <div className="patient-header-breadcrumb">
          <span>
            <strong><a className="link-xem" href="/patientList">Danh sách bệnh nhân </a> / </strong>
          </span>
          <span className="patient-breadcrumb-secondary">
            Danh sách bệnh nhân{" "}
          </span>
        </div>
      </div>
      <div className="container2">
        <div className="patient-container">
          <div className="patient-list-search-filter">
            <div className="patient-sort-by">Sắp xếp theo:</div>
            <div className="patient-filter-button">
              {sortOption}
              <div className="dropdown-time">
                <img
                  className={`doctor-arrow ${dropdownOpen ? "open" : ""}`}
                  src={dropdown}
                  alt="Doctor"
                  onClick={toggleDropdown}
                />
                {dropdownOpen && (
                  <div className="dropdown-menuTime show">
                    <button
                      className="dropdown-itemTime"
                      onClick={() => handleSortChange("Ngày khám gần nhất")}
                    >
                      Ngày khám gần nhất
                    </button>
                    <button
                      className="dropdown-itemTime"
                      onClick={() => handleSortChange("Ngày khám xa nhất")}
                    >
                      Ngày khám xa nhất
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="patient-search-button" onClick={toggleQueryInfo}>
              TRA CỨU
            </div>
          </div>

          {showQueryInfo && (
            <div className="overlay">
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
          </div>
          )}
          <PatientTable />
        </div>
      </div>
    </div>
    
  );
};

export default PatientList;
