import { useState } from "react";
import "./Doctor.css";
import { useNavigate } from "react-router-dom";

const MedicalRecord = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Ngày khám gần nhất");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setDropdownOpen(false);
  };

  const patientData = [
    {
      id: 1,
      maHs: "0000000",
      tenBenhNhan: "Nguyễn Văn A",
      ngayKham: "2024-09-03", 
    },
    {
      id: 2,
      maHs: "0000001",
      tenBenhNhan: "Trần Thị B",
      ngayKham: "2024-09-04",
    },
    {
      id: 3,
      maHs: "0000002",
      tenBenhNhan: "Lê Văn C",
      ngayKham: "2024-09-05",
    },
  ];

  const filteredPatients = patientData
    .filter((patient) =>
      patient.tenBenhNhan.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "Ngày khám gần nhất") {
        return new Date(b.ngayKham) - new Date(a.ngayKham); 
      } else {
        return new Date(a.ngayKham) - new Date(b.ngayKham); 
      }
    });

  const PatientTable = () => {
    return (
      <div className="patient-table">
        <div className="patient-table-header">
          <div className="patient-header-cell stt">STT</div>
          <div className="patient-header-cell ma-hs">Mã HS</div>
          <div className="patient-header-cell ten-benh-nhan">Tên bệnh nhân</div>
          <div className="patient-header-cell ngay-kham">Ngày tạo</div>
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
                <a href="/infoMedicalRecordsDetail" className="link-xem">
                  Xem
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="outer">
      <div className="patient-header">
        <div className="patient-header-title">DANH SÁCH HỒ SƠ BỆNH ÁN</div>
        <div className="patient-header-breadcrumb">
          <span>
            <strong>Hồ sơ bệnh án / </strong>
          </span>
          <span className="patient-breadcrumb-secondary">
            Danh sách hồ sơ bệnh án
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
                  src="Polygon 1.png"
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
            <div className="patient-filter-button2">
              <img src="Search.png" alt="Doctor" />
              <input
                placeholder="Nhập tên bệnh nhân"
                style={{ border: "none", outline: "none" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <PatientTable />
        </div>
      </div>
    </div>
  );
};

export default MedicalRecord;
