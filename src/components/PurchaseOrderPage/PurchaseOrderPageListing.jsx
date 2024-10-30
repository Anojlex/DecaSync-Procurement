import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
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
  Button,
} from "@mui/material";

const PurchaseOrderPageListing = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [orders, setOrders] = useState([]);

  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/purchase-Orders/getPurchaseOrder"
      );

      setOrders(response.data.purchaseOrders);
    } catch (error) {
      console.error("Error fetching supplier list:", error);
    }
  };

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);
  const formatDate = (dateString) => {
    return dayjs(dateString).format("DD-MM-YYYY");
  };

  const viewPurchaseOrder = (order) => {
    navigate("/purchase-order-view", { state: { order } });
  };

  return (
    <Box sx={{ width: "100%", p: 1 }}>
      <Typography variant="h6" gutterBottom>
        Purchase Orders
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="items table">
          <TableHead>
            <TableRow>
              <TableCell>Order No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Item Total(₹) </TableCell>
              <TableCell>Discount(₹)</TableCell>
              <TableCell>Net Amount(₹)</TableCell>
              <TableCell>Action </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order, index) => (
                <TableRow key={order._id} hover>
                  <TableCell>{order.orderNo}</TableCell>
                  <TableCell>{formatDate(order.orderDate)}</TableCell>
                  <TableCell>{order.supplier.supplierName}</TableCell>
                  <TableCell>{order.itemTotal}</TableCell>
                  <TableCell>{order.discount}</TableCell>
                  <TableCell>{order.netAmount}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => viewPurchaseOrder(order)}
                      className="cursor-pointer bg-slate-100 w-50 hover:bg-slate-400 "
                    >
                      View
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={orders?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default PurchaseOrderPageListing;
