import { useState } from "react";
import "./Doctor.css";
import { useNavigate } from "react-router-dom";

const ExaminationForm = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showQueryInfo, setShowQueryInfo] = useState(false);
  const [sortOption, setSortOption] = useState("Ngày khám gần nhất");
  const [searchQuery, setSearchQuery] = useState("");
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
    navigate("/");
  };

  const handleViewMedicalRecord = (tinhTrang) => {
    if (tinhTrang === "Chưa khám") {
      window.alert("Không có bệnh án cho bệnh nhân này.");
    } else {
      navigate("/infoMedicalRecordsDetail");
    }
  };

  const patientData = [
    {
      id: 1,
      tenBenhNhan: "Nguyễn Văn A",
      ngayKham: "03/09/2024",
      caKham: "1",
      tinhTrang: "Chưa khám"
    },
    {
      id: 2,
      tenBenhNhan: "Trần Thị B",
      ngayKham: "04/09/2024",
      caKham: "2",
      tinhTrang: "Đã khám"
    },
    {
      id: 3,
      tenBenhNhan: "Lê Văn C",
      ngayKham: "05/09/2024",
      caKham: "1",
      tinhTrang: "Chưa khám"
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
        <div className="patient-header-cell ten-benh-nhan">
          Tên bệnh nhân
        </div>
        <div className="patient-header-cell ngay-kham">Ngày khám</div>
        <div className="patient-header-cell ma-hs">Ca khám</div>
        <div className="patient-header-cell ma-tt">Tình trạng</div>
        <div className="patient-header-cell ma-hs">Bệnh án</div>
        <div className="patient-header-cell chi-tiet">Đơn thuốc</div>
      </div>
      <div className="patient-table">
      {filteredPatients.map((patient, index) => (
          <div className="patient-table-row" key={patient.id}>
            <div className="patient-table-cell stt">{index + 1}</div>
            <div className="patient-table-cell ten-benh-nhan">
              {patient.tenBenhNhan}
            </div>
            <div className="patient-table-cell ngay-kham">
              {patient.ngayKham}
            </div>
            <div className="patient-table-cell ma-hs">
              {patient.caKham}
            </div>
            <div className="patient-table-cell ma-tt" style={getTinhTrangStyle(patient.tinhTrang)}>
              {patient.tinhTrang}
            </div>
            <div className="patient-table-cell chi-tiet">
                <a
                  className="link-xem"
                  onClick={() => handleViewMedicalRecord(patient.tinhTrang)}>
                  Xem
                </a>  
              </div>
            <div className="patient-table-cell ma-hs">
              <a href="/prescribe" className="link-xem">
                Kê đơn
              </a>
              <span> |</span>
              <span>
                {" "}
                <a href="/prescribe" className="link-xem">
                  Sửa
                </a>
              </span>
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
        <div className="patient-header-title">PHIẾU KHÁM BỆNH</div>
        <div className="patient-header-breadcrumb">
          <span>
            <strong>Phiếu khám bệnh/ </strong>
          </span>
          <span className="patient-breadcrumb-secondary">Phiếu khám bệnh </span>
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

export default ExaminationForm;
