import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import SupplierPageListing from "./SupplierPageListing";
import SupplierForm from "./SupplierForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const modalStyle = {
  position: "fixed",
  bottom: 50,
  right: 0,
  height: "90vh",
  width: "430px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "8px 0 0 8px",
  overflowY: "auto",
};

const SupplierPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const fetchCountry = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountry(response.data);
    } catch (error) {
      console.error("Error fetching country list:", error);
    }
  };

  const fetchSupplier = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/suppliers/get-suppliers"
      );
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching supplier list:", error);
    }
  };

  useEffect(() => {
    fetchCountry();
    fetchSupplier();
  }, []);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          Add New Supplier
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
        <SupplierPageListing suppliers={suppliers} />
      </Box>

      {/* Modal for  Form */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={modalStyle}>
          <SupplierForm
            onClose={handleClose}
            country={country}
            setOpen={setOpen}
            fetchSupplier={fetchSupplier}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default SupplierPage;
