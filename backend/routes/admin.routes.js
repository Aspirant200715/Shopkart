import express from "express";
import isAuthenticated, { isAdmin } from "../middlewares/auth.middleware.js";
import {
  getAdminOrders,
  getAdminOverview,
  getAdminProducts,
  updateAdminOrderStatus,
} from "../controllers/admin.controller.js";

const adminRoutes = express.Router();
adminRoutes.use(isAuthenticated, isAdmin);
adminRoutes.get("/overview", getAdminOverview);
adminRoutes.get("/products", getAdminProducts);
adminRoutes.get("/orders", getAdminOrders);
adminRoutes.patch("/orders/:id/status", updateAdminOrderStatus);

export default adminRoutes;
