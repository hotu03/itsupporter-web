import { Clock, User, Wrench, CheckCircle2, RefreshCw, Package, AlertCircle } from "lucide-react";
import { type Machine } from "../data/machines";

interface CustomerMachineCardProps {
  machine: Machine;
}

const statusConfig = {
  COMPLETE: {
    label: "Hoàn thành",
    icon: CheckCircle2,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    iconColor: "text-green-600",
  },
  RUNNING: {
    label: "Đang sửa",
    icon: Wrench,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    iconColor: "text-blue-600",
  },
  WAITING: {
    label: "Chờ sửa",
    icon: Clock,
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-700",
    iconColor: "text-yellow-600",
  },
  RETURNING: {
    label: "Chờ trả",
    icon: Package,
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
    iconColor: "text-purple-600",
  },
  RETESTING: {
    label: "Đang test lại",
    icon: RefreshCw,
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    iconColor: "text-orange-600",
  },
  RETURNED: {
    label: "Đã trả",
    icon: CheckCircle2,
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    textColor: "text-gray-700",
    iconColor: "text-gray-600",
  },
};

export default function CustomerMachineCard({ machine }: CustomerMachineCardProps) {
  const config = statusConfig[machine.status];
  const StatusIcon = config.icon;

  return (
    <div className={`border-2 ${config.borderColor} ${config.bgColor} rounded-xl p-5 transition-all hover:shadow-lg`}>
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor} border ${config.borderColor}`}>
          <StatusIcon className={`w-4 h-4 ${config.iconColor}`} />
          <span className={`font-semibold ${config.textColor}`}>{config.label}</span>
        </div>
        <span className="text-sm text-gray-500">#{machine.id}</span>
      </div>

      {/* Machine Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{machine.category || "Máy tính"}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{machine.description}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
          <div className="flex items-start gap-2">
            <User className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Kỹ thuật viên</p>
              <p className="text-sm font-medium text-gray-900">{machine.technician || "Chưa phân"}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Thời gian</p>
              <p className="text-sm font-medium text-gray-900">{machine.time}</p>
            </div>
          </div>
        </div>

        {/* Appointment Time */}
        {machine.appointmentTime && (
          <div className={`mt-3 p-3 rounded-lg ${config.bgColor} border ${config.borderColor}`}>
            <p className="text-xs text-gray-600 mb-1">Hẹn lấy máy</p>
            <p className={`font-semibold ${config.textColor}`}>{machine.appointmentTime}</p>
          </div>
        )}

        {/* Additional Info */}
        {machine.status === "COMPLETE" && machine.finalAmount && (
          <div className="mt-3 p-3 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-700">Tổng chi phí</span>
              <span className="font-bold text-green-700">
                {machine.finalAmount.toLocaleString("vi-VN")}đ
              </span>
            </div>
            {machine.pointsEarned && machine.pointsEarned > 0 && (
              <div className="mt-2 pt-2 border-t border-green-200 flex items-center justify-between">
                <span className="text-sm text-green-600">Điểm tích lũy</span>
                <span className="font-semibold text-green-600">+{machine.pointsEarned} điểm</span>
              </div>
            )}
          </div>
        )}

        {machine.status === "WAITING" && (
          <div className="mt-3 flex items-start gap-2 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-yellow-700">
              Máy của bạn đang chờ được sửa chữa. Chúng tôi sẽ thông báo khi có cập nhật.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
