import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  getAllTickets,
  createTicket,
  addComment as addCommentApi,
  getTicketStats,
  updateTicket as updateTicketApi,
} from "../services/ticketService";
import { useAuth } from "./AuthContext";

const TicketContext = createContext(null);

export function TicketProvider({ children }) {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, resolved: 0 });
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ status: "", category: "" });

  const fetchStats = useCallback(async (signal) => {
    try {
      const data = await getTicketStats({ signal });
      setStats(data);
    } catch (err) {
      if (err.name !== "AbortError") setError(err.message);
    }
  }, []);

  const fetchTickets = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllTickets(filters, { signal });
      setTickets(data);
    } catch (err) {
      if (err.name !== "AbortError") setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (!user) return;
    const controller = new AbortController();
    fetchTickets(controller.signal);
    fetchStats(controller.signal);
    return () => controller.abort();
  }, [fetchTickets, fetchStats, user]);

  const handleSubmitTicket = useCallback(async ({ subject, description, category, priority }) => {
    const newTicket = await createTicket({ subject, description, category, priority });
    setTickets((prev) => [newTicket, ...prev]);
    fetchStats();
    return newTicket;
  }, [fetchStats]);

  const handleAddComment = useCallback(async (ticketId, text) => {
    const newComment = await addCommentApi(ticketId, text);
    setTickets((prev) =>
      prev.map((t) =>
        t._id === ticketId
          ? { ...t, comments: [...t.comments, newComment] }
          : t
      )
    );
    setSelectedTicket((prev) =>
      prev && prev._id === ticketId
        ? { ...prev, comments: [...prev.comments, newComment] }
        : prev
    );
    return newComment;
  }, []);

  const handleUpdateStatus = useCallback(async (ticketId, status) => {
    const updated = await updateTicketApi(ticketId, { status });
    setTickets((prev) =>
      prev.map((t) => (t._id === ticketId ? { ...t, ...updated } : t))
    );
    setSelectedTicket((prev) =>
      prev && prev._id === ticketId ? { ...prev, ...updated } : prev
    );
    fetchStats();
    return updated;
  }, [fetchStats]);

  const refetch = useCallback(() => {
    fetchTickets();
    fetchStats();
  }, [fetchTickets, fetchStats]);

  return (
    <TicketContext.Provider
      value={{
        tickets,
        stats,
        selectedTicket,
        setSelectedTicket,
        loading,
        error,
        filters,
        setFilters,
        handleSubmitTicket,
        handleAddComment,
        handleUpdateStatus,
        refetch,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const ctx = useContext(TicketContext);
  if (!ctx) throw new Error("useTickets must be used within TicketProvider");
  return ctx;
}
