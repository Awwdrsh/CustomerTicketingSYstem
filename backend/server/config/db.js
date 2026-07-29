import mongoose from "mongoose";
import config from "./index.js";

let isConnected = false;

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("\nMongoDB connection failed:", error.message);
    console.error("Make sure your current IP is whitelisted in MongoDB Atlas:");
    console.error("  https://cloud.mongodb.com -> Network Access -> Add IP Address\n");
    console.error("Server will start but database operations will fail.\n");
  }
};

export function getConnectionStatus() {
  return isConnected;
}

export default connectDB;
