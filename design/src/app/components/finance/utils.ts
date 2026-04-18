// Shared utilities for finance components

export function isInDateRange(
  dateStr: string,
  start: string,
  end: string
): boolean {
  if (!start && !end) return true;
  const date = new Date(dateStr);
  const startDt = start ? new Date(start) : null;
  const endDt = end ? new Date(end) : null;

  if (startDt && endDt) return date >= startDt && date <= endDt;
  if (startDt) return date >= startDt;
  if (endDt) return date <= endDt;
  return true;
}