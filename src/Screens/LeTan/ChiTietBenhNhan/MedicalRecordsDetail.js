import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../../../Axios/axios";

const ChiTietBenhNhan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/Letan/danhsachbenhnhan");
  };

  const data = [
    {
      stt: "",
      name: "",
      unit: "",
      quantity: "",
      dosage: "",
    },
  ];

  const [dataphieu, setDataphieu] = useState({});
  const [thuoc, setThuoc] = useState([]);

  const fetchData = async () => {
    try {
      const res = await Axios.get(`/receptionist/chitietphieukham/${id}`);
      console.log(res);
      setDataphieu(res.data.data.appointment);
      setThuoc(res.data.data.medicationDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const styles = {
    header: {
      display: "flex",
      flexDirection: "row",
      padding: "20px",
      justifyContent: "space-between", // Căn đều hai bên
    },
    headerTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "5px",
    },
    headerBreadcrumb: {
      fontSize: "16px",
      color: "#555",
    },
    container: {
      display: "flex",
      justifyContent: "center",
      padding: "20px",
    },
    reportContainer: {
      maxWidth: "800px",
      width: "100%",
      backgroundColor: "#fff",
      border: "1px solid #e0e0e0",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    },
    sectionText: {
      fontSize: "18px",
      color: "#333",
      marginBottom: "10px",
    },
    medicationTable: {
      width: "100%",
      borderCollapse: "collapse",
    },
    medicationHeader: {
      padding: "10px",
      backgroundColor: "#f0f4f8",
      color: "#333",
      border: "1px solid #e0e0e0",
      fontWeight: "bold",
      textAlign: "left",
    },
    medicationRow: {
      padding: "8px",
      border: "1px solid #e0e0e0",
      color: "#555",
    },
    dosageRow: {
      fontStyle: "italic",
    },
    closeButton: {
      padding: "10px 20px",
      color: "#000",
      borderRadius: "4px",
      textAlign: "center",
      cursor: "pointer",
      marginTop: "20px",
      width: "7%",
    },
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div>
      <div style={styles.header}>
        <div style={styles.headerTitle}>CHI TIẾT PHIẾU KHÁM</div>
        <div style={styles.headerBreadcrumb}>
          <span>
            <strong>Danh sách bệnh nhân / </strong>
          </span>
          <span>Chi tiết bệnh án</span>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.reportContainer}>
          <div style={styles.sectionText}>
            Tên bệnh nhân: {dataphieu.MaBenhNhan?.Ten || "Không có dữ liệu"}
          </div>
          <div style={styles.sectionText}>
            Ngày Sinh:{" "}
            {formatDate(dataphieu.MaBenhNhan?.NgaySinh) || "Không có dữ liệu"}
          </div>
          <div style={styles.sectionText}>
            Giới tính: {dataphieu.MaBenhNhan?.GioiTinh || "Không có dữ liệu"}
          </div>
          <div style={styles.sectionText}>
            Mã BN: {dataphieu.MaBenhNhan?._id || "Không có dữ liệu"}
          </div>
          <div style={styles.sectionText}>
            Tên bác sĩ: {dataphieu.MaNhanVien?.HoTen || "Không có dữ liệu"}
          </div>
          <div style={styles.sectionText}>
            Địa chỉ: {dataphieu.MaBenhNhan?.DiaChi || "Không có dữ liệu"}
          </div>
          <div style={styles.sectionText}>Thuốc đã kê:</div>

          <table style={styles.medicationTable}>
            <thead>
              <tr style={styles.medicationHeader}>
                <th>STT</th>
                <th>Tên thuốc / Hàm lượng</th>
                <th>ĐVT</th>
                <th>Số lượng</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(thuoc) &&
                thuoc.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr style={styles.medicationRow}>
                      <td>{index + 1}</td>
                      <td>{item.tenthuoc}</td>
                      <td>{item.loaiThuoc}</td>
                      <td>{item.soluong}</td>
                    </tr>
                    <tr style={styles.dosageRow}>
                      <td colSpan="4">{item.dosage}</td>
                    </tr>
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={styles.closeButton} onClick={handleClose}>
        Trở lại
      </div>
    </div>
  );
};

export default ChiTietBenhNhan;
