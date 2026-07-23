import "dotenv/config";

const config = {
  port: parseInt(process.env.PORT, 10) || 5001,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || "dev-secret-change-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};

export default config;
