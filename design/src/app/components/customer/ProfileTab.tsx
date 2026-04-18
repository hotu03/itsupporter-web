import { useState } from "react";
import { Gift, Copy, Check } from "lucide-react";
import type { Customer } from "../../data/customers";
import type { DiscountCode } from "../../data/discounts";
import type { RedeemedVoucher } from "../../data/redeemed-vouchers";
import type { PointHistory } from "../../data/points";

interface ProfileTabProps {
  customer: Customer;
  redeemableVouchers: DiscountCode[];
  redeemedVouchers: RedeemedVoucher[];
  pointHistory: PointHistory[];
  onRedeem: (voucher: DiscountCode) => void;
}

export function ProfileTab({
  customer,
  redeemableVouchers,
  redeemedVouchers,
  pointHistory,
  onRedeem,
}: ProfileTabProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Customer Info Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Thông tin cá nhân</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Họ tên</span>
            <span className="font-medium text-gray-900">{customer.name}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Số điện thoại</span>
            <span className="font-medium text-gray-900">{customer.phone}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Email</span>
            <span className="font-medium text-gray-900">{customer.email}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Tổng số lần sửa</span>
            <span className="font-medium text-gray-900">{customer.totalRepairs} lần</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Điểm tích lũy</span>
            <span className="font-bold text-orange-600 text-lg">{customer.points} điểm</span>
          </div>
        </div>
      </div>

      {/* Voucher Redemption */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="w-5 h-5 text-orange-600" />
          <h3 className="font-semibold text-gray-900">Đổi voucher</h3>
        </div>

        {redeemableVouchers.length === 0 ? (
          <div className="text-center py-8">
            <Gift className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 mb-2">Chưa có voucher khả dụng</p>
            <p className="text-sm text-gray-500">
              Tích thêm điểm để đổi voucher giảm giá
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {redeemableVouchers.map((voucher) => {
              const isRedeemed = redeemedVouchers.some(
                (rv) => rv.voucherCode === voucher.code
              );
              return (
                <div
                  key={voucher.id}
                  className={`border rounded-lg p-4 flex items-center justify-between transition-colors ${
                    isRedeemed
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {isRedeemed ? (
                        <div className="flex items-center gap-2">
                          <span
                            className="font-bold text-orange-600 select-all cursor-pointer"
                            onClick={() => handleCopyCode(voucher.code)}
                          >
                            {voucher.code}
                          </span>
                          <button
                            onClick={() => handleCopyCode(voucher.code)}
                            className="p-1 hover:bg-orange-100 rounded transition-colors"
                            title="Sao chép mã"
                          >
                            {copiedCode === voucher.code ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-orange-600" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span
                          className="font-bold text-orange-600 select-none"
                          style={{
                            filter: "blur(4px)",
                            userSelect: "none",
                            pointerEvents: "none",
                          }}
                        >
                          {voucher.code}
                        </span>
                      )}
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                        -{voucher.discountPercent}%
                      </span>
                      {isRedeemed && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Đã đổi
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{voucher.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {isRedeemed
                        ? `Đã đổi ${new Date(
                            redeemedVouchers.find((rv) => rv.voucherCode === voucher.code)
                              ?.redeemedAt || ""
                          ).toLocaleDateString("vi-VN")}`
                        : `Cần ${voucher.pointsRequired} điểm`}
                    </p>
                  </div>
                  {!isRedeemed && (
                    <button
                      onClick={() => onRedeem(voucher)}
                      disabled={customer.points < (voucher.pointsRequired || 0)}
                      className="ml-4 px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Đổi
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Point History */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Lịch sử điểm</h3>

        {pointHistory.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Chưa có lịch sử tích điểm</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pointHistory.slice(0, 10).map((history) => (
              <div
                key={history.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{history.description}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(history.date).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <span
                  className={`font-semibold ${
                    history.type === "earn" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {history.type === "earn" ? "+" : "-"}
                  {history.points} điểm
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
