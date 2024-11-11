import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import paymentApi from "../../api/paymentApi";

const PayPalPayment = ({ appointmentId, totalAmountUSD }) => {
  const createOrder = async (data, actions) => {
    // Gửi request tạo order tới backend của bạn, truyền `totalAmountUSD` trong payload
    const response = await fetch(
      "http://localhost:8080/payment/createPaypalPayment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmountUSD, // Đặt tổng số tiền ở đây
          appointmentId, // Gửi kèm mã cuộc hẹn nếu cần sử dụng trên backend
        }),
      }
    );

    const orderData = await response.json();
    return orderData.id; // Trả về order ID
  };

  const onApprove = async (data, actions) => {
    await actions.order.capture();

    try {
      const response = await paymentApi.updatePaymentStatusToPaid(
        appointmentId
      );
      if (response) {
        // alert("Transaction completed!");
        // Làm mới trang sau khi thanh toán thành công
        window.location.reload();
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Lỗi khi gọi API updatePaymentStatusToPaid");
    }
  };

  return (
    <PayPalScriptProvider>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;
