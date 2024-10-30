import { Router } from "express";
import {
    addItems,
    getItems
} from "../controllers/item.controller.js";

const router = Router()

router.route("/save").post(addItems)

router.route("/get-items").post(getItems)


export default router 