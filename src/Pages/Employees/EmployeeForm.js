import React, { useEffect, useState } from "react"; // Nhập React và useState
import { Grid } from "@mui/material"; // Nhập Grid từ MUI để tạo layout
import useForm, { Form as FormComponent } from "../../components/useForm"; // Nhập hook useForm và component Form
import Control from "../../components/controls/Control"; // Nhập các điều khiển từ Control
import * as employeeService from "../../services/employeeService"; // Nhập các dịch vụ nhân viên
import { format } from "date-fns";

// Danh sách giới tính
const genderItems = [
	{ id: "male", title: "Nam" },
	{ id: "female", title: "Nữ" },
	{ id: "other", title: "Khác" },
];

export const departmentList = [
	{ id: "6690b2d8ff2ee427f702b839", title: "Răng hàm mặt" },
	{ id: "6690b305ff2ee427f702b83b", title: "Tai mũi họng" },
	{ id: "6690b332ff2ee427f702b83c", title: "Nội khoa" },
	{ id: "6690b349ff2ee427f702b83d", title: "Ngoại khoa" },
	{ id: "6690b35fff2ee427f702b83e", title: "Phụ khoa" },
];

// Giá trị khởi tạo cho form
const initialFValues = {
	id: 0,
	password: "",
	HoTen: "",
	email: "",
	SDT: "",
	DiaChi: "",
	GioiTinh: "male",
	role: "",
	Khoa: "",
	hireDate: new Date(),
	isPermanent: false,
};

export default function EmployeeForm(props) {
	const { addOrEdit, recordForEdit } = props;

	// Thêm hàm kiểm tra email
	const isEmailExist = (email) => {
		// Lấy danh sách nhân viên từ service (giả sử có hàm này)
		// const employees = employeeService.getAllEmployees();
		return false;
		return employeeService.getAllEmployees().then((data) => {
			return data.some((item) => item.email === email);
		});
	};
	// Hàm validate để kiểm tra hợp lệ các trường
	const validate = (fieldValues = values) => {
		let temp = { ...errors }; // Tạo một bản sao của errors hiện tại

		// Kiểm tra mật khẩu
		if ("password" in fieldValues)
			temp.password = fieldValues.password ? "" : "Không được để trống thông tin này";

		// Kiểm tra email
		if ("email" in fieldValues) {
			temp.email = fieldValues.email
				? /$^|.+@.+..+/.test(fieldValues.email)
					? isEmailExist(fieldValues.email) &&
					  (!recordForEdit || recordForEdit.email !== fieldValues.email)
						? "Email đã tồn tại"
						: ""
					: "Email không hợp lệ"
				: "Không được để trống thông tin này";
		}

		// Kiểm tra số điện thoại
		if ("SDT" in fieldValues) {
			const phonePattern = /^\d{10}$/; // Định dạng số điện thoại 10 số
			temp.SDT =
				fieldValues.SDT === ""
					? "" // Không có lỗi nếu để trống
					: phonePattern.test(fieldValues.SDT)
					? ""
					: "Số điện thoại phải là 10 số";
		}

		// Kiểm tra phòng ban
		if ("role" in fieldValues)
			temp.role = fieldValues.role.length !== 0 ? "" : "Không được để trống thông tin này";

		setErrors({
			// Cập nhật errors
			...temp,
		});

		// Kiểm tra nếu không có lỗi
		return Object.values(temp).every((x) => x === "");
	};

	// Gọi hook useForm để quản lý trạng thái form
	const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(
		initialFValues,
		true,
		validate
	);

	// Hàm xử lý sự kiện khi submit form
	const handleSubmit = (e) => {
		e.preventDefault(); // Ngăn chặn hành vi mặc định của form
		if (validate()) {
			// Nếu validate thành công
			addOrEdit(values, resetForm);
		}
	};

	useEffect(() => {
		if (recordForEdit != null) console.log("recordForEdit", recordForEdit);

		const getValueByNameRole = (role) => {
			if (!role) return "";
			const roles = employeeService.getDepartmentCollection();
			console.log("");
			return roles.find((r) => r.title.toLocaleLowerCase() == role.toLocaleLowerCase()).id;
		};
		const roleValue = getValueByNameRole(recordForEdit?.MaCV?.TenCV);
		setValues({
			...values,
			HoTen: recordForEdit?.HoTen || "",
			SDT: recordForEdit?.SDT || "",
			email: recordForEdit?.Email || "",
			id: recordForEdit?.MaTK || 0,
			MaTK: recordForEdit?.MaTK || 0,
			role: roleValue,
			DiaChi: recordForEdit?.DiaChi || "",
			Khoa: recordForEdit?.MaKhoa || "",
		});
	}, [recordForEdit]);
	return (
		<FormComponent onSubmit={handleSubmit}>
			{" "}
			{/* Component form */}
			<Grid container>
				<Grid item xs={6}>
					<Control.Input
						name="email"
						label="Email"
						value={values.email}
						onChange={handleInputChange}
						error={errors.email}
					/>
					<Control.Input
						name="password"
						label="Mật khẩu"
						value={values.password}
						onChange={handleInputChange}
						error={errors.password}
					/>
					<Control.Input
						name="HoTen"
						label="Họ và tên"
						value={values.HoTen}
						onChange={handleInputChange}
						error={errors.HoTen}
					/>
					<Control.Input
						name="SDT"
						label="Số điện thoại"
						value={values.SDT}
						onChange={handleInputChange}
						error={errors.SDT}
					/>
				</Grid>
				<Grid item xs={6}>
					<Control.Select
						name="role"
						label="Chức vụ"
						value={values.role}
						onChange={handleInputChange}
						options={employeeService.getDepartmentCollection()}
						error={errors.role}
					/>

					{values.role === "BS" && (
						<Control.Select
							name="Khoa"
							label="Khoa"
							value={values.Khoa}
							onChange={handleInputChange}
							options={departmentList}
							error={errors.Khoa}
						/>
					)}
					<Control.Input
						name="DiaChi"
						label="Địa chỉ"
						value={values.DiaChi}
						onChange={handleInputChange}
					/>
					<Control.RadioGroup
						name="GioiTinh"
						label="Giới tính"
						value={values.GioiTinh}
						onChange={handleInputChange}
						items={genderItems}
					/>

					<Control.Input
						name="hireDate"
						label="Ngày tạo"
						value={
							values.hireDate ? format(new Date(values.hireDate), "dd/MM/yyyy") : ""
						} // Định dạng ngày
						onChange={handleInputChange}
						disabled // Vô hiệu hóa ô nhập
					/>

					{/* <Control.Checkbox

            name="isPermanent"
            label="Nhân viên chính thức"
            value={values.isPermanent}
            onChange={handleInputChange}
          /> */}
					<div>
						<Control.Button type="submit" text="Lưu" />
						<Control.Button color="default" text="Hủy" onClick={resetForm} />
					</div>
				</Grid>
			</Grid>
		</FormComponent>
	);
}
