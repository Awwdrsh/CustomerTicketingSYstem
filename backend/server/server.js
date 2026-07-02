import express from "express";
import cors from "cors";
import config from "./config/index.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

app.use("/api/tickets", ticketRoutes);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
