import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { TicketProvider } from "./context/TicketContext";
import Layout from "./layouts/Layout";
import TicketDetail from "./components/TicketDetail";
import { Spinner } from "./components/FeedbackStates";
import { useTickets } from "./context/TicketContext";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const MyTicketsPage = lazy(() => import("./pages/MyTicketsPage"));
const NewTicketPage = lazy(() => import("./pages/NewTicketPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="flex items-center justify-center py-32"><Spinner size="lg" /></div>;
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return children;
}

function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center py-32"><Spinner size="lg" /></div>;
  if (user) return <Navigate to="/" replace />;
  return children;
}

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
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />

          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
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
      <AuthProvider>
        <TicketProvider>
          <AppRoutes />
        </TicketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
