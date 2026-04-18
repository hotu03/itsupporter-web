import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { RevenueTrendItem } from "./hooks/useDashboardData";

interface RevenueChartProps {
  revenueTrend: RevenueTrendItem[];
}

function formatCurrencyShort(amount: number) {
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
  return `${amount}`;
}

function RevenueTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3 text-xs">
      <p className="text-gray-600 font-semibold mb-1">{label}</p>
      <p className="text-orange-500">Doanh thu: {payload[0]?.value?.toLocaleString("vi-VN")}đ</p>
      {payload[1] && <p className="text-blue-500 mt-0.5">Giao dịch: {payload[1]?.value}</p>}
    </div>
  );
}

export function RevenueChart({ revenueTrend }: RevenueChartProps) {
  const totalRevenue = revenueTrend.reduce((s, r) => s + r.revenue, 0);
  const totalTransactions = revenueTrend.reduce((s, r) => s + r.transactions, 0);
  const avgPerTx = totalTransactions > 0 ? Math.round(totalRevenue / totalTransactions) : 0;
  const maxMonth = revenueTrend.length > 0
    ? Math.max(...revenueTrend.map(r => r.revenue))
    : 0;

  return (
    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-end justify-between mb-3">
        <div>
          <h2 className="text-gray-800" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Doanh thu theo tháng</h2>
          <p className="text-gray-400 text-xs mt-0.5">6 tháng gần đây (VNĐ)</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-400 inline-block" />Doanh thu</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={revenueTrend} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis
            tickFormatter={(v) => formatCurrencyShort(v)}
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<RevenueTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#f97316"
            strokeWidth={2.5}
            fill="url(#revenueGrad)"
            dot={{ r: 3, fill: "#f97316", strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#f97316", stroke: "white", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-50">
        <div className="text-center">
          <p className="text-gray-400 text-[11px]">Tổng 6 tháng</p>
          <p className="text-gray-800 text-sm font-bold mt-0.5">{formatCurrencyShort(totalRevenue)}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-[11px]">Giao dịch</p>
          <p className="text-gray-800 text-sm font-bold mt-0.5">{totalTransactions}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-[11px]">TB/giao dịch</p>
          <p className="text-gray-800 text-sm font-bold mt-0.5">{formatCurrencyShort(avgPerTx)}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-[11px]">Tháng cao nhất</p>
          <p className="text-gray-800 text-sm font-bold mt-0.5">{formatCurrencyShort(maxMonth)}</p>
        </div>
      </div>
    </div>
  );
}
