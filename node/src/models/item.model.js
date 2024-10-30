import mongoose from 'mongoose';


const ItemSchema = new mongoose.Schema({
    itemNo: {
        type: Number,
        unique: true,
        default: function () {
            return Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number
        }
    },
    itemName: {
        type: String,
        required: true,
    },
    inventoryLocation: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', 
        required: true,
    },
    stockUnit: {
        type: String,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    itemImages: [
        {
            type: String,
        }
    ],
    status: {
        type: String,
        enum: ['Enabled', 'Disabled'],
        default: 'Enabled',
    }
}, {
    timestamps: true,
});

export const Item = mongoose.model('Item', ItemSchema);