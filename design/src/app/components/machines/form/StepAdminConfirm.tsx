import { Star, CreditCard } from "lucide-react";
import {
  calculatePoints,
  getPointsExplanation,
  formatCurrency as formatCurr,
  type PointRule,
} from "../../../data/points";
import { updateFirestoreTransactionByMachineId } from "../../../data/firestoreTransactions";
import type { Status } from "../../../data/machines";
import type { ServiceData } from "../../../data/services";
import type { FormState } from "../hooks/useMachineForm";

interface StepProps {
  form: FormState;
  set: (key: keyof FormState, value: unknown) => void;
  totalServiceAmount: number;
  finalAmount: number;
  discountApplied: boolean;
  discountAmount: number;
  onSubmit: (status: Status) => void;
  machineId?: string | number;
  availableServices: ServiceData[];
  pointRules: PointRule[];
}

export function StepAdminConfirm({
  form,
  set,
  totalServiceAmount,
  finalAmount,
  discountApplied,
  discountAmount,
  onSubmit,
  machineId,
  availableServices,
  pointRules,
}: StepProps) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-gray-700 font-semibold text-sm pb-1 border-b border-gray-100">
        Phần V: Admin xác nhận &amp; trả máy
      </h3>

      <SummaryCard form={form} />

      {(form.additionalServices.length > 0 || form.discountCode) && (
        <InvoiceSection
          form={form}
          set={set}
          totalServiceAmount={totalServiceAmount}
          finalAmount={finalAmount}
          discountApplied={discountApplied}
          discountAmount={discountAmount}
          machineId={machineId}
          availableServices={availableServices}
          pointRules={pointRules}
        />
      )}

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Ghi chú của Admin (tuỳ chọn)</label>
        <textarea
          rows={3}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent resize-none transition-all"
          placeholder="Ghi chú khi trả máy, tình trạng xác nhận cuối..."
          value={form.adminConfirmNote}
          onChange={(e) => set("adminConfirmNote", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Xác nhận trạng thái</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onSubmit("COMPLETE")}
            className="flex flex-col items-center gap-2 px-4 py-5 rounded-xl border-2 border-orange-400 bg-orange-50 hover:bg-orange-100 transition-colors"
          >
            <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold">COMPLETE</span>
            <span className="text-xs text-orange-700 text-center leading-snug">Máy đã sửa xong, admin xác nhận hoàn thành</span>
          </button>
          <button
            onClick={() => onSubmit("RETURNED")}
            className="flex flex-col items-center gap-2 px-4 py-5 rounded-xl border-2 border-green-400 bg-green-50 hover:bg-green-100 transition-colors"
          >
            <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold">RETURNED</span>
            <span className="text-xs text-green-700 text-center leading-snug">Đã trả máy cho khách hàng thành công</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface SummaryCardProps {
  form: {
    customerName: string;
    phone: string;
    testerBefore: string;
    technician: string;
    testerAfter: string;
    dropOffTime: string;
    appointmentTime: string;
    checklistBefore: boolean[];
    checklistAfter: boolean[];
    techNotes: string;
  };
}

function SummaryCard({ form }: SummaryCardProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Tóm tắt phiếu</p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
        <div><span className="text-gray-400">Khách hàng: </span><span className="text-gray-800 font-medium">{form.customerName || "—"}</span></div>
        <div><span className="text-gray-400">SĐT: </span><span className="text-gray-800 font-medium">{form.phone || "—"}</span></div>
        <div><span className="text-gray-400">Tester trước: </span><span className="text-gray-800 font-medium">{form.testerBefore || "—"}</span></div>
        <div><span className="text-gray-400">Technician: </span><span className="text-gray-800 font-medium">{form.technician || "—"}</span></div>
        <div><span className="text-gray-400">Tester sau: </span><span className="text-gray-800 font-medium">{form.testerAfter || "—"}</span></div>
        <div><span className="text-gray-400">Thời gian đưa đến: </span><span className="text-gray-800 font-medium">{form.dropOffTime || "—"}</span></div>
        <div><span className="text-gray-400">Hẹn trả: </span><span className="text-gray-800 font-medium">{form.appointmentTime || "—"}</span></div>
      </div>
      <div className="flex gap-6 pt-2 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          Checklist trước: <strong className="text-orange-500">{form.checklistBefore.filter(Boolean).length}/{form.checklistBefore.length}</strong>
        </div>
        <div className="text-xs text-gray-500">
          Checklist sau: <strong className="text-teal-600">{form.checklistAfter.filter(Boolean).length}/{form.checklistAfter.length}</strong>
        </div>
      </div>
      {form.techNotes && (
        <div className="text-xs pt-2 border-t border-gray-200">
          <span className="text-gray-400">Ghi chú Technician: </span>
          <span className="text-gray-700 italic">{form.techNotes}</span>
        </div>
      )}
    </div>
  );
}

