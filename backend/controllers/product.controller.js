import mongoose from "mongoose";
import Product from "../models/product.model.js";

const productFields = "name description price category image stock createdAt";

export const createProduct = async (req, res) => {
  try {
    const { _id, createdAt, updatedAt, ...productData } = req.body;
    const product = await Product.create(productData);
    return res.status(201).json({ success: true, product });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Please provide valid product details",
        errors: Object.values(error.errors).map(({ message }) => message),
      });
    }

    return res
      .status(500)
      .json({ success: false, message: "Unable to create product" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { search = "", category, sort } = req.query;
    const query = {};

    if (search.trim()) {
      query.name = { $regex: search.trim(), $options: "i" };
    }

    if (category?.trim()) {
      query.category = category.trim();
    }

    const sortBy =
      sort === "price_desc"
        ? { price: -1 }
        : sort === "price_asc"
          ? { price: 1 }
          : { createdAt: -1 };
    const products = await Product.find(query)
      .select(productFields)
      .sort(sortBy)
      .lean();

    return res
      .status(200)
      .json({ success: true, count: products.length, products });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Unable to load products" });
  }
};

export const getProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID" });
    }

    const product = await Product.findById(req.params.id)
      .select(productFields)
      .lean();
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Unable to load product" });
  }
};
