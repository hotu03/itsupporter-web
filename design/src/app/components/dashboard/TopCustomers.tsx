import { Star } from "lucide-react";
import type { Customer } from "../../../data/customers";

interface TopCustomersProps {
  topCustomers: Customer[];
  customerStats: { total: number; totalRepairs: number; totalPoints: number };
}

export function TopCustomers({ topCustomers, customerStats }: TopCustomersProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50">
        <h2 className="text-gray-800" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Khách hàng thân thiết</h2>
        <p className="text-gray-400 text-xs mt-0.5">Customers · Xếp hạng theo điểm</p>
      </div>
      <div className="divide-y divide-gray-50">
        {topCustomers.length === 0 ? (
          <div className="px-5 py-8 text-center text-gray-400 text-sm">Chưa có khách hàng nào</div>
        ) : (
          topCustomers.map((c, idx) => (
            <div key={c.phone} className="px-5 py-3 flex items-center gap-3 hover:bg-gray-50/60 transition-colors">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${idx === 0 ? "bg-violet-500 text-white" : idx === 1 ? "bg-violet-300 text-white" : "bg-gray-100 text-gray-500"}`}>
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 text-xs font-semibold truncate">{c.name}</p>
                <p className="text-gray-400 text-[11px]">{c.totalRepairs || 0} lần sửa</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Star size={11} className="text-yellow-400 fill-yellow-400" />
                <span className="text-gray-700 text-xs font-bold">{c.points || 0}</span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-gray-400">Tổng điểm đã tích</span>
          <div className="flex items-center gap-1">
            <Star size={11} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-bold text-gray-700">{customerStats.totalPoints}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[11px] text-gray-400">Tổng lượt sửa</span>
          <span className="text-sm font-bold text-gray-700">{customerStats.totalRepairs}</span>
        </div>
      </div>
    </div>
  );
}
