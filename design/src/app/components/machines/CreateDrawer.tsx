import { X } from "lucide-react";
import { Machine, Status } from "../../data/machines";
import { getPointsExplanation } from "../../data/points";
import { useMachineForm } from "./hooks/useMachineForm";
import { StepCustomerInfo } from "./form/StepCustomerInfo";
import { StepTesterBefore } from "./form/StepTesterBefore";
import { StepTechnician } from "./form/StepTechnician";
import { StepTesterAfter } from "./form/StepTesterAfter";
import { StepAdminConfirm } from "./form/StepAdminConfirm";

const STEP_META = [
  { n: 1, label: "Thông tin KH", role: "Tester vòng ngoài", badge: "bg-yellow-50 text-yellow-700 border-yellow-200", statusTag: "WAITING", statusColor: "bg-yellow-400" },
  { n: 2, label: "Tester trước", role: "Tester vòng ngoài", badge: "bg-yellow-50 text-yellow-700 border-yellow-200", statusTag: "WAITING", statusColor: "bg-yellow-400" },
  { n: 3, label: "Technician", role: "Admin → Technician", badge: "bg-blue-50 text-blue-700 border-blue-200", statusTag: "RUNNING", statusColor: "bg-blue-500" },
  { n: 4, label: "Tester sau", role: "Admin → Tester", badge: "bg-teal-50 text-teal-700 border-teal-200", statusTag: "RETESTING", statusColor: "bg-teal-500" },
  { n: 5, label: "Xác nhận", role: "Admin xác nhận", badge: "bg-green-50 text-green-700 border-green-200", statusTag: "COMPLETE", statusColor: "bg-green-500" },
];

const TOTAL_STEPS = 5;

const STEP_STATUS: Record<number, Status> = {
  1: "WAITING", 2: "WAITING", 3: "RUNNING", 4: "RETESTING", 5: "COMPLETE",
};

export interface CreateDrawerProps {
  onClose: () => void;
  onSave: (machine: Machine) => void;
  machine?: Machine | null;
  /** List of member names to select from in dropdowns */
  members: string[];
  /** Checklist items used in tester before/after tables */
  checklistItems: string[];
  /** Technician checklist items */
  technicianChecklist: string[];
}

export function CreateDrawer({ onClose, onSave, machine, members, checklistItems, technicianChecklist }: CreateDrawerProps) {
  const isEdit = !!machine;
  const {
    form, step, setStep, availableServices,
    discountApplied, discountAmount, discountError,
    set, handleApplyDiscount, toggleCheck, setNote,
    totalServiceAmount, finalAmount, submitForm,
  } = useMachineForm(machine);

  const currentMeta = STEP_META[step - 1];

  const handleSubmit = (finalStatus?: Status) => {
    const resultMachine = submitForm(finalStatus);
    onSave(resultMachine);

    if ((finalStatus === "COMPLETE" || finalStatus === "RETURNED") && resultMachine.finalAmount && resultMachine.finalAmount > 0) {
      const pts = resultMachine.pointsEarned || 0;
      if (pts > 0) {
        setTimeout(() => {
          alert(`✅ Hoàn thành!\n\n🎉 Khách hàng nhận được ${pts} điểm thưởng!\n\n${getPointsExplanation(resultMachine.finalAmount!).join("\n")}`);
        }, 100);
      }
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/40" onClick={onClose} />

      {/* Drawer */}
      <div className="w-full max-w-3xl bg-white h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-orange-500">
          <div>
            <p className="text-white font-bold">
              {isEdit ? `Chỉnh sửa phiếu — ${machine!.customerName}` : "Phiếu nhận máy"}
            </p>
            <p className="text-orange-100 text-xs">CLB Hỗ trợ Kỹ thuật IT Supporter</p>
          </div>
          <button onClick={onClose} className="text-white hover:text-orange-200 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Step tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          {STEP_META.map(({ n, label }) => (
            <button
              key={n}
              onClick={() => setStep(n)}
              className={`flex-1 py-3 text-xs font-semibold transition-colors border-b-2 ${
                step === n
                  ? "border-orange-500 text-orange-600 bg-white"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className="hidden sm:inline">P{n}: </span>{label}
            </button>
          ))}
        </div>

        {/* Role banner */}
        <div className={`px-6 py-2.5 border-b flex items-center justify-between ${currentMeta.badge}`}>
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="opacity-60">Thực hiện bởi:</span>
            <span className="font-semibold">{currentMeta.role}</span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white ${currentMeta.statusColor}`}>
            → {currentMeta.statusTag}
          </span>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 1 && (
            <StepCustomerInfo
              form={form}
              set={set}
              availableServices={availableServices}
              discountApplied={discountApplied}
              discountAmount={discountAmount}
              discountError={discountError}
              handleApplyDiscount={handleApplyDiscount}
              finalAmount={finalAmount}
            />
          )}

          {step === 2 && (
            <StepTesterBefore
              form={form}
              set={set}
              members={members}
              checklistItems={checklistItems}
              toggleCheck={toggleCheck}
              setNote={setNote}
            />
          )}

          {step === 3 && (
            <StepTechnician
              form={form}
              set={set}
              members={members}
              technicianChecklist={technicianChecklist}
              toggleCheck={toggleCheck}
            />
          )}

          {step === 4 && (
            <StepTesterAfter
              form={form}
              set={set}
              members={members}
              checklistItems={checklistItems}
              toggleCheck={toggleCheck}
              setNote={setNote}
            />
          )}

          {step === 5 && (
            <StepAdminConfirm
              form={form}
              set={set}
              totalServiceAmount={totalServiceAmount}
              finalAmount={finalAmount}
              discountApplied={discountApplied}
              discountAmount={discountAmount}
              onSubmit={handleSubmit}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between gap-3">
          <div>
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                ← Trước
              </button>
            )}
          </div>

          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                onClick={() => setStep(n)}
                className={`h-2 rounded-full cursor-pointer transition-all ${
                  step === n ? "bg-orange-500 w-4" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Huỷ
            </button>
            {step < TOTAL_STEPS && (
              <button
                onClick={() => handleSubmit(STEP_STATUS[step])}
                className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors shadow-sm"
              >
                {step === 1 ? "Đặt dịch vụ" : `Lưu P${step}`}
                {step !== 1 && <span className="opacity-80 ml-1">→ {STEP_STATUS[step]}</span>}
              </button>
            )}
            {step < TOTAL_STEPS && (
              <button
                onClick={() => setStep(step + 1)}
                className="px-5 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
              >
                Tiếp →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
