import React from "react";
import { QrCode, Star, DollarSign, CheckCircle2 } from "lucide-react";
import { Machine, STATUS_STYLES } from "../../data/machines";
import { formatCurrency as formatCurr } from "../../data/services";

interface MachineRowProps {
  machine: Machine;
  index: number;
  onClick: () => void;
  onApprove?: (id: number) => void;
}

export function MachineRow({ machine, index, onClick, onApprove }: MachineRowProps) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-orange-300 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        {/* Index & Status */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wide ${STATUS_STYLES[machine.status]}`}>
            {machine.status}
          </span>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Customer Info */}
          <div className="space-y-1">
            <p className="text-gray-900 text-sm font-semibold leading-snug">
              {machine.customerName}, {machine.phone}
            </p>
            <p className="text-gray-400 text-[11px]">{machine.time}</p>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <p className="text-gray-600 text-xs leading-snug line-clamp-2">{machine.description}</p>
            <p className="text-orange-500 text-xs font-semibold">
              Expired: {machine.expired}
            </p>
          </div>

          {/* Category & Testers */}
          <div className="space-y-1">
            <span className="px-2 py-0.5 bg-orange-500 text-white rounded text-[10px] font-semibold">
              {machine.category}
            </span>
            <div className="flex flex-col gap-0.5 mt-1">
              <p className="text-gray-400 text-[10px]">
                Tester: <span className="text-gray-700">{machine.tester}</span>
              </p>
              <p className="text-gray-400 text-[10px]">
                Technician: <span className="text-gray-700">{machine.technician}</span>
              </p>
            </div>
          </div>

          {/* Payment & Points */}
          <div className="space-y-1">
            {machine.finalAmount !== undefined && machine.finalAmount > 0 && (
              <div className="flex items-center gap-1">
                <DollarSign size={12} className="text-gray-500" />
                <span className="text-xs font-semibold text-gray-900">
                  {formatCurr(machine.finalAmount)}
                </span>
                {machine.paymentStatus && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ml-1 ${
                      machine.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : machine.paymentStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {machine.paymentStatus === "paid"
                      ? "Đã thanh toán"
                      : machine.paymentStatus === "pending"
                      ? "Chưa thanh toán"
                      : "Miễn phí"}
                  </span>
                )}
              </div>
            )}

            {machine.pointsEarned && machine.pointsEarned > 0 && (
              <div className="flex items-center gap-1 text-yellow-600">
                <Star size={12} className="fill-yellow-500" />
                <span className="text-[10px] font-semibold">+{machine.pointsEarned} điểm</span>
              </div>
            )}

            {/* QR */}
            <div className="flex justify-end">
              <QrCode size={16} className="text-blue-400 cursor-pointer hover:text-blue-600" />
            </div>
          </div>
        </div>

        {/* Approve button for online registrations */}
        {machine.registrationType === "online" && !machine.isApproved && onApprove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onApprove(machine.id);
            }}
            className="flex-shrink-0 px-3 py-1.5 bg-green-500 text-white rounded text-xs font-semibold hover:bg-green-600 transition-colors flex items-center gap-1"
          >
            <CheckCircle2 size-14 />
            Duyệt
          </button>
        )}
      </div>
    </div>
  );
}
