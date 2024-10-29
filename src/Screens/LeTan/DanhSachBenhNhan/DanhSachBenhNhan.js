import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import receptionistApi from "../../../api/receptionistApi";
import dayjs from "dayjs";

// DanhSachBenhNhan component
const DanhSachBenhNhan = () => {
  const navigate = useNavigate();

  const [xemdatkhams, setxemdatkhams] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchData = async () => {
    try {
      const response = await receptionistApi.listAppointment();
      setxemdatkhams(response.data.data.listAppointment);
      setFilteredPatients(response.data.data.listAppointment); // Gán dữ liệu ban đầu
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Hàm lọc dữ liệu theo ngày dựa trên sortOption
  const handleSortChange = (option) => {
    setSortOption(option);

    const currentDate = dayjs();

    let filteredData;
    if (option === "1") {
      // Lọc danh sách hôm nay
      filteredData = xemdatkhams.filter((item) =>
        dayjs(item.NgayKham).isSame(currentDate, "day")
      );
    } else if (option === "2") {
      // Lọc danh sách trong tuần
      filteredData = xemdatkhams.filter((item) =>
        dayjs(item.NgayKham).isSame(currentDate, "week")
      );
    } else {
      // Hiển thị tất cả nếu không có sortOption
      filteredData = xemdatkhams;
    }

    setFilteredPatients(filteredData); // Cập nhật state với danh sách đã lọc
    setCurrentPage(1); // Reset trang về trang 1 khi lọc mới
  };

  const indexOfLastPatient = currentPage * itemsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - itemsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

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
                <label style={styles.sortLabel}>Sắp xếp theo:</label>
                <select
                  style={{
                    padding: "1rem",
                    borderRadius: "1rem",
                    marginRight: "1rem",
                  }}
                  name="CaKham"
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="2">Trong tuần</option>
                  <option value="1">Hôm nay</option>
                </select>
                {/* <button style={styles.searchButton} onClick={() => fetchData()}>
                  TRA CỨU
                </button> */}
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
                      <td style={styles.td}>
                        {indexOfFirstPatient + index + 1}
                      </td>
                      <td style={styles.td}>
                        {xemdatkham?.MaBenhNhan?._id?.toString()}
                      </td>
                      <td style={styles.td}>
                        {xemdatkham?.MaBenhNhan?.Ten?.toString()}
                      </td>
                      <td style={styles.td}>
                        {dayjs(xemdatkham.NgayKham).format("DD-MM-YYYY")}
                      </td>
                      <td style={styles.td}>
                        {xemdatkham.TrangThai === false ? (
                          <span style={{ color: "red", fontWeight: "700" }}>
                            Chưa Khám
                          </span>
                        ) : (
                          <span style={{ color: "green", fontWeight: "700" }}>
                            Đã khám
                          </span>
                        )}
                      </td>
                      <td style={styles.td}>
                        <button
                          style={styles.actionButton}
                          onClick={() =>
                            navigate(
                              `/Letan/chitietphieukham/${xemdatkham._id}`
                            )
                          }
                        >
                          Xem
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={styles.pagination}>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Trước
                </button>
                <span>
                  Trang {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
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
  whiteContainer: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "2rem",
  },
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
    justifyContent: "start",
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
