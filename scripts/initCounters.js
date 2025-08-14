import mongoose from "mongoose";
import dotenv from "dotenv";
import Counter from "../models/counter.js";
import Product from "../models/product.js";
import Category from "../models/category.js";
import Review from "../models/review.js";

dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

async function getMaxNumericId(model) {
  const docs = await model.find({}, { id: 1, _id: 0 }).lean();
  const nums = docs.map((d) => Number(d.id)).filter((n) => Number.isFinite(n));
  return nums.length ? Math.max(...nums) : 0;
}

async function init() {
  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10_000,
  });

  const [maxProd, maxCat, maxRev] = await Promise.all([
    getMaxNumericId(Product),
    getMaxNumericId(Category),
    getMaxNumericId(Review),
  ]);

  await Promise.all([
    Counter.findByIdAndUpdate(
      "productId",
      { $set: { seq: maxProd } },
      { upsert: true }
    ),
    Counter.findByIdAndUpdate(
      "categoryId",
      { $set: { seq: maxCat } },
      { upsert: true }
    ),
    Counter.findByIdAndUpdate(
      "reviewId",
      { $set: { seq: maxRev } },
      { upsert: true }
    ),
  ]);

  console.log(
    `Counters initialized: productId=${maxProd}, categoryId=${maxCat}, reviewId=${maxRev}`
  );
  process.exit(0);
}

init().catch((err) => {
  console.error("initCounters error:", err);
  process.exit(1);
});
