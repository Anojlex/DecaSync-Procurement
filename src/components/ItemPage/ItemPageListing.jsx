import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Modal,
} from "@mui/material";

const backendUrl = "http://localhost:8000";

const getImageUrl = (imagePath) => {
  return `${backendUrl}/${imagePath}`;
};

const ItemPageListing = ({ items }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleImageClick = (images) => {
    setCurrentImages(images);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentImages([]);
  };

  return (
    <Box sx={{ width: "100%", p: 1 }}>
      <Typography variant="h6" gutterBottom>
        Items
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="items table">
          <TableHead>
            <TableRow>
              <TableCell>Item No</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Inventory Location</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Stock Unit</TableCell>
              <TableCell>Unit Price(₹)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Images</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={item._id} hover>
                  <TableCell>{item.itemNo}</TableCell>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>{item.inventoryLocation}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.supplier.supplierName}</TableCell>
                  <TableCell>{item.stockUnit}</TableCell>
                  <TableCell>{item.unitPrice}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    <img
                      src={getImageUrl(item.itemImages[0])}
                      alt="item"
                      width="50"
                      height="50"
                      onClick={() => handleImageClick(item.itemImages)}
                      style={{ cursor: "pointer" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={items?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: "80%",
            maxHeight: "80vh",
            overflow: "auto",
            bgcolor: "background.paper",
            p: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Item Images
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {currentImages.map((path, index) => (
              <img
                key={index}
                src={getImageUrl(path)}
                alt={`item-${index}`}
                width="200"
                height="200"
                style={{ objectFit: "cover" }}
              />
            ))}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ItemPageListing;
