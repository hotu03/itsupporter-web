import React from "react";

// ─── Shared input/select styling ──────────────────────────────────────────────
export const inputCls = (err?: string): string =>
  `w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all bg-white ${
    err ? "border-red-400" : "border-gray-200"
  } text-gray-700 placeholder-gray-400`;

export const selectCls = (hasVal: boolean, err?: string): string =>
  `w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all appearance-none bg-white ${
    err ? "border-red-400" : "border-gray-200"
  } ${hasVal ? "text-gray-700" : "text-gray-400"}`;

// ─── FormField wrapper ────────────────────────────────────────────────────────
interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export function FormField({ label, required, error, children }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1.5">
        {label}{required && <span className="text-orange-500 ml-0.5">(*)</span>}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
