import React, { useState } from "react"; // Nhập React và useState để quản lý trạng thái
import { makeStyles } from "@mui/styles"; // Nhập hàm makeStyles để tạo styles cho component

// Hook useForm để quản lý form
export default function useForm(initialFValues, validateOnChange = false, validate) {
	// Khởi tạo state cho các giá trị của form và lỗi
	const [values, setValues] = useState(initialFValues);
	const [errors, setErrors] = useState({});

	// Hàm để reset form về trạng thái ban đầu
	const resetForm = () => {
		setValues(initialFValues); // Đặt lại giá trị về giá trị khởi tạo
		setErrors({}); // Đặt lại lỗi về một đối tượng rỗng
	};

	// Hàm để xử lý thay đổi của input
	const handleInputChange = (e) => {
		const { name, value } = e.target; // Lấy name và value từ sự kiện
		setValues({
			...values, // Giữ nguyên các giá trị hiện tại
			[name]: value, // Cập nhật giá trị của trường input
		});

		// Nếu validateOnChange là true, gọi hàm validate
		if (validateOnChange) validate({ [name]: value });
	};

	return {
		values, // Trả về các giá trị của form
		setValues, // Trả về hàm để cập nhật các giá trị
		errors, // Trả về các lỗi
		setErrors, // Trả về hàm để cập nhật lỗi
		handleInputChange, // Trả về hàm xử lý thay đổi input
		resetForm, // Trả về hàm reset form
	};
}

// Tạo styles cho form
const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiFormControl-root": {
			width: "80%", // Đặt chiều rộng cho các control của MUI
			margin: theme.spacing(1), // Thêm margin cho các control
		},
	},
}));

// Component Form sử dụng styles và hook useForm
export function Form(props) {
	const classes = useStyles(); // Gọi hook để lấy các class styles
	const { children, ...other } = props; // Tách children và các props khác

	return (
		<form className={classes.root} autoComplete="off" {...other}>
			{props.children} {/* Render các children bên trong form */}
		</form>
	);
}
