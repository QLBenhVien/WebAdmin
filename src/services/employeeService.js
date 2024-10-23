import Axios from "../Axios/axios";
import React, { useState, useEffect } from "react";

const KEYS = {
	employees: "employees",
	employeeId: "employeeId",
};

// Hàm lấy danh sách phòng ban
export const getDepartmentCollection = () => [
	{ id: "BS", title: "Bác sĩ" },
	{ id: "LT", title: "Lễ tân" },
	{ id: "XN", title: "Xét nghiệm" },
	{ id: "IT", title: "Quản trị viên" },
];

// export const getCondition = () => [
// 	{ id: "1", title: "Đang hoạt động" },
// 	{ id: "2", title: "Đã vô hiệu hóa" },
// ];

export const getCondition = () => [
	{ id: "true", title: "Đang hoạt động" },
	{ id: "false", title: "Đã vô hiệu hóa" },
];

// Hàm chèn nhân viên mới
// export function insertEmployee(data) {
// 	const employees = getAllEmployees();
// 	data["id"] = generateEmployeeId(); // Tạo ID cho nhân viên mới
// 	// data["condition"] = true; // Mặc định là "Đang hoạt động"
// 	data["condition"] = 1; // Mặc định là "Đang hoạt động"
// 	employees.push(data);
// 	localStorage.setItem(KEYS.employees, JSON.stringify(employees)); // Lưu danh sách nhân viên vào localStorage
// }

// Hàm cập nhật trạng thái nhân viên
// export function disableEmployee(id) {
// 	let employees = getAllEmployees();
// 	const employee = employees.find((x) => x.id === id);

// 	if (employee) {
// 		employee.condition = false; // Thay đổi trạng thái thành "Đã vô hiệu hóa"
// 		localStorage.setItem(KEYS.employees, JSON.stringify(employees)); // Cập nhật danh sách nhân viên
// 		return true; // Trả về true nếu thành công
// 	}
// 	return false; // Trả về false nếu không tìm thấy nhân viên
// }

//kich hoat
// export const reactivateEmployee = (id) => {
// 	let employees = getAllEmployees();
// 	const employeeIndex = employees.findIndex((e) => e.id === id);
// 	if (employeeIndex > -1) {
// 		employees[employeeIndex].condition = true; // Đặt trạng thái thành "đang hoạt động"
// 		localStorage.setItem("employees", JSON.stringify(employees)); // Cập nhật lại danh sách nhân viên
// 		return true; // Trả về true nếu thành công
// 	}
// 	return false; // Trả về false nếu không tìm thấy nhân viên
// };

// Hàm cập nhật thông tin nhân viên
// export function updateEmployee(data) {
// 	const employees = getAllEmployees();
// 	const recordIndex = employees.findIndex((x) => x.id === data.id);

// 	// Kiểm tra xem nhân viên có tồn tại không trước khi cập nhật
// 	if (recordIndex !== -1) {
// 		// Giữ nguyên trạng thái nếu không có thay đổi
// 		employees[recordIndex] = { ...employees[recordIndex], ...data };
// 		localStorage.setItem(KEYS.employees, JSON.stringify(employees)); // Lưu danh sách đã cập nhật
// 	}
// }

export const updateEmployee = async (employeeData) => {
	try {
		const response = await Axios.put("/itSupport/nhanvien/update", employeeData);
		// Handle the response as needed
		console.log("Employee updated successfully:", response.data);
		// Return success result
		return {
			success: true,
			message: "Cập nhật nhân viên thành công",
			data: response.data,
		};
	} catch (error) {
		console.error("Error updating employee:", error);
		// Return error result
		return {
			success: false,
			message: error.response?.data?.message || "Có lỗi xảy ra khi cập nhật nhân viên",
		};
	}
};

// Hàm xóa nhân viên theo ID
export function deleteEmployee(id) {
	let employees = getAllEmployees();
	employees = employees.filter((x) => x.id !== id); // Lọc nhân viên theo ID
	localStorage.setItem(KEYS.employees, JSON.stringify(employees)); // Lưu danh sách đã xóa
}

// Hàm tạo ID nhân viên mới
export function generateEmployeeId() {
	if (localStorage.getItem(KEYS.employeeId) == null) {
		localStorage.setItem(KEYS.employeeId, "0"); // Khởi tạo ID nếu chưa tồn tại
	}
	const id = parseInt(localStorage.getItem(KEYS.employeeId), 10);
	localStorage.setItem(KEYS.employeeId, (id + 1).toString()); // Cập nhật ID mới
	return id + 1; // Trả về ID mới
}

// Hàm lấy tất cả nhân viên
// export function getAllEmployees() {
// 	if (localStorage.getItem(KEYS.employees) == null) {
// 		localStorage.setItem(KEYS.employees, JSON.stringify([])); // Khởi tạo danh sách nếu chưa có
// 	}
// 	const employees = JSON.parse(localStorage.getItem(KEYS.employees));
// 	const departments = getDepartmentCollection(); // Lấy danh sách phòng ban

// 	return employees.map((x) => ({
// 		...x,
// 		department: departments[x.departmentId - 1]?.title || "Không xác định", // Tránh lỗi nếu departmentId không hợp lệ
// 	}));
// }

export async function getAllEmployees() {
	try {
		const res = await Axios.get("/itSupport/nhanvien/all");
		const employeeData = res.data.data.lstNhanViens || [];
		// Kiểm tra xem dữ liệu có phải là array
		const newEmployeeData = employeeData.map((x) => ({
			...x,
			active: x?.MaTK?.active || false,
			MaTK: x?.MaTK?._id || "",
		}));

		console.log(newEmployeeData);

		return newEmployeeData.reverse();
	} catch (error) {
		console.log(error);
	}
}

// create
export async function createEmployee(employeeData) {
	return await Axios.post("/itSupport/nhanvien/create", employeeData);
}

// enable
export async function enableEmployee(id) {
	try {
		// Gửi yêu cầu tới API để kích hoạt lại nhân viên
		const response = await Axios.put("/itSupport/nhanvien/enable", { MaTK: id });

		// Kiểm tra phản hồi từ server
		if (response.data?.success) {
			console.log("Nhân viên đã được kích hoạt lại thành công:", response.data);
			return true; // Trả về true nếu thành công
		} else {
			console.error("Có lỗi xảy ra:", response.data?.message);
			return false;
		}
	} catch (error) {
		// Log chi tiết lỗi nếu xảy ra
		console.error(
			"Lỗi khi kích hoạt lại nhân viên:",
			error.response?.data?.message || error.message
		);
		return false; // Trả về false nếu không thành công
	}
}

// disable
export async function disableEmployee(id) {
	try {
		// Gửi yêu cầu tới API để vô hiệu hóa nhân viên
		const response = await Axios.put("/itSupport/nhanvien/disable", { MaTK: id });

		// Kiểm tra phản hồi từ server
		if (response.data?.success) {
			console.log("Nhân viên đã bị vô hiệu hóa thành công:", response.data);
			return true; // Trả về true nếu thành công
		} else {
			console.error("Có lỗi xảy ra:", response.data?.message);
			return false;
		}
	} catch (error) {
		// Log chi tiết lỗi nếu xảy ra
		console.error(
			"Lỗi khi vô hiệu hóa nhân viên:",
			error.response?.data?.message || error.message
		);
		return false; // Trả về false nếu không thành công
	}
}
