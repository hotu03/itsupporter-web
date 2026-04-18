import { Search, Bell } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { ChevronDown, LogOut, UserCircle } from "lucide-react";
import { useDashboardData } from "../components/dashboard/hooks/useDashboardData";
import { KpiCards } from "../components/dashboard/KpiCards";
import { WorkflowSteps } from "../components/dashboard/WorkflowSteps";
import { RevenueChart } from "../components/dashboard/RevenueChart";
import { MachinePieChart } from "../components/dashboard/MachinePieChart";
import { RecentTransactions } from "../components/dashboard/RecentTransactions";
import { TopPersonnel } from "../components/dashboard/TopPersonnel";
import { TopCustomers } from "../components/dashboard/TopCustomers";
import { RecentMachines } from "../components/dashboard/RecentMachines";
import { PendingApprovalBanner } from "../components/dashboard/PendingApprovalBanner";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    machineStats,
    financeStats,
    revenueTrend,
    topTechnicians,
    topTesters,
    pendingMembers,
    personnelStats,
    topCustomers,
    customerStats,
    recentMachines,
    recentTransactions,
  } = useDashboardData();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Get user initials from name
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[parts.length - 1][0] + parts[0][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <h1 className="text-orange-500" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
          Dashboard
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="bg-gray-100 rounded-full pl-9 pr-4 py-2 text-sm text-gray-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all w-44"
            />
          </div>
          <button className="relative w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-orange-50 transition-colors">
            <Bell size={15} className="text-gray-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full border border-white" />
          </button>
          {/* User Dropdown */}
          {user && (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm border border-orange-200">
                    <span className="text-white text-xs font-bold">{getInitials(user.name)}</span>
                  </div>
                )}
                <ChevronDown
                  size={14}
                  className={`text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">@{user.username}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium bg-orange-100 text-orange-700 rounded-full capitalize">
                      {user.role}
                    </span>
                  </div>
                  {/* Menu items */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/dashboard/profile");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
                    >
                      <UserCircle size={16} className="text-gray-400" />
                      Hồ sơ cá nhân
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="flex-1 p-5 flex flex-col gap-5">
        {/* Pending Approval Banner */}
        <PendingApprovalBanner pendingMembers={pendingMembers} />

        {/* KPI Cards */}
        <KpiCards
          machineStats={machineStats}
          financeStats={financeStats}
          customerStats={customerStats}
          personnelStats={personnelStats}
        />

        {/* Machine Workflow 5 Steps */}
        <WorkflowSteps machineStats={machineStats} />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <RevenueChart revenueTrend={revenueTrend} />
          <MachinePieChart machineStats={machineStats} />
        </div>

        {/* Bottom Row: Transactions + Personnel + Customers */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <RecentTransactions
            transactions={recentTransactions}
            financeStats={financeStats}
          />
          <TopPersonnel
            topTechnicians={topTechnicians}
            topTesters={topTesters}
            pendingMembers={pendingMembers}
            personnelStats={personnelStats}
          />
          <TopCustomers
            topCustomers={topCustomers}
            customerStats={customerStats}
          />
        </div>

        {/* Recent Machines Table */}
        <RecentMachines
          machines={recentMachines}
          machineStats={{ total: machineStats.total }}
        />
      </div>
    </div>
  );
}
