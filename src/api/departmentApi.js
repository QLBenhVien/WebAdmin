import axiosInstance from "../Axios/axios";

const departmentApi = {
  getAllDepartments: async () => {
    const url = "department/listdepartment";
    const response = await axiosInstance.get(url);
    return response;
  } 
};

export default departmentApi;
