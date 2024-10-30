import React from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import PurchaseOrderPageListing from "./PurchaseOrderPageListing";

import { useNavigate } from "react-router-dom";

const PurchaseOrderPage = () => {
  const navigate = useNavigate();

  const handleOpen = () => navigate("/purchase-order-form");

  return (
    <Box
      sx={{
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 1300,
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/")}
        >
          Back
        </Button>

        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create Purchase Order
        </Button>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: 1300,
          backgroundColor: "white",
          padding: 2,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <PurchaseOrderPageListing />
      </Box>
    </Box>
  );
};

export default PurchaseOrderPage;
