import { CreditCard } from "lucide-react";
import type { Transaction } from "../../../data/finance";
import type { FinanceStats } from "./hooks/useDashboardData";

interface RecentTransactionsProps {
  transactions: Transaction[];
  financeStats: FinanceStats;
}

function formatCurrencyShort(amount: number) {
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
  return `${amount}`;
}

const PAYMENT_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  paid: { bg: "bg-green-100", text: "text-green-700", label: "Đã thanh toán" },
  pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Chờ thanh toán" },
  free: { bg: "bg-blue-100", text: "text-blue-700", label: "Miễn phí" },
};

export function RecentTransactions({ transactions, financeStats }: RecentTransactionsProps) {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
        <div>
          <h2 className="text-gray-800" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Giao dịch gần đây</h2>
          <p className="text-gray-400 text-xs mt-0.5">Finance · {financeStats.totalTransactions} giao dịch</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            Tổng: <span className="text-emerald-500 font-semibold">{formatCurrencyShort(financeStats.totalRevenue)}</span>
          </span>
        </div>
      </div>
      <div className="divide-y divide-gray-50">
        {transactions.length === 0 ? (
          <div className="px-5 py-8 text-center text-gray-400 text-sm">Chưa có giao dịch nào</div>
        ) : (
          transactions.map((t) => {
            const s = PAYMENT_STYLE[t.paymentStatus] || PAYMENT_STYLE.pending;
            return (
              <div key={t.id} className="px-5 py-3 hover:bg-gray-50/60 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                  <CreditCard size={13} className="text-orange-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 text-xs font-semibold truncate">{t.customerName}</p>
                  <p className="text-gray-400 text-[11px] truncate">{t.service}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-gray-800 text-xs font-semibold">
                    {t.amount > 0 ? formatCurrencyShort(t.amount) : "Miễn phí"}
                  </p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${s.bg} ${s.text}`}>
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 grid grid-cols-3 gap-2">
        <div className="text-center">
          <p className="text-[10px] text-gray-400">Đã thanh toán</p>
          <p className="text-xs font-bold text-green-600 mt-0.5">{financeStats.paidCount}</p>
        </div>
        <div className="text-center border-x border-gray-200">
          <p className="text-[10px] text-gray-400">Chờ thanh toán</p>
          <p className="text-xs font-bold text-yellow-600 mt-0.5">{financeStats.pendingCount}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-gray-400">Miễn phí</p>
          <p className="text-xs font-bold text-blue-600 mt-0.5">{financeStats.freeCount}</p>
        </div>
      </div>
    </div>
  );
}
