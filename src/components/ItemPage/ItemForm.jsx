import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  Box,
  Autocomplete,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import axios from "axios";

const ItemForm = ({ suppliers, setOpen, fetchItems }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm();
  const [supplier, setSupplier] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const stockUnits = [
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

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });
    if (supplier) {
      formData.set("supplier", supplier);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/items/save",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        fetchItems();
        reset();
        setOpen(false);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  return (
    <Box className="p-2 bg-white" sx={{ width: "100%" }}>
      <Typography variant="h6" className="mb-4 text-center" sx={{ mb: 2 }}>
        Add New Item
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Item Name"
          variant="standard"
          fullWidth
          sx={{ mb: 3 }}
          {...register("itemName", { required: "Item Name is required" })}
          error={!!errors.itemName}
          helperText={errors.itemName?.message}
        />

        <TextField
          label="Inventory Location"
          variant="standard"
          fullWidth
          sx={{ mb: 3 }}
          {...register("inventoryLocation", {
            required: "Inventory Location is required",
          })}
          error={!!errors.inventoryLocation}
          helperText={errors.inventoryLocation?.message}
        />

        <TextField
          label="Brand"
          variant="standard"
          fullWidth
          sx={{ mb: 3 }}
          {...register("brand", { required: "Brand is required" })}
          error={!!errors.brand}
          helperText={errors.brand?.message}
        />

        <TextField
          label="Category"
          variant="standard"
          fullWidth
          sx={{ mb: 3 }}
          {...register("category", { required: "Category is required" })}
          error={!!errors.category}
          helperText={errors.category?.message}
        />

        <Controller
          name="supplier"
          control={control}
          rules={{ required: "Supplier is required" }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={suppliers}
              getOptionLabel={(option) => option?.supplierName || ""}
              onChange={(event, value) => {
                setSupplier(value?._id);
                field.onChange(value?.supplierName || "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Supplier"
                  variant="standard"
                  error={!!errors.supplier}
                  helperText={errors.supplier?.message}
                />
              )}
            />
          )}
        />

        <FormControl
          variant="standard"
          fullWidth
          sx={{ mb: 3 }}
          error={!!errors.stockUnit}
        >
          <InputLabel>Stock Unit</InputLabel>
          <Controller
            name="stockUnit"
            control={control}
            defaultValue=""
            rules={{ required: "Stock Unit is required" }}
            render={({ field }) => (
              <Select {...field} label="Stock Unit">
                {stockUnits.map((unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.stockUnit?.message}</FormHelperText>
        </FormControl>
        <TextField
          label="Unit Price"
          variant="standard"
          fullWidth
          sx={{ mb: 3 }}
          {...register("unitPrice", {
            required: "Unit Price is required",
            pattern: { value: /^[0-9]*$/, message: "Invalid Unit Price" },
          })}
          error={!!errors.unitPrice}
          helperText={errors.unitPrice?.message}
        />

        <FormControl variant="standard" fullWidth sx={{ mb: 3 }}>
          <InputLabel>Status</InputLabel>
          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <Select {...field} label="Status" defaultValue="">
                <MenuItem value="Enabled">Enabled</MenuItem>
                <MenuItem value="Disabled">Disabled</MenuItem>
              </Select>
            )}
          />
          {errors.status && (
            <p style={{ color: "red" }}>{errors.status.message}</p>
          )}
        </FormControl>

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ marginBottom: "16px" }}
        />

        <Box className="flex" sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="contained" color="success" type="submit" fullWidth>
            Add Item
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ItemForm;
