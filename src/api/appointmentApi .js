import axiosInstance from "../Axios/axios";

const appointmentApi = {
  postCreateAppointment: async (appointmentData) => {
    const url = "receptionist/scheduleappointment";
    try {
      const response = await axiosInstance.post(url, appointmentData);
      return response;
    } catch (error) {
      console.error("Error creating appointment:", error);
      throw error;
    }
  }
};

export default appointmentApi;
