import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Autocomplete,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

const PurchaseOrderForm = () => {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState([]);
  const [items, setItems] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [orderDate, setOrderDate] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const fetchItems = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/items/get-items"
      );
      setItems(response.data.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchSupplier = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/suppliers/get-suppliers"
      );
      setSupplier(response.data.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchSupplier();
  }, []);

  const addNewLine = () => {
    setLineItems([
      ...lineItems,
      {
        itemNo: "",
        itemName: "",
        stockUnit: "",
        unitPrice: 0,
        orderQty: 0,
        packingUnit: "",
        itemAmount: 0,
        discount: 0,
        netAmount: 0,
        itemId: "",
      },
    ]);
  };

  const packingUnits = [
    "Piece",
    "Box",
    "Kilogram",
    "Gram",
    "Liter",
    "Meter",
    "Inch",
    "Pack",
    "Set",
    "Dozen",
  ];
  const removeRow = (index) => {
    const newLineItems = lineItems.filter((_, i) => i !== index);
    setLineItems(newLineItems);
    calculateTotals(newLineItems);
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...lineItems];
    updatedItems[index][field] = value;

    if (field === "orderQty" || field === "discount") {
      updatedItems[index].itemAmount =
        updatedItems[index].unitPrice * updatedItems[index].orderQty;
      updatedItems[index].netAmount =
        updatedItems[index].itemAmount - updatedItems[index].discount;
    }

    setLineItems(updatedItems);
    calculateTotals(updatedItems);
  };

  const handleItemSelect = (index, item) => {
    const updatedItems = [...lineItems];
    updatedItems[index] = {
      ...updatedItems[index],
      itemNo: item.itemNo,
      itemName: item.itemName,
      stockUnit: item.stockUnit,
      packingUnit: item.packingUnit,
      unitPrice: item.unitPrice,
      itemId: item._id,
    };
    setLineItems(updatedItems);
    calculateTotals(updatedItems);
  };

  const calculateTotals = (items) => {
    const totalAmount = items.reduce(
      (sum, item) => sum + parseInt(item.unitPrice) * parseInt(item.orderQty),
      0
    );
    const totalDiscount = items.reduce(
      (sum, item) => sum + parseInt(item.discount ? item.discount : 0),
      0
    );
    const netTotal = items.reduce(
      (sum, item) => sum + parseInt(item.netAmount),
      0
    );

    setTotalAmount(totalAmount);
    setTotalDiscount(totalDiscount);
    setNetTotal(netTotal);
  };

  const getAvailableItems = () => {
    const selectedItems = lineItems.map((item) => item.itemName);
    return items.filter((item) => !selectedItems.includes(item.itemName));
  };
  const handleOnClose = () => {
    navigate("/purchase-orders");
  };

  const createPurchaseOrder = async (data) => {
    console.log(data, "data");
    if (!data.supplier) {
      return toast.error("Supplier is required.");
    }

    if (!data.date) {
      return toast.error("Order date is required.");
    }

    if (lineItems.length === 0) {
      return toast.error("Select at least one item");
    }

    for (const item of lineItems) {
      if (
        !item.itemNo ||
        !item.itemName ||
        !item.orderQty ||
        item.orderQty <= 0 ||
        isNaN(item.orderQty)
      ) {
        toast.error(`Invalid quantity for item: ${item.itemName}`);
        return;
      }

      if (!item.packingUnit) {
        toast.error(`Packing unit is required for item: ${item.itemName}`);
        return;
      }

      if (item.discount < 0 || isNaN(item.discount)) {
        toast.error(`Invalid discount for item: ${item.itemName}`);
        return;
      }
    }

    const formattedDate = dayjs(data.date).format("YYYY-MM-DD");

    const purchaseOrderData = {
      supplier: selectedSupplier._id,
      orderDate: formattedDate,
      lineItems,
      totalAmount,
      totalDiscount,
      netTotal,
    };
    console.log(purchaseOrderData, "purchaseOrderData");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/purchase-orders/create",
        purchaseOrderData
      );
      if (response.status === 201) {
        navigate("/purchase-orders");
      } else {
        console.log("Failed to create purchase order.");
      }
    } catch (error) {
      console.error("Error creating purchase order:", error);
    }
  };

  return (
    <div className="w-screen " style={{ overflowY: "auto" }}>
      <ToastContainer position="top-right" autoClose={5000} />
      <h3 className="text-left m-10 font-bold">Manage Purchase Order</h3>

      <Box
        className="shadow-lg p-5 w-[95%] flex mx-auto rounded-md"
        sx={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)" }}
      >
        <Autocomplete
          options={supplier}
          getOptionLabel={(option) => option.supplierName}
          style={{ width: 300, marginRight: "16px" }}
          onChange={(event, value) => {
            setSelectedSupplier(value);
          }}
          renderInput={(params) => (
            <TextField {...params} {...register("supplier")} label="Supplier" />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Order Date"
            sx={{ width: 300 }}
            {...register("date")}
            onChange={(newValue) => {
              setValue("date", newValue); // Set the value in the form
            }}
          />
        </LocalizationProvider>
        <Box className="flex ml-auto justify-between">
          <Button
            color="warning"
            variant="contained"
            className="w-30 h-8"
            style={{ marginRight: "10px" }}
            onClick={handleOnClose}
          >
            Cancel
          </Button>
          <Button
            color="success"
            variant="contained"
            className=" h-8"
            onClick={handleSubmit(createPurchaseOrder)}
          >
            Create Purchase Order
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
              <th className="px-4 py-2">Unit Price</th>
              <th className="px-4 py-2">Order Qty</th>
              <th className="px-4 py-2">Item Amount</th>
              <th className="px-4 py-2">Discount</th>
              <th className="px-4 py-2">Net Amount</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-4 py-2">
                  <Autocomplete
                    options={getAvailableItems()}
                    getOptionLabel={(option) => option.itemName}
                    onChange={(event, value) => handleItemSelect(index, value)}
                    style={{ width: 200 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Item Name"
                        variant="standard"
                      />
                    )}
                  />
                </td>
                <td className="px-4 py-2">{item.itemNo}</td>
                <td className="px-4 py-2">{item.stockUnit}</td>
                <td className="px-4 py-2">
                  <Select
                    value={item.packingUnit}
                    onChange={(e) =>
                      handleInputChange(index, "packingUnit", e.target.value)
                    }
                    variant="standard"
                    displayEmpty
                    style={{ width: 200 }}
                  >
                    {packingUnits.map((unit) => (
                      <MenuItem key={unit} value={unit}>
                        {unit}
                      </MenuItem>
                    ))}
                  </Select>
                </td>

                <td className="px-4 py-2">{item.unitPrice}</td>

                <td className="px-4 py-2">
                  <TextField
                    size="small"
                    variant="standard"
                    value={item.orderQty}
                    onChange={(e) =>
                      handleInputChange(index, "orderQty", e.target.value)
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  {isNaN(item.itemAmount) ? 0 : item.itemAmount}
                </td>
                <td className="px-4 py-2">
                  <TextField
                    size="small"
                    variant="standard"
                    value={item.discount}
                    onChange={(e) =>
                      handleInputChange(index, "discount", e.target.value)
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  {isNaN(item.netAmount) ? 0 : item.netAmount.toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  <IconButton onClick={() => removeRow(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button
          onClick={addNewLine}
          variant="outlined"
          color="primary"
          className="m-4 w-40"
        >
          Add Item
        </Button>
      </div>

      <div
        className="shadow-md w-[95%] mx-auto flex justify-end mt-4 p-5"
        style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)" }}
      >
        <Box textAlign="right">
          <Typography>
            Total Amount: {isNaN(totalAmount) ? 0 : totalAmount?.toFixed(2)}
          </Typography>
          <Typography>
            Total Discount:{" "}
            {isNaN(totalDiscount) ? 0 : totalDiscount?.toFixed(2)}
          </Typography>
          <Typography>
            Net Total: {isNaN(netTotal) ? 0 : netTotal?.toFixed(2)}
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default PurchaseOrderForm;
