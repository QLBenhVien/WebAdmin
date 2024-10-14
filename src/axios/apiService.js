import axiosInstance from "./axiosConfig";

// Hàm GET chung
export const getData = async (url, params = {}) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    throw error; // Đẩy lỗi ra ngoài để xử lý tại nơi gọi API
  }
};

// Hàm POST chung
export const postData = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Hàm PUT chung
export const putData = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
