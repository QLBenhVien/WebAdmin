import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import receptionistApi from "../../../api/receptionistApi";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// DanhSachBenhNhan component
const DanhSachBenhNhan = () => {
  const navigate = useNavigate();

  const [xemdatkhams, setxemdatkhams] = useState([]);
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  
  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Số lượng mục trên mỗi trang

  const fetchData = async () => {
    try {
      const response = await receptionistApi.listAppointment(startDay, endDay);
      setxemdatkhams(response.data.data.listAppointment);
      console.log(response.data.data.listAppointment, "response.data.data.listAppointment");
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Cập nhật khi ngày bắt đầu hoặc ngày kết thúc thay đổi

  const [sortOption, setSortOption] = useState("Ngày khám gần nhất");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleSortChange = (option) => {
    setSortOption(option);
    setDropdownOpen(false);
  };
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  const filteredPatients = xemdatkhams.sort((a, b) => {
    if (sortOption === "Ngày khám gần nhất") {
      return new Date(b.NgayKham) - new Date(a.NgayKham);
    } else {
      return new Date(a.NgayKham) - new Date(b.NgayKham);
    }
  });

  // Lấy dữ liệu cho trang hiện tại
  const indexOfLastPatient = currentPage * itemsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - itemsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const navigateTo = (path) => {
    navigate(path);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Tính toán tổng số trang
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

  return (
    <div style={styles.homePage}>
      <div style={styles.content}>
        <div style={styles.mainContent}>
          <div style={styles.pageContainer}>
            <div style={styles.pageHeader}>
              <div style={styles.pageTitleLeft}>DANH SÁCH BỆNH NHÂN</div>
              <div style={styles.pageTitleRight}>
                Danh sách bệnh nhân / Danh sách bệnh nhân
              </div>
            </div>
            <div style={styles.whiteContainer}>
              <div style={styles.searchSection}>
                <div style={styles.searchSection}>
                  <label style={styles.sortLabel}>Sắp xếp theo:</label>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="Ngày bắt đầu"
                        value={startDay}
                        onChange={(newValue) => setStartDay(newValue)}
                      />
                      <DatePicker
                        label="Ngày kết thúc"
                        value={endDay}
                        onChange={(newValue) => setEndDay(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                  <button style={styles.searchButton} onClick={fetchData}>
                    TRA CỨU
                  </button>
                </div>
              </div>

              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>STT</th>
                    <th style={styles.th}>Mã BN</th>
                    <th style={styles.th}>Tên bệnh nhân</th>
                    <th style={styles.th}>Ngày khám</th>
                    <th style={styles.th}>Tình trạng</th>
                    <th style={styles.th}>Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPatients.map((xemdatkham, index) => (
                    <tr key={index}>
                      <td style={styles.td}>{indexOfFirstPatient + index + 1}</td>
                      <td style={styles.td}>{xemdatkham?.BenhNhanID?._id?.toString()}</td>
                      <td style={styles.td}>{xemdatkham?.BenhNhanID?.Ten?.toString()}</td>
                      <td style={styles.td}>{formatDate(xemdatkham.NgayDatKham)}</td>
                      <td style={styles.td}>
                        {xemdatkham.TrangThai === false ? (
                          <a style={{ color: "red", fontWeight: "700" }}>Chưa Khám</a>
                        ) : (
                          <a style={{ color: "green", fontWeight: "700" }}>Đã khám</a>
                        )}
                      </td>
                      <td style={styles.td}>
                        <button
                          style={styles.actionButton}
                          onClick={() => navigateTo("/Letan/chitietbenhnhan")}
                        >
                          Xem
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Phân trang */}
              <div style={styles.pagination}>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Trước
                </button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  homePage: {
    width: "100%",
    height: "100%",
    background: "#E4F5FF",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    display: "flex",
    flex: 1,
  },
  sortSelect: {
    padding: "5px 10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    position: "relative",
  },
  pageContainer: {
    background: "rgba(228, 245, 255, 1)",
    padding: "20px",
    borderRadius: "0 20px 20px 0",
    height: "100%",
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    marginBottom: "20px",
  },
  pageTitleLeft: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#000000",
  },
  pageTitleRight: {
    fontSize: "20px",
    fontWeight: "400",
    color: "#000000",
  },
  searchSection: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    justifyContent: "space-between",
  },
  searchInput: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "10px",
    flex: "1",
  },
  searchButton: {
    padding: "10px 20px",
    backgroundColor: "#22668E",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  sortLabel: {
    marginRight: "10px",
  },
  sortSelect: {
    padding: "10px",
    border: "1px solid #000",
    borderRadius: "5px",
    marginRight: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#f2f2f2",
    padding: "10px",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  actionButton: {
    padding: "5px 10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
};

export default DanhSachBenhNhan;
