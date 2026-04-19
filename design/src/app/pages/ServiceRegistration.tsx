import { useState, useRef, useEffect } from "react";
import {
  CheckCircle2,
  Printer,
    ArrowLeft,
  QrCode,
    Package,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { getServices, formatCurrency as formatCurr } from "../data/services";
import { validateDiscount, useDiscount } from "../data/discounts";
import { addFirestoreMachine } from "../data/firestoreMachines";
import { registerCustomer } from "../data/customers";
import { addTransaction } from "../data/finance";
import { calculatePoints } from "../data/points";
import { addInvoice } from "../data/invoices";
import { createFirebaseCustomer, sendCustomerPasswordReset } from "../data/firebase-auth";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ServiceRegistrationForm {
  customerName: string;
  customerEmail: string;
  phone: string;
  machineCondition: string;
  warranty: "con" | "het";
  needs: string;
  password: string;
  charger: "co" | "khong";
  appointmentTime: string;
  dropOffTime: string;
  category: string;
  additionalServices: string[];
  serviceAmount: number;
  discountCode: string;
  discountAmount: number;
  finalAmount: number;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ServiceRegistration() {
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptId, setReceiptId] = useState<number>(0);
  const receiptRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<ServiceRegistrationForm>({
    customerName: "",
    customerEmail: "",
    phone: "",
    machineCondition: "",
    warranty: "het",
    needs: "",
    password: "",
    charger: "khong",
    appointmentTime: "",
    dropOffTime: "",
    category: "Hardware",
    additionalServices: [],
    serviceAmount: 0,
    discountCode: "",
    discountAmount: 0,
    finalAmount: 0,
  });

  const [discountError, setDiscountError] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const availableServices = getServices();

  // Auto-calculate service amount
  useEffect(() => {
    const total = form.additionalServices.reduce((sum, serviceName) => {
      const service = availableServices.find(s => s.name === serviceName);
      return sum + (service?.price || 0);
    }, 0);
    setForm(prev => ({ ...prev, serviceAmount: total }));
  }, [form.additionalServices, availableServices]);

  // Auto-calculate final amount
  useEffect(() => {
    const final = Math.max(0, form.serviceAmount - form.discountAmount);
    setForm(prev => ({ ...prev, finalAmount: final }));
  }, [form.serviceAmount, form.discountAmount]);

  const set = <K extends keyof ServiceRegistrationForm>(key: K, value: ServiceRegistrationForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyDiscount = () => {
    const result = validateDiscount(form.discountCode, form.serviceAmount);
    if (!result.valid) {
      setDiscountError(result.error || "Mã giảm giá không hợp lệ");
      setDiscountApplied(false);
      set("discountAmount", 0);
      return;
    }
    useDiscount(form.discountCode);
    set("discountAmount", result.discountAmount ?? 0);
    setDiscountError("");
    setDiscountApplied(true);
  };

  const handleSubmit = async () => {
    if (!form.customerName || !form.phone || !form.customerEmail) {
      alert("Vui lòng điền đầy đủ thông tin khách hàng (tên, email, SĐT)!");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.customerEmail)) {
      alert("Vui lòng nhập email hợp lệ!");
      return;
    }

    // Calculate points for this service
    const pointsEarned = calculatePoints(form.finalAmount);

    // Create the current timestamp
    const now = new Date();
    const currentTime = now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) + " " + now.toLocaleDateString("vi-VN").replace(/\//g, "/");
    // Use ISO date format for storage (parseable by new Date())
    const currentDate = now.toISOString().split("T")[0];

    // Calculate expiry time (3 hours from now by default)
    const expiry = new Date(now.getTime() + 3 * 60 * 60 * 1000);
    const expiryTime = expiry.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

    // Build service names from selected additionalServices (NOT needs which is free text)
    const serviceNames = form.additionalServices.length > 0
      ? form.additionalServices.join(", ")
      : (form.needs || "Dịch vụ khác");

    // Add machine to system with WAITING status (online registration)
    const id = await addFirestoreMachine({
      status: "WAITING",
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      phone: form.phone,
      time: currentTime,
      description: serviceNames,
      expired: form.appointmentTime || expiryTime,
      category: form.category,
      tester: "",
      technician: "",
      warranty: form.warranty,
      password: form.password,
      charger: form.charger === "co",
      appointmentTime: form.appointmentTime,
      dropOffTime: form.dropOffTime || undefined,
      testerBefore: "",
      testerAfter: "",
      registrationType: "online", // Đăng ký trực tuyến
      isApproved: false, // Chưa duyệt
      machineCondition: form.machineCondition,
      needs: form.needs,
      additionalServices: form.additionalServices,
      serviceAmount: form.serviceAmount,
      discountCode: form.discountCode,
      discountAmount: form.discountAmount,
      paymentStatus: form.finalAmount === 0 ? "free" : "pending",
      finalAmount: form.finalAmount,
      pointsEarned: pointsEarned,
    });

    // Register customer record (no points yet — points awarded on approval)
    registerCustomer(form.customerName, form.phone, form.customerEmail);

    // Create Firebase Auth user with temporary password and send password reset email
    try {
      const tempPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      await createFirebaseCustomer(form.customerEmail, tempPassword);
      await sendCustomerPasswordReset(form.customerEmail);
      toast.success("Tài khoản đã được tạo! Vui lòng kiểm tra email để đặt mật khẩu.");
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        // User already exists in Firebase Auth, that's ok - just send reset email
        try {
          await sendCustomerPasswordReset(form.customerEmail);
          toast.success("Tài khoản đã tồn tại! Vui lòng kiểm tra email để đặt mật khẩu.");
        } catch {
          // Ignore email sending error
        }
      } else {
        console.error("Firebase Auth error:", err);
      }
    }

    // Add transaction to finance
    addTransaction({
      machineId: id,
      customerName: form.customerName,
      phone: form.phone,
      service: serviceNames,
      amount: form.finalAmount,
      paymentStatus: form.finalAmount === 0 ? "free" : "pending",
      date: currentDate,
      discountCode: form.discountCode || undefined,
      discountAmount: form.discountAmount > 0 ? form.discountAmount : undefined,
    });

    // Create invoice for online registration
    addInvoice({
      machineId: id,
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      phone: form.phone,
      registrationType: "online",
      services: form.additionalServices.map(serviceName => {
        const service = availableServices.find(s => s.name === serviceName);
        return {
          name: serviceName,
          price: service?.price || 0,
        };
      }),
      machineCondition: form.machineCondition,
      needs: form.needs,
      category: form.category,
      warranty: form.warranty,
      charger: form.charger === "co",
      password: form.password,
      createdAt: currentDate,
      createdTime: currentTime,
      dropOffTime: form.dropOffTime,
      appointmentTime: form.appointmentTime,
      serviceAmount: form.serviceAmount,
      discountCode: form.discountCode,
      discountAmount: form.discountAmount,
      finalAmount: form.finalAmount,
      paymentStatus: form.finalAmount === 0 ? "free" : "pending",
      pointsEarned: pointsEarned,
      createdBy: "Khách hàng (Online)",
    });

    // Generate receipt ID
    setReceiptId(Number(id));
    setShowReceipt(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNewRegistration = () => {
    setShowReceipt(false);
    setForm({
      customerName: "",
      customerEmail: "",
      phone: "",
      machineCondition: "",
      warranty: "het",
      needs: "",
      password: "",
      charger: "khong",
      appointmentTime: "",
      dropOffTime: "",
      category: "Hardware",
      additionalServices: [],
      serviceAmount: 0,
      discountCode: "",
      discountAmount: 0,
      finalAmount: 0,
    });
    setDiscountError("");
    setDiscountApplied(false);
  };

  if (showReceipt) {
    const currentDate = new Date().toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const currentTime = new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Print actions - hidden when printing */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between print:hidden">
          <button
            onClick={handleNewRegistration}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Đăng ký mới</span>
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              <Printer size={16} />
              Lưu PDF
            </button>
          </div>
        </div>

        {/* Receipt content */}
        <div className="max-w-3xl mx-auto p-6">
          <div ref={receiptRef} className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            {/* Header */}
            <div className="text-center border-b-2 border-orange-500 pb-6 mb-6">
              <h1 className="text-orange-500 text-3xl font-bold mb-2">CLB Hỗ trợ Kỹ thuật IT Supporter</h1>
              <p className="text-gray-600 text-sm">PHIẾU ĐĂNG KÝ DỊCH VỤ</p>
              <p className="text-gray-500 text-xs mt-1">Mã phiếu: #{receiptId}</p>
            </div>

            {/* Receipt info */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Ngày đăng ký</p>
                <p className="text-sm font-semibold text-gray-800">{currentDate} - {currentTime}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Thời gian đưa máy đến</p>
                <p className="text-sm font-semibold text-gray-800">
                  {form.dropOffTime || "Chưa xác định"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Thời gian hẹn nhận</p>
                <p className="text-sm font-semibold text-gray-800">
                  {form.appointmentTime || "Chưa xác định"}
                </p>
              </div>
            </div>

            {/* Customer info */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase">Thông tin khách hàng</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Họ và tên</p>
                  <p className="text-sm font-semibold text-gray-800">{form.customerName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Số điện thoại</p>
                  <p className="text-sm font-semibold text-gray-800">{form.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Bảo hành</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {form.warranty === "con" ? "Còn bảo hành" : "Hết bảo hành"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Mang sạc</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {form.charger === "co" ? "Có" : "Không"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="text-sm font-semibold text-gray-800">{form.category}</p>
                </div>
                {form.password && (
                  <div>
                    <p className="text-xs text-gray-500">Mật khẩu máy</p>
                    <p className="text-sm font-semibold text-gray-800">•••••••</p>
                  </div>
                )}
              </div>
              {form.machineCondition && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500">Tình trạng máy</p>
                  <p className="text-sm text-gray-800">{form.machineCondition}</p>
                </div>
              )}
              {form.needs && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500">Nhu cầu</p>
                  <p className="text-sm text-gray-800">{form.needs}</p>
                </div>
              )}
            </div>

            {/* Services */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase">Dịch vụ đã chọn</h3>
              {form.additionalServices.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Chưa chọn dịch vụ nào</p>
              ) : (
                <div className="space-y-2">
                  {form.additionalServices.map((serviceName, idx) => {
                    const service = availableServices.find(s => s.name === serviceName);
                    const price = service?.price || 0;
                    return (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <Package size={14} className="text-orange-500" />
                          <span className="text-sm text-gray-700">{serviceName}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-800">
                          {price === 0 ? "Miễn phí" : formatCurr(price)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Payment summary */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase">Tổng kết thanh toán</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Số tiền gốc:</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {formatCurr(form.serviceAmount)}
                  </span>
                </div>
                {form.discountAmount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600">Giảm giá ({form.discountCode}):</span>
                    <span className="text-sm font-semibold text-green-600">
                      - {formatCurr(form.discountAmount)}
                    </span>
                  </div>
                )}
                <div className="border-t-2 border-orange-500 pt-3 mt-3 flex items-center justify-between">
                  <span className="text-base font-bold text-gray-800">Thành tiền:</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {form.finalAmount === 0 ? "Miễn phí" : formatCurr(form.finalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="border-t border-gray-200 pt-6 flex flex-col items-center">
              <QRCodeSVG
                value={`SERVICE-${receiptId}`}
                size={120}
                level="M"
                includeMargin={true}
              />
              <p className="text-xs text-gray-500 mt-2">Mã tra cứu: SERVICE-{receiptId}</p>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6 mt-6 text-center">
              <p className="text-xs text-gray-500">
                Cảm ơn quý khách đã sử dụng dịch vụ của CLB Hỗ trợ Kỹ thuật IT Supporter
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Hotline: 0123-456-789 | Email: support@itsupporter.vn
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-orange-500">Đăng ký dịch vụ</h1>
              <p className="text-sm text-gray-500 mt-1">CLB Hỗ trợ Kỹ thuật IT Supporter</p>
            </div>
            <div className="bg-orange-100 px-4 py-2 rounded-lg">
              <p className="text-xs text-orange-600 font-semibold">P1: Thông tin KH</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-700 font-semibold text-sm pb-3 border-b border-gray-100 mb-5">
            Phần I: Thông tin khách hàng
          </h3>

          <div className="flex flex-col gap-4">
            {/* Customer name, email & phone */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">Tên khách hàng *</label>
                <input
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  placeholder="Họ và tên"
                  value={form.customerName}
                  onChange={(e) => set("customerName", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">Email *</label>
                <input
                  type="email"
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  placeholder="email@example.com"
                  value={form.customerEmail}
                  onChange={(e) => set("customerEmail", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">SĐT *</label>
                <input
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  placeholder="Số điện thoại"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </div>
            </div>

            {/* Machine condition */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">Tình trạng máy</label>
              <input
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                placeholder="Mô tả tình trạng máy..."
                value={form.machineCondition}
                onChange={(e) => set("machineCondition", e.target.value)}
              />
            </div>

            {/* Warranty */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Bảo hành</label>
              <div className="flex gap-4">
                {(["con", "het"] as const).map((v) => (
                  <label key={v} className="flex items-center gap-2 cursor-pointer">
                    <div
                      onClick={() => set("warranty", v)}
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                        form.warranty === v ? "border-orange-500" : "border-gray-300"
                      }`}
                    >
                      {form.warranty === v && (
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                      )}
                    </div>
                    <span className="text-sm text-gray-700">
                      {v === "con" ? "Máy còn bảo hành" : "Máy hết bảo hành"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Needs */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">Nhu cầu</label>
              <textarea
                rows={3}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
                placeholder="Mô tả nhu cầu của khách hàng..."
                value={form.needs}
                onChange={(e) => set("needs", e.target.value)}
              />
            </div>

            {/* Password & Charger */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">Mật khẩu máy (nếu có)</label>
                <input
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  placeholder="Mật khẩu..."
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-600">Mang sạc</label>
                <div className="flex gap-4 mt-1">
                  {(["co", "khong"] as const).map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer">
                      <div
                        onClick={() => set("charger", v)}
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                          form.charger === v ? "border-orange-500" : "border-gray-300"
                        }`}
                      >
                        {form.charger === v && (
                          <div className="w-2 h-2 rounded-full bg-orange-500" />
                        )}
                      </div>
                      <span className="text-sm text-gray-700">{v === "co" ? "Có" : "Không"}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Drop-off time & Appointment time */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">Thời gian đưa máy đến</label>
                <input
                  type="datetime-local"
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  value={form.dropOffTime}
                  onChange={(e) => set("dropOffTime", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">Thời gian hẹn nhận máy</label>
                <input
                  type="datetime-local"
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  value={form.appointmentTime}
                  onChange={(e) => set("appointmentTime", e.target.value)}
                />
              </div>
            </div>

            {/* Category */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">Category</label>
                <select
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white"
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                >
                  <option>Hardware</option>
                  <option>Software</option>
                  <option>Network</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Services section */}
            <div className="border-t border-gray-200 pt-4 mt-2">
              <h4 className="text-xs font-semibold text-gray-700 mb-3">Dịch vụ</h4>

              <div className="flex flex-col gap-1 mb-3">
                <label className="text-xs font-medium text-gray-600">Dịch vụ thêm</label>
                <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                  <div className="flex flex-wrap gap-2">
                    {availableServices.map((service) => {
                      const isSelected = form.additionalServices.includes(service.name);
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => {
                            const newServices = isSelected
                              ? form.additionalServices.filter((s) => s !== service.name)
                              : [...form.additionalServices, service.name];
                            set("additionalServices", newServices);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                            isSelected
                              ? "bg-orange-500 text-white shadow-sm"
                              : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300"
                          }`}
                        >
                          <span>{service.name}</span>
                          <span className={`text-[10px] ${isSelected ? "opacity-90" : "opacity-60"}`}>
                            ({service.price === 0 ? "Miễn phí" : formatCurr(service.price)})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {form.additionalServices.length === 0 && (
                    <p className="text-xs text-gray-400 italic mt-2">Chưa chọn dịch vụ nào</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-600">Số tiền gốc (VNĐ)</label>
                    <input
                      type="number"
                      className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50"
                      placeholder="0 = Miễn phí"
                      value={form.serviceAmount}
                      readOnly
                    />
                    <p className="text-[10px] text-gray-400 italic">Tự động tính dựa trên dịch vụ đã chọn</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-600">Mã giảm giá</label>
                    <div className="flex gap-2">
                      <input
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent uppercase"
                        placeholder="VD: SAVE20"
                        value={form.discountCode}
                        onChange={(e) => set("discountCode", e.target.value.toUpperCase())}
                      />
                      <button
                        type="button"
                        onClick={handleApplyDiscount}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg text-xs font-medium hover:bg-orange-600 transition-colors whitespace-nowrap"
                      >
                        Áp dụng
                      </button>
                    </div>
                    {discountError && (
                      <p className="text-[10px] text-red-500 mt-1">{discountError}</p>
                    )}
                    {discountApplied && (
                      <p className="text-[10px] text-green-600 mt-1 flex items-center gap-1">
                        <CheckCircle2 size={10} /> Mã giảm giá đã được áp dụng!
                      </p>
                    )}
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 space-y-2.5">
                  <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Tổng kết thanh toán</h5>

                  {form.additionalServices.length > 0 && (
                    <div className="space-y-1">
                      {form.additionalServices.map((serviceName, idx) => {
                        const service = availableServices.find(s => s.name === serviceName);
                        const price = service?.price || 0;
                        return (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">• {serviceName}</span>
                            <span className="text-gray-700 font-medium">
                              {price === 0 ? "Miễn phí" : formatCurr(price)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {form.additionalServices.length === 0 && (
                    <div className="text-xs text-gray-400 italic">Chưa chọn dịch vụ nào</div>
                  )}

                  <div className="border-t border-orange-200 pt-2 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Số tiền gốc:</span>
                      <span className="font-semibold text-gray-700">
                        {formatCurr(form.serviceAmount)}
                      </span>
                    </div>

                    {discountApplied && form.discountAmount > 0 && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-green-600">Giảm giá:</span>
                        <span className="font-semibold text-green-600">
                          - {formatCurr(form.discountAmount)}
                        </span>
                      </div>
                    )}

                    <div className="border-t border-orange-300 pt-2 flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-800">Thành tiền:</span>
                      <span className="text-xl font-bold text-orange-600">
                        {form.finalAmount === 0 ? "Miễn phí" : formatCurr(form.finalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {form.warranty === "con" && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 text-xs text-yellow-700 italic">
                ⚠ Không vệ sinh trong đối với những máy còn bảo hành
              </div>
            )}

            {/* Submit button */}
            <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-orange-500 text-white rounded-lg font-semibold text-sm hover:bg-orange-600 transition-colors shadow-md flex items-center gap-2"
              >
                <CheckCircle2 size={16} />
                Đặt dịch vụ
              </button>
            </div>
          </div>
        </div>

        {/* Customer Portal Link */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-sm border-2 border-blue-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Đã đăng ký dịch vụ?</h3>
              <p className="text-sm text-gray-600">Tra cứu trạng thái máy đã gửi sửa chữa</p>
            </div>
            <button
              onClick={() => window.location.href = "/customer/login?firstLogin=true"}
              className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              Tra cứu ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}