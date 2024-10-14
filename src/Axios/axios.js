// axios.js
import axios from "axios";

// Tạo một instance của axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // URL gốc của API
  timeout: 10000, // Giới hạn thời gian cho mỗi request
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm Interceptor cho Request
axiosInstance.interceptors.request.use(
  function (config) {
    // Lấy token từ localStorage (nếu có)
    const token = localStorage.getItem("token");

    // Nếu có token thì thêm vào header của request
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Xử lý lỗi trước khi request được gửi
    return Promise.reject(error);
  }
);

// Thêm Interceptor cho Response
axiosInstance.interceptors.response.use(
  function (response) {
    // Bất kỳ mã trạng thái nào nằm trong phạm vi 2xx đều kích hoạt hàm này
    return response;
  },
  function (error) {
    // Bất kỳ mã trạng thái nào nằm ngoài phạm vi 2xx đều kích hoạt hàm này
    // Bạn có thể xử lý các lỗi chung như token hết hạn ở đây
    if (error.response.status === 401) {
      // Xử lý khi token hết hạn, chuyển hướng về trang đăng nhập chẳng hạn
      localStorage.removeItem("token");
      window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
