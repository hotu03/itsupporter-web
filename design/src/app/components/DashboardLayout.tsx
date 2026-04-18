import { Outlet, Navigate, useLocation } from "react-router";
import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router";
import { Sidebar } from "./Sidebar";
import { Toaster } from "./ui/sonner";
import Loading from "./Loading";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/", { state: { from: location }, replace: true });
    }
  }, [user, loading, navigate, location]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
}
