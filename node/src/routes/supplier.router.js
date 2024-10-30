import { Router } from "express";
import {
    saveSupplier,
    getSuppliers,
} from "../controllers/supplier.controller.js";


const router = Router()

router.route("/save").post(saveSupplier)

router.route("/get-suppliers").post(getSuppliers)


export default router 