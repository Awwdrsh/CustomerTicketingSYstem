import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main className="animate-fade-in" key={location.pathname}>
        <Outlet />
      </main>
    </div>
  );
}
