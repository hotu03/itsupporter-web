import { useState } from "react";
import { GraduationCap, X, Plus, Trash2 } from "lucide-react";

interface ManageCoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: string[];
  onAdd: (c: string) => void;
  onDelete: (c: string) => void;
}

export function ManageCoursesModal({ isOpen, onClose, courses, onAdd, onDelete }: ManageCoursesModalProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    const val = input.trim().toUpperCase();
    if (!val) { setError("Vui lòng nhập tên khoá."); return; }
    if (courses.includes(val)) { setError(`Khoá "${val}" đã tồn tại.`); return; }
    onAdd(val); setInput(""); setError("");
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[400px]" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center"><GraduationCap size={16} className="text-orange-500" /></div>
            <div>
              <h2 className="text-gray-900 text-sm" style={{ fontWeight: 700 }}>Quản lý Khoá</h2>
              <p className="text-gray-400 text-xs">{courses.length} khoá hiện có</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"><X size={14} className="text-gray-500" /></button>
        </div>
        <div className="px-6 py-4 max-h-64 overflow-y-auto flex flex-col gap-2">
          {courses.length === 0 && <p className="text-center text-gray-400 text-sm py-4">Chưa có khoá nào</p>}
          {courses.map((c) => (
            <div key={c} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5 group">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center"><GraduationCap size={12} className="text-orange-500" /></div>
                <span className="text-gray-700 text-sm" style={{ fontWeight: 600 }}>{c}</span>
              </div>
              <button onClick={() => onDelete(c)} className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 size={12} className="text-red-400" />
              </button>
            </div>
          ))}
        </div>
        <div className="px-6 pb-6 border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-500 mb-2" style={{ fontWeight: 600 }}>Thêm khoá mới</p>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => { setInput(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleAdd()}
              placeholder="VD: K20, K21..."
              className={`flex-1 px-3.5 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-white text-gray-700 placeholder-gray-400 ${error ? "border-red-400" : "border-gray-200"}`}
            />
            <button onClick={handleAdd} className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm transition-colors flex items-center gap-1.5 shrink-0 shadow-sm" style={{ fontWeight: 600 }}>
              <Plus size={14} />Thêm
            </button>
          </div>
          {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
        </div>
      </div>
    </div>
  );
}
