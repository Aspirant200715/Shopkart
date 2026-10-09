import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/product.model.js";

dotenv.config();

const products = [
  {
    name: "Aura Lounge Chair",
    description: "A sculptural lounge chair with generous comfort and a warm, modern profile.",
    price: 289,
    category: "Home",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85",
    stock: 12,
  },
  {
    name: "Linen Desk Set",
    description: "A calm, practical desk setup for focused work and everyday planning.",
    price: 149,
    category: "Workspace",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85",
    stock: 18,
  },
  {
    name: "Teal Carryall Bag",
    description: "A structured everyday bag with a polished finish and room for the essentials.",
    price: 119,
    category: "Style",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85",
    stock: 9,
  },
  {
    name: "Minimal Watch",
    description: "A clean, understated watch designed to complement every daily look.",
    price: 179,
    category: "Style",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    stock: 15,
  },
  {
    name: "Ceramic Table Lamp",
    description: "Soft ambient lighting with a simple ceramic form for quiet corners.",
    price: 89,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
    stock: 10,
  },
  {
    name: "Everyday Sneakers",
    description: "Lightweight everyday sneakers with a clean silhouette and cushioned sole.",
    price: 129,
    category: "Style",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    stock: 20,
  },
  {
    name: "Graphic Tablet",
    description: "Best quality drawing tablet for creative work and digital study.",
    price: 29009,
    category: "Education",
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=900&q=85",
    stock: 14,
  },
  {
    name: "Pen",
    description: "A smooth everyday pen for notes, planning, and focused work.",
    price: 129,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=85",
    stock: 295,
  },
  {
    name: "Mouse",
    description: "A comfortable wireless mouse for a clean and productive desk.",
    price: 1299,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85",
    stock: 30,
  },
  {
    name: "Mechanical Keyboard",
    description: "A tactile mechanical keyboard with a satisfying, responsive feel.",
    price: 2999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85",
    stock: 6,
  },
];

if (!process.env.dbUrl) {
  console.error("Missing dbUrl environment variable");
  process.exitCode = 1;
} else {
  try {
    await mongoose.connect(process.env.dbUrl);

    for (const product of products) {
      await Product.updateMany(
        { name: product.name },
        { $set: product },
        { upsert: true, runValidators: true },
      );
    }

    console.log(`Seeded ${products.length} products.`);
  } catch (error) {
    console.error("Unable to seed products:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}
