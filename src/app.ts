import express, { Application } from "express";

const app: Application = express();

app.use(express.json());


const port = 3000;
const messageServer = `Server is running on http//localhost:${port}`

app.listen(3000, () => {
    console.log(messageServer)
})

