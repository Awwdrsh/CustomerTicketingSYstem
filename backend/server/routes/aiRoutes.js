import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { suggestReplyHandler } from "../controllers/aiController.js";

const router = Router();

router.get("/suggest-reply/:ticketId", authenticate, suggestReplyHandler);

export default router;
