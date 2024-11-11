import { useEffect, useState } from "react";
import "./Doctor.css";
import { useNavigate } from "react-router-dom";
import search from "../../images/Search copy.png";
import dropdown from "../../images/Polygon 1.png";
import Axios from "../../Axios/axios";
import { useNotification } from "../../context/NotificationContext";

const ExaminationForm = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Ngày khám gần nhất");
  const [searchQuery, setSearchQuery] = useState("");
  const [patientData, setPatientData] = useState([]);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSortChange = (option) => {
    setSortOption(option);
    setDropdownOpen(false);
  };

  const handleViewMedicalRecord = (tinhTrang) => {
    if (tinhTrang === "Chưa khám") {
      window.alert("Không có bệnh án cho bệnh nhân này.");
    } else {
      navigate("/Bacsi/infoMedicalRecordsDetail");
    }
  };

  const fetchData = async () => {
    try {
      const res = await Axios.get(`doctor/getPhieukham/${null}`);
      const data = res.data?.data?.thongtinphieu || [];
      console.log(data);
      setPatientData(data);
    } catch (error) {
      console.error(error);
      if (showNotification) {
        showNotification(error.response.data.message, "error");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPatients = patientData
    .filter((patient) =>
      patient.tenBenhNhan?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "Ngày khám gần nhất") {
        return new Date(b.ngayKham) - new Date(a.ngayKham);
      } else {
        return new Date(a.ngayKham) - new Date(b.ngayKham);
      }
    });

  const PatientTable = () => {
    const getTinhTrangStyle = (tinhTrang) => ({
      color: tinhTrang === false ? "red" : "green",
      fontWeight: 400,
    });

    return (
      <div className="patient-table">
        <div className="patient-table-header">
          <div className="patient-header-cell stt">STT</div>
          <div className="patient-header-cell ten-benh-nhan">Tên bệnh nhân</div>
          <div className="patient-header-cell ngay-kham">Ngày khám</div>
          <div className="patient-header-cell ma-hs">Ca khám</div>
          <div className="patient-header-cell ma-tt">Tình trạng</div>
          <div className="patient-header-cell chi-tiet">Thao tác</div>
        </div>
        <div className="patient-table">
          {filteredPatients.length <= 0 ? (
            <h4 style={{ fontWeight: "400", color: "red" }}>
              Hôm nay không có bệnh nhân nào !
            </h4>
          ) : (
            filteredPatients.map((patient, index) => (
              <div className="patient-table-row" key={patient.id}>
                <div className="patient-table-cell stt">{index + 1}</div>
                <div className="patient-table-cell ten-benh-nhan">
                  {patient.tenBenhNhan}
                </div>
                <div className="patient-table-cell ngay-kham">
                  {patient.ngayKham}
                </div>
                <div className="patient-table-cell ma-hs">{patient.caKham}</div>
                <div
                  className="patient-table-cell ma-tt"
                  style={getTinhTrangStyle(patient.tinhTrang)}
                >
                  {patient.tinhTrang ? "Đã khám" : "Chưa khám"}
                </div>
                <div className="patient-table-cell ma-hs">
                  <a
                    className="link-xem"
                    href={`/Bacsi/examinationForm/prescribe/${patient.idPhieu}`}
                  >
                    Xem
                  </a>
                </div>
              </div>
            ))
          )}
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
            <strong>
              <a className="link-xem" href="/Bacsi/examinationForm">
                Phiếu khám bệnh{" "}
              </a>{" "}
              /{" "}
            </strong>
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
    </div>
  );
};

export default ExaminationForm;
