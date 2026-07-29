import { Link } from "react-router-dom";
import TicketCard from "./TicketCard";

export default function TicketList({ tickets, onSelectTicket }) {
  if (tickets.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">No tickets found</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">Create your first support ticket to get started</p>
        <Link
          to="/new-ticket"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-violet-600 text-white text-xs font-medium rounded-xl hover:bg-violet-700 transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Ticket
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {tickets.map((ticket) => (
        <TicketCard key={ticket._id} ticket={ticket} onClick={onSelectTicket} />
      ))}
    </div>
  );
}
