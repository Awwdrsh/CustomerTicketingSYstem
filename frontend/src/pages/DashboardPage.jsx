import StatCard from "../components/StatCard";
import TicketList from "../components/TicketList";

export default function DashboardPage({ tickets, onSelectTicket, loading, error }) {
  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">Loading tickets...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          Failed to load tickets: {error}
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <p className="text-gray-500 mt-1">Track and manage support tickets</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Tickets" value={tickets.total} color="indigo" />
        <StatCard label="Open" value={tickets.open} color="red" />
        <StatCard label="In Progress" value={tickets.inProgress} color="amber" />
        <StatCard label="Resolved" value={tickets.resolved} color="green" />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-text mb-4">Recent Tickets</h2>
        <TicketList tickets={tickets.all} onSelectTicket={onSelectTicket} />
      </div>
    </main>
  );
}
