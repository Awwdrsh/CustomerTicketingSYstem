import mongoose from "mongoose";
import { CATEGORIES, PRIORITIES, STATUSES } from "../utils/constants.js";

const commentSchema = new mongoose.Schema(
  {
    author: { type: String, default: "Customer" },
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const ticketSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: CATEGORIES },
    priority: { type: String, required: true, enum: PRIORITIES },
    status: { type: String, enum: STATUSES, default: "Open" },
    comments: [commentSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

ticketSchema.index({ status: 1 });
ticketSchema.index({ category: 1 });
ticketSchema.index({ createdAt: -1 });
ticketSchema.index({ createdBy: 1 });
ticketSchema.index({ assignedTo: 1 });

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
