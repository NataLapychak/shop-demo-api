import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/category.js";
import fs from "fs/promises";

const data = await fs.readFile("./data/categories.json", "utf-8");
const categories = JSON.parse(data);

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Category.deleteMany();
    await Category.insertMany(categories);

    console.log("Categories imported!");
    process.exit();
  } catch (error) {
    console.error("Error during import:", error);
    process.exit(1);
  }
};

seedData();
