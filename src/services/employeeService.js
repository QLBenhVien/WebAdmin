
const KEYS = {
    employees: 'employees',
    employeeId: 'employeeId'
};

// Hàm lấy danh sách phòng ban
export const getDepartmentCollection = () => ([
    { id: '1', title: 'Bác sĩ' },
    { id: '2', title: 'Lễ tân' },
    { id: '3', title: 'Xét nghiệm' },
]);
export const getCondition =() => ([
    { id: '1', title: 'Đang hoạt động' },
    { id: '2', title: 'Đã vô hiệu hóa' },

]);
// Hàm chèn nhân viên mới
export function insertEmployee(data) {
    const employees = getAllEmployees();
    data['id'] = generateEmployeeId(); // Tạo ID cho nhân viên mới
    data['condition'] = 1; // Mặc định là "Đang hoạt động"
    employees.push(data);
    localStorage.setItem(KEYS.employees, JSON.stringify(employees)); // Lưu danh sách nhân viên vào localStorage
}

// Hàm cập nhật trạng thái nhân viên
export function disableEmployee(id) {
    let employees = getAllEmployees();
    const employee = employees.find(x => x.id === id);
    
    if (employee) {
        employee.condition = 2; // Thay đổi trạng thái thành "Đã vô hiệu hóa"
        localStorage.setItem(KEYS.employees, JSON.stringify(employees)); // Cập nhật danh sách nhân viên
        return true; // Trả về true nếu thành công
    }
    return false; // Trả về false nếu không tìm thấy nhân viên
}
//kich hoat
export const reactivateEmployee = (id) => {
    let employees = getAllEmployees();
    const employeeIndex = employees.findIndex(e => e.id === id);
    if (employeeIndex > -1) {
        employees[employeeIndex].condition = 1; // Đặt trạng thái thành "đang hoạt động"
        localStorage.setItem('employees', JSON.stringify(employees)); // Cập nhật lại danh sách nhân viên
        return true; // Trả về true nếu thành công
    }
    return false; // Trả về false nếu không tìm thấy nhân viên
};

// Hàm cập nhật thông tin nhân viên
export function updateEmployee(data) {
    const employees = getAllEmployees();
    const recordIndex = employees.findIndex(x => x.id === data.id);
    
    // Kiểm tra xem nhân viên có tồn tại không trước khi cập nhật
    if (recordIndex !== -1) {
        // Giữ nguyên trạng thái nếu không có thay đổi
        employees[recordIndex] = { ...employees[recordIndex], ...data }; 
        localStorage.setItem(KEYS.employees, JSON.stringify(employees)); // Lưu danh sách đã cập nhật
    }
}


// Hàm xóa nhân viên theo ID
export function deleteEmployee(id) {
    let employees = getAllEmployees();
    employees = employees.filter(x => x.id !== id); // Lọc nhân viên theo ID
    localStorage.setItem(KEYS.employees, JSON.stringify(employees)); // Lưu danh sách đã xóa
}

// Hàm tạo ID nhân viên mới
export function generateEmployeeId() {
    if (localStorage.getItem(KEYS.employeeId) == null) {
        localStorage.setItem(KEYS.employeeId, '0'); // Khởi tạo ID nếu chưa tồn tại
    }
    const id = parseInt(localStorage.getItem(KEYS.employeeId), 10);
    localStorage.setItem(KEYS.employeeId, (id + 1).toString()); // Cập nhật ID mới
    return id + 1; // Trả về ID mới
}

// Hàm lấy tất cả nhân viên
export function getAllEmployees() {
    if (localStorage.getItem(KEYS.employees) == null) {
        localStorage.setItem(KEYS.employees, JSON.stringify([])); // Khởi tạo danh sách nếu chưa có
    }
    const employees = JSON.parse(localStorage.getItem(KEYS.employees));
    const departments = getDepartmentCollection(); // Lấy danh sách phòng ban
    
    return employees.map(x => ({
        ...x,
        department: departments[x.departmentId - 1]?.title || 'Không xác định' // Tránh lỗi nếu departmentId không hợp lệ
    }));
}