import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TicketProvider } from "./context/TicketContext";
import Layout from "./layouts/Layout";
import TicketDetail from "./components/TicketDetail";
import { Spinner } from "./components/FeedbackStates";
import { useTickets } from "./context/TicketContext";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const MyTicketsPage = lazy(() => import("./pages/MyTicketsPage"));
const NewTicketPage = lazy(() => import("./pages/NewTicketPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function AppRoutes() {
  const { selectedTicket, setSelectedTicket, handleAddComment } = useTickets();

  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-32">
            <Spinner size="lg" />
          </div>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="my-tickets" element={<MyTicketsPage />} />
            <Route path="new-ticket" element={<NewTicketPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      {selectedTicket && (
        <TicketDetail
          ticket={selectedTicket}
          onAddComment={handleAddComment}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TicketProvider>
        <AppRoutes />
      </TicketProvider>
    </BrowserRouter>
  );
}
