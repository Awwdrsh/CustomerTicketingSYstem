import mongoose from "mongoose";
import config from "../config/index.js";
import Ticket from "../models/Ticket.js";

const seedTickets = [
  {
    subject: "Unable to access dashboard after password reset",
    description:
      "I reset my password using the forgot password link, but now when I try to log in with my new password, I get redirected to a blank page. I have tried clearing my cache and using a different browser, but the issue persists.",
    category: "Account",
    priority: "High",
    status: "Open",
    comments: [
      {
        author: "Support Agent",
        text: "Could you please try logging in from an incognito window and let us know if the issue persists?",
      },
    ],
    createdAt: new Date("2026-06-20"),
  },
  {
    subject: "Payment not reflected in billing history",
    description:
      "I made a payment via credit card three days ago, but it is still not showing up in my billing history. The amount has been charged to my card.",
    category: "Billing",
    priority: "High",
    status: "In Progress",
    comments: [
      {
        author: "Support Agent",
        text: "We are looking into this. Could you share the transaction ID from your bank statement?",
      },
      {
        author: "Customer",
        text: "Sure, the transaction ID is TXN-987654321.",
      },
    ],
    createdAt: new Date("2026-06-21"),
  },
  {
    subject: "Feature request: Dark mode support",
    description:
      "It would be great if the application had a dark mode option. Many of us work late at night and a dark theme would reduce eye strain significantly.",
    category: "Feature Request",
    priority: "Low",
    status: "Open",
    comments: [],
    createdAt: new Date("2026-06-22"),
  },
  {
    subject: "Email notifications not being delivered",
    description:
      "I have stopped receiving email notifications for ticket updates and replies. I checked my spam folder but nothing is there. The notification settings in my profile are all enabled.",
    category: "Technical",
    priority: "Medium",
    status: "In Progress",
    comments: [
      {
        author: "Support Agent",
        text: "We have identified an issue with our email delivery service. Our team is working on a fix.",
      },
    ],
    createdAt: new Date("2026-06-23"),
  },
  {
    subject: "Login page crashes on Safari browser",
    description:
      "Whenever I try to log in using Safari on macOS, the page freezes and becomes unresponsive. It works fine on Chrome and Firefox.",
    category: "Bug Report",
    priority: "High",
    status: "Resolved",
    comments: [
      {
        author: "Support Agent",
        text: "This is a known issue with Safari 17. We have released a fix. Please clear your cache and try again.",
      },
      {
        author: "Customer",
        text: "Confirmed working now. Thank you!",
      },
    ],
    createdAt: new Date("2026-06-24"),
  },
];

async function seed() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("Connected to MongoDB");

    await Ticket.deleteMany({});
    console.log("Cleared existing tickets");

    await Ticket.insertMany(seedTickets);
    console.log(`Seeded ${seedTickets.length} tickets`);

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();
