import React, { useState, useEffect } from "react";

import PatientForm from "./PatientForm";
import PageHeader from "../../components/PageHeader";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { makeStyles } from "@mui/styles";
import { Paper, TableBody, TableCell, TableRow, Toolbar, InputAdornment } from "@mui/material";

import useTable from "../../components/useTable";
import * as patientService from "../../services/patientService"; // Dịch vụ cho bệnh nhân
import { EditOutlined, Search, Visibility } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../../components/controls/Popup";
import Notification from "../../components/controls/Notification";
import Controls from "../../components/controls/Control";
import PatientDetails from "./PatientDetails"; // Nhập component PatientDetails

// Custom CSS
const useStyles = makeStyles((theme) => ({
	pageContent: {
		margin: theme.spacing(5),
		padding: theme.spacing(3),
	},
	newButton: {
		marginLeft: theme.spacing(4), // Đẩy nút sang bên phải
	},
	searchInput: {
		width: "80%",
		marginRight: "30px",
	},
	actionButton: {
		margin: "0 5px", // Căn giữa khoảng cách giữa các nút
	},

}));

// Khai báo các cột trong bảng bệnh nhân
// const headCells = [
// 	{ id: "fullName", label: "Tên bệnh nhân" },
// 	{ id: "email", label: "Email" },
// 	{ id: "mobile", label: "Số điện thoại" },
// 	{ id: "condition", label: "Trạng thái" },
// 	{ id: "actions", label: "Hành động", disableSorting: true },
// ];

// Hàm lấy danh sách trạng thái
// export const getCondition = () => [
// 	{ id: "1", title: "Đang hoạt động" },
// 	{ id: "2", title: "Đã vô hiệu hóa" },
// ];

// Hàm lấy danh sách trạng thái

const headCells = [
	{ id: "Tên", label: "Tên bệnh nhân" },
	{ id: "Email", label: "Email" },
	{ id: "SDT", label: "Số điện thoại" },
	{ id: "active", label: "Trạng thái" },
	{ id: "actions", label: "Hành động", disableSorting: true },
];

export const getCondition = () => [
	{ id: "true", title: "Đang hoạt động" },
	{ id: "false", title: "Đã vô hiệu hóa" },
];

