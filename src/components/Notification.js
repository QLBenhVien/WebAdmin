import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Notifications = ({ message, status, isOpen, handleClose }) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <MuiAlert onClose={handleClose} severity={status}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Notifications;
