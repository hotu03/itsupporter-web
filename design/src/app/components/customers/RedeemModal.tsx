import { useState, useEffect } from "react";
import { X, Gift, Star, Award } from "lucide-react";
import type { Customer } from "../../data/customers";
import type { DiscountCode } from "../../data/discounts";
import { getFirestoreDiscounts } from "../../data/firestoreDiscounts";
import { formatCurrency } from "../../data/points";

interface RedeemModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onRedeem: (discountId: string) => void;
}

export function RedeemModal({ customer, isOpen, onClose, onRedeem }: RedeemModalProps) {
  const [redeemable, setRedeemable] = useState<DiscountCode[]>([]);

  useEffect(() => {
    if (!isOpen || !customer) return;

    getFirestoreDiscounts()
      .then(discounts => {
        const redeemableDiscounts = discounts.filter((d: DiscountCode) => d.isRedeemable && d.pointsRequired);
        setRedeemable(redeemableDiscounts);
      })
      .catch(err => {
        console.error("Error loading discounts:", err);
        setRedeemable([]);
      });
  }, [isOpen, customer]);

  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Đổi điểm thưởng</h2>
            <p className="text-sm text-gray-500 mt-0.5">{customer.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Current Points */}
        <div className="px-6 py-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Award size={24} className="text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Điểm hiện tại</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customer.points} <span className="text-base font-normal text-gray-500">điểm</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Redeemable Codes */}
        <div className="p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Mã giảm giá có thể đổi</h3>
          <div className="space-y-3">
            {redeemable.length === 0 ? (
              <div className="text-center py-8">
                <Gift size={32} className="text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Chưa có mã giảm giá nào để đổi</p>
                <p className="text-xs text-gray-400 mt-1">Vui lòng thêm mã giảm giá đổi điểm trong trang Tài chính</p>
              </div>
            ) : (
              redeemable.map((discount) => {
                const canRedeem = customer.points >= (discount.pointsRequired || 0);
                const isAvailable = discount.usageCount < discount.usageLimit;
                const now = new Date();
                const validFrom = new Date(discount.validFrom);
                const validUntil = new Date(discount.validUntil);
                const isValid = now >= validFrom && now <= validUntil;
                const isEnabled = canRedeem && isAvailable && isValid;

                return (
                  <div
                    key={discount.id}
                    className={`border rounded-xl p-4 transition-all ${
                      isEnabled
                        ? "border-orange-200 bg-orange-50/50"
                        : "border-gray-200 bg-gray-50/50 opacity-60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-bold text-orange-600">
                            {discount.code}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Star size={12} className="fill-yellow-500 text-yellow-500" />
                            {discount.pointsRequired} điểm
                          </span>
                        </div>
                        {discount.description && (
                          <p className="text-sm text-gray-600 mb-2">{discount.description}</p>
                        )}
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                          <span>Giảm {discount.discountPercent}%</span>
                          <span>Tối đa {formatCurrency(discount.maxDiscount)}</span>
                          <span>Còn {discount.usageLimit - discount.usageCount}/{discount.usageLimit} lượt</span>
                        </div>
                        {!isValid && (
                          <p className="text-xs text-red-500 mt-2">
                            {now < validFrom
                              ? `Chưa có hiệu lực (từ ${validFrom.toLocaleDateString("vi-VN")})`
                              : `Đã hết hạn (đến ${validUntil.toLocaleDateString("vi-VN")})`}
                          </p>
                        )}
                        {!isAvailable && isValid && (
                          <p className="text-xs text-red-500 mt-2">Đã hết lượt sử dụng</p>
                        )}
                      </div>
                      <button
                        onClick={() => onRedeem(discount.id)}
                        disabled={!isEnabled}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isEnabled
                            ? "bg-orange-500 text-white hover:bg-orange-600 shadow-sm"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <Gift size={16} />
                        {canRedeem ? "Đổi ngay" : "Chưa đủ điểm"}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
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
