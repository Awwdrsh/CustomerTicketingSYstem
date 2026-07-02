import "dotenv/config";

const config = {
  port: parseInt(process.env.PORT, 10) || 5001,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
};

export default config;
