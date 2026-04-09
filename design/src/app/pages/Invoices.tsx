import { useState, useEffect } from "react";
import { Search, FileText, Calendar, User, Phone, DollarSign, Download, Eye, Filter } from "lucide-react";
import { getInvoices, formatCurrency, type Invoice } from "../data/invoices";

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "online" | "in-person">("all");
  const [filterPayment, setFilterPayment] = useState<"all" | "paid" | "pending" | "free">("all");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = () => {
    const data = getInvoices();
    // Sort by created date (newest first)
    data.sort((a, b) => {
      const dateA = new Date(a.createdAt.split("/").reverse().join("-"));
      const dateB = new Date(b.createdAt.split("/").reverse().join("-"));
      return dateB.getTime() - dateA.getTime();
    });
    setInvoices(data);
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.customerName.toLowerCase().includes(search.toLowerCase()) ||
      invoice.phone.includes(search) ||
      invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === "all" || invoice.registrationType === filterType;
    const matchesPayment = filterPayment === "all" || invoice.paymentStatus === filterPayment;

    return matchesSearch && matchesType && matchesPayment;
  });

  const getPaymentStatusBadge = (status: "paid" | "pending" | "free") => {
    const styles = {
      paid: "bg-green-100 text-green-700 border-green-200",
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      free: "bg-blue-100 text-blue-700 border-blue-200",
    };
    const labels = {
      paid: "Đã thanh toán",
      pending: "Chưa thanh toán",
      free: "Miễn phí",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getRegistrationTypeBadge = (type: "online" | "in-person") => {
    return type === "online" ? (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
        Trực tuyến
      </span>
    ) : (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
        Trực tiếp
      </span>
    );
  };

  const handlePrintInvoice = (invoice: Invoice) => {
    // Create a printable version of the invoice
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Hóa đơn ${invoice.invoiceNumber}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #f97316;
              padding-bottom: 20px;
              margin-bottom: 20px;
            }
            .header h1 {
              color: #f97316;
              margin: 0;
            }
            .section {
              margin-bottom: 20px;
            }
            .section-title {
              font-weight: bold;
              color: #374151;
              margin-bottom: 10px;
              text-transform: uppercase;
              font-size: 14px;
            }
            .info-row {
              display: flex;
              margin-bottom: 8px;
            }
            .info-label {
              width: 200px;
              color: #6b7280;
              font-size: 14px;
            }
            .info-value {
              color: #111827;
              font-weight: 600;
              font-size: 14px;
            }
            .services-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            .services-table th,
            .services-table td {
              border: 1px solid #e5e7eb;
              padding: 8px;
              text-align: left;
            }
            .services-table th {
              background-color: #f3f4f6;
              font-weight: 600;
            }
            .total-section {
              margin-top: 20px;
              border-top: 2px solid #f97316;
              padding-top: 10px;
            }
            .total-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
            }
            .final-amount {
              font-size: 20px;
              font-weight: bold;
              color: #f97316;
            }
            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>CLB Hỗ trợ Kỹ thuật IT Supporter</h1>
            <p>HÓA ĐƠN DỊCH VỤ</p>
            <p>Mã hóa đơn: ${invoice.invoiceNumber}</p>
          </div>

          <div class="section">
            <div class="section-title">Thông tin hóa đơn</div>
            <div class="info-row">
              <div class="info-label">Ngày tạo:</div>
              <div class="info-value">${invoice.createdAt} - ${invoice.createdTime}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Loại đăng ký:</div>
              <div class="info-value">${invoice.registrationType === "online" ? "Trực tuyến" : "Trực tiếp"}</div>
            </div>
            ${invoice.createdBy ? `
            <div class="info-row">
              <div class="info-label">Người tạo:</div>
              <div class="info-value">${invoice.createdBy}</div>
            </div>
            ` : ""}
          </div>

          <div class="section">
            <div class="section-title">Thông tin khách hàng</div>
            <div class="info-row">
              <div class="info-label">Họ và tên:</div>
              <div class="info-value">${invoice.customerName}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Số điện thoại:</div>
              <div class="info-value">${invoice.phone}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Bảo hành:</div>
              <div class="info-value">${invoice.warranty === "con" ? "Còn bảo hành" : "Hết bảo hành"}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Mang sạc:</div>
              <div class="info-value">${invoice.charger ? "Có" : "Không"}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Category:</div>
              <div class="info-value">${invoice.category}</div>
            </div>
          </div>

          ${invoice.machineCondition || invoice.needs ? `
          <div class="section">
            ${invoice.machineCondition ? `
            <div class="info-row">
              <div class="info-label">Tình trạng máy:</div>
              <div class="info-value">${invoice.machineCondition}</div>
            </div>
            ` : ""}
            ${invoice.needs ? `
            <div class="info-row">
              <div class="info-label">Nhu cầu:</div>
              <div class="info-value">${invoice.needs}</div>
            </div>
            ` : ""}
          </div>
          ` : ""}

          <div class="section">
            <div class="section-title">Dịch vụ</div>
            ${invoice.services.length > 0 ? `
            <table class="services-table">
              <thead>
                <tr>
                  <th>Tên dịch vụ</th>
                  <th style="text-align: right;">Đơn giá</th>
                </tr>
              </thead>
              <tbody>
                ${invoice.services.map(service => `
                <tr>
                  <td>${service.name}</td>
                  <td style="text-align: right;">${service.price === 0 ? "Miễn phí" : formatCurrency(service.price)}</td>
                </tr>
                `).join("")}
              </tbody>
            </table>
            ` : "<p>Chưa chọn dịch vụ nào</p>"}
          </div>

          <div class="total-section">
            <div class="total-row">
              <span>Tổng tiền dịch vụ:</span>
              <span>${formatCurrency(invoice.serviceAmount)}</span>
            </div>
            ${invoice.discountAmount > 0 ? `
            <div class="total-row">
              <span>Giảm giá (${invoice.discountCode}):</span>
              <span>- ${formatCurrency(invoice.discountAmount)}</span>
            </div>
            ` : ""}
            <div class="total-row" style="margin-top: 10px;">
              <span style="font-weight: bold;">Thành tiền:</span>
              <span class="final-amount">${invoice.finalAmount === 0 ? "Miễn phí" : formatCurrency(invoice.finalAmount)}</span>
            </div>
            ${invoice.pointsEarned && invoice.pointsEarned > 0 ? `
            <div class="total-row" style="margin-top: 10px; color: #f97316;">
              <span>Điểm thưởng:</span>
              <span style="font-weight: bold;">+${invoice.pointsEarned} điểm</span>
            </div>
            ` : ""}
          </div>

          <div class="section" style="margin-top: 40px; text-align: center; color: #6b7280; font-size: 12px;">
            <p>Cảm ơn quý khách đã sử dụng dịch vụ của CLB Hỗ trợ Kỹ thuật IT Supporter</p>
            <p>Hotline: 0123-456-789 | Email: support@itsupporter.vn</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Quản lý hóa đơn</h1>
            <p className="text-sm text-gray-500 mt-1">Danh sách hóa đơn khách hàng</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 px-4 py-2 rounded-lg">
              <p className="text-sm font-semibold text-orange-600">
                Tổng: {filteredInvoices.length} hóa đơn
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Search and filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo tên, SĐT, mã hóa đơn..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as "all" | "online" | "in-person")}
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="all">Tất cả loại</option>
              <option value="online">Trực tuyến</option>
              <option value="in-person">Trực tiếp</option>
            </select>

            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value as "all" | "paid" | "pending" | "free")}
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="paid">Đã thanh toán</option>
              <option value="pending">Chưa thanh toán</option>
              <option value="free">Miễn phí</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoice list */}
      <div className="flex-1 p-6">
        {filteredInvoices.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Không tìm thấy hóa đơn nào</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Mã hóa đơn</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Khách hàng</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ngày tạo</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Loại</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tổng tiền</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-orange-500" />
                        <span className="text-sm font-semibold text-gray-900">{invoice.invoiceNumber}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{invoice.customerName}</span>
                        <span className="text-xs text-gray-500">{invoice.phone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={14} className="text-gray-400" />
                        {invoice.createdAt}
                      </div>
                    </td>
                    <td className="px-4 py-3">{getRegistrationTypeBadge(invoice.registrationType)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <DollarSign size={14} className="text-gray-400" />
                        <span className="text-sm font-semibold text-gray-900">
                          {invoice.finalAmount === 0 ? "Miễn phí" : formatCurrency(invoice.finalAmount)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{getPaymentStatusBadge(invoice.paymentStatus)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedInvoice(invoice)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handlePrintInvoice(invoice)}
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="In hóa đơn"
                        >
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invoice detail modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedInvoice(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-orange-500 px-6 py-4 rounded-t-2xl">
              <h2 className="text-xl font-bold text-white">Chi tiết hóa đơn</h2>
              <p className="text-orange-100 text-sm">{selectedInvoice.invoiceNumber}</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Thông tin chung */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase">Thông tin chung</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Ngày tạo</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedInvoice.createdAt} - {selectedInvoice.createdTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Loại đăng ký</p>
                    {getRegistrationTypeBadge(selectedInvoice.registrationType)}
                  </div>
                  {selectedInvoice.createdBy && (
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">Người tạo</p>
                      <p className="text-sm font-semibold text-gray-800">{selectedInvoice.createdBy}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Thông tin khách hàng */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase">Thông tin khách hàng</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Họ và tên</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedInvoice.customerName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Số điện thoại</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedInvoice.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Bảo hành</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {selectedInvoice.warranty === "con" ? "Còn bảo hành" : "Hết bảo hành"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Mang sạc</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedInvoice.charger ? "Có" : "Không"}</p>
                  </div>
                </div>
              </div>

              {/* Dịch vụ */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase">Dịch vụ</h3>
                {selectedInvoice.services.length > 0 ? (
                  <div className="space-y-2">
                    {selectedInvoice.services.map((service, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-700">{service.name}</span>
                        <span className="text-sm font-semibold text-gray-800">
                          {service.price === 0 ? "Miễn phí" : formatCurrency(service.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">Chưa chọn dịch vụ nào</p>
                )}
              </div>

              {/* Thanh toán */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase">Thanh toán</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tổng tiền dịch vụ:</span>
                    <span className="text-sm font-semibold text-gray-800">{formatCurrency(selectedInvoice.serviceAmount)}</span>
                  </div>
                  {selectedInvoice.discountAmount > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600">Giảm giá ({selectedInvoice.discountCode}):</span>
                      <span className="text-sm font-semibold text-green-600">- {formatCurrency(selectedInvoice.discountAmount)}</span>
                    </div>
                  )}
                  <div className="border-t-2 border-orange-500 pt-3 mt-3 flex items-center justify-between">
                    <span className="text-base font-bold text-gray-800">Thành tiền:</span>
                    <span className="text-xl font-bold text-orange-600">
                      {selectedInvoice.finalAmount === 0 ? "Miễn phí" : formatCurrency(selectedInvoice.finalAmount)}
                    </span>
                  </div>
                  {selectedInvoice.pointsEarned && selectedInvoice.pointsEarned > 0 && (
                    <div className="flex items-center justify-between text-orange-600">
                      <span className="text-sm font-medium">Điểm thưởng:</span>
                      <span className="text-sm font-bold">+{selectedInvoice.pointsEarned} điểm</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-2xl flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Đóng
              </button>
              <button
                onClick={() => handlePrintInvoice(selectedInvoice)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <Download size={16} />
                In hóa đơn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
