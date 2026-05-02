import { useState, useEffect } from "react";
import { Gift, Copy, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import type { Customer } from "../../data/customers";
import type { DiscountCode } from "../../data/discounts";
import { refundExpiredVoucher, type RedeemedVoucher, type VoucherWithStatus } from "../../data/firestoreRedeemedVouchers";
import type { PointHistory } from "../../data/points";
import { getCustomerVouchersWithStatus } from "../../data/firestoreRedeemedVouchers";
import { Pagination, usePagination } from "../Pagination";

interface ProfileTabProps {
  customer: Customer;
  redeemableVouchers: DiscountCode[];
  redeemedVouchers: RedeemedVoucher[];
  vouchersWithStatus: VoucherWithStatus[];
  pointHistory: PointHistory[];
  onRedeem: (voucher: DiscountCode) => void;
}

export function ProfileTab({
  customer,
  redeemableVouchers,
  redeemedVouchers,
  vouchersWithStatus,
  pointHistory,
  onRedeem,
}: ProfileTabProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [refundingId, setRefundingId] = useState<string | null>(null);
  const [vouchers, setVouchers] = useState<VoucherWithStatus[]>(vouchersWithStatus);
  const [voucherFilter, setVoucherFilter] = useState<'all' | 'available' | 'expired'>('all');
  const redeemPagination = usePagination(5);
  const voucherPagination = usePagination(5);
  const historyPagination = usePagination(10);

  const filteredVouchers = vouchers.filter((v) => {
    if (voucherFilter === 'available') return v.status === 'available';
    if (voucherFilter === 'expired') return v.status === 'expired' || v.status === 'used' || v.status === 'out_of_uses';
    return true;
  });

  useEffect(() => {
    setVouchers(vouchersWithStatus);
  }, [vouchersWithStatus]);

  useEffect(() => {
    voucherPagination.resetPage();
  }, [vouchersWithStatus.length, voucherFilter]);

  useEffect(() => {
    historyPagination.resetPage();
  }, [pointHistory.length]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleRefund = async (voucher: VoucherWithStatus) => {
    const refundAmount = Math.floor(voucher.pointsSpent * (2 / 3));
    if (!confirm(`Hoàn ${refundAmount} điểm cho voucher ${voucher.voucherCode}?`)) return;

    setRefundingId(voucher.id);
    try {
      const result = await refundExpiredVoucher(voucher.id, customer.phone);
      if (result.success) {
        toast.success(`Đã hoàn ${result.refundPoints} điểm cho voucher ${voucher.voucherCode}`);
        const updated = await getCustomerVouchersWithStatus(customer.phone);
        setVouchers(updated);
      } else {
        toast.error(result.error || 'Không thể hoàn điểm');
      }
    } catch (error) {
      toast.error('Không thể hoàn điểm: ' + (error instanceof Error ? error.message : 'Lỗi không xác định'));
    } finally {
      setRefundingId(null);
    }
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
          <>
            <div className="space-y-3">
              {redeemPagination.paginate(redeemableVouchers).map((voucher) => {
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
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        <span>Giảm tối đa: {voucher.maxDiscount?.toLocaleString("vi-VN")}đ</span>
                        <span>•</span>
                        <span>Hết hạn: {new Date(voucher.validUntil).toLocaleDateString("vi-VN")}</span>
                      </div>
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
            <Pagination
              total={redeemableVouchers.length}
              page={redeemPagination.page}
              pageSize={redeemPagination.pageSize}
              onPageChange={redeemPagination.handlePageChange}
              onPageSizeChange={redeemPagination.handlePageSizeChange}
            />
          </>
        )}
      </div>

      {/* Redeemed Vouchers with Status */}
      {vouchersWithStatus.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Voucher của tôi</h3>
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              {(['all', 'available', 'expired'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setVoucherFilter(filter)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    voucherFilter === filter
                      ? "bg-white text-orange-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {filter === 'all' ? 'Tất cả' : filter === 'available' ? 'Sử dụng được' : 'Hết hạn'}
                </button>
              ))}
            </div>
          </div>
          {filteredVouchers.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              Không có voucher nào
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {voucherPagination.paginate(filteredVouchers).map((voucher) => {
                  const isAvailable = voucher.status === 'available';
                  const refundAmount = Math.floor(voucher.pointsSpent * (2/3));
                  const isRefundable = voucher.status === 'expired' && refundAmount > 0;
                  return (
                    <div
                      key={voucher.id}
                      className={`border rounded-lg p-4 flex items-center justify-between transition-colors ${
                        isAvailable
                          ? "border-green-300 bg-green-50"
                          : "border-red-200 bg-red-50"
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="font-bold text-orange-600 select-all cursor-pointer"
                            onClick={() => handleCopyCode(voucher.voucherCode)}
                          >
                            {voucher.voucherCode}
                          </span>
                          <button
                            onClick={() => handleCopyCode(voucher.voucherCode)}
                            className="p-1 hover:bg-orange-100 rounded transition-colors"
                            title="Sao chép mã"
                          >
                            {copiedCode === voucher.voucherCode ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-orange-600" />
                            )}
                          </button>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            isAvailable
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                            {voucher.statusLabel}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{voucher.voucherName}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <span>-{voucher.discountPercent}% (tối đa {voucher.maxDiscount?.toLocaleString("vi-VN")}đ)</span>
                          <span>•</span>
                          <span>Hết hạn: {voucher.validUntil ? new Date(voucher.validUntil).toLocaleDateString("vi-VN") : 'N/A'}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {voucher.usedAt
                            ? `Đã dùng: ${new Date(voucher.usedAt).toLocaleDateString("vi-VN")}`
                            : `Đổi ngày: ${new Date(voucher.redeemedAt).toLocaleDateString("vi-VN")}`}
                        </p>
                      </div>
                      {isRefundable && (
                        <button
                          onClick={() => handleRefund(voucher)}
                          disabled={refundingId === voucher.id}
                          className="flex items-center gap-1 px-3 py-1.5 bg-orange-500 text-white text-xs font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-3"
                        >
                          <RefreshCw size={12} className={refundingId === voucher.id ? "animate-spin" : ""} />
                          Hoàn {refundAmount} điểm
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <Pagination
                total={filteredVouchers.length}
                page={voucherPagination.page}
                pageSize={voucherPagination.pageSize}
                onPageChange={voucherPagination.handlePageChange}
                onPageSizeChange={voucherPagination.handlePageSizeChange}
              />
            </>
          )}
        </div>
      )}

      {/* Point History */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Lịch sử điểm</h3>

        {pointHistory.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Chưa có lịch sử tích điểm</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {historyPagination.paginate(pointHistory).map((history) => (
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
            <Pagination
              total={pointHistory.length}
              page={historyPagination.page}
              pageSize={historyPagination.pageSize}
              onPageChange={historyPagination.handlePageChange}
              onPageSizeChange={historyPagination.handlePageSizeChange}
            />
          </>
        )}
      </div>
    </div>
  );
}