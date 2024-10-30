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
} from "@mui/material";
import axios from "axios";

const SupplierForm = ({ country, setOpen, fetchSupplier }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/suppliers/save",
        data
      );
      if (response.status === 201) {
        fetchSupplier();
        reset();
        setOpen(false);
      }
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

  return (
    <Box className="p-2 bg-white" sx={{ width: "100%" }}>
      <Typography variant="h6" className="mb-4 text-center" sx={{ mb: 2 }}>
        Add Supplier
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Supplier Name"
          variant="standard"
          fullWidth
          sx={{ mb: 3 }}
          {...register("supplierName", {
            required: "Supplier Name is required",
          })}
          error={!!errors.supplierName}
          helperText={errors.supplierName?.message}
        />

        <TextField
          label="Address"
          variant="standard"
          fullWidth
          sx={{ mb: 3 }}
          {...register("address", { required: "Address is required" })}
          error={!!errors.address}
          helperText={errors.address?.message}
        />

        <TextField
          label="TAX No"
          variant="standard"
          fullWidth
          sx={{ mb: 3 }}
          {...register("taxNo", { required: "TAX No is required" })}
          error={!!errors.taxNo}
          helperText={errors.taxNo?.message}
        />

        <Controller
          name="country"
          control={control}
          rules={{ required: "Country is required" }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={country}
              getOptionLabel={(option) => option?.name?.common || ""}
              onChange={(event, value) => {
                field.onChange(value?.name?.common || "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  variant="standard"
                  error={!!errors.country}
                  helperText={errors.country?.message}
                />
              )}
            />
          )}
        />

        <TextField
          label="Mobile No"
          variant="standard"
          fullWidth
          sx={{ mb: 3 }}
          {...register("mobileNo", {
            required: "Mobile No is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Only numeric values are allowed",
            },
            minLength: {
              value: 10,
              message: "Mobile number must be at least 10 digits",
            },
            maxLength: {
              value: 10,
              message: "Mobile number must be at most 10 digits",
            },
          })}
          error={!!errors.mobileNo}
          helperText={errors.mobileNo?.message}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
        />

        <TextField
          label="Email"
          variant="standard"
          fullWidth
          sx={{ mb: 3 }}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <FormControl variant="standard" fullWidth sx={{ mb: 3 }}>
          <InputLabel>Status</InputLabel>
          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <Select {...field} label="Status" defaultValue="">
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Blocked">Blocked</MenuItem>
              </Select>
            )}
          />
          {errors.status && (
            <p style={{ color: "red" }}>{errors.status.message}</p>
          )}
        </FormControl>

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
            Add Supplier
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SupplierForm;
