import Ticket from "../models/Ticket.js";
import { suggestReply } from "../services/openrouter.js";

export async function suggestReplyHandler(req, res, next) {
  try {
    const { ticketId } = req.params;

    if (!["agent", "admin"].includes(req.user.role)) {
      return res.status(403).json({ error: "Only agents and admins can suggest AI replies" });
    }

    const ticket = await Ticket.findById(ticketId).populate("comments.author", "name");
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    const comments = (ticket.comments || []).map((c) => ({
      author: c.author?.name || "Unknown",
      text: c.text,
      createdAt: c.createdAt,
    }));

    const reply = await suggestReply(ticket.subject, ticket.description, comments);

    res.json({ reply });
  } catch (err) {
    next(err);
  }
}
