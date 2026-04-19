import { useState, useEffect } from "react";
import { X, History, Star, TrendingUp, Gift } from "lucide-react";
import type { Customer } from "../../data/customers";
import { getFirestoreCustomerPointHistory, type PointHistory } from "../../data/firestorePoints";

interface HistoryModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

export function HistoryModal({ customer, isOpen, onClose }: HistoryModalProps) {
  const [history, setHistory] = useState<PointHistory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !customer) return;

    setLoading(true);
    getFirestoreCustomerPointHistory(customer.phone)
      .then(setHistory)
      .catch(err => {
        console.error("Error loading point history:", err);
        setHistory([]);
      })
      .finally(() => setLoading(false));
  }, [isOpen, customer?.phone]);

  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Lịch sử điểm thưởng</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {customer.name} - {customer.phone}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Current Points Banner */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Star size={24} className="text-yellow-500 fill-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tổng điểm hiện tại</p>
              <p className="text-2xl font-bold text-gray-900">
                {customer.points} <span className="text-base font-normal text-gray-500">điểm</span>
              </p>
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500">Đang tải...</p>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-12">
              <History size={32} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Chưa có lịch sử điểm</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      entry.type === "earn"
                        ? "bg-green-50"
                        : "bg-red-50"
                    }`}
                  >
                    {entry.type === "earn" ? (
                      <TrendingUp size={20} className="text-green-600" />
                    ) : (
                      <Gift size={20} className="text-red-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-medium text-gray-900">
                        {entry.description}
                      </p>
                      <span
                        className={`text-sm font-bold whitespace-nowrap ${
                          entry.type === "earn"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {entry.type === "earn" ? "+" : ""}
                        {entry.points} điểm
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(entry.date).toLocaleString("vi-VN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
