import mongoose from "mongoose";
import Customer from "../models/customer.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    if (product.stock < 1) {
      return res.status(400).json({
        success: false,
        message: "Product is out of stock",
      });
    }
    const customer = await Customer.findById(req.user._id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
    const existingItem = customer.cart.find(
      (item) => item.product.toString() === productId,
    );
    if (existingItem) {
      if (existingItem.quantity + 1 > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} units are currently in stock.`,
        });
      }
      existingItem.quantity += 1;
    } else {
      customer.cart.push({
        product: product._id,
        quantity: 1,
      });
    }
    await customer.save();
    const updatedCustomer = await Customer.findById(req.user._id).populate({
      path: "cart.product",
      select: "name description price category image stock",
    });
    return res.status(200).json({
      success: true,
      message: "cart updated",
      cart: updatedCustomer.cart,
    });
  } catch (error) {
    console.error("Add to cart error :", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add product to cart",
    });
  }
};



export const getCart = async (req, res) => {
  try {
     const customer  = await Customer.findById(req.user._id).populate({
        path:"cart.product",
        select : "name description price category image stock"
     })

     if(!customer){
        return res.status(400).json({
            success : false ,
            message : "Customer not found"
        })
     }

     return res.status(200).json({
        success : true,
        cart : customer.cart || []
     })
  } catch (error) {
    console.error("Get cart error :", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve cart",
    });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const {productId} = req.params;
    const {quantity} = req.body;
    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({
            success : true,
            message : "Invaid product ID",
        })
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const product = await Product.findById(productId);

    if(!product){
        return res.status(400).json({
            success : false,
            message : "Product not found"
        })
    }
    if(quantity > product.stock){
        return res.status(400).json({
            success : false ,
            message : `Only ${product.stock} units are currently in stock.`
        })
    }
    
    const customer = await Customer.findById(req.user._id);
    if(!customer){
        return res.status(404).json({
            success : false ,
            message : "Customer not found"
        })
    }
    
    const cartItem = customer.cart.find((item)=>item.product.toString()===productId)
    if(!cartItem){
        return res.status(404).json({
            success : false,
            message : "Product not found in cart"
        })
    }

    cartItem.quantity = quantity;
    await customer.save();

    const updatedCustomer = await Customer.findById(req.user._id).populate({
      path: "cart.product",
      select: "name description price category image stock",
    });
    return res.status(200).json({
      success: true,
      message: "cart updated",
      cart: updatedCustomer.cart,
    });
    
  } catch (error) {
    console.error("Update cart quantity error :", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update cart quantity",
    });
  }
};



export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const customer = await Customer.findById(req.user._id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const exists = customer.cart.some(
      (item) => item.product.toString() === productId
    );

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    customer.cart = customer.cart.filter(
      (item) => item.product.toString() !== productId
    );

    await customer.save();

    const updatedCustomer = await Customer.findById(req.user._id).populate({
      path: "cart.product",
      select: "name description price category image stock",
    });

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart: updatedCustomer.cart,
    });
  } catch (error) {
    console.error("Remove cart item error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove product",
    });
  }
};;
