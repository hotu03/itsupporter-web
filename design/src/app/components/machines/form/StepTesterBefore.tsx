import { CustomerSignatureSection } from "../CustomerSignatureSection";
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

export function StepTesterBefore({
  form, set, testerMembers, checklistItems, toggleCheck, setNote,
}: StepProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-gray-700 font-semibold text-sm pb-1 border-b border-gray-100">
        Phần II: Tester kiểm tra trước khi nhận máy
      </h3>

      <div className="max-w-xs">
        <SearchableSelect
          value={form.testerBefore}
          onChange={(v) => set("testerBefore", v)}
          options={testerMembers}
          placeholder="Chọn tester trước..."
          label="Tên tester trước"
        />
      </div>

      <ChecklistTable
        items={checklistItems}
        checks={form.checklistBefore}
        notes={form.notesBefore}
        onToggle={(i) => toggleCheck("checklistBefore", i)}
        onNote={(i, v) => setNote("notesBefore", i, v)}
      />

      <p className="text-xs text-gray-400 italic">
        Tester trước nhập thông tin khách hàng và kiểm tra tình trạng máy khi nhận.
      </p>

      <CustomerSignatureSection
        customerName={form.customerName}
        value={form.customerSignature}
        onChange={(sig) => set("customerSignature", sig)}
      />
    </div>
  );
}
