import { ArrowLeft, Printer, Package } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface ServiceData {
  name: string;
  price: number;
}

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

interface ServiceRegistrationReceiptProps {
  receiptId: string;
  form: ServiceRegistrationForm;
  currentDate: string;
  currentTime: string;
  availableServices: ServiceData[];
  formatCurr: (amount: number) => string;
  onNewRegistration: () => void;
  onPrint: () => void;
}

export function ServiceRegistrationReceipt({
  receiptId,
  form,
  currentDate,
  currentTime,
  availableServices,
  formatCurr,
  onNewRegistration,
  onPrint,
}: ServiceRegistrationReceiptProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Print actions - hidden when printing */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between print:hidden">
        <button
          onClick={onNewRegistration}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Đăng ký mới</span>
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            <Printer size={16} />
            Lưu PDF
          </button>
        </div>
      </div>

      {/* Receipt content */}
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
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