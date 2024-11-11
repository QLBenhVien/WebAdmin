  import React, { useEffect, useState } from "react";
  import "./Doctor.css";
  import { useNavigate, useParams } from "react-router-dom";
  import { useNotification } from "../../context/NotificationContext";
  import axiosInstance from "../../Axios/axios";

  const Prescribe = () => {
    const { showNotification } = useNotification();
    const { id } = useParams();
    const [selectedRowIndex, setSelectedRowIndex] = useState(null); 

    const navigate = useNavigate();
    const [status, setStatus] = useState("chưa khám");
    const [data, setData] = useState([
      { stt: 1, mathuoc: "", name: "", unit: "", quantity: "", dosage: "" },
    ]);
    const [goiyThuoc, setGoiyThuoc] = useState([]);  // State để lưu danh sách thuốc gợi ý

    const [benhnhan, setBenhnhan] = useState({});

    const handleInputChange = (index, field, value) => {
      const updatedData = [...data];
      updatedData[index][field] = value;
      setData(updatedData);
      console.log(data);
    };

    const handleInputChange2 = (index, field, value) => {
      const updatedData = [...data];
      updatedData[index][field] = value;
      setData(updatedData);
      console.log("Updated Data: ", updatedData);
    
      if (field === "name" && value.length > 0) {
        // If a row is selected, fetch suggestions
        if (selectedRowIndex === index) {
          fetchGoiy(value).then((suggestions) => {
            setGoiyThuoc(suggestions);
          });
        } else {
          setGoiyThuoc([]);  // Clear suggestions when switching rows
        }
      } else {
        setGoiyThuoc([]);  // Clear suggestions if input is empty
      }
    };

    // Set the currently selected row when a row is focused
    const handleFocus = (index) => {
      setSelectedRowIndex(index);
    };


    const handleSuggestionClick = (index, suggestion) => {
      const updatedData = [...data];
      updatedData[index]["mathuoc"] = suggestion._id;
      updatedData[index]["name"] = suggestion.tenthuoc;  // Đặt tên thuốc từ gợi ý vào ô nhập liệu
      updatedData[index]["unit"] = suggestion.loaiThuoc;    // Cập nhật ĐVT
      updatedData[index]["dosage"] = suggestion.cachdung; // Cập nhật Liều dùng
      setData(updatedData);  // Cập nhật lại state
      setGoiyThuoc([]);  // Dọn dẹp danh sách gợi ý
    };
    

    const handleAddRow = () => {
      const newRow = {
        stt: data.length + 1,
        mathuoc:"",
        name: "",
        unit: "",
        quantity: "",
        dosage: "",
      };
      setData([...data, newRow]);
    };

    const handleSave = async () => {
      const confirmSave = window.confirm("Bạn có muốn lưu lại những thay đổi không?");
      if (confirmSave) {
        try {
          const dataToSave = {
            TrieuChung: benhnhan.TrieuChung,
            ChanDoan: benhnhan.ChanDoan,
            LoiDan: benhnhan.LoiDan,
            Thuoc: data.map(row => ({
              MaThuoc: row.mathuoc,
              SoLuong: row.quantity, // Quantity
              Cachdung: row.dosage  // Dosage
            })),
          };
    
          const response = await axiosInstance.put(
            `/doctor/updatePhieukham/${id}`,
            dataToSave
          );
    
          if (response.status === 200) {
            alert("Dữ liệu đã được lưu thành công!");
            console.log("Dữ liệu đã được lưu:", response.data);
            console.log("Data to be saved:", dataToSave);
    
            // After saving, call the "endPhieukham" endpoint to change the status
            const endResponse = await axiosInstance.put(`/doctor/endPhieukham/${id}`);
    
            if (endResponse.status === 200) {
              alert("Phiếu khám đã được đánh dấu là Đã khám.");
              console.log("Phiếu khám đã được cập nhật:", endResponse.data);
            } else {
              alert("Có lỗi khi cập nhật trạng thái phiếu khám.");
            }
          } else {
            
          }
        } catch (error) {
          console.error("Lỗi khi lưu dữ liệu:", error);
          
        }
      }
    };

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/doctor/detailPhieukham/${id}`);
        setBenhnhan(res.data.data.detail); 
        console.log("Patient data:", res.data.data.detail);
        if (Array.isArray(res.data.data.detail.Thuoc)) {
          const thuoc = res.data.data.detail.Thuoc;
          const newData = thuoc.map((item, index) => ({
            stt: index + 1,
            mathuoc: item.MaThuoc ? item.MaThuoc : "",
            name: item.MaThuoc?.tenthuoc,
            unit: item.DVT || "No unit",
            quantity: item.SoLuong || 0,
            dosage: item.Cachdung || "No dosage",
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
    }, [id]);


    const fetchGoiy = async (ten) => {
      try {
        const res = await axiosInstance.get(`/doctor/thuoc/${ten}`);
        console.log("Thuốc gợi ý:", res);
        return res.data.data;  
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu gợi ý thuốc:", error);
        return [];  // Return an empty array if there's an error
      }
    };


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
              style={{ border: "none", outline: "none", width: "100%" }}
              onChange={(e) => handleInputChange2(index, "name", e.target.value)}
              onFocus={() => handleFocus(index)}
            />
            {selectedRowIndex === index && goiyThuoc.length > 0 && (
              <ul className="suggestions-list" style={styles.suggestionsList}>
                {goiyThuoc.map((suggestion, i) => (
                  <li
                    key={i}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(index, suggestion)}
                    style={styles.suggestionItem}
                  >
                    {suggestion.tenthuoc}
                  </li>
                ))}
              </ul>
            )}
          </td>

          <td>
            <input
              type="text"
              value={item.unit}
              style={{ border: "none", outline: "none" }}
              onChange={(e) => handleInputChange(index, "unit", e.target.value)}
            />
          </td>

          <td>
            <input
              type="number"
              value={item.quantity}
              style={{ border: "none", outline: "none", width: "50px", textAlign: "center" }}
              min="1"  // Đặt giá trị tối thiểu là 1
              onChange={(e) => {
                // Kiểm tra nếu giá trị nhỏ hơn 1, đặt lại giá trị là 1
                const value = Math.max(1, e.target.value);  
                handleInputChange(index, "quantity", value);
              }}
            />
          </td>

          <td>
            <input
              type="text"
              value={item.dosage}
              style={{ border: "none", outline: "none" }}
              onChange={(e) => handleInputChange(index, "dosage", e.target.value)}
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
    suggestionsList: {
      listStyleType: "none",
      padding: "0",
      marginTop: "5px",
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      position: "absolute",  
      zIndex: "999",         
    },
    suggestionItem: {
      padding: "8px",
      cursor: "pointer",
      backgroundColor: "#fff",
    },
    suggestionItemHover: {
      backgroundColor: "#f1f1f1", 
    },
  };

  export default Prescribe;
