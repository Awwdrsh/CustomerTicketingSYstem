import Ticket from "../models/Ticket.js";

export async function getTickets(req, res) {
  const { status, category } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (category) filter.category = category;

  if (req.user.role === "customer") {
    filter.createdBy = req.user._id;
  } else if (req.user.role === "agent") {
    filter.$or = [{ assignedTo: req.user._id }, { createdBy: req.user._id }];
  }

  const tickets = await Ticket.find(filter)
    .sort({ createdAt: -1 })
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email")
    .lean();

  res.json(tickets);
}

export async function getTicket(req, res) {
  const ticket = await Ticket.findById(req.params.id)
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email")
    .lean();

  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  if (req.user.role === "customer" && ticket.createdBy?._id?.toString() !== req.user._id.toString())
    return res.status(403).json({ error: "Access denied" });

  if (req.user.role === "agent") {
    const uid = req.user._id.toString();
    const isAssigned = ticket.assignedTo?._id?.toString() === uid;
    const isCreator = ticket.createdBy?._id?.toString() === uid;
    if (!isAssigned && !isCreator)
      return res.status(403).json({ error: "Access denied" });
  }

  res.json(ticket);
}

export async function createTicket(req, res) {
  const { subject, description, category, priority } = req.body;
  const ticket = await Ticket.create({
    subject,
    description,
    category,
    priority,
    createdBy: req.user._id,
  });

  const populated = await Ticket.findById(ticket._id)
    .populate("createdBy", "name email")
    .lean();

  res.status(201).json(populated);
}

export async function updateTicket(req, res) {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  if (req.user.role === "customer")
    return res.status(403).json({ error: "Customers cannot update tickets" });

  const allowedFields = ["subject", "description", "category", "priority", "status"];
  const updates = {};

  if (req.user.role === "agent") {
    if (req.body.status) updates.status = req.body.status;
  } else if (req.user.role === "admin") {
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }
    if (req.body.assignedTo) updates.assignedTo = req.body.assignedTo;
  }

  const updated = await Ticket.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  })
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email")
    .lean();

  res.json(updated);
}

export async function deleteTicket(req, res) {
  const ticket = await Ticket.findByIdAndDelete(req.params.id);
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });
  res.status(204).end();
}

export async function addComment(req, res) {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  if (req.user.role === "customer") {
    const uid = req.user._id.toString();
    const isOwner = ticket.createdBy?.toString() === uid;
    if (!isOwner) return res.status(403).json({ error: "Access denied" });
  }

  const { text } = req.body;
  ticket.comments.push({
    text,
    author: req.user.name,
    user: req.user._id,
  });
  await ticket.save();

  const addedComment = ticket.comments[ticket.comments.length - 1];
  res.status(201).json(addedComment);
}

export async function getTicketStats(req, res) {
  const match = {};

  if (req.user.role === "customer") {
    match.createdBy = req.user._id;
  } else if (req.user.role === "agent") {
    match.$or = [{ assignedTo: req.user._id }, { createdBy: req.user._id }];
  }

  const stats = await Ticket.aggregate([
    { $match: match },
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
