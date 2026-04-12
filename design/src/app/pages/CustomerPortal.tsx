import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Laptop, User, LogOut, Gift, FileText, Copy, Check, Calendar, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import CustomerMachineCard from "../components/CustomerMachineCard";
import { getMachines, type Machine } from "../data/machines";
import { getCustomers, saveCustomers, type Customer } from "../data/customers";
import { getCustomerPointHistory, addPointHistory, type PointHistory } from "../data/points";
import { getDiscounts, type DiscountCode } from "../data/discounts";
import { getInvoicesByPhone, type Invoice, formatCurrency } from "../data/invoices";
import { 
  getCustomerRedeemedVouchers, 
  addRedeemedVoucher, 
  isVoucherRedeemedByCustomer,
  type RedeemedVoucher 
} from "../data/redeemed-vouchers";
import { toast } from "sonner";

export default function CustomerPortal() {
  const [customerPhone, setCustomerPhone] = useState("");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [pointHistory, setPointHistory] = useState<PointHistory[]>([]);
  const [redeemableVouchers, setRedeemableVouchers] = useState<DiscountCode[]>([]);
  const [redeemedVouchers, setRedeemedVouchers] = useState<RedeemedVoucher[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [machineFilterDate, setMachineFilterDate] = useState<string>("");
  const [invoiceFilterDate, setInvoiceFilterDate] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem("customer_auth");
    if (!auth) {
      navigate("/customer/login");
      return;
    }

    try {
      const { phone } = JSON.parse(auth);
      setCustomerPhone(phone);

      // Get customer data
      const customers = getCustomers();
      const foundCustomer = customers.find((c) => c.phone === phone);
      if (foundCustomer) {
        setCustomer(foundCustomer);

        // Get customer's machines
        const allMachines = getMachines();
        const customerMachines = allMachines.filter((m) => m.phone === phone);
        setMachines(customerMachines);

        // Get point history
        const history = getCustomerPointHistory(phone);
        setPointHistory(history);

        // Get redeemable vouchers
        const allDiscounts = getDiscounts();
        const redeemable = allDiscounts.filter(
          (d) => d.isRedeemable && d.pointsRequired && d.pointsRequired <= foundCustomer.points
        );
        setRedeemableVouchers(redeemable);

        // Get customer's invoices
        const customerInvoices = getInvoicesByPhone(phone);
        setInvoices(customerInvoices);

        // Get redeemed vouchers
        const redeemed = getCustomerRedeemedVouchers(phone);
        setRedeemedVouchers(redeemed);
      }
    } catch (error) {
      navigate("/customer/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("customer_auth");
    navigate("/customer/login");
  };

  const handleRedeemVoucher = (voucher: DiscountCode) => {
    if (!customer || !voucher.pointsRequired) return;

    if (customer.points < voucher.pointsRequired) {
      toast.error("Bạn không đủ điểm để đổi voucher này");
      return;
    }

    // Check if already redeemed
    if (isVoucherRedeemedByCustomer(customerPhone, voucher.code)) {
      toast.error("Bạn đã đổi voucher này rồi");
      return;
    }

    // Add redeemed voucher
    const redeemedVoucher: RedeemedVoucher = {
      id: `RV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      customerPhone: customer.phone,
      customerName: customer.name,
      voucherCode: voucher.code,
      voucherName: voucher.description || voucher.code,
      pointsSpent: voucher.pointsRequired,
      redeemedAt: new Date().toISOString(),
    };
    addRedeemedVoucher(redeemedVoucher);

    // Add point history (spend points)
    const pointHistoryEntry: PointHistory = {
      id: `PH-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      customerPhone: customer.phone,
      customerName: customer.name,
      type: "spend",
      points: voucher.pointsRequired,
      date: new Date().toISOString(),
      description: `Đổi voucher ${voucher.code}`,
      relatedId: voucher.id,
    };
    addPointHistory(pointHistoryEntry);

    // Update customer points
    const customers = getCustomers();
    const customerIndex = customers.findIndex((c) => c.phone === customerPhone);
    if (customerIndex !== -1) {
      customers[customerIndex].points -= voucher.pointsRequired;
      saveCustomers(customers);
      setCustomer(customers[customerIndex]);
    }

    // Update local state
    setRedeemedVouchers([...redeemedVouchers, redeemedVoucher]);
    const updatedHistory = getCustomerPointHistory(customerPhone);
    setPointHistory(updatedHistory);

    toast.success(`Đã đổi voucher ${voucher.code} thành công!`);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Đã sao chép mã voucher!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Filter machines by date
  const filteredMachines = machineFilterDate
    ? machines.filter((machine) => {
        const machineDate = new Date(machine.time).toISOString().split("T")[0];
        return machineDate === machineFilterDate;
      })
    : machines;

  // Filter invoices by date
  const filteredInvoices = invoiceFilterDate
    ? invoices.filter((invoice) => {
        const invoiceDate = new Date(invoice.createdAt).toISOString().split("T")[0];
        return invoiceDate === invoiceFilterDate;
      })
    : invoices;

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-gray-900">Xin chào, {customer.name}</h1>
              <p className="text-sm text-gray-600">{customer.phone}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Đăng xuất</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Tabs defaultValue="machines" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="machines" className="flex items-center gap-2">
              <Laptop className="w-4 h-4" />
              Máy của tôi
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Hóa đơn
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Thông tin cá nhân
            </TabsTrigger>
          </TabsList>

          {/* Machines Tab */}
          <TabsContent value="machines" className="space-y-6">
            {/* Date Filter */}
            {machines.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Lọc theo ngày đăng ký
                    </label>
                    <input
                      type="date"
                      value={machineFilterDate}
                      onChange={(e) => setMachineFilterDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  {machineFilterDate && (
                    <button
                      onClick={() => setMachineFilterDate("")}
                      className="mt-6 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Xóa bộ lọc"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                {machineFilterDate && (
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Hiển thị:</span>
                    <span className="font-semibold text-orange-600">
                      {filteredMachines.length} máy
                    </span>
                    <span className="text-gray-500">vào ngày {new Date(machineFilterDate).toLocaleDateString("vi-VN")}</span>
                  </div>
                )}
              </div>
            )}

            {filteredMachines.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                <Laptop className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {machineFilterDate ? "Không có máy nào" : "Chưa có máy nào"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {machineFilterDate 
                    ? `Không có máy nào đăng ký vào ngày ${new Date(machineFilterDate).toLocaleDateString("vi-VN")}`
                    : "Bạn chưa đăng ký sửa chữa máy nào"
                  }
                </p>
                {!machineFilterDate && (
                  <button
                    onClick={() => navigate("/dang-ky-dich-vu")}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
                  >
                    <Laptop className="w-5 h-5" />
                    Đăng ký sửa máy ngay
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid gap-4">
                  {filteredMachines.map((machine) => (
                    <CustomerMachineCard key={machine.id} machine={machine} />
                  ))}
                </div>

                {/* Add new machine button */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-dashed border-orange-300 hover:border-orange-400 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Cần sửa máy khác?</h4>
                      <p className="text-sm text-gray-600">Đăng ký thêm máy mới để được hỗ trợ</p>
                    </div>
                    <button
                      onClick={() => navigate("/dang-ky-dich-vu")}
                      className="px-5 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
                    >
                      <Laptop className="w-4 h-4" />
                      Đăng ký ngay
                    </button>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
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
                      value={invoiceFilterDate}
                      onChange={(e) => setInvoiceFilterDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  {invoiceFilterDate && (
                    <button
                      onClick={() => setInvoiceFilterDate("")}
                      className="mt-6 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Xóa bộ lọc"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                {invoiceFilterDate && (
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Hiển thị:</span>
                    <span className="font-semibold text-orange-600">
                      {filteredInvoices.length} hóa đơn
                    </span>
                    <span className="text-gray-500">vào ngày {new Date(invoiceFilterDate).toLocaleDateString("vi-VN")}</span>
                  </div>
                )}
              </div>
            )}

            {filteredInvoices.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {invoiceFilterDate ? "Không có hóa đơn nào" : "Chưa có hóa đơn nào"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {invoiceFilterDate 
                    ? `Không có hóa đơn nào vào ngày ${new Date(invoiceFilterDate).toLocaleDateString("vi-VN")}`
                    : "Bạn chưa có hóa đơn nào trong hệ thống"
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInvoices
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((invoice) => (
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
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
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
                    const isRedeemed = isVoucherRedeemedByCustomer(customerPhone, voucher.code);
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
                                  redeemedVouchers.find((rv) => rv.voucherCode === voucher.code)?.redeemedAt || ""
                                ).toLocaleDateString("vi-VN")}`
                              : `Cần ${voucher.pointsRequired} điểm`}
                          </p>
                        </div>
                        {!isRedeemed && (
                          <button
                            onClick={() => handleRedeemVoucher(voucher)}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}