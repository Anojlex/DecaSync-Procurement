import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import ItemForm from "./ItemForm";
import ItemPageListing from "./ItemPageListing";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const modalStyle = {
  position: "fixed",
  bottom: 50,
  right: 0,
  height: "95vh",
  width: "430px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "8px 0 0 8px",
  overflowY: "auto",
};

const ItemPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [supplier, setSupplier] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/items/get-items"
      );
      setItems(response.data.data);
    } catch (error) {
      console.error("Error fetching country list:", error);
    }
  };

  const fetchSupplier = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/suppliers/get-suppliers"
      );
      setSupplier(response.data.data);
      console.log(supplier, "supplier");
    } catch (error) {
      console.error("Error fetching supplier list:", error);
    }
  };

  useEffect(() => {
    fetchItems();
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
          Add New Item
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
        <ItemPageListing items={items} />
      </Box>

      {/* Modal for  Form */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={modalStyle}>
          <ItemForm
            onClose={handleClose}
            suppliers={supplier}
            setOpen={setOpen}
            fetchItems={fetchItems}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ItemPage;
