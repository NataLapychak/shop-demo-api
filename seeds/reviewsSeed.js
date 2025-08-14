import mongoose from "mongoose";
import dotenv from "dotenv";
import Review from "../models/review.js";
import fs from "fs/promises";

const data = await fs.readFile("./data/reviews.json", "utf-8");
const reviews = JSON.parse(data);

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Review.deleteMany();
    await Review.insertMany(reviews);

    console.log("Reviews imported!");
    process.exit();
  } catch (error) {
    console.error("Error during import:", error);
    process.exit(1);
  }
};

seedData();
