import React, { useState, useEffect } from "react";
import "./Doctor.css";
import { useNotification } from "../../context/NotificationContext";
import Axios from "../../Axios/axios";

const Schedule = () => {
  const { showNotification } = useNotification();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Tất cả ngày");
  const [currentPage, setCurrentPage] = useState(0);
  const [lichLam, setLichLam] = useState([]); // To store the doctor's schedule

  // Fetch the schedule and doctor info (MaNV) from the backend
  const fetchData = async () => {
    try {
      const res = await Axios.get(`/doctor/lichlam`);
      console.log(res)
      const fetchedData = res.data.danhsachkham.map((item) => ({
        ...item,
        NgayKham: new Date(item.NgayKham),
      }));
      setLichLam(fetchedData);

      // Set MaNV (doctor's ID) from the API response, assuming it is available in the response
    
    } catch (error) {
      console.error("Failed to fetch schedule:", error);
      showNotification("Đã xảy ra lỗi khi tải lịch làm việc", "error");
    }
  };

  // Fetch the schedule when the component is mounted
  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async (dayIndex, ca) => {
    const currentDay = getNext6Days()[dayIndex];
    const NgayKham = currentDay.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
    const shift = ca === "ca1" ? 1 : 2;
  
    try {
      // Tiến hành gọi API để đăng ký ca làm việc
      const response = await Axios.put("/doctor/themlichlam", {
        NgayKham,
        Ca: shift, // Ca là 1 hoặc 2
      });
  
      if (response.status === 200) {
        // Kiểm tra thông báo từ server
        if (response.data.message === "Đăng ký lịch khám thành công") {
          // Nếu đăng ký thành công
          showNotification(
            `Đăng ký ca ${ca === "ca1" ? "Ca 1" : "Ca 2"} vào ngày ${formatDate(currentDay)} thành công!`,
            "success"
          );
  
          // Cập nhật danh sách ca đã đăng ký
          setLichLam((prevLichLam) => [
            ...prevLichLam,
            { NgayKham: currentDay, Ca: shift, status: "Đã đăng ký" }, // Đã đăng ký
          ]);
        } else if (response.data.message === "Ca này đã được đăng ký trước đó") {
          // Nếu ca đã đăng ký rồi
          showNotification(
            `${ca === "ca1" ? "Ca 1" : "Ca 2"} vào ngày ${formatDate(currentDay)} đã được đăng ký, không thể chuyển về Đăng ký!`,
            "error"
          );
        }
      } else {
        showNotification("Ca này đã được đăng ký", "error");
      }
    } catch (error) {
      console.error("Error registering shift", error);
      showNotification("Ca này đã được đăng ký", "error");
    }
  };
  
  
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Get the next 6 days starting from tomorrow
  const getNext6Days = () => {
    const days = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1); // Start from tomorrow

    for (let i = 0; i < 6; i++) {
      days.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }

    return days;
  };

  // Check if a shift is registered for a specific day
  const getScheduleForDay = (date, ca) => {
    const scheduleForDay = lichLam.find(
      (entry) => entry.NgayKham.toDateString() === date.toDateString() && entry.Ca === ca
    );
    return scheduleForDay ? "Đã đăng ký" : "Đăng ký";
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
          <span className="patient-breadcrumb-secondary"> Đăng ký lịch làm việc</span>
        </div>
      </div>
      <div className="container2">
        <div className="patient-container">
          <div className="patient-list-search-filter">
            <div className="patient-header-title2">Lịch làm của bác sĩ</div>

          </div>
          <div className="patient-list-search-filter">
          <div className="luuY">Lưu ý:</div>
          <div className="patient-header-title3">Chỉ được đăng ký 1 lần và không được hủy!</div>
          </div>
          <div className="schedule">
            <table border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  {getNext6Days().map((day, index) => (
                    <th key={index}>{formatDate(day)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ca 1 (7:30 - 11:00)</td>
                  {getNext6Days().map((day, dayIndex) => (
                    <td key={dayIndex}>
                      <a
                        onClick={() => handleClick(dayIndex, "ca1")}
                        style={{
                          ...styles.link,
                          color: getScheduleForDay(day, 1) === "Đã đăng ký" ? "green" : styles.link.color,
                        }}
                      >
                        {getScheduleForDay(day, 1)}
                      </a>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Ca 2 (13:30 - 17:00)</td>
                  {getNext6Days().map((day, dayIndex) => (
                    <td key={dayIndex}>
                      <a
                        onClick={() => handleClick(dayIndex, "ca2")}
                        style={{
                          ...styles.link,
                          color: getScheduleForDay(day, 2) === "Đã đăng ký" ? "green" : styles.link.color,
                        }}
                      >
                        {getScheduleForDay(day, 2)}
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  link: {
    color: "#22668f",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Schedule;
