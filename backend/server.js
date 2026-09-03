import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import customerRoutes from "./routes/customer.routes.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173","http://127.0.0.1:5174"],
  credentials: true,
}));

app.use("/customers", customerRoutes);

const port = process.env.PORT || 5050;

const env = process.env.dbUrl;

mongoose
  .connect(env)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, (req, res) => {
  console.log(`Server started on port ${port}`);
});
