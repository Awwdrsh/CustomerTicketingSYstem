import NewTicketForm from "../components/NewTicketForm";

export default function NewTicketPage({ onSubmitTicket }) {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">New Ticket</h1>
        <p className="text-gray-500 mt-1">Submit a new support request</p>
      </div>
      <NewTicketForm onSubmit={onSubmitTicket} />
    </main>
  );
}
