import StatCard from "../components/StatCard";
import TicketList from "../components/TicketList";
import FilterBar from "../components/FilterBar";
import { LoadingState, ErrorState } from "../components/FeedbackStates";
import { useTickets } from "../context/TicketContext";

export default function DashboardPage() {
  const { tickets, stats, setSelectedTicket, loading, error, filters, setFilters, refetch } = useTickets();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Track and manage support tickets</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard label="Total" value={stats.total} color="violet" />
        <StatCard label="Open" value={stats.open} color="red" />
        <StatCard label="In Progress" value={stats.inProgress} color="amber" />
        <StatCard label="Resolved" value={stats.resolved} color="emerald" />
      </div>

      <FilterBar filters={filters} onFilterChange={setFilters} />

      <div>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Recent Tickets</h2>
        <TicketList tickets={tickets} onSelectTicket={setSelectedTicket} />
      </div>
    </div>
  );
}
