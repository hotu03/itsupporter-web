/** Normalize a date string to yyyy-MM-dd for safe comparison. Handles:
 * - ISO: "2026-04-30T10:30:00.000Z" → "2026-04-30"
 * - datetime-local: "2026-04-30T10:30" → "2026-04-30"
 * - vnDateTime: "10:30 30/04/2026" → "2026-04-30"
 * - vnDate: "30/04/2026" → "2026-04-30"
 * - yyyy-MM-dd: "2026-04-30" → "2026-04-30"
 */
export function normalizeDate(d: string | undefined): string | undefined {
  if (!d) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  if (/^\d{4}-\d{2}-\d{2}T/.test(d)) {
    const parts = d.split("T");
    return parts[0];
  }
  const vnMatch = d.match(/(\d{2})\/(\d{2})\/(\d{4})$/);
  if (vnMatch) {
    const [, day, month, year] = vnMatch;
    return `${year}-${month}-${day}`;
  }
  const vnDateTimeMatch = d.match(/(\d{2})\/(\d{2})\/(\d{4})\s+\d{2}:\d{2}/);
  if (vnDateTimeMatch) {
    const [, day, month, year] = vnDateTimeMatch;
    return `${year}-${month}-${day}`;
  }
  return undefined;
}

/** Extract time portion (HH:mm) from a datetime-local string like "2026-04-30T10:30" */
export function extractTime(datetimeLocal: string | undefined): string {
  if (!datetimeLocal) {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  }
  const parts = datetimeLocal.split("T");
  return parts[1] ? parts[1].substring(0, 5) : datetimeLocal;
}

/** Filter items by date range using normalized date comparison */
export function isInDateRange(dateStr: string, start: string, end: string): boolean {
  if (!start && !end) return true;
  const normalized = normalizeDate(dateStr);
  if (!normalized) return false;
  const startDt = start ? new Date(start) : null;
  const endDt = end ? new Date(end) : null;
  const date = new Date(normalized);
  if (startDt && endDt) return date >= startDt && date <= endDt;
  if (startDt) return date >= startDt;
  if (endDt) return date <= endDt;
  return true;
}
