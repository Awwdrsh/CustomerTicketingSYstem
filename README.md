# HelpDeskLite

An AI-powered customer support ticketing system built with the MERN stack.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, Tailwind CSS 4, Axios, React Router DOM |
| Backend | Node.js, Express 5, Mongoose 9 |
| Database | MongoDB Atlas |
| Auth | JWT + bcrypt |
| CI/CD | GitHub Actions |

## Prerequisites

- Node.js >= 18
- MongoDB Atlas cluster (free tier works)
- A terminal (bash/zsh)

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd MERN

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 2. Configure environment

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your MongoDB Atlas connection string:

```
PORT=5001
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<dbname>?appName=<appname>
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
```

> **Important:** Add your current IP to the MongoDB Atlas IP whitelist:
> https://cloud.mongodb.com → Network Access → Add IP Address

### 3. Seed the database

```bash
cd backend
npm run seed
```

This creates 3 users and 5 sample tickets:

| Role | Email | Password |
|------|-------|----------|
| Customer | alice@example.com | password123 |
| Agent | bob@example.com | password123 |
| Admin | carol@example.com | password123 |

### 4. Start the app

Terminal 1 — Backend:
```bash
cd backend && npm run dev
```

Terminal 2 — Frontend:
```bash
cd frontend && npm run dev
```

Open http://localhost:5173

## App Features

### By Role

| Feature | Customer | Agent | Admin |
|---------|----------|-------|-------|
| Register / Login | ✅ | ✅ | ✅ |
| Create tickets | ✅ | ✅ | ✅ |
| View own tickets | ✅ | — | — |
| View assigned tickets | — | ✅ | ✅ |
| Add comments | ✅ (own tickets) | ✅ (assigned) | ✅ (all) |
| Resolve tickets | — | ✅ | ✅ |
| Dashboard stats | ✅ (own) | ✅ (assigned) | ✅ (all) |
| Assign agents | — | — | ✅ |
| Delete tickets | — | — | ✅ |

### Pages

- **Dashboard** — Stats grid (total/open/in-progress/resolved) + ticket list with filters
- **My Tickets** — All accessible tickets
- **New Ticket** — Create a support ticket (subject, description, category, priority)
- **Login / Register** — Auth pages
- **Ticket Detail** — Modal with full description, comments, and comment form

## API Endpoints

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/api/health` | — | — | Health check |
| POST | `/api/auth/register` | — | — | Register |
| POST | `/api/auth/login` | — | — | Login |
| GET | `/api/auth/me` | ✅ | — | Current user |
| GET | `/api/tickets` | ✅ | * | List tickets (role-filtered) |
| GET | `/api/tickets/stats` | ✅ | * | Dashboard stats |
| GET | `/api/tickets/:id` | ✅ | * | Single ticket |
| POST | `/api/tickets` | ✅ | * | Create ticket |
| PUT | `/api/tickets/:id` | ✅ | agent,admin | Update ticket |
| POST | `/api/tickets/:id/comments` | ✅ | * | Add comment |
| DELETE | `/api/tickets/:id` | ✅ | admin | Delete ticket |

> `*` = Role-filtered: customers see own, agents see assigned/own, admins see all

## Project Structure

```
MERN/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # AuthContext, TicketContext
│   │   ├── pages/           # Dashboard, MyTickets, NewTicket, Login, Register
│   │   ├── services/        # API clients (api, auth, ticket)
│   │   ├── layouts/         # App layout wrapper
│   │   └── utils/           # Constants
│   ├── netlify.toml         # Netlify deployment config
│   └── vite.config.js
├── backend/
│   ├── server/
│   │   ├── config/          # DB connection, env config
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Auth, error handling
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express routers
│   │   ├── validators/      # express-validator rules
│   │   └── utils/           # Constants, seed script
│   └── .env.example
└── .github/workflows/       # CI pipeline
```

## Deployment

### Backend — Render

1. Connect your GitHub repo to Render
2. Set as a **Web Service**
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CORS_ORIGIN` (your Netlify URL)

### Frontend — Netlify

1. Connect your GitHub repo to Netlify
2. Base directory: `frontend`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable:
   - `VITE_API_URL` (your Render backend URL, e.g. `https://your-app.onrender.com/api`)

The `netlify.toml` and `public/_redirects` handle SPA routing automatically.

## Development

### Backend scripts
```bash
npm run dev     # Start with nodemon (hot reload)
npm start       # Production start
npm run seed    # Seed database with sample data
```

### Frontend scripts
```bash
npm run dev      # Vite dev server (port 5173)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run oxlint
```

### Vite proxy

In development, the Vite dev server proxies `/api` requests to `http://localhost:5001` so the frontend works without CORS issues.

## Week Progress

| Week | Goal | Status |
|------|------|--------|
| 1 | Static ticket dashboard UI | ✅ |
| 2 | State-managed tickets | ✅ |
| 3 | REST API | ✅ |
| 4 | MongoDB Atlas persistence | ✅ |
| 5 | Authentication & Authorization | ✅ |
| 6 | Deployment & CI/CD | ✅ |
| 7 | AI-powered reply generator (OpenRouter) | ✅ |
