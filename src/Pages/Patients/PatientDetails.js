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

export const statusBHYT = [
	{ id: "true", title: "Có tham gia" },
	{ id: "false", title: "Không tham gia" },
];

const PatientDetails = ({ patient }) => {
	const classes = useStyles();

	console.log("patientDetail", patient);

	const status = statusBHYT.find((s) => {
		console.log("s.id", s.id);
		console.log("patient.BHYT", patient.BHYT);
		if (s.id === patient?.BHYT.toString()) console.log("the same");
		else console.log("not the same");
		return s.id === patient?.BHYT.toString();
	});

	return (
		<Paper className={classes.paper}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.detail}>
						<strong>Mã bệnh nhân:</strong> {patient.accountId?._id || null}
					</Typography>
					<Typography className={classes.detail}>
						<strong>Tên:</strong> {patient.Ten}
					</Typography>
					<Typography className={classes.detail}>
						<strong>Email:</strong> {patient.Email}
					</Typography>
					<Typography className={classes.detail}>
						<strong>Số điện thoại:</strong> {patient.SDT}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.detail}>
						<strong>Địa chỉ:</strong> {patient.DiaChi}
					</Typography>
					<Typography className={classes.detail}>
						<strong>Giới tính:</strong> {patient.GioiTinh}
					</Typography>
					{/* <Typography className={classes.detail}>
						<strong>Tình trạng:</strong> {patient.active}
					</Typography> */}
					<Typography className={classes.detail}>
						<strong>CCCD:</strong> {patient.CCCD}
					</Typography>
					<Typography className={classes.detail}>
						<strong>BHYT:</strong> {status?.title}
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default PatientDetails;
