import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { MachineStats } from "./hooks/useDashboardData";

interface MachinePieChartProps {
  machineStats: MachineStats;
}

export function MachinePieChart({ machineStats }: MachinePieChartProps) {
  const pieData = [
    { name: "Hoàn thành", value: machineStats.complete, color: "#f97316" },
    { name: "Đang sửa", value: machineStats.running, color: "#3b82f6" },
    { name: "Chờ xử lý", value: machineStats.waiting, color: "#facc15" },
    { name: "Kiểm tra lại", value: machineStats.retesting, color: "#14b8a6" },
    { name: "Trả máy", value: machineStats.returning, color: "#8b5cf6" },
    { name: "Đã trả", value: machineStats.returned, color: "#22c55e" },
  ].filter(d => d.value > 0);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-end justify-between mb-3">
        <div>
          <h2 className="text-gray-800" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Phân bổ trạng thái máy</h2>
          <p className="text-gray-400 text-xs mt-0.5">Hôm nay</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={65}
              paddingAngle={3}
              dataKey="value"
              isAnimationActive={false}
            >
              {pieData.map((entry) => (
                <Cell key={`pie-cell-${entry.name}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [`${value} máy`, name]}
              contentStyle={{ borderRadius: 10, border: "1px solid #f1f5f9", fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-1.5 w-full mt-1">
          {pieData.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                <span className="text-gray-600 text-xs">{entry.name}</span>
              </div>
              <span className="text-gray-800 text-xs font-semibold">{entry.value}</span>
            </div>
          ))}
        </div>
        <div className="w-full mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
          <span className="text-gray-400 text-xs">Tổng hôm nay</span>
          <span className="text-gray-800 text-sm font-bold">{machineStats.total} máy</span>
        </div>
      </div>
    </div>
  );
}
