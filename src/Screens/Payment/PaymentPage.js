import React from "react";
import PayPalPayment from './PayPalPayment';

const PaymentPage = ({ appointmentId, totalAmountUSD }) => {
  return (
    <div>
      <h1 style={styles.Title}>Thanh Toán với PayPal - Đơn hàng {appointmentId} </h1>
      <h2 style={styles.Title}>Tổng tiền: {totalAmountUSD} USD</h2>
      <PayPalPayment appointmentId={appointmentId} totalAmountUSD={totalAmountUSD} />
    </div>
  );
};

const styles = {
  Title: {
    textAlign: 'center'
  },
};

export default PaymentPage;
