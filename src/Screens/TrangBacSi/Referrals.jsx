import { useState } from "react";
import "./Doctor.css";
import { useNavigate } from "react-router-dom";

const Referrals = () => {
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
    navigate("/");
  };

  const patientData = [
    {
      id: 1,
      tenBenhNhan: "Nguyễn Văn A",
      ngayKham: "03/09/2024",
      yeuCau: "Gửi yêu cầu",
      tinhTrang: "Đã hoàn thành",
    },
    {
      id: 2,
      tenBenhNhan: "Trần Thị B",
      ngayKham: "04/09/2024",
      yeuCau: "Gửi yêu cầu",
      tinhTrang: "Đã hoàn thành",
    },
    {
      id: 3,
      tenBenhNhan: "Lê Văn C",
      ngayKham: "05/09/2024",
      yeuCau: "Gửi yêu cầu",
      tinhTrang: "Đã hoàn thành",
    },
  ];

  return (
    <div className="outer">
      <div className="patient-header">
        <div className="patient-header-title">GỬI YÊU CẦU XÉT NGHIỆM</div>
        <div className="patient-header-breadcrumb">
          <span>
            <strong>Gửi yêu cầu xét nghiệm/ </strong>
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
              {patientData.map((patient) => (
                <div className="patient-table-row" key={patient.id}>
                  <div className="patient-table-cell stt">{patient.id}</div>
                  <div className="patient-table-cell ten-benh-nhan">
                    {patient.tenBenhNhan}
                  </div>
                  <div className="patient-table-cell ngay-kham">
                    {patient.ngayKham}
                  </div>
                  <div className="patient-table-cell ma-hs">
                    {patient.yeuCau}
                  </div>
                  <div className="patient-table-cell ma-hs">
                    {patient.tinhTrang}
                  </div>
                  <div className="patient-table-cell chi-tiet">
                    <a href="/resultTesting" className="link-xem">
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

export default Referrals;
