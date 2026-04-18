import { useState } from "react";
import { FileText, Calendar, X, Gift } from "lucide-react";
import { type Invoice, formatCurrency } from "../../data/invoices";

interface InvoicesTabProps {
  invoices: Invoice[];
}

export function InvoicesTab({ invoices }: InvoicesTabProps) {
  const [filterDate, setFilterDate] = useState<string>("");

  const filteredInvoices = filterDate
    ? invoices.filter((invoice) => {
        const invoiceDate = new Date(invoice.createdAt).toISOString().split("T")[0];
        return invoiceDate === filterDate;
      })
    : invoices;

  const sortedInvoices = [...filteredInvoices].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (invoices.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="font-semibold text-gray-900 mb-2">Chưa có hóa đơn nào</h3>
        <p className="text-gray-600 mb-6">Bạn chưa có hóa đơn nào trong hệ thống</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Date Filter */}
      {invoices.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-orange-600" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Lọc theo ngày tạo hóa đơn
              </label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            {filterDate && (
              <button
                onClick={() => setFilterDate("")}
                className="mt-6 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Xóa bộ lọc"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {filterDate && (
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="text-gray-600">Hiển thị:</span>
              <span className="font-semibold text-orange-600">
                {filteredInvoices.length} hóa đơn
              </span>
              <span className="text-gray-500">vào ngày {new Date(filterDate).toLocaleDateString("vi-VN")}</span>
            </div>
          )}
        </div>
      )}

      {/* Invoice List */}
      <div className="space-y-4">
        {sortedInvoices.map((invoice) => (
          <div
            key={invoice.id}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-5 h-5 text-orange-600" />
                  <h4 className="font-bold text-gray-900">{invoice.invoiceNumber}</h4>
                </div>
                <p className="text-sm text-gray-600">
                  {new Date(invoice.createdAt).toLocaleDateString("vi-VN")} • {invoice.createdTime}
                </p>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      invoice.registrationType === "online"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {invoice.registrationType === "online" ? "Đăng ký online" : "Đăng ký tại quầy"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Tổng tiền</p>
                <p className="font-bold text-orange-600 text-xl">
                  {formatCurrency(invoice.finalAmount)}
                </p>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      invoice.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : invoice.paymentStatus === "free"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {invoice.paymentStatus === "paid"
                      ? "Đã thanh toán"
                      : invoice.paymentStatus === "free"
                      ? "Miễn phí"
                      : "Chờ thanh toán"}
                  </span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Dịch vụ:</p>
              <div className="space-y-2">
                {invoice.services.map((service, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">• {service.name}</span>
                    <span className="font-medium text-gray-900">{formatCurrency(service.price)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Machine Info */}
            <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-600 mb-1">Danh mục</p>
                <p className="text-sm font-medium text-gray-900">{invoice.category}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Bảo hành</p>
                <p className="text-sm font-medium text-gray-900">
                  {invoice.warranty === "con" ? "Còn bảo hành" : "Hết bảo hành"}
                </p>
              </div>
            </div>

            {/* Discount Info */}
            {invoice.discountCode && invoice.discountAmount > 0 && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-green-700 mb-0.5">Mã giảm giá</p>
                    <p className="text-sm font-bold text-green-800">{invoice.discountCode}</p>
                  </div>
                  <p className="text-sm font-bold text-green-700">
                    -{formatCurrency(invoice.discountAmount)}
                  </p>
                </div>
              </div>
            )}

            {/* Points Earned */}
            {invoice.pointsEarned && invoice.pointsEarned > 0 && (
              <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-orange-900">Điểm thưởng</span>
                </div>
                <span className="text-sm font-bold text-orange-600">
                  +{invoice.pointsEarned} điểm
                </span>
              </div>
            )}

            {/* Notes */}
            {invoice.notes && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-600 mb-1">Ghi chú:</p>
                <p className="text-sm text-gray-900">{invoice.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
