import Ticket from "../models/Ticket.js";

export async function getTickets(req, res) {
  const { status, category } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (category) filter.category = category;

  const tickets = await Ticket.find(filter).sort({ createdAt: -1 }).lean();
  res.json(tickets);
}

export async function getTicket(req, res) {
  const ticket = await Ticket.findById(req.params.id).lean();
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });
  res.json(ticket);
}

export async function createTicket(req, res) {
  const { subject, description, category, priority } = req.body;
  const ticket = await Ticket.create({ subject, description, category, priority });
  res.status(201).json(ticket);
}

export async function updateTicket(req, res) {
  const allowedFields = ["subject", "description", "category", "priority", "status"];
  const updates = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  }

  const ticket = await Ticket.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });
  res.json(ticket);
}

export async function deleteTicket(req, res) {
  const ticket = await Ticket.findByIdAndDelete(req.params.id);
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });
  res.status(204).end();
}

export async function addComment(req, res) {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  const { text, author } = req.body;
  ticket.comments.push({ author, text });
  await ticket.save();

  const addedComment = ticket.comments[ticket.comments.length - 1];
  res.status(201).json(addedComment);
}

export async function getTicketStats(_req, res) {
  const stats = await Ticket.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const result = { total: 0, open: 0, inProgress: 0, resolved: 0 };

  for (const s of stats) {
    result.total += s.count;
    if (s._id === "Open") result.open = s.count;
    if (s._id === "In Progress") result.inProgress = s.count;
    if (s._id === "Resolved") result.resolved = s.count;
  }

  res.json(result);
}
