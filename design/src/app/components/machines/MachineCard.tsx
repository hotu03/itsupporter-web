import React from "react";
import { QrCode, Star, DollarSign, CheckCircle2 } from "lucide-react";
import { Machine, STATUS_STYLES } from "../../data/machines";
import { formatCurrency as formatCurr } from "../../data/services";

interface MachineCardProps {
  machine: Machine;
  index: number;
  onClick: () => void;
  onApprove?: (id: number) => void;
}

export function MachineCard({ machine, index, onClick, onApprove }: MachineCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col gap-2 hover:shadow-md hover:border-orange-300 transition-all group relative"
    >
      <div onClick={onClick} className="cursor-pointer">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${STATUS_STYLES[machine.status]}`}>
            {machine.status}
          </span>
          <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xs font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Name & phone */}
        <div>
          <p className="text-gray-900 text-sm font-semibold leading-snug">
            {machine.customerName}, {machine.phone}
          </p>
          <p className="text-gray-400 text-[11px]">{machine.time}</p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs leading-snug line-clamp-2">{machine.description}</p>

        {/* Expired */}
        <p className="text-orange-500 text-xs font-semibold">
          Expired: {machine.expired}
        </p>

        {/* Category */}
        <div>
          <p className="text-gray-400 text-[10px] mb-1">Category</p>
          <span className="px-2 py-0.5 bg-orange-500 text-white rounded text-[10px] font-semibold">
            {machine.category}
          </span>
        </div>

        {/* Tester & Technician */}
        <div className="flex flex-col gap-0.5">
          <p className="text-gray-400 text-[10px]">
            Tester: <span className="text-gray-700">{machine.tester}</span>
          </p>
          <p className="text-gray-400 text-[10px]">
            Technician: <span className="text-gray-700">{machine.technician}</span>
          </p>
        </div>

        {/* Services & Payment */}
        {machine.additionalServices && machine.additionalServices.length > 0 && (
          <div className="border-t border-gray-100 pt-2 mt-1">
            <p className="text-gray-400 text-[10px] mb-1">Dịch vụ</p>
            <div className="flex flex-wrap gap-1">
              {machine.additionalServices.slice(0, 2).map((service, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[9px] font-medium"
                >
                  {service}
                </span>
              ))}
              {machine.additionalServices.length > 2 && (
                <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[9px]">
                  +{machine.additionalServices.length - 2}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Payment Info */}
        {machine.finalAmount !== undefined && machine.finalAmount > 0 && (
          <div className="flex items-center justify-between gap-2 bg-gray-50 rounded px-2 py-1.5">
            <div className="flex items-center gap-1">
              <DollarSign size={12} className="text-gray-500" />
              <span className="text-xs font-semibold text-gray-900">
                {formatCurr(machine.finalAmount)}
              </span>
            </div>
            {machine.paymentStatus && (
              <span
                className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
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

        {/* Points Earned */}
        {machine.pointsEarned && machine.pointsEarned > 0 && (
          <div className="flex items-center gap-1 text-yellow-600">
            <Star size={12} className="fill-yellow-500" />
            <span className="text-[10px] font-semibold">+{machine.pointsEarned} điểm</span>
          </div>
        )}

        {/* QR */}
        <div className="flex justify-end">
          <QrCode size={18} className="text-blue-400 cursor-pointer hover:text-blue-600" />
        </div>
      </div>

      {/* Approve button for online registrations */}
      {machine.registrationType === "online" && !machine.isApproved && onApprove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onApprove(machine.id);
          }}
          className="w-full mt-2 px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
        >
          <CheckCircle2 size={14} />
          Duyệt - Khách đã đưa máy đến
        </button>
      )}
    </div>
  );
}
