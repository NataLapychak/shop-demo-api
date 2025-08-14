import Category from "../models/category.js";
import Product from "../models/product.js";
import Review from "../models/review.js";
import { getNextSequence } from "../utils/getNextSequence.js";

// GET /shop/categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /shop/products
export const getProducts = async (req, res) => {
  try {
    const { id, category, q, page = 1, limit = 50, sort = "title" } = req.query;

    if (id != null && id !== "") {
      const productId = isNaN(Number(id)) ? id : Number(id);
      const product = await Product.findOne({ id: productId });
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      return res.status(200).json(product);
    }

    const perPage = Math.min(Number(limit) || 50, 100);
    const skip = (Math.max(Number(page), 1) - 1) * perPage;

    const filter = {};

    if (category != null && category !== "") {
      filter["category.slug"] = String(category);
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    const [items, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(perPage),
      Product.countDocuments(filter),
    ]);

    res.status(200).json({
      items,
      total,
      page: Number(page),
      pages: Math.ceil(total / perPage),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /shop/products/:id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const productId = isNaN(Number(id)) ? id : Number(id);
    const product = await Product.findOne({ id: productId });

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /shop/reviews
export const getReviews = async (req, res) => {
  try {
    const { productId, limit } = req.query;

    const perPage = Number(limit) || 0;

    const filter = {};
    if (productId != null && productId !== "") {
      const asNum = Number(productId);
      filter.productId = Number.isNaN(asNum) ? productId : asNum;
    }

    const query = Review.find(filter).sort({ date: -1 });
    if (perPage > 0) {
      query.limit(perPage);
    }

    const items = await query;
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /shop/reviews
const numReviewtId = await getNextSequence("reviewId");

export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment, reviewerName, reviewerEmail } =
      req.body;

    if (!rating || rating < 1 || rating > 5 || typeof rating !== "number") {
      return res.status(400).json({ message: "Rating field error" });
    }

    if (!reviewerName || typeof reviewerName !== "string") {
      return res.status(400).json({ message: "Tour Name is required" });
    }

    if (
      !(typeof reviewerEmail === "string" && /^\S+@\S+$/.test(reviewerEmail))
    ) {
      return res.status(400).json({ message: "Email is invalid" });
    }

    if (!comment || typeof comment !== "string") {
      return res.status(400).json({ message: "Comment is required" });
    }

    const reviewData = await Review.create({
      id: numReviewtId,
      productId: Number(productId),
      rating: Number(rating),
      comment: comment,
      reviewerName,
      reviewerEmail,
      date: new Date(),
    });

    return res.status(201).json(reviewData);
  } catch (err) {
    console.log("err: ", err);
    return res.status(500).json({ message: "Server error" });
  }
};
