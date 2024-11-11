import React, { useState, useEffect } from "react";
import logo from "../../../images/logo.png";
import { useNavigate } from "react-router-dom";
import departmentApi from "../../../api/departmentApi";
import doctorApi from "../../../api/doctorApi";

import receptionistApi from "../../../api/receptionistApi";
import { useNotification } from "../../../context/NotificationContext"; // Import useNotification
const ThongTinLapPhieu = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [khoaList, setKhoaList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // Lưu trữ ngày đã chọn
  const [selectedShift, setSelectedShift] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const [selectedKhoa, setSelectedKhoa] = useState("");
  const [patientInfo, setPatientInfo] = useState({
    TenBN: "",
    NgaySinhBN: "",
    GioiTinhBN: "",
    SDTBN: "",
    DiaChiBN: "",
    MaKhoa: "", // Thêm mã khoa
    MaBS: "", // Thêm mã bác sĩ
    TrieuChung: "",
    NgayDatKham: "",
    CaKham: "",
  });

  useEffect(() => {
    const fetchKhoaList = async () => {
      try {
        const response = await departmentApi.getAllDepartments();
        setKhoaList(response.data.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách khoa:", error);
        showNotification("Lỗi khi tải danh sách khoa", "error");
      }
    };
    fetchKhoaList();
  }, []);

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo({
      ...patientInfo,
      [name]: value,
    });
  };

  const handleKhoaChange = async (e) => {
    const khoaId = e.target.value;
    setSelectedKhoa(khoaId);

    // Cập nhật MaKhoa trong patientInfo
    setPatientInfo({
      ...patientInfo,
      MaKhoa: khoaId, // Thêm mã khoa
      MaBS: "", // Reset MaBS khi chọn khoa mới
    });
    setDoctorList([]);
  };

  const handleDateChange = (e) => {
    const selected = e.target.value;
    setSelectedDate(selected);

    // Cập nhật NgayDatKham trong patientInfo
    setPatientInfo({
      ...patientInfo,
      NgayDatKham: selected,
    });
    setDoctorList([]);
  };
  const handleShiftChange = (e) => {
    const shift = e.target.value;
    setSelectedShift(shift);

    // Cập nhật CaKham trong patientInfo
    setPatientInfo({
      ...patientInfo,
      CaKham: shift,
    });

    // Reset danh sách bác sĩ khi thay đổi ca
    setDoctorList([]);
  };

  useEffect(() => {
    if (selectedKhoa && selectedDate && selectedShift) {
      const fetchDoctorList = async () => {
        try {
          const response = await doctorApi.listAvailableDoctors(
            selectedKhoa,
            selectedDate,
            selectedShift
          );
          setDoctorList(response.data.data);
        } catch (error) {
          console.error("Lỗi khi tải danh sách bác sĩ:", error);
        }
      };
      fetchDoctorList();
    }
  }, [selectedKhoa, selectedDate, selectedShift]);
  // try {
  //   const response = await doctorApi.getListDoctorByDepartmentId(khoaId);
  //   setDoctorList(response.data.data);
  // } catch (error) {
  //   console.error("Lỗi khi tải danh sách bác sĩ:", error);
  // }

  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;

    // Cập nhật MaBS trong patientInfo
    setPatientInfo({
      ...patientInfo,
      MaBS: doctorId, // Thêm mã bác sĩ
    });
  };

  const handleCreateAppointment = async () => {
    console.log(patientInfo);
    // Kiểm tra tính hợp lệ của thông tin bệnh nhân
    if (!validatePatientInfo()) {
      showNotification("Vui lòng điền đầy đủ thông tin", "error");
      return;
    }
    try {
      const response = await receptionistApi.scheduleappointment(patientInfo);
      if (response.data?.code == 201) {
        showNotification("Tạo lịch khám thành công", "success");
        navigateTo("/Letan/qlDatkham");
      } else {
        showNotification(response.data.message, "error");
      }
    } catch (error) {
      console.error("Lỗi khi tạo lịch hẹn:", error);
      alert("Đã xảy ra lỗi khi tạo lịch hẹn.");
    }
  };

  // Hàm kiểm tra tính hợp lệ của thông tin bệnh nhân
  const validatePatientInfo = () => {
    const {
      TenBN,
      NgaySinhBN,
      GioiTinhBN,
      SDTBN,
      DiaChiBN,
      MaKhoa,
      MaBS,
      TrieuChung,
      NgayDatKham,
      CaKham,
    } = patientInfo;

    // Kiểm tra xem tất cả các trường có giá trị không
    return (
      TenBN &&
      NgaySinhBN &&
      GioiTinhBN &&
      SDTBN &&
      DiaChiBN &&
      MaKhoa &&
      MaBS &&
      TrieuChung &&
      NgayDatKham &&
      CaKham
    );
  };

  return (
    <div style={styles.homePage}>
      <div style={styles.content}>
        <div style={styles.mainContent}>
          <div style={styles.pageContainer}>
            <div style={styles.pageHeader}>
              <div style={styles.pageTitleLeft}>THÔNG TIN LẬP PHIẾU</div>
              <div style={styles.pageTitleRight}>
                Quản lý lập phiếu / Xem lập phiếu
              </div>
            </div>
            <div style={styles.InfoContainer}>
              <form style={styles.form}>
                <div style={styles.fullWidth}>
                  <label style={styles.label}>Tên bệnh nhân</label>
                  <input
                    style={styles.input}
                    type="text"
                    name="TenBN" // Sửa thành TenBN
                    value={patientInfo.TenBN}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label style={styles.label}>Ngày sinh</label>
                  <input
                    style={styles.input}
                    type="date"
                    name="NgaySinhBN"
                    value={patientInfo.NgaySinhBN}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label style={styles.label}>Giới tính</label>
                  <select
                    style={styles.select}
                    name="GioiTinhBN"
                    value={patientInfo.GioiTinhBN}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="true">Nam</option>
                    <option value="false">Nữ</option>
                  </select>
                </div>
                <div style={styles.fullWidth}>
                  <label style={styles.label}>SDT</label>
                  <input
                    style={styles.input}
                    type="text"
                    name="SDTBN" // Sửa thành SDTBN
                    value={patientInfo.SDTBN}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={styles.fullWidth}>
                  <label style={styles.label}>Địa chỉ</label>
                  <input
                    style={styles.input}
                    type="text"
                    name="DiaChiBN" // Sửa thành DiaChiBN
                    value={patientInfo.DiaChiBN}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={styles.fullWidth}>
                  <label style={styles.label}>Chọn khoa</label>
                  <select
                    style={styles.select}
                    value={selectedKhoa}
                    onChange={handleKhoaChange}
                  >
                    <option value="">Chọn khoa</option>
                    {khoaList?.map((khoa) => (
                      <option key={khoa._id} value={khoa._id}>
                        {khoa.Tenkhoa}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={styles.label}>Ngày khám</label>
                  <div style={styles.dateContainer}>
                    <input
                      style={styles.input}
                      type="date"
                      name="NgayDatKham"
                      value={patientInfo.NgayDatKham}
                      onChange={handleDateChange}
                    />
                  </div>
                </div>

                <div>
                  <label style={styles.label}>Ca khám</label>
                  <select
                    style={styles.select}
                    name="CaKham"
                    value={patientInfo.CaKham}
                    onChange={handleShiftChange}
                  >
                    <option value="-1">Chọn ca khám</option>
                    <option value="1">Ca 1</option>
                    <option value="2">Ca 2</option>
                  </select>
                </div>
                <div style={styles.fullWidth}>
                  <label style={styles.label}>Tên bác sĩ</label>
                  <select
                    style={styles.select}
                    value={patientInfo.MaBS} // Sửa thành MaBS
                    onChange={handleDoctorChange}
                  >
                    <option value="">Chọn bác sĩ</option>
                    {doctorList?.map((doctor) => (
                      <option key={doctor._id} value={doctor._id}>
                        {doctor.HoTen}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.fullWidth}>
                  <label style={styles.label}>Triệu chứng</label>
                  <input
                    style={styles.input}
                    type="text"
                    name="TrieuChung" // Sửa thành TrieuChung
                    value={patientInfo.TrieuChung}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </div>
            <div style={styles.buttonContainer}>
              <button
                style={styles.backButton}
                onClick={handleCreateAppointment}
              >
                Tạo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  homePage: {
    width: "100%",
    height: "100%",
    background: "#E4F5FF",
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid #DDD",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  userAvatar: {
    width: "60px",
    height: "60px",
    background: "#D9D9D9",
    borderRadius: "50%",
    marginRight: "20px",
  },
  userName: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  content: {
    display: "flex",
    flex: 1,
  },
  sidebar: {
    width: "300px",
    backgroundColor: "#22668E",
    padding: "20px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
  },
  logo: {
    width: "40px",
    height: "40px",
    marginRight: "10px",
  },
  sidebarTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#22668E",
  },
  sidebarList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    width: "100%",
  },
  sidebarItem: {
    marginBottom: "20px",
    cursor: "pointer",
    textAlign: "center",
    padding: "10px",
    backgroundColor: "#578EAF",
    borderRadius: "10px",
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
  whiteContainer: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    height: "100%",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  backButton: {
    padding: "10px 20px",
    backgroundColor: "#22668E",
    color: "#ffffff",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    marginRight: "10px",
    fontWeight: "bold",
    fontSize: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  InfoContainer: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  infoSection: {
    marginBottom: "30px",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  fullWidth: {
    gridColumn: "1 / -1",
  },
  label: {
    fontWeight: "bold",
    marginRight: "1px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "97%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  },
  select: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23333' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 8px center",
  },
  dateContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  calendarIcon: {
    position: "absolute",
    right: "8px",
    pointerEvents: "none",
  },
};

export default ThongTinLapPhieu;
