import { Search, Bell } from "lucide-react";
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
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm cursor-pointer">
            <span className="text-white text-xs font-bold">AD</span>
          </div>
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
