import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDb;
