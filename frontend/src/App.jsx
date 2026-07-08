import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TicketDetail from "./components/TicketDetail";
import DashboardPage from "./pages/DashboardPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import NewTicketPage from "./pages/NewTicketPage";
import {
  getAllTickets,
  createTicket,
  addComment as addCommentApi,
} from "./services/ticketService";

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, resolved: 0 });

  useEffect(() => {
    getAllTickets()
      .then(setTickets)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const total = tickets.length;
    const open = tickets.filter((t) => t.status === "Open").length;
    const inProgress = tickets.filter((t) => t.status === "In Progress").length;
    const resolved = tickets.filter((t) => t.status === "Resolved").length;
    setStats({ total, open, inProgress, resolved });
  }, [tickets]);

  const handleSubmitTicket = useCallback(async ({ subject, description, category, priority }) => {
    try {
      const newTicket = await createTicket({ subject, description, category, priority });
      setTickets((prev) => [newTicket, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const handleAddComment = useCallback(async (ticketId, text) => {
    try {
      const newComment = await addCommentApi(ticketId, text);
      setTickets((prev) =>
        prev.map((t) =>
          t.id === ticketId
            ? { ...t, comments: [...t.comments, newComment] }
            : t
        )
      );
      setSelectedTicket((prev) =>
        prev && prev.id === ticketId
          ? { ...prev, comments: [...prev.comments, newComment] }
          : prev
      );
    } catch (err) {
      setError(err.message);
    }
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
                loading={loading}
                error={error}
              />
            }
          />
          <Route
            path="/my-tickets"
            element={
              <MyTicketsPage
                tickets={tickets}
                onSelectTicket={setSelectedTicket}
                loading={loading}
                error={error}
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
