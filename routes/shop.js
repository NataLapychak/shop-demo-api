import express from "express";
import { getCategories } from "../controllers/shopController.js";

const router = express.Router();

// GET /api/shop/categories
router.get("/categories", getCategories);

export default router;
