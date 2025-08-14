import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.js";
import fs from "fs/promises";

const data = await fs.readFile("./data/products.json", "utf-8");
const products = JSON.parse(data);

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Products imported!");
    process.exit();
  } catch (error) {
    console.error("Error during import:", error);
    process.exit(1);
  }
};

seedData();
