import TicketList from "../components/TicketList";
import { LoadingState, ErrorState } from "../components/FeedbackStates";
import { useTickets } from "../context/TicketContext";

export default function MyTicketsPage() {
  const { tickets, setSelectedTicket, loading, error, refetch } = useTickets();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Tickets</h1>
        <p className="text-sm text-slate-500 mt-1">View all support tickets</p>
      </div>
      <TicketList tickets={tickets} onSelectTicket={setSelectedTicket} />
    </div>
  );
}
