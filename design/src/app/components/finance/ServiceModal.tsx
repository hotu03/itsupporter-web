import { X } from "lucide-react";
import type { ServiceFormData } from "./hooks/useFinance";

interface ServiceModalProps {
  isOpen: boolean;
  editing: boolean;
  formData: ServiceFormData;
  onClose: () => void;
  onChange: (data: ServiceFormData) => void;
  onSave: () => void;
}

export function ServiceModal({
  isOpen,
  editing,
  formData,
  onClose,
  onChange,
  onSave,
}: ServiceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {editing ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên dịch vụ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onChange({ ...formData, name: e.target.value })}
              placeholder="VD: Sửa chữa laptop"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giá tiền (VNĐ)
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => onChange({ ...formData, price: e.target.value })}
              placeholder="0 = Miễn phí"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
            />
            <p className="text-xs text-gray-400 mt-1">Nhập 0 nếu dịch vụ miễn phí</p>
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