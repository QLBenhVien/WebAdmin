import { useEffect, useState } from "react";
import "./Doctor.css";
import search from "../../images/Search copy.png";
import dropdown from "../../images/Polygon 1.png";

import { useNotification } from "../../context/NotificationContext";
import axiosInstance from "../../Axios/axios";

const MedicalRecord = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Ngày khám gần nhất");
  const [searchQuery, setSearchQuery] = useState("");

  const showNotification = useNotification();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setDropdownOpen(false);
  };
  const [patientData, setPatientData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/doctor/getAllhoso");
      console.log(res);
      setPatientData(res.data.data);
    } catch (error) {
      showNotification("Lỗi tải trang, vui lòng truy cập lại!", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPatients = patientData
  .filter((patient) =>
    patient.MaBenhNhan.Ten.toLowerCase().includes(searchQuery.toLowerCase())
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
              <div className="patient-table-row" key={patient._id}>
                <div className="patient-table-cell stt">{index + 1}</div>
                <div className="patient-table-cell ma-hs">{patient._id}</div>
                <div className="patient-table-cell ten-benh-nhan">
                  {patient.MaBenhNhan.Ten}
                </div>
                <div className="patient-table-cell ngay-kham">"Chua kham"</div>
                <div className="patient-table-cell chi-tiet">
                  <a
                    href={`/Bacsi/medicalRecord/infoMedicalRecordsDetail/${patient.MaBenhNhan._id}`}
                    className="link-xem"
                  >
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
        <div className="patient-header-title">DANH SÁCH BỆNH NHÂN</div>
        <div className="patient-header-breadcrumb">
          <span>
            <strong>
              <a className="link-xem" href="/Bacsi/medicalRecord">
                Hồ sơ bệnh án{" "}
              </a>{" "}
              /{" "}
            </strong>
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

export default MedicalRecord;
