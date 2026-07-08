import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export function getAllTickets() {
  return api.get("/tickets").then((res) => res.data);
}

export function getTicket(id) {
  return api.get(`/tickets/${id}`).then((res) => res.data);
}

export function createTicket(data) {
  return api.post("/tickets", data).then((res) => res.data);
}

export function updateTicket(id, data) {
  return api.put(`/tickets/${id}`, data).then((res) => res.data);
}

export function deleteTicket(id) {
  return api.delete(`/tickets/${id}`);
}

export function addComment(id, text, author = "Customer") {
  return api.post(`/tickets/${id}/comments`, { text, author }).then((res) => res.data);
}
