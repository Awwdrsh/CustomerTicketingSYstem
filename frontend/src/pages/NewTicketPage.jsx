import { useNavigate } from "react-router-dom";
import NewTicketForm from "../components/NewTicketForm";
import { useTickets } from "../context/TicketContext";

export default function NewTicketPage() {
  const { handleSubmitTicket } = useTickets();
  const navigate = useNavigate();

  async function handleCreate(data) {
    await handleSubmitTicket(data);
    navigate("/");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">New Ticket</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Submit a new support request</p>
      </div>
      <div className="bg-surface dark:bg-slate-800/50 rounded-2xl border border-border dark:border-slate-700/50 p-6">
        <NewTicketForm onSubmit={handleCreate} />
      </div>
    </div>
  );
}
