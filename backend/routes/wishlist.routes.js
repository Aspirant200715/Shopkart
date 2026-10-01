import express from "express";

import isAuthenticated from "../middlewares/auth.middleware.js"

import {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
}  from "../controllers/wishlist.controller.js"

const wishlistRoutes = express.Router();

wishlistRoutes.post("/:productId",isAuthenticated,addToWishlist)
wishlistRoutes.get("/",isAuthenticated, getWishlist)
wishlistRoutes.delete("/:productId",isAuthenticated,removeFromWishlist)

export default wishlistRoutes;