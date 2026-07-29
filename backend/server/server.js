import express from "express";
import cors from "cors";
import config from "./config/index.js";
import connectDB from "./config/db.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import { getConnectionStatus } from "./config/db.js";

const app = express();

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || config.corsOrigin.includes(origin)) cb(null, true);
    else cb(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", db: getConnectionStatus() ? "connected" : "disconnected" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

app.use(errorHandler);

await connectDB();

const server = app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

function shutdown(signal) {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
