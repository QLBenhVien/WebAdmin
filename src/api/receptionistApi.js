import axiosInstance from "../Axios/axios";

const receptionistApi = {
  listAppointment: async (dateStart, dateEnd) => {
    const url = `receptionist/listAppointment`;
    const response = await axiosInstance.post(url, { dateStart, dateEnd });
    console.log(response);
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
  },
  paymentForExamination: async (appointmentId) => {
    const url = `receptionist/paymentForExamination/${appointmentId}`;
    const response = await axiosInstance.get(url);
    return response;
  },
};
export default receptionistApi;
