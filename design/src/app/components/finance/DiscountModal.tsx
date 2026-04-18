import { X } from "lucide-react";
import type { DiscountFormData } from "./hooks/useFinance";

interface DiscountModalProps {
  isOpen: boolean;
  editing: boolean;
  formData: DiscountFormData;
  onClose: () => void;
  onChange: (data: DiscountFormData) => void;
  onSave: () => void;
}

export function DiscountModal({
  isOpen,
  editing,
  formData,
  onClose,
  onChange,
  onSave,
}: DiscountModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {editing ? "Chỉnh sửa mã giảm giá" : "Thêm mã giảm giá mới"}
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
              Mã giảm giá <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) =>
                onChange({ ...formData, code: e.target.value.toUpperCase() })
              }
              disabled={editing}
              placeholder="VD: SAVE20, NEWCUST"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all uppercase"
            />
            <p className="text-xs text-gray-400 mt-1">
              Chỉ chữ, số, không dấu. Tự động viết hoa.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phần trăm giảm (%) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.discountPercent}
                onChange={(e) =>
                  onChange({ ...formData, discountPercent: e.target.value })
                }
                placeholder="VD: 20"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giảm tối đa (VNĐ) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.maxDiscount}
                onChange={(e) =>
                  onChange({ ...formData, maxDiscount: e.target.value })
                }
                placeholder="VD: 200000"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số lượt sử dụng <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={formData.usageLimit}
              onChange={(e) =>
                onChange({ ...formData, usageLimit: e.target.value })
              }
              placeholder="VD: 50"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
            />
            <p className="text-xs text-gray-400 mt-1">
              Tổng số lần mã có thể được sử dụng
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày bắt đầu <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.validFrom}
                onChange={(e) =>
                  onChange({ ...formData, validFrom: e.target.value })
                }
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày kết thúc <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.validUntil}
                onChange={(e) =>
                  onChange({ ...formData, validUntil: e.target.value })
                }
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                onChange({ ...formData, description: e.target.value })
              }
              placeholder="Mô tả về mã giảm giá..."
              rows={2}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
            />
          </div>

          {/* Checkbox: Có thể đổi điểm */}
          <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <input
              type="checkbox"
              id="isRedeemable"
              checked={formData.isRedeemable}
              onChange={(e) =>
                onChange({
                  ...formData,
                  isRedeemable: e.target.checked,
                  pointsRequired: e.target.checked ? formData.pointsRequired : "",
                })
              }
              className="mt-0.5 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <div className="flex-1">
              <label
                htmlFor="isRedeemable"
                className="block text-sm font-medium text-gray-700 cursor-pointer"
              >
                Có thể đổi bằng điểm thưởng
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Khách hàng có thể dùng điểm tích lũy để đổi mã giảm giá này
              </p>
            </div>
          </div>

          {/* Số điểm yêu cầu */}
          {formData.isRedeemable && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điểm yêu cầu <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.pointsRequired}
                onChange={(e) =>
                  onChange({ ...formData, pointsRequired: e.target.value })
                }
                placeholder="VD: 20"
                min="1"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">
                Khách hàng cần có ít nhất số điểm này để đổi mã
              </p>
            </div>
          )}
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