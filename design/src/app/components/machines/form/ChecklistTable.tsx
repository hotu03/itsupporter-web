import { CheckSquare, Square } from "lucide-react";

interface ChecklistTableProps {
  items: string[];
  checks: boolean[];
  notes: string[];
  onToggle: (index: number) => void;
  onNote: (index: number, value: string) => void;
}

export function ChecklistTable({ items, checks, notes, onToggle, onNote }: ChecklistTableProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full text-xs table-fixed">
        <colgroup>
          <col style={{ width: "38%" }} />
          <col style={{ width: "12%" }} />
          <col style={{ width: "50%" }} />
        </colgroup>
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left px-4 py-3 text-gray-600 font-semibold">Nội dung kiểm tra máy</th>
            <th className="text-center px-3 py-3 text-gray-600 font-semibold">Trước khi nhận</th>
            <th className="text-left px-4 py-3 text-gray-600 font-semibold">Ghi chú</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item, i) => (
            <tr key={i} className="hover:bg-gray-50/60">
              <td className="px-4 py-3 text-gray-700 leading-snug">{i + 1}. {item}</td>
              <td className="px-3 py-3 text-center">
                <button onClick={() => onToggle(i)} className="text-orange-500 hover:text-orange-600 transition-colors">
                  {checks[i] ? <CheckSquare size={17} /> : <Square size={17} className="text-gray-300" />}
                </button>
              </td>
              <td className="px-4 py-2">
                <textarea
                  rows={2}
                  className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-xs text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent resize-none transition-all"
                  placeholder="Ghi chú..."
                  value={notes[i]}
                  onChange={(e) => onNote(i, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
