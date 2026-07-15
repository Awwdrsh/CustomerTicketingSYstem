import { Router } from "express";
import {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  addComment,
  getTicketStats,
} from "../controllers/ticketController.js";
import {
  ticketValidationRules,
  commentValidationRules,
  updateTicketValidationRules,
  validate,
} from "../validators/ticketValidators.js";

const router = Router();

router.get("/stats", getTicketStats);
router.get("/", getTickets);
router.get("/:id", getTicket);
router.post("/", ticketValidationRules, validate, createTicket);
router.put("/:id", updateTicketValidationRules, validate, updateTicket);
router.delete("/:id", deleteTicket);
router.post("/:id/comments", commentValidationRules, validate, addComment);

export default router;
