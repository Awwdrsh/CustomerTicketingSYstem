# AGENTS.md

## Project Name

HelpDeskLite - AI Powered Customer Support Ticketing System

## Project Overview

HelpDeskLite is a full-stack MERN application that allows customers to create support tickets, support agents to respond and resolve issues, and administrators to monitor ticket activity and performance.

The system will be developed incrementally over 7 weeks.

---

# Technology Stack

Frontend:

* React
* Vite
* Tailwind CSS
* Axios
* React Router DOM

Backend:

* Node.js
* Express.js

Database:

* MongoDB Atlas
* Mongoose

Authentication:

* JWT
* bcrypt

AI Integration:

* Google Gemini API

Deployment:

* Render (Backend)
* Netlify (Frontend)
* GitHub Actions (CI/CD)

---

# Development Rules

## Code Quality

* Use functional React components only.
* Use React Hooks.
* Follow clean architecture principles.
* Separate UI, business logic and API calls.
* Use reusable components whenever possible.
* Use async/await instead of promise chains.
* Use ES6+ syntax.
* Include comments for complex logic.

---

## Folder Structure

frontend/

src/
├── components/
├── pages/
├── layouts/
├── services/
├── hooks/
├── context/
├── data/
├── utils/
├── App.jsx
└── main.jsx

backend/

server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
└── server.js

---

# Week 1 Requirements

Goal:
Create static UI for ticket management.

Tasks:

1. Setup React + Vite.
2. Configure Tailwind CSS.
3. Create Navbar.

Navbar Links:

* Dashboard
* My Tickets
* New Ticket

4. Create TicketCard component.

Display:

* Subject
* Category
* Priority Badge
* Status Badge
* Created Date

Priority Colors:

* High → Red
* Medium → Orange
* Low → Gray

Status Colors:

* Open → Blue
* In Progress → Amber
* Resolved → Green

5. Create TicketList component.

Requirements:

* Render 5 hardcoded tickets.
* Use Array.map().
* Responsive design.

Deliverable:
Static ticket dashboard UI.

---

# Week 2 Requirements

Goal:
Manage tickets entirely using React state.

Tasks:

1. Store tickets using useState.
2. Create NewTicketForm.

Fields:

* Subject
* Description
* Category
* Priority

3. Add new ticket to state.

Defaults:

* Status = Open
* Empty comments array

4. Expand ticket details.

Display:

* Full description
* Existing comments

5. Add comment functionality.

6. Use useEffect to calculate:

* Total Tickets
* Open Tickets
* In Progress Tickets
* Resolved Tickets

Deliverable:
Users can create, view and comment on tickets locally.

---

# Week 3 Requirements

Goal:
Create REST API.

Endpoints:

GET /api/tickets

POST /api/tickets

PUT /api/tickets/:id

POST /api/tickets/:id/comments

DELETE /api/tickets/:id

Requirements:

* Express server
* CORS enabled
* Environment variables
* Postman tested

Deliverable:
Functional ticket API.

---

# Week 4 Requirements

Goal:
Connect MongoDB Atlas.

Ticket Schema:

{
subject: String,
description: String,
category: String,
priority: String,
status: String,
comments: [],
createdAt: Date
}

Tasks:

1. Configure MongoDB Atlas.
2. Create Mongoose model.
3. Connect API to database.
4. Replace hardcoded data.
5. Implement dashboard statistics endpoint.

GET /api/tickets/stats

Response:

{
total: Number,
open: Number,
inProgress: Number,
resolved: Number
}

6. Add filters:

* Status
* Category

Deliverable:
Persistent ticket storage.

---

# Week 5 Requirements

Goal:
Authentication and Authorization.

User Schema:

{
name: String,
email: String,
password: String,
role: String
}

Roles:

* customer
* agent
* admin

Tasks:

1. Register API.
2. Login API.
3. Password hashing using bcrypt.
4. JWT token generation.
5. Auth middleware.
6. Protected routes.

Permissions:

Customer:

* Create ticket
* View own tickets

Agent:

* View assigned tickets
* Comment
* Resolve tickets

Admin:

* Full access
* Assign agents

Deliverable:
Role-based ticket system.

---

# Week 6 Requirements

Goal:
Deployment and CI/CD.

Environment Variables:

Backend:

MONGO_URI=
JWT_SECRET=
GEMINI_API_KEY=

Frontend:

VITE_API_URL=

Tasks:

1. Deploy backend to Render.
2. Deploy frontend to Netlify.
3. Configure CORS.
4. Configure SPA redirects.
5. Create GitHub Actions workflow.

Pipeline:

* Install dependencies
* Run build
* Verify success

Deliverable:
Live production application.

---

# Week 7 Requirements

Goal:
AI Powered Support Reply Generator.

Endpoint:

POST /api/ai/suggest-reply

Input:

{
ticketDescription: String
}

Prompt:

"You are a professional customer support agent. Analyze the customer issue and generate a helpful, polite and concise response."

Tasks:

1. Integrate Gemini API.
2. Generate AI reply draft.
3. Add loading state.
4. Allow agent editing.
5. Submit AI draft as comment.

Deliverable:
AI-assisted support workflow.

---

# Final Features

Customer Features:

* Register
* Login
* Create Tickets
* View Ticket Status
* Add Comments

Agent Features:

* Assigned Tickets
* AI Suggested Replies
* Resolve Tickets

Admin Features:

* Dashboard
* Ticket Analytics
* User Management
* Agent Assignment

---

# UI Requirements

Design Style:

* Modern SaaS Dashboard
* Responsive
* Mobile Friendly

Color Theme:

Primary:

* Indigo

Success:

* Green

Warning:

* Amber

Danger:

* Red

Cards:

* Rounded corners
* Soft shadows

Tables:

* Responsive
* Searchable

Forms:

* Validation
* Error Messages

---

# Git Workflow

main
└── dev
├── feature/frontend
├── feature/backend
├── feature/auth
├── feature/ai

Rules:

* Commit after every feature.
* Use meaningful commit messages.
* Merge feature branches into dev.
* Merge dev into main after testing.

Example:

git checkout -b feature/ticket-form

git commit -m "Add ticket submission form"

git push origin feature/ticket-form

---

# Success Criteria

A deployed production-ready customer support ticketing platform with:

✓ Authentication

✓ Role-based access

✓ MongoDB persistence

✓ Ticket lifecycle management

✓ Comment system

✓ Dashboard analytics

✓ AI-generated support replies

✓ CI/CD pipeline

✓ Responsive UI

✓ Public deployment