interface InvoiceSectionProps {
  form: {
    additionalServices: string[];
    discountCode: string;
    paymentStatus: "paid" | "pending" | "free";
  };
  set: (key: keyof FormState, value: unknown) => void;
  totalServiceAmount: number;
  finalAmount: number;
  discountApplied: boolean;
  discountAmount: number;
  machineId?: string | number;
  availableServices: ServiceData[];
  pointRules: PointRule[];
}

function getServicePriceFromList(services: ServiceData[], serviceName: string): number {
  const service = services.find((s) => s.name === serviceName);
  return service?.price ?? 0;
}

function InvoiceSection({
  form,
  set,
  totalServiceAmount,
  finalAmount,
  discountApplied,
  discountAmount,
  machineId,
  availableServices,
  pointRules,
}: InvoiceSectionProps) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
            <CreditCard size={14} className="text-orange-500" />
            Hóa đơn thanh toán
          </p>
          {finalAmount > 0 && (
            <div className="flex items-center gap-2">
              <select
                value={form.paymentStatus}
                onChange={(e) => set("paymentStatus", e.target.value as "paid" | "pending" | "free")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all outline-none ${
                  form.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : form.paymentStatus === "pending"
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                      : "bg-blue-100 text-blue-700 border border-blue-300"
                }`}
              >
                <option value="pending">Chưa thanh toán</option>
                <option value="paid">Đã thanh toán</option>
                <option value="free">Miễn phí</option>
              </select>
              {machineId && (
                <button
                  onClick={async () => {
                    if (finalAmount > 0) {
                      await updateFirestoreTransactionByMachineId(machineId, {
                        paymentStatus: form.paymentStatus as "paid" | "pending" | "free",
                        discountCode: form.discountCode,
                        discountAmount,
                      });
                      alert("Đã lưu trạng thái thanh toán!");
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                >
                  Lưu thanh toán
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        {form.additionalServices.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase mb-2">Dịch vụ</p>
            <div className="space-y-1.5">
              {form.additionalServices.map((service, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <span className="text-gray-700">{service}</span>
                  <span className="font-semibold text-gray-900">{formatCurr(getServicePriceFromList(availableServices, service))}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs pt-2 mt-2 border-t border-gray-100">
              <span className="text-gray-500">Tổng dịch vụ:</span>
              <span className="font-semibold text-gray-900">{formatCurr(totalServiceAmount)}</span>
            </div>
          </div>
        )}

        {discountApplied && form.discountCode && (
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Mã giảm giá:</span>
                <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded font-mono font-semibold text-[10px]">
                  {form.discountCode}
                </span>
              </div>
              <span className="font-semibold text-orange-600">-{formatCurr(discountAmount)}</span>
            </div>
          </div>
        )}

        <div className="pt-3 mt-2 border-t-2 border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Thành tiền:</span>
            <span className="text-lg font-bold text-orange-600">{formatCurr(finalAmount)}</span>
          </div>
        </div>

        {(() => {
          const pts = calculatePoints(finalAmount, pointRules);
          if (pts <= 0) return null;

          return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <div>
                  <p className="text-xs font-semibold text-yellow-800">Điểm tích lũy</p>
                  <p className="text-[10px] text-yellow-600">{getPointsExplanation(finalAmount, pointRules).join(" • ")}</p>
                </div>
              </div>
              <span className="text-lg font-bold text-yellow-700">+{pts}</span>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
