import mongoose from 'mongoose';

const PurchaseOrderSchema = new mongoose.Schema({
  orderNo: {
    type: String,
    unique: true,
    default: function () {
      return "PO"+Math.floor(1000 + Math.random() * 9000);
    }
  },
  orderDate: {
    type: Date,
    required:true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  itemTotal: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  netAmount: {
    type: Number,
    default: 0
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
      },
      stockUnit: String,
      unitPrice: Number,
      packingUnit: String,
      orderQty: Number,
      itemAmount: Number,
      discount: Number,
      netAmount: Number
    }
  ]
}, { timestamps: true });


export const Purchase = mongoose.model('Purchase', PurchaseOrderSchema);
