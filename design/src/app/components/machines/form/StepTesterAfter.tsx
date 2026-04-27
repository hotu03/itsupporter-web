import { SearchableSelect } from "../SearchableSelect";
import { ChecklistTable } from "./ChecklistTable";
import type { FormState } from "../hooks/useMachineForm";

interface StepProps {
  form: FormState;
  set: (key: keyof FormState, value: unknown) => void;
  testerMembers: string[];
  checklistItems: string[];
  toggleCheck: (field: "checklistBefore" | "checklistAfter" | "techChecklist", i: number) => void;
  setNote: (field: "notesBefore" | "notesAfter", i: number, val: string) => void;
}

export function StepTesterAfter({
  form, set, testerMembers, checklistItems, toggleCheck, setNote,
}: StepProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-gray-700 font-semibold text-sm pb-1 border-b border-gray-100">
        Phần IV: Tester kiểm tra sau khi sửa
      </h3>

      <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 flex flex-col gap-3">
        <p className="text-[11px] font-semibold text-teal-700 uppercase tracking-wide">① Admin — Chỉ định Tester kiểm tra sau</p>
        <div className="max-w-xs">
          <SearchableSelect
            value={form.testerAfter}
            onChange={(v) => set("testerAfter", v)}
            options={testerMembers}
            placeholder="Chọn tester sau..."
            label="Tên tester sau"
          />
        </div>
        <p className="text-[11px] text-teal-600 italic">Admin chỉ định người test, lưu phần 4 trước khi bàn giao lại máy. Trạng thái → <strong>RETESTING</strong>.</p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">② Tester — Kiểm tra sau khi sửa</p>

        <ChecklistTable
          items={checklistItems}
          checks={form.checklistAfter}
          notes={form.notesAfter}
          onToggle={(i) => toggleCheck("checklistAfter", i)}
          onNote={(i, v) => setNote("notesAfter", i, v)}
        />

        <p className="text-xs text-gray-400 italic">
          Tester sau hoàn thành → bàn giao máy lại cho Admin để xác nhận hoàn thành và trả khách.
        </p>
      </div>
    </div>
  );
}
