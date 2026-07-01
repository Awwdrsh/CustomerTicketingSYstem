import TicketCard from "./TicketCard";

export default function TicketList({ tickets, onSelectTicket }) {
  if (tickets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-sm">No tickets found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} onClick={onSelectTicket} />
      ))}
    </div>
  );
}
