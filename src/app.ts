import express, { Application, json } from "express"
import { create, destroy, read, readById, update } from "./logics";
import { isProductNameDuplicated, verifyProductExists } from "./middlewares";

const app: Application = express();
app.use(json());

app.get("/products", read);
app.get("/products/:id", verifyProductExists, readById);
app.post("/products", isProductNameDuplicated, create);
app.patch("/products/:id", isProductNameDuplicated, verifyProductExists, update);
app.delete("/products/:id", verifyProductExists, destroy);


const PORT: number = 3000;
const runningMsg = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));