import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
}

export function Pagination({
  total,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 15, 20],
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  // Build tab numbers — show at most 7 tabs with ellipsis logic
  const getPages = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "...")[] = [1];
    if (page > 3) pages.push("...");
    for (let p = Math.max(2, page - 1); p <= Math.min(totalPages - 1, page + 1); p++) {
      pages.push(p);
    }
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-between gap-4 px-1 pt-3 pb-1 flex-wrap">
      {/* Left: info + page size */}
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <span>
          {total === 0
            ? "Không có dữ liệu"
            : `Hiển thị ${start}–${end} / ${total} mục`}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 text-xs">Hiện</span>
          <div className="flex items-center gap-0.5 border border-gray-200 rounded-lg overflow-hidden bg-white">
            {pageSizeOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onPageSizeChange(opt);
                  onPageChange(1);
                }}
                className={`px-2.5 py-1 text-xs transition-colors ${
                  pageSize === opt
                    ? "bg-orange-500 text-white font-semibold"
                    : "text-gray-500 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <span className="text-gray-400 text-xs">/ trang</span>
        </div>
      </div>

      {/* Right: page tabs */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={14} />
        </button>

        {/* Page numbers */}
        {pages.map((p, idx) =>
          p === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 h-8 flex items-center justify-center text-gray-400 text-xs select-none"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors border ${
                page === p
                  ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
              }`}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

/** Convenience hook to manage pagination state */
export function usePagination(defaultPageSize = 10) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const handlePageChange = (p: number) => setPage(p);
  const handlePageSizeChange = (s: number) => {
    setPageSize(s);
    setPage(1);
  };

  // Call this whenever the data source (filtered list) changes to auto-reset
  const resetPage = () => setPage(1);

  function paginate<T>(items: T[]): T[] {
    return items.slice((page - 1) * pageSize, page * pageSize);
  }

  return { page, pageSize, handlePageChange, handlePageSizeChange, resetPage, paginate };
}

// Need useState import
import { useState } from "react";
