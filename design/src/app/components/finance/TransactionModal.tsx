import { X } from "lucide-react";
import type { ServiceData } from "../../data/services";
import type { TransactionFormData } from "./hooks/useFinance";

interface TransactionModalProps {
  isOpen: boolean;
  editing: boolean;
  formData: TransactionFormData;
  services: ServiceData[];
  onClose: () => void;
  onChange: (data: TransactionFormData) => void;
  onSave: () => void;
}

export function TransactionModal({
  isOpen,
  editing,
  formData,
  services,
  onClose,
  onChange,
  onSave,
}: TransactionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {editing ? "Chỉnh sửa giao dịch" : "Thêm giao dịch mới"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.customerPhone}
                onChange={(e) => onChange({ ...formData, customerPhone: e.target.value })}
                disabled={editing}
                placeholder="0912345678"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên khách hàng <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => onChange({ ...formData, customerName: e.target.value })}
                disabled={editing}
                placeholder="Nguyễn Văn A"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dịch vụ <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.service}
              onChange={(e) => onChange({ ...formData, service: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
            >
              <option value="">Chọn dịch vụ</option>
              {services.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số tiền (VNĐ)
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => onChange({ ...formData, amount: e.target.value })}
                placeholder="0 = Miễn phí"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
              />
              <p className="text-xs text-gray-400 mt-1">Nhập 0 để miễn phí</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ngày</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => onChange({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>
          </div>

          {parseFloat(formData.amount || "0") > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái thanh toán
              </label>
              <select
                value={formData.paymentStatus}
                onChange={(e) =>
                  onChange({
                    ...formData,
                    paymentStatus: e.target.value as "paid" | "pending",
                  })
                }
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
              >
                <option value="paid">Đã thanh toán</option>
                <option value="pending">Chờ thanh toán</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú</label>
            <textarea
              value={formData.notes}
              onChange={(e) => onChange({ ...formData, notes: e.target.value })}
              placeholder="Mô tả chi tiết về dịch vụ..."
              rows={3}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Huỷ
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-sm"
          >
            {editing ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </div>
    </div>
  );
}