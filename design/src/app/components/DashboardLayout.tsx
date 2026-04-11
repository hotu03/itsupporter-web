import { Outlet } from "react-router";
import { Suspense } from "react";
import { Sidebar } from "./Sidebar";
import { Toaster } from "./ui/sonner";
import Loading from "./Loading";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
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
