import { useState } from "react";
import "./Doctor.css";
import { useNavigate } from "react-router-dom";
import search from "../../images/Search copy.png";
import dropdown from "../../images/Polygon 1.png";

const Referrals = () => {
  const [alertMessage, setAlertMessage] = useState("");
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

  const patientData = [
    {
      id: 1,
      tenBenhNhan: "Nguyễn Văn A",
      ngayKham: "03/09/2024",
      tinhTrang: "Đã hoàn thành",
    },
    {
      id: 2,
      tenBenhNhan: "Trần Thị B",
      ngayKham: "04/09/2024",
      tinhTrang: "Chưa yêu cầu",
    },
    {
      id: 3,
      tenBenhNhan: "Lê Văn C",
      ngayKham: "05/09/2024",
      tinhTrang: "Đã hoàn thành",
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

    const handleViewClick = (tinhTrang) => {
      if (tinhTrang === "Chưa yêu cầu") {
        window.alert("Không có xét nghiệm cho bệnh nhân này.");
      } else {
        navigate("/Bacsi/resultTesting");
      }
    };

  const PatientTable = () => {
    const getTinhTrangStyle = (tinhTrang) => {
      return {
        color: tinhTrang === "Chưa yêu cầu" ? "red" : "green",
        fontWeight: 400,
      };
    };
    return (
      <div className="patient-table">
          {alertMessage && (
        <div className="alert-message">
          {alertMessage}
        </div>
      )}
      <div className="patient-table-header">
        <div className="patient-header-cell stt">STT</div>
        <div className="patient-header-cell ten-benh-nhan">
          Tên bệnh nhân
        </div>
        <div className="patient-header-cell ngay-kham">Ngày khám</div>
        <div className="patient-header-cell ma-hs">
          Yêu cầu xét nghiệm
        </div>
        <div className="patient-header-cell ma-hs">Tình trạng</div>
        <div className="patient-header-cell chi-tiet">Chi tiết</div>
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
            <div className="patient-table-cell chi-tiet">
            <a className="link-xem pointer" onClick={toggleQueryInfo}>
                Gửi yêu cầu
              </a>
            </div>
            <div className="patient-table-cell ma-hs" style={getTinhTrangStyle(patient.tinhTrang)}>
              {patient.tinhTrang}
            </div>
            <div className="patient-table-cell chi-tiet">
              <a className="link-xem" onClick={() => handleViewClick(patient.tinhTrang)}>
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
        <div className="patient-header-title">GỬI YÊU CẦU XÉT NGHIỆM</div>
        <div className="patient-header-breadcrumb">
          <span>
            <strong><a className="link-xem" href="/Bacsi/referrals">Gửi yêu cầu xét nghiệm </a> / </strong>
          </span>
          <span className="patient-breadcrumb-secondary">
            Gửi yêu cầu xét nghiệm{" "}
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
            
            <div className="patient-filter-button2">
              <img src={search} alt="Doctor" />
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
      {showQueryInfo && (
        <div className="overlay">
            <div className="info-container">
              <div className="info-card">
                <div className="info-header">
                  <h2 className="header-title">GỬI YÊU CẦU XÉT NGHIỆM</h2>
                </div>
                <div className="search-section">
                  <div className="search-row">
                    <div className="patient-name">Phòng xét nghiệm:</div>
                    <div className="search-input">
                      <input
                        type="text"
                        className="text-input"
                      />
                    </div>
                  </div>
                  <div className="search-row">
                    <div className="patient-name">Tên xét nghiệm:</div>
                    <div className="search-input">
                      <input type="text" className="text-input" />
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
                  >
                    GỬI YÊU CẦU
                  </button>
                </div>
              </div>
            </div>
          </div>
          )}
    </div>
  );
};

export default Referrals;
