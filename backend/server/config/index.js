import "dotenv/config";

const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
const allowedOrigins = corsOrigin.split(",").map((s) => s.trim());

const config = {
  port: parseInt(process.env.PORT, 10) || 5001,
  corsOrigin: allowedOrigins,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || "dev-secret-change-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  geminiApiKey: process.env.GEMINI_API_KEY,
};

export default config;
