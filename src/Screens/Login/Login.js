import React, { useEffect, useState } from "react";
import "./Login.css"; // Import CSS file
import logo from "../../images/logo.png";
import doctor from "../../images/doctor.png";
import backgroundImage from "../../images/background_img.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false); // Trạng thái để mở hoặc đóng Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Lưu tin nhắn của Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Đặt mức độ của Snackbar (success, error)

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log("check token");
    if (localStorage.getItem("token")) {
      navigate("/");
    }
    const isRegisterSuccess = localStorage.getItem("registerSuccess");
    const token = localStorage.getItem("token-hethan");
    if (isRegisterSuccess === "true") {
      setSnackbarMessage("Tạo tài khoản thành công !");
      setSnackbarSeverity("success");
      setOpen(true);

      // Xóa cờ đăng nhập thành công sau khi hiển thị thông báo
      localStorage.removeItem("registerSuccess");
    }
    if (token) {
      setSnackbarMessage("Phiên kết thúc, yêu cầu đăng nhập lại !");
      setSnackbarSeverity("error");
      setOpen(true);

      localStorage.removeItem("token-hethan");
    }
  }, [navigate]);

  const handleLogin = async () => {
    console.log(`email: ${email} | password: ${password}`);
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: email,
        password: password,
      });

      console.log(response);
      // Hiển thị thông báo thành công
      setSnackbarMessage("Đăng nhập thành công!");
      setSnackbarSeverity("success");
      setOpen(true);

      // Lưu token vào localStorage
      sessionStorage.setItem("token", response.data.data.accessToken);
      sessionStorage.setItem("loginSuccess", "true");
      // Điều hướng sau khi đăng nhập thành công
      if (response.data.data.active === true) {
        if (response.data.data.role === "LT") {
          console.log(response.data.data.role);
          navigate("/Letan");
        } else if (response.data.data.role === "BS") {
          navigate("/Bacsi/home");
        } else if (response.data.data.role === "IT") {
          navigate("/quantri");
        }
      } else {
        setSnackbarMessage("Tài khoản đã bị vô hiệu hóa !");
        setSnackbarSeverity("error");
        setOpen(true);
      }

      // navigate("/");
    } catch (error) {
      console.log(error);

      // Hiển thị thông báo lỗi
      setSnackbarMessage(error.response.data.errorMessage);
      setSnackbarSeverity("error");
      setOpen(true);
    }
  };

  return (
    <div
      className="AppContainer"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert onClose={handleClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      <div className="LeftContainer">
        <div className="Header">
          <img
            src={logo}
            alt="Logo"
            className="Logo"
            onClick={() => {
              navigate("/trangchu");
            }}
          />
        </div>
        <h2 className="WelcomeText">Đăng nhập cho nhân viên</h2>
        <div className="LoginBox">
          <h2>Đăng Nhập</h2>
          <input
            type="text"
            placeholder="Nhập email"
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />

          <div className="boxbutton">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                className="linkButton"
                onClick={() => {
                  navigate("/resetpassword");
                }}
              >
                Quên mật khẩu?
              </button>
            </div>

            <button onClick={handleLogin} className="button">
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
      <div className="RightContainer">
        <img src={doctor} alt="Doctor" className="DoctorImage" />
      </div>
    </div>
  );
};

export default Login;
