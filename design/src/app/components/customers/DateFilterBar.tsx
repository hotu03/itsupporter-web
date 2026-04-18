import { CalendarRange } from "lucide-react";

interface DateFilterBarProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (d: string) => void;
  onEndDateChange: (d: string) => void;
  onReset: () => void;
}

export function DateFilterBar({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onReset,
}: DateFilterBarProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-gray-600">
          <CalendarRange size={18} className="text-orange-500" />
          <span className="text-sm font-medium">Lọc theo thời gian:</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>

          <span className="text-gray-400 text-sm">đến</span>

          <div className="relative">
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>

          {(startDate || endDate) && (
            <button
              onClick={onReset}
              className="ml-2 px-3 py-1.5 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>

        {(startDate || endDate) && (
          <div className="ml-auto">
            <span className="text-xs text-gray-500 bg-orange-50 px-3 py-1.5 rounded-full">
              {startDate && endDate
                ? `${new Date(startDate).toLocaleDateString("vi-VN")} - ${new Date(endDate).toLocaleDateString("vi-VN")}`
                : startDate
                ? `Từ ${new Date(startDate).toLocaleDateString("vi-VN")}`
                : `Đến ${new Date(endDate).toLocaleDateString("vi-VN")}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
