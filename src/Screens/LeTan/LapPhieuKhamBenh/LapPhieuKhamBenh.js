import React from "react";
import logo from "../../../images/logo.png";
import { useNavigate } from "react-router-dom";

const ThongTinLapPhieu = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };
  return (
    <div style={styles.homePage}>
      <div style={styles.content}>
        <div style={styles.mainContent}>
          {/* <div style={styles.navbar}>
            <div style={styles.userInfo}>
              <div style={styles.userAvatar}></div>
              <div style={styles.userName}>BS. Nguyễn Văn A</div>
            </div>
          </div> */}
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
                    defaultValue="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label style={styles.label}>Tuổi</label>
                  <input style={styles.input} type="text" defaultValue="24" />
                </div>
                <div>
                  <label style={styles.label}>Giới tính</label>
                  <input style={styles.input} type="text" />
                </div>
                <div style={styles.fullWidth}>
                  <label style={styles.label}>SDT</label>
                  <input
                    style={styles.input}
                    type="text"
                    defaultValue="0923444444"
                  />
                </div>
                <div style={styles.fullWidth}>
                  <label style={styles.label}>Địa chỉ</label>
                  <input
                    style={styles.input}
                    type="text"
                    defaultValue="Ấp 2, Tắc Vân, TP. Cà Mau"
                  />
                </div>
                <div style={styles.fullWidth}>
                  <label style={styles.label}>Tên bác sĩ</label>
                  <select style={styles.select} defaultValue="Lê Thị Hồng">
                    <option>Lê Thị Hồng</option>
                    <option>Lê Thị Hồng 2</option>
                    <option>Lê Thị Hồng 3</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                <div>
                  <label style={styles.label}>Ngày khám</label>
                  <div style={styles.dateContainer}>
                    <input style={styles.input} type="date" />
                  </div>
                </div>
                <div>
                  <label style={styles.label}>Ca khám</label>
                  <input style={styles.input} type="text" />
                </div>
                <div style={styles.fullWidth}>
                  <label style={styles.label}>Triệu chứng</label>
                  <input
                    style={styles.input}
                    type="text"
                    defaultValue="Khó thở"
                  />
                </div>
                <div style={styles.fullWidth}>
                  <label style={styles.label}>Chọn khoa</label>
                  <input style={styles.input} type="text" />
                </div>
              </form>
            </div>
            <div style={styles.buttonContainer}>
              <button
                style={styles.backButton}
                onClick={() => navigateTo("/Letan/qlDatkham")}
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
