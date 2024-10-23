import Axios from "../Axios/axios";
import React, { useState, useEffect } from "react";

const KEYS = {
	patients: "patients",
	patientId: "patientId",
};

// Hàm lấy danh sách trạng thái
export const getCondition = () => [
	{ id: "1", title: "Đang hoạt động" },
	{ id: "2", title: "Đã vô hiệu hóa" },
];

// Hàm chèn bệnh nhân mới
export function insertPatient(data) {
	const patients = getAllPatients();
	data["id"] = generatePatientId(); // Tạo ID cho bệnh nhân mới
	data["condition"] = 1; // Mặc định là "Đang hoạt động"
	patients.push(data);
	localStorage.setItem(KEYS.patients, JSON.stringify(patients)); // Lưu danh sách bệnh nhân vào localStorage
}

// Hàm cập nhật trạng thái bệnh nhân
// export function disablePatient(id) {
// 	let patients = getAllPatients();
// 	const patient = patients.find((x) => x.id === id);

// 	if (patient) {
// 		patient.condition = 2; // Thay đổi trạng thái thành "Đã vô hiệu hóa"
// 		localStorage.setItem(KEYS.patients, JSON.stringify(patients)); // Cập nhật danh sách bệnh nhân
// 		return true; // Trả về true nếu thành công
// 	}
// 	return false; // Trả về false nếu không tìm thấy bệnh nhân
// }

// Hàm cập nhật thông tin bệnh nhân
// export function updatePatient(data) {
// 	const patients = getAllPatients();
// 	const recordIndex = patients.findIndex((x) => x.id === data.id);

// 	// Kiểm tra xem bệnh nhân có tồn tại không trước khi cập nhật
// 	if (recordIndex !== -1) {
// 		// Giữ nguyên trạng thái nếu không có thay đổi
// 		patients[recordIndex] = { ...patients[recordIndex], ...data };
// 		localStorage.setItem(KEYS.patients, JSON.stringify(patients)); // Lưu danh sách đã cập nhật
// 	}
// }

export const updatePatient = async (patientData) => {
	try {
		const response = await Axios.put("/itSupport/benhnhan/update", patientData);
		// Handle the response as needed
		console.log("Patient updated successfully:", response.data);
		// Return success result
		return {
			success: true,
			message: "Cập nhật bệnh nhân thành công",
			data: response.data,
		};
	} catch (error) {
		console.error("Error updating employee:", error);
		// Return error result
		return {
			success: false,
			message: error.response?.data?.message || "Có lỗi xảy ra khi cập nhật bệnh nhân",
		};
	}
};

// Hàm xóa bệnh nhân theo ID
export function deletePatient(id) {
	let patients = getAllPatients();
	patients = patients.filter((x) => x.id !== id); // Lọc bệnh nhân theo ID
	localStorage.setItem(KEYS.patients, JSON.stringify(patients)); // Lưu danh sách đã xóa
}

// Hàm tạo ID bệnh nhân mới
export function generatePatientId() {
	if (localStorage.getItem(KEYS.patientId) == null) {
		localStorage.setItem(KEYS.patientId, "0"); // Khởi tạo ID nếu chưa tồn tại
	}
	const id = parseInt(localStorage.getItem(KEYS.patientId), 10);
	localStorage.setItem(KEYS.patientId, (id + 1).toString()); // Cập nhật ID mới
	return id + 1; // Trả về ID mới
}

// Hàm lấy tất cả bệnh nhân
// export function getAllPatients() {
//     if (localStorage.getItem(KEYS.patients) == null) {
//         localStorage.setItem(KEYS.patients, JSON.stringify([])); // Khởi tạo danh sách nếu chưa có
//     }
//     const patients = JSON.parse(localStorage.getItem(KEYS.patients));

//     return patients.map(x => ({
//         ...x,
//         conditionTitle: getCondition().find(c => c.id === x.condition.toString())?.title || 'Không xác định' // Đặt tiêu đề trạng thái cho bệnh nhân
//     }));
// }

// getallpatients

export async function getAllPatients() {
	try {
		const res = await Axios.get("/itSupport/benhnhan/all");
		console.log("get data /benhnhan/all", res.data);
		const patientData = res.data.data.lstBenhNhans || [];
		console.log("patientData", patientData);
		// Kiểm tra xem dữ liệu có phải là array
		const newData = patientData.map((x) => ({
			...x,
			active: x?.accountId?.active || false,
			MaTK: x?.accountId?._id || "",
			SDT: x?.SDT || "",
		}));

		console.log(newData);

		return newData.reverse();
	} catch (error) {
		console.log(error);
	}
}

// enable
export async function enablePatient(id) {
	try {
		// Gửi yêu cầu tới API để kích hoạt lại nhân viên
		const response = await Axios.put("/itSupport/benhnhan/enable", {
			accountId: id,
		});

		// Kiểm tra phản hồi từ server
		if (response.data?.success) {
			console.log("Bệnh nhân đã được kích hoạt lại thành công:", response.data);
			return true; // Trả về true nếu thành công
		} else {
			console.error("Có lỗi xảy ra:", response.data?.message);
			return false;
		}
	} catch (error) {
		// Log chi tiết lỗi nếu xảy ra
		console.error(
			"Lỗi khi kích hoạt lại bệnh nhân:",
			error.response?.data?.message || error.message
		);
		return false; // Trả về false nếu không thành công
	}
}

// disable
export async function disablePatient(id) {
	try {
		// Gửi yêu cầu tới API để vô hiệu hóa nhân viên
		const response = await Axios.put("/itSupport/benhnhan/disable", {
			accountId: id,
		});

		// Kiểm tra phản hồi từ server
		if (response.data?.success) {
			console.log("Bệnh nhân đã bị vô hiệu hóa thành công:", response.data);
			return true; // Trả về true nếu thành công
		} else {
			console.error("Có lỗi xảy ra:", response.data?.message);
			return false;
		}
	} catch (error) {
		// Log chi tiết lỗi nếu xảy ra
		console.error(
			"Lỗi khi vô hiệu hóa bệnh nhân:",
			error.response?.data?.message || error.message
		);
		return false; // Trả về false nếu không thành công
	}
}
