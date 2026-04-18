import { Search, Ticket, Pencil, Trash2, Star } from "lucide-react";
import { Pagination } from "../Pagination";
import { formatCurrency as formatCurr } from "../../data/discounts";
import type { DiscountCode } from "../../data/discounts";

interface DiscountTableProps {
  discounts: DiscountCode[];
  filteredDiscounts: DiscountCode[];
  pagedDiscounts: DiscountCode[];
  searchQuery: string;
  page: number;
  pageSize: number;
  onSearchChange: (q: string) => void;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
  onEdit: (disc: DiscountCode) => void;
  onDelete: (id: string) => void;
}

export function DiscountTable({
  filteredDiscounts,
  pagedDiscounts,
  searchQuery,
  page,
  pageSize,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
}: DiscountTableProps) {
  const formatCurrency = (amount: number) => formatCurr(amount);

  const getDiscountStatus = (discount: DiscountCode) => {
    const now = new Date();
    const validFrom = new Date(discount.validFrom);
    const validUntil = new Date(discount.validUntil);
    const isActive = now >= validFrom && now <= validUntil;
    const isExpired = now > validUntil;
    const isUpcoming = now < validFrom;
    const isAvailable = isActive && discount.usageCount < discount.usageLimit;

    if (isAvailable) {
      return {
        label: "Khả dụng",
        className: "bg-green-50 text-green-700",
      };
    }
    if (isExpired) {
      return {
        label: "Hết hạn",
        className: "bg-gray-50 text-gray-500",
      };
    }
    if (isUpcoming) {
      return {
        label: "Sắp tới",
        className: "bg-blue-50 text-blue-700",
      };
    }
    return {
      label: "Hết lượt",
      className: "bg-red-50 text-red-700",
    };
  };

  return (
    <>
      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Tìm kiếm mã giảm giá..."
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
                  Mã
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Giảm giá
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Giảm tối đa
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Sử dụng
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Thời gian
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pagedDiscounts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Ticket size={32} className="text-gray-300" />
                      <p className="text-sm text-gray-500">
                        {searchQuery
                          ? "Không tìm thấy mã giảm giá nào"
                          : "Chưa có mã giảm giá nào"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                pagedDiscounts.map((discount) => {
                  const status = getDiscountStatus(discount);

                  return (
                    <tr key={discount.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold text-orange-600 font-mono">
                            {discount.code}
                          </span>
                          <div className="flex items-center gap-2">
                            {discount.description && (
                              <span className="text-xs text-gray-400">
                                {discount.description}
                              </span>
                            )}
                            {discount.isRedeemable && discount.pointsRequired && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <Star size={10} className="fill-yellow-500" />
                                {discount.pointsRequired} điểm
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-gray-900">
                          {discount.discountPercent}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-green-600">
                          {formatCurrency(discount.maxDiscount)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-900">
                            {discount.usageCount}/{discount.usageLimit}
                          </span>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div
                              className={`h-1.5 rounded-full ${
                                discount.usageCount >= discount.usageLimit
                                  ? "bg-red-500"
                                  : "bg-orange-500"
                              }`}
                              style={{
                                width: `${Math.min(
                                  (discount.usageCount / discount.usageLimit) * 100,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col text-xs text-gray-600">
                          <span>
                            Từ: {new Date(discount.validFrom).toLocaleDateString("vi-VN")}
                          </span>
                          <span>
                            Đến: {new Date(discount.validUntil).toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onEdit(discount)}
                            className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-orange-600 transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => onDelete(discount.id)}
                            className="p-1.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="Xoá"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 pb-3 border-t border-gray-100">
          <Pagination
            total={filteredDiscounts.length}
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