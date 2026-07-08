import TicketList from "../components/TicketList";

export default function MyTicketsPage({ tickets, onSelectTicket, loading, error }) {
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
        <h1 className="text-2xl font-bold text-text">My Tickets</h1>
        <p className="text-gray-500 mt-1">View all support tickets</p>
      </div>
      <TicketList tickets={tickets} onSelectTicket={onSelectTicket} />
    </main>
  );
}
