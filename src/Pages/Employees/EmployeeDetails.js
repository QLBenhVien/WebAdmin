import React from "react";
import { Paper, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Tạo hook để định nghĩa style
const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(3),
		borderRadius: "8px",
		boxShadow: theme.shadows[3],
		backgroundColor: theme.palette.background.paper,
	},
	title: {
		marginBottom: theme.spacing(2),
		fontWeight: "bold",
		color: theme.palette.primary.main,
	},
	detail: {
		marginBottom: theme.spacing(1),
		fontSize: "1rem",
	},
}));

export const departmentList = [
	{ id: "6690b2d8ff2ee427f702b839", title: "Răng hàm mặt" },
	{ id: "6690b305ff2ee427f702b83b", title: "Tai mũi họng" },
	{ id: "6690b332ff2ee427f702b83c", title: "Nội khoa" },
	{ id: "6690b349ff2ee427f702b83d", title: "Ngoại khoa" },
	{ id: "6690b35fff2ee427f702b83e", title: "Phụ khoa" },
];

const EmployeeDetails = ({ employee }) => {
	const classes = useStyles();

	const department = departmentList.find((dep) => {
		return dep.id === employee?.MaKhoa;
	});

	return (
		<Paper className={classes.paper}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.detail}>
						<strong>Mã nhân viên:</strong> {employee.MaTK}
					</Typography>
					<Typography className={classes.detail}>
						<strong>Tên:</strong> {employee.HoTen}
					</Typography>
					<Typography className={classes.detail}>
						<strong>Email:</strong> {employee.Email}
					</Typography>
					<Typography className={classes.detail}>
						<strong>Số điện thoại:</strong> {employee.SDT}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.detail}>
						<strong>Địa chỉ:</strong> {employee.DiaChi}
					</Typography>
					<Typography className={classes.detail}>
						<strong>Giới tính:</strong> {employee.GioiTinh}
					</Typography>
					<Typography className={classes.detail}>
						<strong>Chức vụ:</strong> {employee?.MaCV?.TenCV}
					</Typography>
					<Typography className={classes.detail}>
						<strong>Mã Khoa:</strong> {department?.title}
					</Typography>
					<Typography className={classes.detail}>
						<strong>Ngày tạo:</strong> {employee.hireDate}
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default EmployeeDetails;
