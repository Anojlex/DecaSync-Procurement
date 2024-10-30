import {Purchase} from "../models/purchase.model.js";

export const createPurchaseOrder = async (req, res) => {
    try {
      
        const { supplier, netTotal,orderDate, totalAmount,totalDiscount,lineItems } = req.body;
      
        const items = lineItems.map(item => ({
            item: item.itemId,
            stockUnit: item.stockUnit,
            unitPrice: item.unitPrice,
            packingUnit: item.packingUnit,
            orderQty: item.orderQty,
            itemAmount: item.itemAmount,
            discount: item.discount,
            netAmount: item.netAmount
        }));

        const purchaseOrder = await Purchase.create({
            orderDate:orderDate,
            supplier: supplier,
            itemTotal: totalAmount,
            discount: totalDiscount,
            netAmount: netTotal,
            items: items
        });

        res.status(201).json({ purchaseOrder });
    } catch (error) {
        console.log(error.message);
        
        res.status(500).json({ error: error.message });
    }
}

export const getPurchaseOrder = async (req, res) => {

    try {
        const purchaseOrders = await Purchase.find().populate("supplier").populate("items.item");
        res.status(200).json({ purchaseOrders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}