import express from "express";
import {
  getCategories,
  getProducts,
  getProductById,
  getReviews,
  addReview,
} from "../controllers/shopController.js";

const router = express.Router();

// GET /shop/categories
router.get("/categories", getCategories);

// GET /shop/products
router.get("/products", getProducts);

// GET /shop/products/:id
router.get("/products/:id", getProductById);

// GET /shop/reviews
router.get("/reviews", getReviews);

// POST /shop/reviews
router.post("/reviews", addReview);

export default router;
