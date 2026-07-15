import { PRIORITY_COLORS, STATUS_COLORS } from "../utils/constants";

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function TicketCard({ ticket, onClick, compact = false }) {
  const priority = PRIORITY_COLORS[ticket.priority] || PRIORITY_COLORS.Low;
  const status = STATUS_COLORS[ticket.status] || STATUS_COLORS.Open;

  return (
    <button
      type="button"
      onClick={() => onClick?.(ticket)}
      className="w-full text-left bg-white rounded-2xl border border-slate-100 p-5 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-300"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-sm font-semibold text-slate-900 leading-snug group-hover:text-violet-700 transition-colors line-clamp-2">
          {ticket.subject}
        </h3>
        <span className={`shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[11px] font-semibold tracking-wide ${priority.bg} ${priority.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
          {ticket.priority}
        </span>
      </div>

      {!compact && ticket.description && (
        <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">{ticket.description}</p>
      )}

      <div className="flex items-center gap-2">
        <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md">
          {ticket.category}
        </span>
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[11px] font-semibold tracking-wide ${status.bg} ${status.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {ticket.status}
        </span>
        <span className="text-[11px] text-slate-400 ml-auto tabular-nums">
          {timeAgo(ticket.createdAt)}
        </span>
      </div>
    </button>
  );
}
