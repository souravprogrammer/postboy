import React from "react";

import { Modal, Box, Typography, Paper } from "@mui/material";

export default function MyModal({ open, setOpen, children }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper>{children}</Paper>
    </Modal>
  );
}
