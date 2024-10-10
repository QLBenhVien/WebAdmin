import axios from "axios";

// Tạo một instance của Axios
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api", // URL mặc định
  timeout: 10000, // Đặt thời gian chờ (timeout)
  headers: {
    "Content-Type": "application/json", // Kiểu dữ liệu mặc định
  },
});

// Interceptor cho Request: Tự động thêm token vào headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Gắn token vào header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Xử lý lỗi xảy ra trong request
  }
);

// Interceptor cho Response: Xử lý lỗi trả về
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Trả về response nếu không có lỗi
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Xử lý lỗi token hết hạn hoặc không hợp lệ
      localStorage.removeItem("token"); // Xóa token khỏi localStorage
      window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
    }
    return Promise.reject(error); // Xử lý các lỗi khác
  }
);

// Export axiosInstance để dùng trong các nơi khác
export default axiosInstance;
