import axiosInstance from "../Axios/axios";

const paymentApi = {
  updatePaymentStatusToPaid: async (appointmentId) => {
    const url = `payment/updatePaymentStatusToPaid`;
    const response = await axiosInstance.post(url, { appointmentId });
    return response;
  } 
};
export default paymentApi;
