import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  productId: { type: Number, ref: "Product" },
  rating: { type: Number, required: true },
  comment: String,
  reviewerName: String,
  reviewerEmail: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Review", reviewSchema, "reviews");
