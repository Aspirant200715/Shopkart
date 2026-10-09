import Customer from "../models/customer.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const getAdminOverview = async (_req, res) => {
  try {
    const [products, customers, orders, revenue] = await Promise.all([
      Product.countDocuments(),
      Customer.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { paymentStatus: "PAID" } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
    ]);

    const recentOrders = await Order.find()
      .populate("user", "fullname email")
      .sort({ createdAt: -1 })
      .limit(8)
      .lean();

    return res.status(200).json({
      success: true,
      stats: {
        products,
        customers,
        orders,
        revenue: revenue[0]?.total || 0,
      },
      recentOrders,
    });
  } catch (error) {
    console.error("Admin overview error:", error);
    return res.status(500).json({ success: false, message: "Unable to load admin overview" });
  }
};

export const getAdminProducts = async (_req, res) => {
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return res.status(200).json({ success: true, products });
};

export const getAdminOrders = async (_req, res) => {
  const orders = await Order.find()
    .populate("user", "fullname email")
    .sort({ createdAt: -1 })
    .lean();
  return res.status(200).json({ success: true, orders });
};

export const updateAdminOrderStatus = async (req, res) => {
  const allowedTransitions = {
    PLACED: "CONFIRMED",
    CONFIRMED: "SHIPPED",
    SHIPPED: "DELIVERED",
  };
  const { status } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  if (allowedTransitions[order.orderStatus] !== status) {
    return res.status(400).json({
      success: false,
      message: `${order.orderStatus} can only become ${allowedTransitions[order.orderStatus] || "no later status"}`,
    });
  }

  order.orderStatus = status;
  await order.save();
  return res.status(200).json({ success: true, order });
};
