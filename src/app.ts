import express, { Application } from "express";
import { createProducts } from "./logics";
import { ensureVerifyNameProduct } from "./middlewares";

const app: Application = express();

app.use(express.json());

app.post("/products",ensureVerifyNameProduct,createProducts)

const port = 3000;
const messageServer = `Server is running on http//localhost:${port}`

app.listen(3000, () => {
    console.log(messageServer)
})

