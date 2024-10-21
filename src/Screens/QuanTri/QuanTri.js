import React, { useEffect, useState } from "react";
import SlideMenu from "../../components/SlideMenu";
import { makeStyles } from "@mui/styles";
import Header from "../../components/Header";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"; // Sửa thành createTheme
import Employees from "../../Pages/Employees/Employees";
import { useNavigate } from "react-router-dom";
import Axios from "../../Axios/axios";
import * as employeeService from "../../services/employeeService";

// Định nghĩa theme với createTheme
const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

// Định nghĩa các class CSS-in-JS với makeStyles
const useStyles = makeStyles({
  appMain: {
    width: "100%",
  },
});

// Component QuanTri
const QuanTri = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [nhanvien, setNhanvien] = useState([]); // Khởi tạo là array rỗng

  // const fetchdata = async () => {
  // 	try {
  // 		const res = await Axios.get("/itSupport/nhanvien/all");
  // 		const employeeData = res.data.data.lstNhanViens || []; // Kiểm tra xem dữ liệu có phải là array
  // 		console.log("get data /nhanvien/all", employeeData); // Log để kiểm tra dữ liệu từ API
  // 		setNhanvien(employeeData); // Cập nhật state
  // 	} catch (error) {
  // 		console.log(error);
  // 	}
  // };

  // Dùng useEffect để log nhanvien sau khi nó thay đổi
  useEffect(() => {
    employeeService.getAllEmployees().then((data) => {
      setNhanvien(data); // Cập nhật state
    });
  }, []);

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appMain}>
        <Employees data={nhanvien} />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default QuanTri;
