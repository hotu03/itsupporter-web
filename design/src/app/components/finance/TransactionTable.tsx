import {
  Search,
  DollarSign,
  TrendingUp,
  Users,
  CreditCard,
  FileText,
  CalendarRange,
  Pencil,
  Trash2,
} from "lucide-react";
import { Pagination } from "../Pagination";
import { formatCurrency as formatCurr } from "../../data/services";
import type { Transaction, TransactionStats } from "./hooks/useFinance";
import type { Machine } from "../../data/machines";

interface TransactionTableProps {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  pagedTransactions: Transaction[];
  stats: TransactionStats;
  searchQuery: string;
  startDate: string;
  endDate: string;
  page: number;
  pageSize: number;
  approvalFilter: "all" | "approved" | "pending";
  machines: Machine[];
  onSearchChange: (q: string) => void;
  onStartDateChange: (d: string) => void;
  onEndDateChange: (d: string) => void;
  onResetDateFilter: () => void;
  onApprovalFilterChange: (f: "all" | "approved" | "pending") => void;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
  onEdit: (tx: Transaction) => void;
  onDelete: (id: string) => void;
}

export function TransactionTable({
  filteredTransactions,
  pagedTransactions,
  stats,
  searchQuery,
  startDate,
  endDate,
  page,
  pageSize,
  approvalFilter,
  machines,
  onSearchChange,
  onStartDateChange,
  onEndDateChange,
  onResetDateFilter,
  onApprovalFilterChange,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
}: TransactionTableProps) {
  const formatCurrency = (amount: number) => formatCurr(amount);

  const getStatusBadge = (status: Transaction["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
            Đã thanh toán
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
            Chờ thanh toán
          </span>
        );
      case "free":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
            Miễn phí
          </span>
        );
    }
  };

  return (
    <>
      {/* Date Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-gray-600">
            <CalendarRange size={18} className="text-orange-500" />
            <span className="text-sm font-medium">Lọc theo thời gian:</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
            />
            <span className="text-gray-400 text-sm">đến</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
            />

            {(startDate || endDate) && (
              <button
                onClick={onResetDateFilter}
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

          {/* Approval filter */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-gray-500">Lọc duyệt:</span>
            <select
              value={approvalFilter}
              onChange={(e) => onApprovalFilterChange(e.target.value as "all" | "approved" | "pending")}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
            >
              <option value="all">Tất cả</option>
              <option value="approved">Đã duyệt</option>
              <option value="pending">Chờ duyệt</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Doanh thu</p>
              <p className="text-xl font-bold text-gray-900 mt-1">
                {formatCurrency(stats.totalRevenue)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <DollarSign size={24} className="text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Chờ thu</p>
              <p className="text-xl font-bold text-gray-900 mt-1">
                {formatCurrency(stats.pendingRevenue)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
              <TrendingUp size={24} className="text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">KH trả phí</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.paidCustomers}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <CreditCard size={24} className="text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">KH miễn phí</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.freeCustomers}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
              <Users size={24} className="text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Tổng giao dịch</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalTransactions}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
              <FileText size={24} className="text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, số điện thoại, dịch vụ..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Ngày
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Khách hàng
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Dịch vụ
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Số tiền
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Duyệt
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pagedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <FileText size={32} className="text-gray-300" />
                      <p className="text-sm text-gray-500">
                        {searchQuery
                          ? "Không tìm thấy giao dịch nào"
                          : "Chưa có giao dịch nào"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                pagedTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-900">
                        {new Date(tx.date).toLocaleDateString("vi-VN")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {tx.customerName}
                        </span>
                        <span className="text-xs text-gray-400">{tx.phone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900">{tx.service}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-sm font-semibold ${
                          tx.amount === 0
                            ? "text-blue-600"
                            : tx.paymentStatus === "paid"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {tx.amount === 0 ? "Miễn phí" : formatCurrency(tx.amount)}
                      </span>
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(tx.paymentStatus)}</td>
                    <td className="px-4 py-3">
                      {(() => {
                        if (!tx.machineId) {
                          return <span className="text-gray-300 text-xs">—</span>;
                        }
                        const machines = getMachines();
                        const machine = machines.find(m => m.id === tx.machineId);
                        if (!machine) {
                          return <span className="text-gray-300 text-xs">—</span>;
                        }
                        return machine.isApproved ? (
                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Đã duyệt</span>
                        ) : (
                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Chờ duyệt</span>
                        );
                      })()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit(tx)}
                          className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-orange-600 transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(tx.id)}
                          className="p-1.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Xoá"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 pb-3 border-t border-gray-100">
          <Pagination
            total={filteredTransactions.length}
            page={page}
            pageSize={pageSize}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      </div>
    </>
  );
}