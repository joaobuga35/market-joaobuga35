import express, { Application } from "express";
import { createProducts, deleteProduct, editProduct, readAllProducts, readProductWithID } from "./logics";
import { ensureIDExists, ensureVerifyNameProduct } from "./middlewares";

const app: Application = express();

app.use(express.json());

app.post("/products",ensureVerifyNameProduct,createProducts)
app.get("/products",readAllProducts)
app.get("/products/:id",ensureIDExists,readProductWithID)
app.patch("/products/:id",ensureIDExists,editProduct)
app.delete("/products/:id",ensureIDExists,deleteProduct)

const port = 3000;
const messageServer = `Server is running on http//localhost:${port}`

app.listen(3000, () => {
    console.log(messageServer)
})

