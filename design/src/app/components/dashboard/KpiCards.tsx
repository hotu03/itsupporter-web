import React from "react";
import {
  Monitor,
  Wrench,
  CheckCircle2,
  DollarSign,
  UserCircle,
  Users,
} from "lucide-react";
import type { MachineStats, FinanceStats } from "./hooks/useDashboardData";

interface KpiCardsProps {
  machineStats: MachineStats;
  financeStats: FinanceStats;
  customerStats: { total: number; totalRepairs: number; totalPoints: number };
  personnelStats: { totalApproved: number; active: number; pending: number };
}

function formatCurrencyShort(amount: number) {
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
  return `${amount}`;
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center shrink-0`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-gray-400 text-xs mb-1">{label}</p>
        <p className="text-gray-900" style={{ fontSize: "1.6rem", fontWeight: 700, lineHeight: 1 }}>
          {value}
        </p>
        {sub && <p className="text-gray-400 text-xs mt-1">{sub}</p>}
      </div>
    </div>
  );
}

export function KpiCards({ machineStats, financeStats, customerStats, personnelStats }: KpiCardsProps) {
  const completionRate = machineStats.total > 0
    ? Math.round(((machineStats.complete + machineStats.returned) / machineStats.total) * 100)
    : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      <StatCard
        icon={Monitor}
        label="Tổng máy hôm nay"
        value={machineStats.total}
        sub={`${machineStats.running} đang sửa · ${machineStats.complete} xong`}
        color="bg-orange-500"
      />
      <StatCard
        icon={Wrench}
        label="Đang xử lý"
        value={machineStats.running + machineStats.waiting + machineStats.retesting + machineStats.returning}
        sub="RUNNING + WAITING"
        color="bg-blue-500"
      />
      <StatCard
        icon={CheckCircle2}
        label="Hoàn thành"
        value={machineStats.complete + machineStats.returned}
        sub={`Tỷ lệ ${completionRate}%`}
        color="bg-green-500"
      />
      <StatCard
        icon={DollarSign}
        label="Doanh thu tháng"
        value={formatCurrencyShort(financeStats.totalRevenue)}
        sub={`Chờ: ${formatCurrencyShort(financeStats.pendingRevenue)}`}
        color="bg-emerald-500"
      />
      <StatCard
        icon={UserCircle}
        label="Khách hàng"
        value={customerStats.total}
        sub={`${customerStats.totalRepairs} lượt sửa · ${customerStats.totalPoints} điểm`}
        color="bg-violet-500"
      />
      <StatCard
        icon={Users}
        label="Thành viên"
        value={personnelStats.totalApproved}
        sub={`${personnelStats.active} hoạt động · ${personnelStats.pending} chờ duyệt`}
        color="bg-sky-500"
      />
    </div>
  );
}
