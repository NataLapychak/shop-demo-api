import mongoose from "mongoose";

const dimensionsSchema = new mongoose.Schema(
  { width: Number, height: Number, depth: Number },
  { _id: false }
);

const categorySchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    category: { type: categorySchema, required: true },
    price: Number,
    discountPercentage: Number,
    stock: Number,
    brand: String,
    sku: String,
    weight: Number,
    dimensions: dimensionsSchema,
    warrantyInformation: String,
    availabilityStatus: String,
    returnPolicy: String,
    images: [String],
    thumbnail: String,
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema, "products");
