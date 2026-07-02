import { Router } from "express";
import {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  addComment,
} from "../controllers/ticketController.js";

const router = Router();

router.get("/", getTickets);
router.get("/:id", getTicket);
router.post("/", createTicket);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);
router.post("/:id/comments", addComment);

export default router;
