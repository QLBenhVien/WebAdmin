const KEYS = {
    patients: 'patients',
    patientId: 'patientId'
};

// Hàm lấy danh sách trạng thái
export const getCondition = () => ([
    { id: '1', title: 'Đang hoạt động' },
    { id: '2', title: 'Đã vô hiệu hóa' },
]);

// Hàm chèn bệnh nhân mới
export function insertPatient(data) {
    const patients = getAllPatients();
    data['id'] = generatePatientId(); // Tạo ID cho bệnh nhân mới
    data['condition'] = 1; // Mặc định là "Đang hoạt động"
    patients.push(data);
    localStorage.setItem(KEYS.patients, JSON.stringify(patients)); // Lưu danh sách bệnh nhân vào localStorage
}

// Hàm cập nhật trạng thái bệnh nhân
export function disablePatient(id) {
    let patients = getAllPatients();
    const patient = patients.find(x => x.id === id);
    
    if (patient) {
        patient.condition = 2; // Thay đổi trạng thái thành "Đã vô hiệu hóa"
        localStorage.setItem(KEYS.patients, JSON.stringify(patients)); // Cập nhật danh sách bệnh nhân
        return true; // Trả về true nếu thành công
    }
    return false; // Trả về false nếu không tìm thấy bệnh nhân
}

// Hàm cập nhật thông tin bệnh nhân
export function updatePatient(data) {
    const patients = getAllPatients();
    const recordIndex = patients.findIndex(x => x.id === data.id);
    
    // Kiểm tra xem bệnh nhân có tồn tại không trước khi cập nhật
    if (recordIndex !== -1) {
        // Giữ nguyên trạng thái nếu không có thay đổi
        patients[recordIndex] = { ...patients[recordIndex], ...data }; 
        localStorage.setItem(KEYS.patients, JSON.stringify(patients)); // Lưu danh sách đã cập nhật
    }
}

// Hàm xóa bệnh nhân theo ID
export function deletePatient(id) {
    let patients = getAllPatients();
    patients = patients.filter(x => x.id !== id); // Lọc bệnh nhân theo ID
    localStorage.setItem(KEYS.patients, JSON.stringify(patients)); // Lưu danh sách đã xóa
}

// Hàm tạo ID bệnh nhân mới
export function generatePatientId() {
    if (localStorage.getItem(KEYS.patientId) == null) {
        localStorage.setItem(KEYS.patientId, '0'); // Khởi tạo ID nếu chưa tồn tại
    }
    const id = parseInt(localStorage.getItem(KEYS.patientId), 10);
    localStorage.setItem(KEYS.patientId, (id + 1).toString()); // Cập nhật ID mới
    return id + 1; // Trả về ID mới
}

// Hàm lấy tất cả bệnh nhân
export function getAllPatients() {
    if (localStorage.getItem(KEYS.patients) == null) {
        localStorage.setItem(KEYS.patients, JSON.stringify([])); // Khởi tạo danh sách nếu chưa có
    }
    const patients = JSON.parse(localStorage.getItem(KEYS.patients));
    
    return patients.map(x => ({
        ...x,
        conditionTitle: getCondition().find(c => c.id === x.condition.toString())?.title || 'Không xác định' // Đặt tiêu đề trạng thái cho bệnh nhân
    }));
}
