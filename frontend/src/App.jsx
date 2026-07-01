import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TicketDetail from "./components/TicketDetail";
import DashboardPage from "./pages/DashboardPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import NewTicketPage from "./pages/NewTicketPage";
import initialTickets from "./data/tickets";

let nextId = initialTickets.length + 1;
let nextCommentId = 200;

export default function App() {
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, resolved: 0 });

  useEffect(() => {
    const total = tickets.length;
    const open = tickets.filter((t) => t.status === "Open").length;
    const inProgress = tickets.filter((t) => t.status === "In Progress").length;
    const resolved = tickets.filter((t) => t.status === "Resolved").length;
    setStats({ total, open, inProgress, resolved });
  }, [tickets]);

  const handleSubmitTicket = useCallback(({ subject, description, category, priority }) => {
    const newTicket = {
      id: nextId++,
      subject,
      description,
      category,
      priority,
      status: "Open",
      comments: [],
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTickets((prev) => [newTicket, ...prev]);
  }, []);

  const handleAddComment = useCallback((ticketId, text) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              comments: [
                ...t.comments,
                {
                  id: nextCommentId++,
                  author: "Customer",
                  text,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : t
      )
    );
    setSelectedTicket((prev) =>
      prev && prev.id === ticketId
        ? {
            ...prev,
            comments: [
              ...prev.comments,
              {
                id: nextCommentId - 1,
                author: "Customer",
                text,
                createdAt: new Date().toISOString(),
              },
            ],
          }
        : prev
    );
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage
                tickets={{ ...stats, all: tickets }}
                onSelectTicket={setSelectedTicket}
              />
            }
          />
          <Route
            path="/my-tickets"
            element={
              <MyTicketsPage
                tickets={tickets}
                onSelectTicket={setSelectedTicket}
              />
            }
          />
          <Route
            path="/new-ticket"
            element={<NewTicketPage onSubmitTicket={handleSubmitTicket} />}
          />
        </Routes>
        {selectedTicket && (
          <TicketDetail
            ticket={selectedTicket}
            onAddComment={handleAddComment}
            onClose={() => setSelectedTicket(null)}
          />
        )}
      </div>
    </BrowserRouter>
  );
}
