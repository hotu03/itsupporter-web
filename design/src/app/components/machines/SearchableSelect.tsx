import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, X } from "lucide-react";

interface SearchableSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
  label?: string;
}

export function SearchableSelect({
  value,
  onChange,
  options,
  placeholder = "Select Items",
  label
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (opt: string) => {
    onChange(opt);
    setOpen(false);
    setQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div className="flex flex-col gap-1" ref={ref}>
      {label && <label className="text-xs font-medium text-gray-600">{label}</label>}
      <div className="relative">
        {/* Trigger button */}
        <button
          type="button"
          onClick={() => { setOpen((p) => !p); setQuery(""); }}
          className={`w-full flex items-center justify-between border rounded-lg px-3 py-2 text-sm outline-none transition-all ${
            open
              ? "border-orange-400 ring-2 ring-orange-200 bg-white"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <span className={value ? "text-gray-800" : "text-gray-400"}>
            {value || placeholder}
          </span>
          <div className="flex items-center gap-1">
            {value && (
              <span
                onClick={handleClear}
                className="text-gray-300 hover:text-gray-500 transition-colors cursor-pointer p-0.5"
              >
                <X size={12} />
              </span>
            )}
            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            {/* Search input */}
            <div className="p-2 border-b border-gray-100">
              <div className="relative">
                <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search for an item..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-7 pr-3 py-1.5 text-xs border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                />
              </div>
            </div>
            {/* Options list */}
            <ul className="max-h-52 overflow-y-auto">
              {filtered.length === 0 ? (
                <li className="px-3 py-3 text-xs text-gray-400 text-center">Không tìm thấy</li>
              ) : (
                filtered.map((opt) => (
                  <li
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className={`px-3 py-2.5 text-sm cursor-pointer transition-colors hover:bg-orange-50 hover:text-orange-700 ${
                      opt === value ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-700"
                    }`}
                  >
                    {opt}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
