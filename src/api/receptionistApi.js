import axiosInstance from "../Axios/axios";

const receptionistApi = {
  listAppointment: async (dateStart, dateEnd) => {
    const url = `receptionist/listAppointment`;
    const response = await axiosInstance.post(url, { dateStart, dateEnd });
    return response;
  },
  scheduleappointment: async (appointmentData) => {
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
export default receptionistApi;
