import { useContext, useState } from "react";
import "./Doctor.css";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    console.log("Đăng xuất");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="container">
      <div className="header"></div>
      <div className="doctor-info">
        <div className="doctor-profile">
          <img className="doctor-image" src="Male User.png" alt="Doctor" />
          <a href="/profile" className="doctor-name">
            BS. Nguyễn Văn A
          </a>
          <div className="dropdown">
            <img
              className={`doctor-arrow ${dropdownOpen ? "open" : ""}`}
              src="Polygon 1.png"
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
