const priorityConfig = {
  High: { bg: "bg-red-100", text: "text-red-700", dot: "bg-danger" },
  Medium: { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-warning" },
  Low: { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" },
};

const statusConfig = {
  Open: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  "In Progress": { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-warning" },
  Resolved: { bg: "bg-green-100", text: "text-green-700", dot: "bg-success" },
};

export default function TicketCard({ ticket, onClick }) {
  const priority = priorityConfig[ticket.priority] || priorityConfig.Low;
  const status = statusConfig[ticket.status] || statusConfig.Open;

  return (
    <div
      onClick={() => onClick?.(ticket)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-semibold text-text leading-snug">
          {ticket.subject}
        </h3>
        <span className={`ml-3 shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${priority.bg} ${priority.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
          {ticket.priority}
        </span>
      </div>
      {ticket.description && (
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{ticket.description}</p>
      )}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md">
          {ticket.category}
        </span>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {ticket.status}
        </span>
        <span className="text-xs text-gray-400 ml-auto">
          {new Date(ticket.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}
