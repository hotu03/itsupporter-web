import { Search, Bell, Calendar } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { ChevronDown, LogOut, UserCircle } from "lucide-react";
import { useDashboardData, DateFilter } from "../components/dashboard/hooks/useDashboardData";
import { KpiCards } from "../components/dashboard/KpiCards";
import { WorkflowSteps } from "../components/dashboard/WorkflowSteps";
import { RevenueChart } from "../components/dashboard/RevenueChart";
import { MachinePieChart } from "../components/dashboard/MachinePieChart";
import { RecentTransactions } from "../components/dashboard/RecentTransactions";
import { TopPersonnel } from "../components/dashboard/TopPersonnel";
import { TopCustomers } from "../components/dashboard/TopCustomers";
import { RecentMachines } from "../components/dashboard/RecentMachines";
import { PendingApprovalBanner } from "../components/dashboard/PendingApprovalBanner";

function getDefaultDate(): string {
  return new Date().toISOString().split("T")[0];
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Date filter state
  const [dateFilter, setDateFilter] = useState<DateFilter>({ type: "today" });
  const [showDateRange, setShowDateRange] = useState(false);
  const [rangeStart, setRangeStart] = useState(getDefaultDate());
  const [rangeEnd, setRangeEnd] = useState(getDefaultDate());

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
  } = useDashboardData(dateFilter);

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

  const handleFilterChange = (type: "today" | "month" | "range") => {
    if (type === "range") {
      setShowDateRange(true);
      setDateFilter({ type: "range", startDate: rangeStart, endDate: rangeEnd });
    } else {
      setShowDateRange(false);
      setDateFilter({ type });
    }
  };

  const handleRangeApply = () => {
    setDateFilter({ type: "range", startDate: rangeStart, endDate: rangeEnd });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-orange-500" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
            Dashboard
          </h1>
          {/* Date Filter Controls */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => handleFilterChange("today")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                dateFilter.type === "today"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Hôm nay
            </button>
            <button
              onClick={() => handleFilterChange("month")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                dateFilter.type === "month"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Tháng này
            </button>
            <button
              onClick={() => handleFilterChange("range")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
                dateFilter.type === "range"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Calendar size={12} />
              Tùy chọn
            </button>
          </div>
          {/* Date Range Picker */}
          {showDateRange && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={rangeStart}
                onChange={(e) => setRangeStart(e.target.value)}
                className="text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:ring-2 focus:ring-orange-400"
              />
              <span className="text-gray-400 text-xs">đến</span>
              <input
                type="date"
                value={rangeEnd}
                onChange={(e) => setRangeEnd(e.target.value)}
                className="text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                onClick={handleRangeApply}
                className="px-3 py-1.5 bg-orange-500 text-white text-xs font-medium rounded-md hover:bg-orange-600 transition-colors"
              >
                Áp dụng
              </button>
            </div>
          )}
        </div>
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
          dateFilter={dateFilter}
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