import api from "./api";

export function getAllTickets(filters = {}, { signal } = {}) {
  const params = {};
  if (filters.status) params.status = filters.status;
  if (filters.category) params.category = filters.category;
  return api.get("/tickets", { params, signal }).then((res) => res.data);
}

export function getTicket(id, { signal } = {}) {
  return api.get(`/tickets/${id}`, { signal }).then((res) => res.data);
}

export function createTicket(data, { signal } = {}) {
  return api.post("/tickets", data, { signal }).then((res) => res.data);
}

export function updateTicket(id, data, { signal } = {}) {
  return api.put(`/tickets/${id}`, data, { signal }).then((res) => res.data);
}

export function deleteTicket(id, { signal } = {}) {
  return api.delete(`/tickets/${id}`, { signal });
}

export function addComment(id, text, { signal } = {}) {
  return api.post(`/tickets/${id}/comments`, { text }, { signal }).then((res) => res.data);
}

export function getTicketStats({ signal } = {}) {
  return api.get("/tickets/stats", { signal }).then((res) => res.data);
}
