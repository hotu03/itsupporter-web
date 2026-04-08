import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Toaster } from "./ui/sonner";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
}
