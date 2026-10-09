import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import isAuthenticated, { isAdmin } from "../middlewares/auth.middleware.js";

const productRoutes = express.Router();

productRoutes.post("/", isAuthenticated, isAdmin, createProduct);
productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProduct);
productRoutes.patch("/:id", isAuthenticated, isAdmin, updateProduct);
productRoutes.delete("/:id", isAuthenticated, isAdmin, deleteProduct);

export default productRoutes;
