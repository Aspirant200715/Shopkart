import dotenv from "dotenv";
import mongoose from "mongoose";
import Customer from "../models/customer.model.js";

dotenv.config();

const argument = process.argv[2]?.trim();

if (argument === "--help" || argument === "-h") {
  console.log("Usage: npm run set-admin -- email@example.com");
  process.exit(0);
}

const email = argument?.toLowerCase();

if (!email) {
  console.error("Usage: node scripts/set-admin.js email@example.com");
  process.exit(1);
}

if (!process.env.dbUrl) {
  console.error("Missing dbUrl environment variable");
  process.exit(1);
}

try {
  await mongoose.connect(process.env.dbUrl);
  const customer = await Customer.findOneAndUpdate(
    { email },
    { role: "admin" },
    { returnDocument: "after" },
  );

  if (!customer) {
    console.error(`No customer found for ${email}`);
    process.exitCode = 1;
  } else {
    console.log(`${customer.email} is now an admin.`);
  }
} catch (error) {
  console.error("Unable to promote customer:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
