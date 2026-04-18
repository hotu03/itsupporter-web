import { Users, UserCheck, Monitor, TrendingUp } from "lucide-react";
import type { CustomerStats } from "./hooks/useCustomers";

interface StatsCardsProps {
  stats: CustomerStats;
  isFiltered: boolean;
}

export function StatsCards({ stats, isFiltered }: StatsCardsProps) {
  const cards = [
    {
      label: "Tổng khách hàng",
      value: stats.total,
      icon: Users,
      color: "blue",
    },
    {
      label: "Đã sử dụng dịch vụ",
      value: stats.active,
      icon: UserCheck,
      color: "green",
    },
    {
      label: "Tổng lượt sửa chữa",
      value: stats.totalRepairs,
      icon: Monitor,
      color: "orange",
    },
    {
      label: isFiltered ? "Trong khoảng thời gian" : "Mới tháng này",
      value: stats.newInPeriod,
      icon: TrendingUp,
      color: "purple",
    },
  ];

  const colorClasses: Record<string, { bg: string; icon: string }> = {
    blue: { bg: "bg-blue-50", icon: "text-blue-500" },
    green: { bg: "bg-green-50", icon: "text-green-500" },
    orange: { bg: "bg-orange-50", icon: "text-orange-500" },
    purple: { bg: "bg-purple-50", icon: "text-purple-500" },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color].bg}`}>
              <Icon size={24} className={colorClasses[color].icon} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
