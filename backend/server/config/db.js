import mongoose from "mongoose";
import config from "./index.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("\nMongoDB connection failed:", error.message);
    console.error("\nMake sure your current IP is whitelisted in MongoDB Atlas:");
    console.error("  https://cloud.mongodb.com -> Network Access -> Add IP Address\n");
    process.exit(1);
  }
};

export default connectDB;