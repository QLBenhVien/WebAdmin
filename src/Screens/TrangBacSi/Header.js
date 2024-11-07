import { useContext, useState } from "react";
import "./Doctor.css";
import { useNavigate } from "react-router-dom";
import dropdown from "../../images/Polygon 1.png";
import user from "../../images/Male User.png";

const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="container">
      <div className="header"></div>
      <div className="doctor-info">
        <div className="doctor-profile">
          <img className="doctor-image" src={user} alt="Doctor" />
          <a href="/Bacsi/profile" className="doctor-name">
            BS. Nguyễn Văn A
          </a>
          <div className="dropdown">
            <img
              className={`doctor-arrow ${dropdownOpen ? "open" : ""}`}
              src={dropdown}
              alt="Doctor"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="dropdown-menu show">
                <button className="dropdown-item" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