export default function Patients({ data }) {
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
	const [selectedPatient, setSelectedPatient] = useState(null); // State để lưu bệnh nhân được chọn
	const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });

	const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(
		records,
		headCells,
		filterFn
	);

	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (items) => {
				if (target.value === "") return items;
				else
					return items.filter((x) =>
						x.Ten.toLowerCase().includes(target.value.toLowerCase())
					);
			},
		});
	};

	// const addOrEdit = (patient, resetForm) => {
	//     if (patient.id === 0) {
	//         patientService.insertPatient(patient);
	//     } else {
	//         patientService.updatePatient(patient);
	//     }

	//     resetForm();
	//     setRecordForEdit(null);
	//     setOpenPopup(false);
	//     setRecords(patientService.getAllPatients());
	//     setNotify({
	//         isOpen: true,
	//         message: 'Lưu thành công',
	//         type: 'success'
	//     });
	// };

	const addOrEdit = (patient, resetForm) => {
		console.log("patient data:", patient);
		if (patient.accountId === null) {
			// Call the new createEmployee function for new patient creation
			console.log("Create new patient");
			// createEmployee(patient);
		} else {
			console.log("Update patient");
			patientService.updatePatient(patient);
		}

		setTimeout(() => {
			patientService.getAllPatients().then((data) => {
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

	const onDelete = (id) => {
		if (window.confirm("Bạn có chắc chắn muốn vô hiệu hóa tài khoản này không?")) {
			const result = patientService.disablePatient(id); // Gọi hàm cập nhật trạng thái
			if (result) {
				setRecords(patientService.getAllPatients()); // Cập nhật lại danh sách bệnh nhân sau khi thay đổi
				setNotify({
					isOpen: true,
					message: "Vô hiệu hóa thành công",
					type: "error",
				});
			} else {
				setNotify({
					isOpen: true,
					message: "Không tìm thấy bệnh nhân.",
					type: "error",
				});
			}
		}
	};

	const handleVisibilityClick = (item) => {
		setSelectedPatient(item); // Cập nhật bệnh nhân đã chọn
		setOpenDetailsPopup(true); // Mở popup hiển thị thông tin chi tiết
	};

	const toggleAccountStatus = (patient) => {
		if (patient.active === true) {
			console.log("Patient to disable:", patient.active);
			if (window.confirm("Bạn có chắc chắn muốn vô hiệu hóa tài khoản này không?")) {
				const result = patientService.disablePatient(patient?.accountId?._id); // Vô hiệu hóa
				if (result) {
					setNotify({
						isOpen: true,
						message: "Vô hiệu hóa thành công",
						type: "error",
					});
				}
			}
		} else if (patient.active === false) {
			if (window.confirm("Bạn có chắc chắn muốn kích hoạt lại tài khoản này không?")) {
				const result = patientService.enablePatient(patient?.accountId?._id); // Vô hiệu hóa
				if (result) {
					setNotify({
						isOpen: true,
						message: "Kích hoạt tài khoản thành công",
						type: "success",
					});
				}
			}
		}

		setTimeout(() => {
			patientService.getAllPatients().then((data) => {
				setRecords(data); // Cập nhật state
			});
		}, 1000);
	};

	return (
		<>
			<PageHeader
				title="Quản lý Bệnh nhân"
				subTitle="Form design with validation"
				icon={<PeopleAltIcon fontSize="large" />}
			/>

			<Paper className={classes.pageContent}>
				<Toolbar>
					<Controls.Input
						label="Tìm kiếm bệnh nhân"
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
					{/* Bỏ chức năng thêm bệnh nhân */}
					{/* <Controls.Button
						text="Thêm bệnh nhân"
						variant="outlined"
						startIcon={<AddIcon />}
						className={classes.newButton}
						onClick={() => {
							setOpenPopup(true);
							setRecordForEdit(null);
						}}
					/> */}
				</Toolbar>

				<TblContainer>
					<TblHead />
					<TableBody>
						{recordsAfterPagingAndSorting().map((item) => (
							<TableRow key={item?.accountId?._id}>
								<TableCell>{item.Ten}</TableCell>
								<TableCell>{item.Email}</TableCell>
								<TableCell>{item.SDT}</TableCell>
								<TableCell>
									<span
										style={{
											color: item.active === true ? "#22668E" : "red", // Đặt màu cho trạng thái
											fontWeight: "bold",
										}}
									>
										{item.active === true ? "Đang hoạt động" : "Đã vô hiệu hóa"}
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
										}} // Chọn bệnh nhân để hiển thị thông tin
									>
										<Visibility fontSize="small" />
									</Controls.ActionButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</TblContainer>
				<TblPagination />
			</Paper>

			<Popup
				title="CHỈNH SỬA THÔNG TIN BỆNH NHÂN"
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<PatientForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
			</Popup>

			{/* Popup cho thông tin chi tiết bệnh nhân */}
			<Popup
				title="THÔNG TIN BỆNH NHÂN"
				openPopup={openDetailsPopup}
				setOpenPopup={setOpenDetailsPopup}
			>
				{selectedPatient && <PatientDetails patient={selectedPatient} />}
				<Controls.Button
					text={
						selectedPatient?.active === true
							? "Vô hiệu hóa tài Khoản"
							: "Kích hoạt lại tài Khoản"
					}
					color={selectedPatient?.active === true ? "secondary" : "primary"}
					style={{ float: "right" }}
					onClick={() => {
						toggleAccountStatus(selectedPatient);
						setOpenDetailsPopup(false);
						setSelectedPatient(null);
					}}
				/>
				{/* <Controls.Button
					text="Vô hiệu hóa tài khoản"
					color="secondary"
					style={{ float: "right" }}
					onClick={() => {
						onDelete(selectedPatient.id);
						setOpenDetailsPopup(false); // Đóng popup sau khi xóa
						setSelectedPatient(null);
					}}
				/> */}
			</Popup>

			<Notification notify={notify} setNotify={setNotify} />
		</>
	);

}
