import jwt from "jsonwebtoken";
import Customer from "../models/customer.model.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    const decoded = jwt.verify(
      token,
      process.env.jwt_secret || process.env.JWT_SECRET,
    );
    const customer = await Customer.findById(decoded.customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    console.log(decoded);

    req.user = customer;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Token invalid" });
  }
};

export default isAuthenticated;
