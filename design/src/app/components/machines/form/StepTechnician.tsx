import { CheckSquare, Square } from "lucide-react";
import { SearchableSelect } from "../SearchableSelect";
import type { FormState } from "../hooks/useMachineForm";

interface StepProps {
  form: FormState;
  set: (key: keyof FormState, value: unknown) => void;
  members: string[];
  technicianChecklist: string[];
  toggleCheck: (field: "checklistBefore" | "checklistAfter" | "techChecklist", i: number) => void;
}

export function StepTechnician({
  form, set, members, technicianChecklist, toggleCheck,
}: StepProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-gray-700 font-semibold text-sm pb-1 border-b border-gray-100">
        Phần III: Technician thực hiện
      </h3>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex flex-col gap-3">
        <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wide">① Admin — Chỉ định Technician</p>
        <SearchableSelect
          value={form.technician}
          onChange={(v) => set("technician", v)}
          options={members}
          placeholder="Chọn technician..."
          label="Tên technician"
        />
        <p className="text-[11px] text-blue-500 italic">Admin điền tên technician, lưu lại trước khi bàn giao máy. Trạng thái → <strong>RUNNING</strong>.</p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">② Technician — Thực hiện kiểm tra</p>

        <div className="bg-orange-50 border border-orange-100 rounded-lg px-4 py-3">
          <p className="text-xs text-orange-700 italic leading-relaxed">
            Quy trình: <strong>Tắt máy → Tháo vít → Ngắt nguồn/pin, xả điện → Vệ sinh nội thất → Hoàn thành yêu cầu → Lắp lại → Bật nguồn, khởi động lại.</strong>
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2.5 text-gray-600 font-semibold">Nội dung kiểm tra</th>
                <th className="text-center px-3 py-2.5 text-gray-600 font-semibold w-28">Hoàn thành ✓</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {technicianChecklist.map((item, i) => (
                <tr key={`tech-${i}`} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{i + 1}. {item}</td>
                  <td className="px-3 py-3 text-center">
                    <button
                      onClick={() => toggleCheck("techChecklist", i)}
                      className="text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      {form.techChecklist[i]
                        ? <CheckSquare size={16} />
                        : <Square size={16} className="text-gray-300" />
                      }
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600">Ghi chú của Technician</label>
          <textarea
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent resize-none transition-all"
            placeholder="Ghi lại tình trạng thực tế, linh kiện thay thế, vấn đề phát sinh..."
            value={form.techNotes}
            onChange={(e) => set("techNotes", e.target.value)}
          />
        </div>

        <p className="text-xs text-gray-400 italic">
          Technician hoàn thành → bàn giao máy lại cho Admin để chỉ định tester kiểm tra lại.
        </p>
      </div>
    </div>
  );
}
