import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// QuanLyDatKham component
const QuanLyDatKham = () => {
  const navigate = useNavigate();

  const [datkhams, setDatkhams] = useState([
    {
      MaBN: "12",
      TenBN: "phamngocduy",
      NgayDat: "12-12-12",
      TrangThai: "true",
    },
    {
      MaBN: "12",
      TenBN: "lanh",
      NgayDat: "12-122-12",
      TrangThai: "false",
    },
  ]);

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.homePage}>
      <div style={styles.content}>
        <div style={styles.mainContent}>
          <div style={styles.pageContainer}>
            <div style={styles.pageHeader}>
              <div style={styles.pageTitleLeft}>DANH SÁCH HỒ SƠ ĐẶT KHÁM</div>
              <div style={styles.pageTitleRight}>
                Quản lý / Danh sách hồ sơ đặt khám
              </div>
            </div>
            <div style={styles.whiteContainer}>
              <div style={styles.searchSection}>
                <input
                  type="text"
                  placeholder="Nhập tên bệnh nhân"
                  style={styles.searchInput}
                />
                <button style={styles.searchButton}>Tìm kiếm</button>
                <button style={styles.addButton}>+ Thêm hồ sơ</button>
              </div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>STT</th>
                    <th style={styles.th}>Mã BN</th>
                    <th style={styles.th}>Tên bệnh nhân</th>
                    <th style={styles.th}>Ngày đặt</th>
                    <th style={styles.th}>Trạng thái</th>
                    <th style={styles.th}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {datkhams.map((datkham, index) => (
                    <tr key={index}>
                      <td style={styles.td}>{index + 1}</td>
                      <td style={styles.td}>{datkham.MaBN}</td>
                      <td style={styles.td}>{datkham.TenBN}</td>
                      <td style={styles.td}>{datkham.NgayDat}</td>
                      <td style={styles.td}>
                        {datkham.TrangThai === "true" ? (
                          <a
                            style={{
                              color: "red",
                              fontWeight: "700",
                            }}
                          >
                            Chưa Duyệt
                          </a>
                        ) : (
                          <a
                            style={{
                              color: "green",
                              fontWeight: "700",
                            }}
                          >
                            Đã Duyệt
                          </a>
                        )}
                      </td>
                      <td style={styles.td}>
                        <button
                          style={styles.actionButton}
                          onClick={() => navigateTo("/chitietphieukham")}
                        >
                          Xem
                        </button>{" "}
                        | <button style={styles.actionButton}>Chỉnh sửa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#22668E",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  whiteContainer: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    height: "100%",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  th: {
    backgroundColor: "#22668E",
    color: "#ffffff",
    padding: "10px",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  actionButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#22668E",
    cursor: "pointer",
  },
};

export default QuanLyDatKham;
