import React, { useEffect } from "react";
import Controls from "../../components/controls/Control";
import useForm, { Form as FormComponent } from "../../components/useForm"; // Nhập hook useForm và component Form
import Control from "../../components/controls/Control"; // Nhập các điều khiển từ Control
import * as patientService from "../../services/patientService"; // Nhập các dịch vụ nhân viên
import { format } from "date-fns";

const initialFValues = {
	Ten: "",
	Email: "",
	SDT: "",
	DiaChi: "",
	CCCD: "",
	BHYT: false || true,
	// condition: "", // Tình trạng của bệnh nhân (Đang hoạt động, Đã vô hiệu hóa, ...)
};

export default function PatientForm(props) {
	const { addOrEdit, recordForEdit } = props;

	// Hàm validate kiểm tra các trường dữ liệu
	const validate = (fieldValues = values) => {
		let temp = { ...errors };
		if ("Ten" in fieldValues) temp.Ten = fieldValues.Ten ? "" : "Trường này là bắt buộc.";
		if ("Email" in fieldValues)
			temp.Email = /^.+@.+..+/.test(fieldValues.Email) ? "" : "Email không hợp lệ.";
		if ("SDT" in fieldValues)
			temp.SDT = fieldValues.SDT.length > 9 ? "" : "Số điện thoại không hợp lệ.";
		// Không cần validate "condition" vì không có yêu cầu đặc biệt
		setErrors({
			...temp,
		});
		return Object.values(temp).every((x) => x === "");
	};

	const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(
		initialFValues,
		true,
		validate
	);
	// Xử lý submit form
	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			addOrEdit(values, resetForm);
		}
	};

	// useEffect để điền thông tin bệnh nhân khi chỉnh sửa
	useEffect(() => {
		if (recordForEdit != null) console.log("recordForEdit", recordForEdit);

		setValues({
			...values,
			Ten: recordForEdit?.Ten,
			SDT: recordForEdit?.SDT,
			Email: recordForEdit?.Email || "",
			accountId: recordForEdit?.accountId?._id || 0,
			Job: recordForEdit?.Job || "",
			NgaySinh: recordForEdit?.NgaySinh || "",
			DiaChi: recordForEdit?.DiaChi || "",
		});
	}, [recordForEdit]);

	return (
		<FormComponent onSubmit={handleSubmit}>
			<Controls.Input
				name="Ten"
				label="Tên Bệnh Nhân"
				value={values.Ten}
				onChange={handleInputChange}
				error={errors.Ten}
			/>
			<Controls.Input
				name="Email"
				label="Email"
				value={values.Email}
				onChange={handleInputChange}
				error={errors.Email}
			/>
			<Controls.Input
				name="SDT"
				label="Số Điện Thoại"
				value={values.SDT}
				onChange={handleInputChange}
				error={errors.SDT}
			/>
			{/* <Controls.Input
				name="condition"
				label="Tình Trạng"
				value={values.condition}
				onChange={handleInputChange}
			/> */}
			<div>
				<Controls.Button type="submit" text="Lưu" />
				<Controls.Button text="Hủy" color="default" onClick={resetForm} />
			</div>
		</FormComponent>
	);
}
