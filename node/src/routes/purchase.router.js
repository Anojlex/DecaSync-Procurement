import { Router } from "express";
import {
    createPurchaseOrder,
    getPurchaseOrder,
} from "../controllers/purchase.controller.js";


const router = Router()

router.route("/create").post(createPurchaseOrder)
router.route("/getPurchaseOrder").post(getPurchaseOrder)

export default router 