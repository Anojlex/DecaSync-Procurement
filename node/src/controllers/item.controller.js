import { asyncHandler } from "../utils/asyncHandler.js";
import { Item } from "../models/item.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { upload } from "../middlewares/multer.middleware.js";


export const getItems = asyncHandler(async (req, res) => {
    const items = await Item.find({ status: "Enabled" }).populate({
        path: 'supplier',
        select: 'supplierName'
    });
    res.status(201).json(
        new ApiResponse(201, items, "Items fetched Successfully")
    )

});


export const addItems = asyncHandler(async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Request Files:', req.files);
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json(new ApiResponse(400, null, err));
        }

        const { itemName, inventoryLocation, brand, category, supplier, stockUnit, unitPrice, status } = req.body;

        const itemImages = req.files.map(file => file.path);

        const item = await Item.create({
            itemName,
            inventoryLocation,
            brand,
            category,
            supplier,
            stockUnit,
            unitPrice,
            itemImages,
            status
        });

        res.status(201).json(new ApiResponse(201, item, "Item added Successfully"));
    });
});