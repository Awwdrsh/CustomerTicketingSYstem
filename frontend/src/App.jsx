import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TicketList from "./components/TicketList";
import tickets from "./data/tickets";

function Dashboard() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <p className="text-gray-500 mt-1">Track and manage support tickets</p>
      </div>
      <TicketList tickets={tickets} />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/my-tickets" element={<Dashboard />} />
          <Route path="/new-ticket" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
