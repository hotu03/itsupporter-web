import React from "react";
import {
  Package,
  Activity,
  Wrench,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import type { MachineStats } from "./hooks/useDashboardData";

interface WorkflowStepsProps {
  machineStats: MachineStats;
}

const WORKFLOW_STEPS = [
  { step: "P1", label: "Tiếp nhận", sublabel: "Nhận máy từ KH", icon: Package, color: "bg-yellow-400" },
  { step: "P2", label: "Kiểm tra trước", sublabel: "Test tình trạng", icon: Activity, color: "bg-blue-500" },
  { step: "P3", label: "Sửa chữa", sublabel: "Kỹ thuật viên", icon: Wrench, color: "bg-orange-500" },
  { step: "P4", label: "Kiểm tra sau", sublabel: "Xác nhận hoàn thành", icon: RefreshCw, color: "bg-teal-500" },
  { step: "P5", label: "Hoàn trả", sublabel: "Trả máy & thanh toán", icon: CheckCircle2, color: "bg-green-500" },
];

export function WorkflowSteps({ machineStats }: WorkflowStepsProps) {
  const steps = [
    { ...WORKFLOW_STEPS[0], count: machineStats.waiting },
    { ...WORKFLOW_STEPS[1], count: 0 },
    { ...WORKFLOW_STEPS[2], count: machineStats.running },
    { ...WORKFLOW_STEPS[3], count: machineStats.retesting },
    { ...WORKFLOW_STEPS[4], count: machineStats.complete + machineStats.returned },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-end justify-between mb-3">
        <div>
          <h2 className="text-gray-800" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Quy trình xử lý máy</h2>
          <p className="text-gray-400 text-xs mt-0.5">Trạng thái luồng 5 bước hôm nay</p>
        </div>
      </div>
      <div className="flex items-stretch gap-0 overflow-x-auto pb-1">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.step}>
              <div className="flex flex-col items-center flex-1 min-w-[100px]">
                <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center mb-2 shadow-sm relative`}>
                  <Icon size={20} className="text-white" />
                  {step.count > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold border border-white">
                      {step.count}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 text-xs font-semibold text-center">{step.step} · {step.label}</p>
                <p className="text-gray-400 text-[11px] text-center mt-0.5">{step.sublabel}</p>
                <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold ${step.count > 0 ? `${step.color} text-white` : "bg-gray-100 text-gray-400"}`}>
                  {step.count}
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex items-center px-1 pt-2">
                  <ArrowRight size={16} className="text-gray-300" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
