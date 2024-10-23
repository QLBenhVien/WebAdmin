import axiosInstance from "../Axios/axios";

const doctorApi = {
  getListDoctorByDepartmentId: async (departmentId) => {
    const url = `doctor/listdoctor/${departmentId}`;
    const response = await axiosInstance.get(url);
    return response;
  } 
};
export default doctorApi;
