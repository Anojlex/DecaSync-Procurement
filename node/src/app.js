import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import logger from "morgan"
import bodyParser from 'body-parser'

const app = express()

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


import supplierRouter from './routes/supplier.router.js'
import itemRouter from './routes/item.router.js'
import purchaseRouter from './routes/purchase.router.js'

app.use("/api/v1/suppliers", supplierRouter)
app.use("/api/v1/items", itemRouter)
app.use("/api/v1/purchase-orders", purchaseRouter)


export { app }  