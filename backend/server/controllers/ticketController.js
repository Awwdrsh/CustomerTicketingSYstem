let tickets = [
  {
    id: 1,
    subject: "Unable to access dashboard after password reset",
    description:
      "I reset my password using the forgot password link, but now when I try to log in with my new password, I get redirected to a blank page. I have tried clearing my cache and using a different browser, but the issue persists.",
    category: "Account",
    priority: "High",
    status: "Open",
    comments: [
      {
        id: 101,
        author: "Support Agent",
        text: "Could you please try logging in from an incognito window and let us know if the issue persists?",
        createdAt: "2026-06-20T10:30:00Z",
      },
    ],
    createdAt: "2026-06-20",
  },
  {
    id: 2,
    subject: "Payment not reflected in billing history",
    description:
      "I made a payment via credit card three days ago, but it is still not showing up in my billing history. The amount has been charged to my card.",
    category: "Billing",
    priority: "High",
    status: "In Progress",
    comments: [
      {
        id: 102,
        author: "Support Agent",
        text: "We are looking into this. Could you share the transaction ID from your bank statement?",
        createdAt: "2026-06-22T09:15:00Z",
      },
      {
        id: 103,
        author: "Customer",
        text: "Sure, the transaction ID is TXN-987654321.",
        createdAt: "2026-06-22T14:20:00Z",
      },
    ],
    createdAt: "2026-06-21",
  },
  {
    id: 3,
    subject: "Feature request: Dark mode support",
    description:
      "It would be great if the application had a dark mode option. Many of us work late at night and a dark theme would reduce eye strain significantly.",
    category: "Feature Request",
    priority: "Low",
    status: "Open",
    comments: [],
    createdAt: "2026-06-22",
  },
  {
    id: 4,
    subject: "Email notifications not being delivered",
    description:
      "I have stopped receiving email notifications for ticket updates and replies. I checked my spam folder but nothing is there. The notification settings in my profile are all enabled.",
    category: "Technical",
    priority: "Medium",
    status: "In Progress",
    comments: [
      {
        id: 104,
        author: "Support Agent",
        text: "We have identified an issue with our email delivery service. Our team is working on a fix.",
        createdAt: "2026-06-24T11:00:00Z",
      },
    ],
    createdAt: "2026-06-23",
  },
  {
    id: 5,
    subject: "Login page crashes on Safari browser",
    description:
      "Whenever I try to log in using Safari on macOS, the page freezes and becomes unresponsive. It works fine on Chrome and Firefox.",
    category: "Bug Report",
    priority: "High",
    status: "Resolved",
    comments: [
      {
        id: 105,
        author: "Support Agent",
        text: "This is a known issue with Safari 17. We have released a fix. Please clear your cache and try again.",
        createdAt: "2026-06-25T08:45:00Z",
      },
      {
        id: 106,
        author: "Customer",
        text: "Confirmed working now. Thank you!",
        createdAt: "2026-06-25T16:30:00Z",
      },
    ],
    createdAt: "2026-06-24",
  },
];

let nextId = 6;
let nextCommentId = 107;

export function getTickets(_req, res) {
  res.json(tickets);
}

export function getTicket(req, res) {
  const ticket = tickets.find((t) => t.id === parseInt(req.params.id, 10));
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });
  res.json(ticket);
}

export function createTicket(req, res) {
  const { subject, description, category, priority } = req.body;

  if (!subject || !description || !category || !priority) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const ticket = {
    id: nextId++,
    subject,
    description,
    category,
    priority,
    status: "Open",
    comments: [],
    createdAt: new Date().toISOString().split("T")[0],
  };

  tickets.unshift(ticket);
  res.status(201).json(ticket);
}

export function updateTicket(req, res) {
  const index = tickets.findIndex((t) => t.id === parseInt(req.params.id, 10));
  if (index === -1) return res.status(404).json({ error: "Ticket not found" });

  const { subject, description, category, priority, status } = req.body;
  tickets[index] = {
    ...tickets[index],
    ...(subject !== undefined && { subject }),
    ...(description !== undefined && { description }),
    ...(category !== undefined && { category }),
    ...(priority !== undefined && { priority }),
    ...(status !== undefined && { status }),
  };

  res.json(tickets[index]);
}

export function deleteTicket(req, res) {
  const index = tickets.findIndex((t) => t.id === parseInt(req.params.id, 10));
  if (index === -1) return res.status(404).json({ error: "Ticket not found" });

  tickets.splice(index, 1);
  res.status(204).end();
}

export function addComment(req, res) {
  const ticket = tickets.find((t) => t.id === parseInt(req.params.id, 10));
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  const { text, author } = req.body;
  if (!text) return res.status(400).json({ error: "Comment text is required" });

  const comment = {
    id: nextCommentId++,
    author: author || "Customer",
    text,
    createdAt: new Date().toISOString(),
  };

  ticket.comments.push(comment);
  res.status(201).json(comment);
}
