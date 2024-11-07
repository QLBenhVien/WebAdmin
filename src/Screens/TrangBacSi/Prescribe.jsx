import React, { useEffect, useState } from "react";
import "./Doctor.css";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import axiosInstance from "../../Axios/axios";
import { set } from "date-fns";

const Prescribe = () => {
  const { showNotification } = useNotification();
  const { id } = useParams();

  const navigate = useNavigate();
  const [status, setStatus] = useState("chưa khám");
  const [data, setData] = useState([
    { stt: 1, name: "", unit: "", quantity: "", dosage: "" },
  ]);
  const [benhnhan, setBenhnhan] = useState({});
  // const [symptoms, setSymptoms] = useState("");
  // const [diagnosis, setDiagnosis] = useState("");
  // const [doctorNotes, setDoctorNotes] = useState("");
  // const [thuoc, setThuoc] = useState([]);
  const handleInputChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
    console.log(data);
  };

  const handleAddRow = () => {
    const newRow = {
      stt: data.length + 1,
      name: "",
      unit: "",
      quantity: "",
      dosage: "",
    };
    setData([...data, newRow]);
  };

  const handleSave = () => {
    const confirmSave = window.confirm(
      "Bạn có muốn lưu lại những thay đổi không?"
    );
    if (confirmSave) {
      console.log("Data saved:", data);
      alert("Dữ liệu đã được lưu thành công!");
      // navigate("/Bacsi/examinationForm");
    }
  };

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(`/doctor/detailPhieukham/${id}`);
      setBenhnhan(res.data.data.detail); // Updated this line
      console.log("Patient data:", res.data.data.detail);
      if (Array.isArray(res.data.data.detail.Thuoc)) {
        const thuoc = res.data.data.detail.Thuoc;
        const newData = thuoc.map((item, index) => ({
          stt: index + 1,
          name: item.MaThuoc?.tenthuoc || "",
          unit: item.DVT,
          quantity: item.SoLuong,
          dosage: item.Cachdung,
        }));
        setData(newData);
      } else {
        setData([]);
      }
      console.log(data, "data thuoc");
    } catch (error) {
      console.log(error);
      showNotification("Lỗi khi lấy dữ liệu bệnh nhân", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const [goiy, setGoiy] = useState([]);
  // const fetchGoiy = async (ten) => {
  //   try {
  //     const res = await axiosInstance.get(`doctor/thuoc/${ten}`);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchGoiy();
  // }, [data]);

  return (
    <div className="outer">
      <div className="patient-header">
        <div className="patient-header-title">PHIẾU KHÁM BỆNH</div>
        <div className="patient-header-breadcrumb">
          <span>
            <strong>
              <a className="link-xem" href="/examinationForm">
                Phiếu khám bệnh{" "}
              </a>{" "}
              /{" "}
            </strong>
          </span>
          <span className="patient-breadcrumb-secondary">Phiếu khám bệnh</span>
        </div>
      </div>

      <div className="container3">
        <div style={styles.InfoContainer}>
          <div style={styles.infoSection}>
            <h2 style={styles.sectionTitle}>Thông tin bệnh nhân</h2>
            <p>
              <strong>Mã bệnh nhân:</strong> {benhnhan.MaBenhNhan?._id}
            </p>
            <p>
              <strong>Họ và Tên:</strong> {benhnhan.MaBenhNhan?.Ten}
            </p>
            <p>
              <strong>Ngày sinh:</strong> {benhnhan.MaBenhNhan?.NgaySinh}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {benhnhan.MaBenhNhan?.DiaChi}
            </p>
            <p>
              <strong>Giới tính:</strong> {benhnhan.MaBenhNhan?.GioiTinh}
            </p>
            <p>
              <strong>SDT:</strong> {benhnhan.MaBenhNhan?.SDT}
            </p>
          </div>
        </div>
      </div>

      <div className="container3">
        <div style={styles.formGroup}>
          <div style={styles.label}>Triệu chứng</div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              style={styles.inputField}
              value={benhnhan.TrieuChung}
              onChange={(e) =>
                setBenhnhan({ ...benhnhan, TrieuChung: e.target.value })
              }
            />
          </div>
        </div>

        <div style={styles.formGroup}>
          <div style={styles.label}>Chuẩn đoán</div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              style={styles.inputField}
              value={benhnhan.ChanDoan}
              onChange={(e) =>
                setBenhnhan({ ...benhnhan, ChanDoan: e.target.value })
              }
            />
          </div>
        </div>

        <div style={styles.formGroup}>
          <div style={styles.label}>Lời dặn của bác sĩ</div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              style={styles.inputField}
              value={benhnhan.LoiDan}
              onChange={(e) =>
                setBenhnhan({ ...benhnhan, LoiDan: e.target.value })
              }
            />
          </div>
        </div>

        <div style={styles.infoSection}>
          <h2 style={styles.sectionTitle}>Kê thuốc</h2>
          <table className="medication-table2">
            <thead>
              <tr className="medication-header">
                <th>STT</th>
                <th>Tên thuốc / Hàm lượng</th>
                <th>ĐVT</th>
                <th>Số lượng</th>
                <th>Liều dùng</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr className="medication-row" key={index}>
                  <td>{item.stt}</td>
                  <td>
                    <input
                      type="text"
                      value={item.name}
                      style={{ border: "none", outline: "none" }}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.unit}
                      style={{ border: "none", outline: "none" }}
                      onChange={(e) =>
                        handleInputChange(index, "unit", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.quantity}
                      style={{ border: "none", outline: "none" }}
                      onChange={(e) =>
                        handleInputChange(index, "quantity", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.dosage}
                      style={{ border: "none", outline: "none" }}
                      onChange={(e) =>
                        handleInputChange(index, "dosage", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!benhnhan.TrangThai && (
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                fontSize: "1.5rem",
                color: "blueviolet",
                cursor: "pointer",
              }}
              onClick={handleAddRow}
            >
              +
            </button>
          )}
        </div>
      </div>

      <div className="patient-list-search-filter2">
        <div style={{ display: "flex" }}>
          <div onClick={() => navigate(-1)} className="patient-search-buttonn">
            Quay lại
          </div>

          {!benhnhan.TrangThai && (
            <div onClick={handleSave} className="patient-search-buttonn">
              Kết thúc khám{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  InfoContainer: {
    backgroundColor: "#ffffff",
    padding: "5px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  infoSection: {
    margin: "30px",
  },
  sectionTitle: {
    padding: "10px",
    fontSize: "26px",
    fontWeight: "bold",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    marginLeft: "30px",
    paddingTop: "10px",
  },
  label: {
    marginBottom: "5px",
    color: "black",
    fontSize: 18,
    fontFamily: "Roboto",
    fontWeight: "700",
    lineHeight: "30px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    background: "white",
    borderBottom: "1px solid #ccc",
    padding: "4px 13px",
    width: 723,
    height: 30,
  },
  inputField: {
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
    fontSize: "16px",
    fontFamily: "Roboto",
  },
};

export default Prescribe;
