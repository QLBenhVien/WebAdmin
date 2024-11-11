import { useState } from "react";
// import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "./Doctor.css"; // Nhập CSS cho Sidebar

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại

  // const handleLogout = () => {
  //   toast.success("You have been logged out.");
  //   setIsAuthenticated(false); // Đặt lại trạng thái xác thực
  // };

  const handleNavigation = (path) => {
    navigate(path); 
    setShow(!show); 
  };

  const isActive = (path) => location.pathname === path; // Kiểm tra xem đường dẫn hiện tại có trùng với đường dẫn của nút không

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="logo4 1.png" alt="Logo" />
        <h2>Phòng khám UCM</h2>
      </div>
      <div className="sidebar-buttons">
        <button
          className={`sidebar-button ${isActive("/home") ? "active" : ""}`}
          onClick={() => handleNavigation("/home")}
        >
          Trang chủ
        </button>
        <button
          className={`sidebar-button ${isActive("/medicalRecord") ? "active" : ""}`}
          onClick={() => handleNavigation("/medicalRecord")}
        >
          Hồ sơ bệnh án
        </button>
        <button
          className={`sidebar-button ${isActive("/referrals") ? "active" : ""}`}
          onClick={() => handleNavigation("/referrals")}
        >
          Gửi yêu cầu xét nghiệm
        </button>
        <button
          className={`sidebar-button ${isActive("/examinationForm") ? "active" : ""}`}
          onClick={() => handleNavigation("/examinationForm")}
        >
          Phiếu khám bệnh
        </button>
        <button
          className={`sidebar-button ${isActive("/patientList") ? "active" : ""}`}
          onClick={() => handleNavigation("/patientList")}
        >
          Danh sách bệnh nhân
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
