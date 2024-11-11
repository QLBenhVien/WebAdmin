import axiosInstance from "../Axios/axios";

const doctorApi = {
  getListDoctorByDepartmentDateShift: async (departmentId, ngayKham, caKham) => {
    // Sử dụng template literals để chèn tham số vào URL
    const url = `/available-doctors/${departmentId}/${ngayKham}/${caKham}`;
    const response = await axiosInstance.get(url);
    return response;
  },
  listAvailableDoctors: async (departmentId, ngayKham, caKham) => {
    // Sử dụng template literals để chèn tham số vào URL
    const url = `/doctor/available-doctors`;
    const response = await axiosInstance.post(url, {departmentId, ngayKham, caKham});
    return response;
  }
  
};

export default doctorApi;
