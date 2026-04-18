import { Phone, Mail, Calendar, Pencil, Trash2, Gift, History, Star } from "lucide-react";
import type { Customer } from "../../data/customers";
import { Pagination } from "../Pagination";

interface CustomerTableProps {
  customers: Customer[];
  searchQuery: string;
  page: number;
  pageSize: number;
  total: number;
  onEdit: (customer: Customer) => void;
  onDelete: (phone: string) => void;
  onRedeem: (customer: Customer) => void;
  onHistory: (customer: Customer) => void;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
}

export function CustomerTable({
  customers,
  searchQuery,
  page,
  pageSize,
  total,
  onEdit,
  onDelete,
  onRedeem,
  onHistory,
  onPageChange,
  onPageSizeChange,
}: CustomerTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Số điện thoại
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Tên khách hàng
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Lượt sửa
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Điểm
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Lần cuối
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Star size={32} className="text-gray-300" />
                    <p className="text-sm text-gray-500">
                      {searchQuery
                        ? "Không tìm thấy khách hàng nào"
                        : "Chưa có khách hàng nào"}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr
                  key={customer.phone}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {customer.phone}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-900">{customer.name}</span>
                      {customer.notes && (
                        <span className="text-xs text-gray-400 line-clamp-1">
                          {customer.notes}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {customer.email ? (
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {customer.email}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700">
                      {customer.totalRepairs} lần
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-gray-900">
                        {customer.points}
                      </span>
                      <span className="text-xs text-gray-500">điểm</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {customer.lastRepair ? (
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {new Date(customer.lastRepair).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onRedeem(customer)}
                        disabled={customer.points === 0}
                        className="p-1.5 rounded-lg text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        title="Đổi điểm"
                      >
                        <Gift size={16} />
                      </button>
                      <button
                        onClick={() => onHistory(customer)}
                        className="p-1.5 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        title="Lịch sử điểm"
                      >
                        <History size={16} />
                      </button>
                      <button
                        onClick={() => onEdit(customer)}
                        className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-orange-600 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(customer.phone)}
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
      {/* Pagination */}
      <div className="px-4 pb-3 border-t border-gray-100">
        <Pagination
          total={total}
          page={page}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
}
