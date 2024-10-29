import React, { useState, useEffect } from "react";
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/PageHeader";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { makeStyles } from "@mui/styles";
import {
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  InputAdornment,
} from "@mui/material";
import useTable from "../../components/useTable";
import * as employeeService from "../../services/employeeService";
import { EditOutlined, Search, Visibility } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../../components/controls/Popup";
import Notification from "../../components/controls/Notification";
import Controls from "../../components/controls/Control";
import EmployeeDetails from "./EmployeeDetails"; // Nhập component EmployeeDetails
import { reactivateEmployee } from "../../services/employeeService";
import Axios from "../../Axios/axios";
import Header from "../../components/Header";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    marginLeft: theme.spacing(4),
  },
  searchInput: {
    width: "75%",
    marginRight: "30px",
  },
  actionButton: {
    margin: "0 5px",
  },
}));

// const headCells = [
// 	{ id: "fullName", label: "Tên nhân viên" },
// 	{ id: "email", label: "Email" },
// 	{ id: "mobile", label: "Số điện thoại" },
// 	{ id: "department", label: "Chức vụ" },
// 	{ id: "condition", label: "Trạng thái" },
// 	{ id: "actions", label: "Hành động", disableSorting: true },
// ];

// export const getCondition = () => [
// 	{ id: "1", title: "Đang hoạt động" },
// 	{ id: "2", title: "Đã vô hiệu hóa" },
// ];

const headCells = [
  { id: "HoTen", label: "Tên nhân viên" },
  { id: "Email", label: "Email" },
  { id: "SDT", label: "Số điện thoại" },
  { id: "MaCV", label: "Chức vụ" },
  { id: "active", label: "Trạng thái" },
  { id: "actions", label: "Hành động", disableSorting: true },
];

export const getCondition = () => [
  { id: "true", title: "Đang hoạt động" },
  { id: "false", title: "Đã vô hiệu hóa" },
];

export default function Employees({ data }) {
  const classes = useStyles();
  const [records, setRecords] = useState(data || []);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    console.log("Received data:", data);
    // data.forEach((item, index) => {
    //     console.log(`Object ${index + 1}:`, item.Email);
    // });
    if (data && data.length > 0) {
      setRecords(data);
    }
  }, [data]);

  const [openPopup, setOpenPopup] = useState(false);
  const [openDetailsPopup, setOpenDetailsPopup] = useState(false); // Popup cho thông tin chi tiết
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) => {
            return (
              x.HoTen &&
              x.HoTen.toLowerCase().includes(target.value.toLowerCase())
            );
          });
      },
    });
  };

  const createEmployee = async (employeeData) => {
    try {
      const response = employeeService.createEmployee(employeeData);
      // Handle the response as needed
      console.log("Employee created successfully:", response.data);
      setNotify({
        isOpen: true,
        message: "Tạo nhân viên thành công",
        type: "success",
      });
      // Optionally, refresh the employee records
    } catch (error) {
      console.error("Error creating employee:", error);
      setNotify({
        isOpen: true,
        message:
          error.response?.data?.message || "Có lỗi xảy ra khi tạo nhân viên",
        type: "error",
      });
    }
  };

  const addOrEdit = (employee, resetForm) => {
    console.log("Employee data:", employee);
    if (employee.id === 0) {
      // Call the new createEmployee function for new employee creation
      createEmployee(employee);
    } else {
      employeeService.updateEmployee(employee);
    }

    setTimeout(() => {
      employeeService.getAllEmployees().then((data) => {
        setRecords(data); // Cập nhật state
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
      });
    }, 1000);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const toggleAccountStatus = (employee) => {
    if (employee.active === true) {
      console.log("Employee to disable:", employee.active);
      if (
        window.confirm("Bạn có chắc chắn muốn vô hiệu hóa tài khoản này không?")
      ) {
        const result = employeeService.disableEmployee(employee.MaTK); // Vô hiệu hóa
        if (result) {
          // setRecords(employeeService.getAllEmployees());

          setNotify({
            isOpen: true,
            message: "Vô hiệu hóa thành công",
            type: "error",
          });
        }
      }
    } else if (employee.active === false) {
      if (
        window.confirm(
          "Bạn có chắc chắn muốn kích hoạt lại tài khoản này không?"
        )
      ) {
        const result = employeeService.enableEmployee(employee.MaTK); // Kích hoạt lại
        if (result) {
          // setRecords(employeeService.getAllEmployees());

          setNotify({
            isOpen: true,
            message: "Kích hoạt tài khoản thành công",
            type: "success",
          });
        }
      }
    }

    setTimeout(() => {
      employeeService.getAllEmployees().then((data) => {
        setRecords(data); // Cập nhật state
      });
    }, 1000);
  };

  const handleVisibilityClick = (item) => {
    setSelectedEmployee(item);
    setOpenDetailsPopup(true);
  };

  return (
    <>
      <PageHeader
        title="Quản lý Nhân viên"
        subTitle="Form design with validation"
        icon={<PeopleAltIcon fontSize="large" />}
      />

      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Tìm kiếm nhân viên"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            text="Thêm nhân viên"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>

        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().length === 0 ? (
              <TableRow>
                <TableCell colSpan={headCells.length} align="center">
                  Không có nhân viên nào để hiển thị
                </TableCell>
              </TableRow>
            ) : (
              recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.MaTK}>
                  <TableCell>{item.HoTen}</TableCell>
                  <TableCell>{item.Email}</TableCell>
                  <TableCell>{item.SDT}</TableCell>
                  <TableCell>{item.MaCV?.TenCV || ""}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        color: item.active === true ? "#22668E" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {item.active === true
                        ? "Đang hoạt động"
                        : "Đã vô hiệu hóa"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      className={classes.actionButton}
                      onClick={() => {
                        openInPopup(item);
                      }}
                    >
                      <EditOutlined fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                      className={classes.actionButton}
                      onClick={() => {
                        handleVisibilityClick(item);
                      }}
                    >
                      <Visibility fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>

      <Popup
        title="CHỈNH SỬA THÔNG TIN NHÂN VIÊN"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>

      {/* Popup cho thông tin chi tiết nhân viên */}
      <Popup
        title="THÔNG TIN NHÂN VIÊN"
        openPopup={openDetailsPopup}
        setOpenPopup={setOpenDetailsPopup}
      >
        {selectedEmployee && <EmployeeDetails employee={selectedEmployee} />}
        <Controls.Button
          text={
            selectedEmployee?.active === true
              ? "Vô hiệu hóa tài Khoản"
              : "Kích hoạt lại tài Khoản"
          }
          color={selectedEmployee?.active === true ? "secondary" : "primary"}
          style={{ float: "right" }}
          onClick={() => {
            toggleAccountStatus(selectedEmployee);
            setOpenDetailsPopup(false);
            setSelectedEmployee(null);
          }}
        />
      </Popup>

      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
