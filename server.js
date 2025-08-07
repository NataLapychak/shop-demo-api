import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import shop from "./routes/shop.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("SUCCESS!!!");
});

app.use("/shop", shop);

app.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});
