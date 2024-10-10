import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Barcode from "react-barcode";

// QuanLyDatKham component
const QuanLyDatKham = () => {
  const navigate = useNavigate();

  //fix hien thi ngay
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("vi-VN"); // Định dạng cho Việt Nam: DD/MM/YYYY
  };

  const [datkhams, setDatkhams] = useState([""]);

  const fetchdata = async () => {
    try {
      // Gọi API và lấy dữ liệu từ response
      const res = await axios.get(
        "http://localhost:8080/receptionist/getAlldatkham"
      );
      console.log(res);

      // Cập nhật datkhams bằng dữ liệu từ res.data.Datkham
      setDatkhams(res.data.data.Datkham);
    } catch (error) {
      console.log(error);
    }
  };
  const token = localStorage.getItem("token");
  const handleCancel = async (id) => {
    console.log(id);
    try {
      const res = await axios.post(
        "http://localhost:8080/receptionist/cancelappointment",
        {
          id: id,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

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
                      <td style={styles.td}>{datkham.idBn}</td>
                      <td style={styles.td}>{datkham.TenBN}</td>
                      <td style={styles.td}>{formatDate(datkham.NgayDat)}</td>
                      <td style={styles.td}>
                        {datkham.TrangThai === true ? (
                          <a
                            style={{
                              color: "green",
                              fontWeight: "700",
                            }}
                          >
                            Đã Duyệt
                          </a>
                        ) : (
                          <a
                            style={{
                              color: "red",
                              fontWeight: "700",
                            }}
                          >
                            Chưa Duyệt
                          </a>
                        )}
                      </td>
                      <td style={styles.td}>
                        <button
                          style={styles.actionButton}
                          onClick={() => {
                            console.log(`/chitietphieukham/${datkham.id}`);
                            navigateTo(`/chitietphieukham/${datkham.id}`);
                          }}
                        >
                          Xem
                        </button>{" "}
                        |{" "}
                        <button
                          style={styles.actionButton}
                          onClick={() => handleCancel(datkham.id)}
                        >
                          Xóa
                        </button>
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

// Styles giữ nguyên như bạn đã viết

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
