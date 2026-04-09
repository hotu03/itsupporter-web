// Point system data and utilities

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PointRule {
  id: string;
  name: string;
  type: "per_order" | "amount_threshold"; // Loại quy tắc
  points: number; // Số điểm cộng
  threshold?: number; // Ngưỡng tiền (nếu type = amount_threshold)
  enabled: boolean; // Có áp dụng không
  description?: string;
}

export interface PointHistory {
  id: string;
  customerPhone: string;
  customerName: string;
  type: "earn" | "redeem" | "spend"; // Tích điểm, đổi điểm, hoặc tiêu điểm
  points: number; // Số điểm (+ tích, - đổi)
  date: string; // ISO date string
  description: string; // Mô tả: "Đơn hàng #123 - 150K" hoặc "Đổi mã SAVE20"
  relatedId?: string; // ID đơn hàng hoặc mã giảm giá
}

// ─── Default Data ────────────────────────────────────────────────────────────

export const DEFAULT_POINT_RULES: PointRule[] = [
  {
    id: "1",
    name: "Đưa máy sửa chữa",
    type: "per_order",
    points: 1,
    enabled: true,
    description: "Cộng 1 điểm cho mỗi lần đưa máy sửa",
  },
  {
    id: "2",
    name: "Đơn hàng trên 50K",
    type: "amount_threshold",
    points: 2,
    threshold: 50000,
    enabled: true,
    description: "Cộng 2 điểm khi đơn hàng trên 50,000 VND",
  },
  {
    id: "3",
    name: "Đơn hàng trên 100K",
    type: "amount_threshold",
    points: 3,
    threshold: 100000,
    enabled: true,
    description: "Cộng 3 điểm khi đơn hàng trên 100,000 VND",
  },
  {
    id: "4",
    name: "Đơn hàng trên 200K",
    type: "amount_threshold",
    points: 5,
    threshold: 200000,
    enabled: true,
    description: "Cộng 5 điểm khi đơn hàng trên 200,000 VND",
  },
];

// ─── LocalStorage Functions ───────────────────────────────────────────────────

const STORAGE_KEYS = {
  RULES: "its_point_rules",
  HISTORY: "its_point_history",
};

// Point Rules
export function getPointRules(): PointRule[] {
  if (typeof window === "undefined") return DEFAULT_POINT_RULES;

  const stored = localStorage.getItem(STORAGE_KEYS.RULES);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_POINT_RULES;
    }
  }
  return DEFAULT_POINT_RULES;
}

export function savePointRules(rules: PointRule[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.RULES, JSON.stringify(rules));
}

// Point History
export function getPointHistory(): PointHistory[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function savePointHistory(history: PointHistory[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
}

export function addPointHistory(entry: PointHistory): void {
  const history = getPointHistory();
  history.unshift(entry); // Add to beginning
  savePointHistory(history);
}

export function getCustomerPointHistory(customerPhone: string): PointHistory[] {
  return getPointHistory().filter((h) => h.customerPhone === customerPhone);
}

// ─── Business Logic ───────────────────────────────────────────────────────────

/**
 * Calculate points earned for an order
 * @param orderAmount Total order amount in VND
 * @returns Total points earned
 */
export function calculatePoints(orderAmount: number): number {
  const rules = getPointRules().filter((r) => r.enabled);

  let totalPoints = 0;

  // Add per_order points
  rules
    .filter((r) => r.type === "per_order")
    .forEach((r) => {
      totalPoints += r.points;
    });

  // Add highest threshold points
  const thresholdRules = rules
    .filter((r) => r.type === "amount_threshold" && r.threshold! <= orderAmount)
    .sort((a, b) => b.threshold! - a.threshold!);

  if (thresholdRules.length > 0) {
    totalPoints += thresholdRules[0].points;
  }

  return totalPoints;
}

/**
 * Format currency to VND
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

/**
 * Get point rules explanation for display
 */
export function getPointsExplanation(orderAmount: number): string[] {
  const rules = getPointRules().filter((r) => r.enabled);
  const explanations: string[] = [];

  // Per order rules
  rules
    .filter((r) => r.type === "per_order")
    .forEach((r) => {
      explanations.push(`+${r.points} điểm: ${r.name}`);
    });

  // Threshold rules (only highest applicable)
  const thresholdRules = rules
    .filter((r) => r.type === "amount_threshold" && r.threshold! <= orderAmount)
    .sort((a, b) => b.threshold! - a.threshold!);

  if (thresholdRules.length > 0) {
    const rule = thresholdRules[0];
    explanations.push(`+${rule.points} điểm: ${rule.name}`);
  }

  return explanations;
}