import mongoose from "mongoose";
import config from "../config/index.js";
import Ticket from "../models/Ticket.js";
import User from "../models/User.js";

const users = [
  { name: "Alice Customer", email: "alice@example.com", password: "password123", role: "customer" },
  { name: "Bob Agent", email: "bob@example.com", password: "password123", role: "agent" },
  { name: "Carol Admin", email: "carol@example.com", password: "password123", role: "admin" },
];

const seedTickets = [
  {
    subject: "Unable to access dashboard after password reset",
    description: "I reset my password using the forgot password link, but now when I try to log in with my new password, I get redirected to a blank page.",
    category: "Account",
    priority: "High",
    status: "Open",
    comments: [
      { author: "Support Agent", text: "Could you please try logging in from an incognito window?" },
    ],
    createdAt: new Date("2026-06-20"),
    owner: "customer",
  },
  {
    subject: "Payment not reflected in billing history",
    description: "I made a payment via credit card three days ago, but it is still not showing up in my billing history.",
    category: "Billing",
    priority: "High",
    status: "In Progress",
    comments: [
      { author: "Support Agent", text: "We are looking into this. Could you share the transaction ID?" },
      { author: "Customer", text: "Sure, the transaction ID is TXN-987654321." },
    ],
    createdAt: new Date("2026-06-21"),
    owner: "customer",
  },
  {
    subject: "Feature request: Dark mode support",
    description: "It would be great if the application had a dark mode option to reduce eye strain.",
    category: "Feature Request",
    priority: "Low",
    status: "Open",
    comments: [],
    createdAt: new Date("2026-06-22"),
    owner: "customer",
  },
  {
    subject: "Email notifications not being delivered",
    description: "I have stopped receiving email notifications for ticket updates and replies.",
    category: "Technical",
    priority: "Medium",
    status: "In Progress",
    comments: [
      { author: "Support Agent", text: "We have identified an issue with our email delivery service." },
    ],
    createdAt: new Date("2026-06-23"),
    owner: "agent",
  },
  {
    subject: "Login page crashes on Safari browser",
    description: "Whenever I try to log in using Safari on macOS, the page freezes.",
    category: "Bug Report",
    priority: "High",
    status: "Resolved",
    comments: [
      { author: "Support Agent", text: "This is a known issue with Safari 17. We have released a fix." },
      { author: "Customer", text: "Confirmed working now. Thank you!" },
    ],
    createdAt: new Date("2026-06-24"),
    owner: "agent",
  },
];

async function seed() {
  try {
    await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected to MongoDB\n");

    await User.deleteMany({});
    await Ticket.deleteMany({});
    console.log("Cleared existing data\n");

    const createdUsers = await User.create(users);
    const customer = createdUsers.find((u) => u.role === "customer");
    const agent = createdUsers.find((u) => u.role === "agent");
    const admin = createdUsers.find((u) => u.role === "admin");

    console.log("=== Users Created ===");
    for (const u of createdUsers) {
      console.log(`  ${u.role.padEnd(10)} ${u.email.padEnd(30)} ${u.name}`);
    }

    const ticketsWithUsers = seedTickets.map((t) => ({
      subject: t.subject,
      description: t.description,
      category: t.category,
      priority: t.priority,
      status: t.status,
      comments: t.comments,
      createdAt: t.createdAt,
      createdBy: t.owner === "customer" ? customer._id : agent._id,
      assignedTo: agent._id,
    }));

    await Ticket.insertMany(ticketsWithUsers);

    console.log("\n=== Tickets Created ===");
    for (let i = 0; i < seedTickets.length; i++) {
      const t = seedTickets[i];
      const owner = t.owner === "customer" ? customer : agent;
      console.log(`  ${(i + 1) + "."} ${t.subject.slice(0, 50).padEnd(52)} [${t.status.padEnd(12)}] created by ${owner.name}`);
    }

    console.log("\n========================================");
    console.log("        LOGIN CREDENTIALS");
    console.log("========================================");
    console.log(`  ${"CUSTOMER".padEnd(12)} alice@example.com    / password123`);
    console.log(`  ${"AGENT".padEnd(12)} bob@example.com       / password123`);
    console.log(`  ${"ADMIN".padEnd(12)} carol@example.com     / password123`);
    console.log("========================================\n");

    process.exit(0);
  } catch (error) {
    console.error("\nSeed failed:", error.message);
    process.exit(1);
  }
}

seed();
