import { CheckCircle2 } from "lucide-react";
import { formatCurrency as formatCurr } from "../../../data/services";
import type { FormState } from "../hooks/useMachineForm";

interface StepProps {
  form: FormState;
  set: (key: keyof FormState, value: unknown) => void;
  availableServices: { id: string; name: string; price: number }[];
  discountApplied: boolean;
  discountAmount: number;
  discountError: string;
  handleApplyDiscount: () => void;
  finalAmount: number;
}

export function StepCustomerInfo({
  form, set, availableServices,
  discountApplied, discountAmount, discountError, handleApplyDiscount, finalAmount,
}: StepProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-gray-700 font-semibold text-sm pb-1 border-b border-gray-100">
        Phần I: Thông tin khách hàng
      </h3>

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
          <label className="text-xs font-medium text-gray-600">SĐT *</label>
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Tình trạng máy</label>
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          placeholder="Mô tả tình trạng máy..."
          value={form.machineCondition}
          onChange={(e) => set("machineCondition", e.target.value)}
        />
      </div>

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

      {/* Finance */}
      <div className="border-t border-gray-200 pt-4 mt-2">
        <h4 className="text-xs font-semibold text-gray-700 mb-3">Thông tin tài chính</h4>

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
                  {formatCurr(parseFloat(form.serviceAmount) || 0)}
                </span>
              </div>

              {discountApplied && discountAmount > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-600">Giảm giá:</span>
                  <span className="font-semibold text-green-600">
                    -{formatCurr(discountAmount)}
                  </span>
                </div>
              )}

              <div className="border-t border-orange-300 pt-2 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-800">Thành tiền:</span>
                <span className="text-xl font-bold text-orange-600">
                  {formatCurr((parseFloat(form.serviceAmount) || 0) - discountAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-600">Trạng thái thanh toán</label>
            <div className="grid grid-cols-3 gap-2">
              {(["paid", "pending", "free"] as const).map((ps) => {
                const isDisabled = ps === "free" ? finalAmount > 0 : finalAmount === 0;
                const isActive = form.paymentStatus === ps;
                const activeClass = ps === "paid" ? "bg-green-500 text-white shadow-md"
                  : ps === "pending" ? "bg-yellow-500 text-white shadow-md"
                  : "bg-blue-500 text-white shadow-md";
                const hoverBorder = ps === "paid" ? "hover:border-green-300"
                  : ps === "pending" ? "hover:border-yellow-300"
                  : "hover:border-blue-300";
                const label = ps === "paid" ? "Đã thanh toán"
                  : ps === "pending" ? "Chưa thanh toán"
                  : "Miễn phí";
                return (
                  <button
                    key={ps}
                    type="button"
                    onClick={() => set("paymentStatus", ps)}
                    disabled={isDisabled}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isDisabled
                        ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50"
                        : isActive
                          ? activeClass
                          : `bg-white text-gray-600 border border-gray-200 ${hoverBorder}`
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {form.warranty === "con" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 text-xs text-yellow-700 italic">
          ⚠ Không vệ sinh trong đối với những máy còn bảo hành
        </div>
      )}
    </div>
  );
}
