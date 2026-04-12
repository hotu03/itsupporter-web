import { QrCode } from "lucide-react";
import type { Machine } from "../../data/machines";
import { STATUS_STYLES } from "../../data/machines";

interface MachineRowProps {
  machine: Machine;
  index: number;
  onClick: () => void;
}

export function MachineRow({ machine, index, onClick }: MachineRowProps) {
  return (
    <tr onClick={onClick} className="hover:bg-orange-50 transition-colors border-b border-gray-100 cursor-pointer">
      <td className="px-4 py-3 text-xs text-gray-400">{String(index + 1).padStart(2, "0")}</td>
      <td className="px-4 py-3">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${STATUS_STYLES[machine.status]}`}>
          {machine.status}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-800 font-medium">{machine.customerName}</td>
      <td className="px-4 py-3 text-xs text-gray-500">{machine.phone}</td>
      <td className="px-4 py-3 text-xs text-gray-500">{machine.time}</td>
      <td className="px-4 py-3 text-xs text-gray-500 max-w-[180px] truncate">{machine.description}</td>
      <td className="px-4 py-3 text-xs text-orange-500 font-semibold">{machine.expired}</td>
      <td className="px-4 py-3 text-xs text-gray-500">{machine.tester}</td>
      <td className="px-4 py-3 text-xs text-gray-500">{machine.technician}</td>
      <td className="px-4 py-3">
        <QrCode size={15} className="text-blue-400" />
      </td>
    </tr>
  );
}
