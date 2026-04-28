import * as mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await (mongoose as any).connect(process.env.MONGO_URL ?? "");
    console.log("DB Connected");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};
