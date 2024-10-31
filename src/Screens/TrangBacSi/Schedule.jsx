import React, { useState, useEffect } from "react";
import "./Doctor.css";
import dropdown from "../../images/Polygon 1.png";

const Schedule = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Tất cả ngày");
  const [currentPage, setCurrentPage] = useState(0);
  const doctorName = "Đã đăng ký"; // Replace with logged-in doctor's name
  const daysPerPage = 6;

  // Generate schedule data for the next 12 months (52 weeks)
  const [initialScheduleData] = useState(() => {
    const startDate = new Date(2024, 10, 1); // Start from November 1, 2024
    return Array.from({ length: 365 }, (_, dayIndex) => { // Total of 365 days
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + dayIndex);
      return { date, ca1: null, ca2: null };
    });
  });

  const [scheduleData, setScheduleData] = useState(initialScheduleData);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setDropdownOpen(false);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getDaysForPage = () => {
    // Return only 6 days for the current page
    return scheduleData.slice(currentPage * daysPerPage, (currentPage + 1) * daysPerPage);
  };

  const handleClick = (dayIndex, ca) => {
    const dayGlobalIndex = currentPage * daysPerPage + dayIndex;
    setScheduleData((prevData) =>
      prevData.map((day, index) =>
        index === dayGlobalIndex
          ? { ...day, [ca]: day[ca] ? null : doctorName }
          : day
      )
    );
  };

  useEffect(() => {
    const now = new Date();
    const filteredData = scheduleData.filter((day) => day.date > now);
    setScheduleData(filteredData);
  }, []);

  const handleRegister = () => {
    const confirmed = window.confirm("Bạn có chắc là muốn đăng ký lịch?");
    if (confirmed) {
      // Lưu lịch ở đây
      alert("Lịch đã được lưu thành công!");
    }
  };

  const handleClearSchedule = () => {
    const confirmed = window.confirm("Bạn có chắc là muốn xóa hết lịch đăng ký?");
    if (confirmed) {
      // Reset the scheduleData to remove all registrations
      setScheduleData((prevData) =>
        prevData.map((day) => ({ ...day, ca1: null, ca2: null }))
      );
      alert("Tất cả lịch đã được xóa!");
    }
  };

  return (
    <div className="outer">
      <div className="patient-header">
        <div className="patient-header-title">ĐĂNG KÝ LỊCH LÀM VIỆC</div>
        <div className="patient-header-breadcrumb">
          <span>
            <strong>
              <a className="link-xem" href="/Bacsi/schedule">
                Đăng ký lịch làm việc
              </a>{" "}
              /
            </strong>
          </span>
          <span className="patient-breadcrumb-secondary">Đăng ký lịch làm việc</span>
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
                      onClick={() => handleSortChange("Tất cả ngày")}
                    >
                      Tất cả ngày
                    </button>
                    <button
                      className="dropdown-itemTime"
                      onClick={() => handleSortChange("Đã đăng ký")}
                    >
                      Đã đăng ký
                    </button>
                    <button
                      className="dropdown-itemTime"
                      onClick={() => handleSortChange("Chưa đăng ký")}
                    >
                      Chưa đăng ký
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="schedule">
            <table border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  {getDaysForPage().map((day, index) => (
                    <th key={index}>{formatDate(day.date)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ca 1 (7:30 - 11:00)</td>
                  {getDaysForPage().map((day, dayIndex) => (
                    <td key={dayIndex}>
                      <a
                        style={{
                          ...styles.link,
                          color: day.ca1 ? "green" : styles.link.color,
                        }}
                        onClick={() => handleClick(dayIndex, "ca1")}
                      >
                        {day.ca1 || "Đăng ký"}
                      </a>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Ca 2 (13:30 - 17:00)</td>
                  {getDaysForPage().map((day, dayIndex) => (
                    <td key={dayIndex}>
                      <a
                        style={{
                          ...styles.link,
                          color: day.ca2 ? "green" : styles.link.color,
                        }}
                        onClick={() => handleClick(dayIndex, "ca2")}
                      >
                        {day.ca2 || "Đăng ký"}
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <button
              className="page-button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
            >
              Trước
            </button>
            <span> Trang {currentPage + 1} </span>
            <button
              className="page-button"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={(currentPage + 1) * daysPerPage >= scheduleData.length}
            >
              Sau
            </button>
          </div>
        </div>
      </div>
      <div className="patient-list-search-filter2">
        <div className="patient-search-buttonn" onClick={handleRegister}>
          Đăng ký
        </div>
        <div className="patient-search-buttonn" onClick={handleClearSchedule}>
          Xóa
        </div>
      </div>
    </div>
  );
};

export default Schedule;

const styles = {
  link: {
    color: "#22668f",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
