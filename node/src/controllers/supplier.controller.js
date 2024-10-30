import { asyncHandler } from "../utils/asyncHandler.js";
import { Supplier } from "../models/supplier.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";



export const saveSupplier = asyncHandler(async (req, res) => {
    const { supplierName, address, country, email, mobileNo, status, taxNo } = req.body

    const supplier = await Supplier.create({
        supplierName, address, country, email, mobileNo, status, taxNo

    })
    res.status(201).json(
        new ApiResponse(201, supplier, "Supplier added Successfully")
    )

});

export const getSuppliers = asyncHandler(async (req, res) => {
    const suppliers = await Supplier.find({ status: "Active" })
    res.status(201).json(
        new ApiResponse(201, suppliers, "Suppliers fetched Successfully")
    )

});


export const addItems = asyncHandler(async (req, res) => {
    const { itemName, inventoryLocation, brand, category, supplier, stockUnit, unitPrice, images, status } = req.body

    const item = await Supplier.create({
        itemName, inventoryLocation, brand, category, supplier, stockUnit, unitPrice, itemImages, status

    })
    res.status(201).json(
        new ApiResponse(201, item, "Supplier added Successfully")
    )
});



