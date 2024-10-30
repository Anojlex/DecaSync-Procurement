import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
const PurchaseOrderView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lineItems, setLineItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const order = location.state.order;

  useEffect(() => {
    setTotalAmount(order.itemTotal);
    setTotalDiscount(order.discount);
    setNetTotal(order.netAmount);
  }, [order]);

  const handleOnClose = () => {
    navigate("/purchase-orders");
  };
  const formatDate = (dateString) => {
    return dayjs(dateString).format("DD-MM-YYYY");
  };
  return (
    <div className="w-screen" style={{ overflowY: "auto" }}>
      <h3 className="text-left m-10 font-bold">View Purchase Order</h3>

      <Box
        className="shadow-lg p-5 w-[95%] flex mx-auto rounded-md"
        sx={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)" }}
      >
        <TextField
          label="Supplier Name"
          value={order.supplier.supplierName}
          inputProps={{ readOnly: true }}
          className="w-90"
        />
        <TextField
          label="Order Date"
          value={formatDate(order.orderDate)}
          inputProps={{ readOnly: true }}
          className="w-90"
          sx={{ marginLeft: "12px" }}
        />

        <Box className="flex ml-auto justify-between">
          <Button
            color="warning"
            variant="contained"
            className="w-30 h-8"
            style={{ marginRight: "10px" }}
            onClick={handleOnClose}
          >
            Back
          </Button>
        </Box>
      </Box>

      <div
        className="shadow-lg p-5 w-[95%] mx-auto rounded-md mt-5 flex flex-col"
        style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)" }}
      >
        <table className="min-w-full border-collapse rounded-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Item Name</th>
              <th className="px-4 py-2">Item No</th>
              <th className="px-4 py-2">Stock Unit</th>
              <th className="px-4 py-2">Packing Unit</th>
              <th className="px-4 py-2">Unit Price(₹)</th>
              <th className="px-4 py-2">Order Qty</th>
              <th className="px-4 py-2">Item Amount(₹)</th>
              <th className="px-4 py-2">Discount(₹)</th>
              <th className="px-4 py-2">Net Amount(₹)</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-4 py-2">{item.item.itemName}</td>
                <td className="px-4 py-2">{item.item.itemNo}</td>
                <td className="px-4 py-2">{item.stockUnit}</td>
                <td className="px-4 py-2">{item.packingUnit}</td>
                <td className="px-4 py-2">{item.unitPrice}</td>
                <td className="px-4 py-2">{item.orderQty}</td>
                <td className="px-4 py-2">{item.itemAmount}</td>
                <td className="px-4 py-2">{item.discount}</td>
                <td className="px-4 py-2">{item.netAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="shadow-md w-[95%] mx-auto flex justify-end mt-4 p-5"
        style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)" }}
      >
        <Box textAlign="right">
          <Typography>Total Amount: ₹{totalAmount}</Typography>
          <Typography>Total Discount: ₹{totalDiscount}</Typography>
          <Typography>Net Total: ₹{netTotal}</Typography>
        </Box>
      </div>
    </div>
  );
};

export default PurchaseOrderView;
