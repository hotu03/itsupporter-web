import { QrCode, Star, DollarSign, CheckCircle2, Trash2 } from "lucide-react";
import { Machine, STATUS_STYLES } from "../../data/machines";
import { formatCurrency as formatCurr } from "../../data/services";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface MachineRowProps {
  machine: Machine;
  stt: number;
  onClick: () => void;
  onApprove?: (id: string | number) => void;
  onDelete?: (id: string | number) => Promise<void>;
  deleting?: boolean;
}

export function MachineRow({ machine, stt, onClick, onApprove, onDelete, deleting: isDeleting }: MachineRowProps) {
  const handleDelete = async () => {
    if (!onDelete || isDeleting) return;
    try {
      await onDelete(machine.id);
    } catch {
      // Error handled by parent
    }
  };

  // Format expired datetime like "2026-05-01T10:30" → "10:30 AM | 1/5/2026"
  const formatExpired = (expired: string) => {
    if (!expired) return "—";
    const parts = expired.split("T");
    if (parts.length !== 2) return expired;
    const datePart = parts[0];
    const timePart = parts[1].substring(0, 5);
    const [year, month, day] = datePart.split("-");
    const h = parseInt(timePart.split(":")[0], 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${timePart.split(":")[1]} ${ampm} | ${parseInt(day, 10)}/${month}/${year}`;
  };
  return (
    <tr
      className="bg-white border-b border-gray-100 hover:bg-orange-50/50 cursor-pointer transition-colors group"
      onClick={onClick}
    >
      <td className="px-4 py-3 text-center">
        <span className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xs font-bold mx-auto">
          {String(stt).padStart(2, "0")}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${STATUS_STYLES[machine.status]}`}>
          {machine.status}
        </span>
      </td>
      <td className="px-4 py-3">
        <p className="text-gray-900 text-sm font-semibold leading-snug">{machine.customerName}</p>
        <p className="text-gray-400 text-[11px]">{machine.time}</p>
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">{machine.phone}</td>
      <td className="px-4 py-3 text-xs">
        <span className="text-orange-600 font-semibold bg-orange-50 px-1.5 py-0.5 rounded">
          {formatExpired(machine.expired)}
        </span>
      </td>
      <td className="px-4 py-3">
        <p className="text-gray-600 text-xs leading-snug line-clamp-2 max-w-[200px]">{machine.description}</p>
      </td>
      <td className="px-4 py-3">
        <span className="px-2 py-0.5 bg-orange-500 text-white rounded text-[10px] font-semibold">
          {machine.category}
        </span>
      </td>
      <td className="px-4 py-3 text-xs text-gray-500">{machine.tester}</td>
      <td className="px-4 py-3 text-xs text-gray-500">{machine.technician}</td>
      <td className="px-4 py-3">
        {machine.registrationType === "online" ? (
          machine.isApproved ? (
            <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-green-100 text-green-700">Đã duyệt</span>
          ) : (
            <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-red-100 text-red-700">Chờ duyệt</span>
          )
        ) : (
          <span className="text-gray-300 text-[10px]">—</span>
        )}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 justify-end">
          {/* Payment */}
          {machine.finalAmount !== undefined && machine.finalAmount > 0 && (
            <div className="flex items-center gap-1 mr-2">
              <DollarSign size={12} className="text-gray-500" />
              <span className="text-xs font-semibold text-gray-900">
                {formatCurr(machine.finalAmount)}
              </span>
            </div>
          )}

          {/* Points */}
          {machine.pointsEarned && machine.pointsEarned > 0 && (
            <div className="flex items-center gap-1 text-yellow-600 mr-2">
              <Star size={12} className="fill-yellow-500" />
              <span className="text-[10px] font-semibold">+{machine.pointsEarned}</span>
            </div>
          )}

          {/* QR */}
          <QrCode size={16} className="text-blue-400 cursor-pointer hover:text-blue-600" />

          {/* Approve button for online registrations */}
          {machine.registrationType === "online" && !machine.isApproved && onApprove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onApprove(machine.id);
              }}
              className="ml-2 px-2 py-1 bg-green-500 text-white rounded text-[10px] font-semibold hover:bg-green-600 transition-colors flex items-center gap-0.5"
            >
              <CheckCircle2 size={10} />
              Duyệt
            </button>
          )}

          {/* Delete button */}
          {onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="ml-1 p-1 rounded hover:bg-red-100 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Xóa máy"
                >
                  <Trash2 size={14} />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xác nhận xóa máy</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bạn có chắc muốn xóa máy của "{machine.customerName}"? Tất cả dữ liệu liên quan (giao dịch, hóa đơn, điểm) sẽ bị xóa. Hành động này không thể hoàn tác.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>Hủy</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                    }}
                    disabled={isDeleting}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    {isDeleting ? "Đang xóa..." : "Xóa"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </td>
    </tr>
  );
}
