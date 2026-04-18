import { Search, Settings, Pencil, Trash2 } from "lucide-react";
import { Pagination } from "../Pagination";
import { formatCurrency as formatCurr } from "../../data/services";
import type { ServiceData } from "../../data/services";

interface ServiceTableProps {
  services: ServiceData[];
  filteredServices: ServiceData[];
  pagedServices: ServiceData[];
  searchQuery: string;
  page: number;
  pageSize: number;
  onSearchChange: (q: string) => void;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
  onEdit: (svc: ServiceData) => void;
  onDelete: (id: string) => void;
}

export function ServiceTable({
  filteredServices,
  pagedServices,
  searchQuery,
  page,
  pageSize,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
}: ServiceTableProps) {
  const formatCurrency = (price: number) => formatCurr(price);

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
            placeholder="Tìm kiếm dịch vụ..."
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
                  STT
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Tên dịch vụ
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Giá tiền
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pagedServices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Settings size={32} className="text-gray-300" />
                      <p className="text-sm text-gray-500">
                        {searchQuery ? "Không tìm thấy dịch vụ nào" : "Chưa có dịch vụ nào"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                pagedServices.map((service, index) => (
                  <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-500">
                        {(page - 1) * pageSize + index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-900">
                        {service.name}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-sm font-semibold ${
                          service.price === 0 ? "text-blue-600" : "text-green-600"
                        }`}
                      >
                        {service.price === 0 ? "Miễn phí" : formatCurrency(service.price)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit(service)}
                          className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-orange-600 transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(service.id)}
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
            total={filteredServices.length}
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