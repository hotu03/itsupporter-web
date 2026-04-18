import { Monitor, Clock, ChevronRight } from "lucide-react";
import type { Machine } from "../../../data/machines";

interface RecentMachinesProps {
  machines: Machine[];
  machineStats: { total: number };
}

const STATUS_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  COMPLETE: { bg: "bg-orange-100", text: "text-orange-600", label: "Hoàn thành" },
  RUNNING: { bg: "bg-blue-100", text: "text-blue-600", label: "Đang sửa" },
  WAITING: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Chờ xử lý" },
  RETESTING: { bg: "bg-teal-100", text: "text-teal-600", label: "Kiểm tra lại" },
  RETURNING: { bg: "bg-purple-100", text: "text-purple-600", label: "Trả máy" },
  RETURNED: { bg: "bg-green-100", text: "text-green-600", label: "Đã trả" },
};

export function RecentMachines({ machines, machineStats }: RecentMachinesProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
        <div>
          <h2 className="text-gray-800" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Máy gần đây</h2>
          <p className="text-gray-400 text-xs mt-0.5">Machines · Cập nhật mới nhất</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">{machineStats.total} máy hôm nay</span>
          <a href="/dashboard/machines" className="text-xs text-orange-500 font-medium hover:text-orange-600 transition-colors flex items-center gap-0.5">
            Xem tất cả <ChevronRight size={12} />
          </a>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-5 py-3 text-gray-400 text-xs font-semibold">STT</th>
              <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Khách hàng</th>
              <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">SĐT</th>
              <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Mô tả</th>
              <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Kỹ thuật viên</th>
              <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Giờ nhận</th>
              <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {machines.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-gray-400 text-sm">Chưa có máy nào</td>
              </tr>
            ) : (
              machines.map((m) => {
                const s = STATUS_STYLE[m.status] || STATUS_STYLE.WAITING;
                return (
                  <tr key={m.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Monitor size={13} className="text-gray-400 shrink-0" />
                        <span className="text-gray-700 text-xs font-semibold">#{m.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-800 text-xs font-medium">{m.customerName}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{m.phone}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs max-w-[200px]">
                      <span className="truncate block">{m.description}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{m.technician || "Chưa chỉ định"}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      <div className="flex items-center gap-1">
                        <Clock size={11} className="text-gray-300" />
                        {m.time}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${s.bg} ${s.text}`}>
                        {s.label}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
