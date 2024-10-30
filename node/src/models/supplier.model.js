import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema({
    supplierNo: {
        type: Number,
        unique: true,
        default: function () {
            return Math.floor(1000 + Math.random() * 9000);
        },
    },
    supplierName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    taxNo: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please provide a valid 10-digit mobile number'],
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Blocked'],
        default: 'Active',
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

export const Supplier = mongoose.model('Supplier', SupplierSchema);

