/**
 * @deprecated Use firestorePoints.ts instead for data operations.
 * This file is kept for:
 * 1. Type definitions (PointRule, PointHistory)
 * 2. Pure business logic functions (calculatePoints, getPointsExplanation, formatCurrency)
 * 3. Deprecated stubs that redirect data calls to Firestore
 */

import {
  getFirestorePointRules,
  saveFirestorePointRules,
  getFirestorePointHistory,
  addFirestorePointHistory,
  getFirestoreCustomerPointHistory,
  getFirestoreCustomerPointHistoryByEmail,
} from './firestorePoints';

export interface PointRule {
  id: string;
  name: string;
  type: "per_order" | "amount_threshold";
  points: number;
  threshold?: number;
  enabled: boolean;
  description?: string;
}

export interface PointHistory {
  id: string;
  customerPhone: string;
  customerEmail?: string;
  customerName: string;
  type: "earn" | "redeem" | "spend";
  points: number;
  date: string;
  description: string;
  relatedId?: string;
}

// Re-export DEFAULT_POINT_RULES from firestorePoints if it exists, or define here
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

// ─── Deprecated Data Stubs (redirect to Firestore) ──────────────────────────

export async function getPointRules(): Promise<PointRule[]> {
  console.warn("[DEPRECATED] getPointRules() from points.ts → Use getFirestorePointRules() from firestorePoints.ts");
  return getFirestorePointRules();
}

export async function savePointRules(rules: PointRule[]): Promise<void> {
  console.warn("[DEPRECATED] savePointRules() from points.ts → Use saveFirestorePointRules() from firestorePoints.ts");
  return saveFirestorePointRules(rules);
}

export async function addPointHistory(entry: Omit<PointHistory, 'id'>): Promise<string> {
  console.warn("[DEPRECATED] addPointHistory() from points.ts → Use addFirestorePointHistory() from firestorePoints.ts");
  return addFirestorePointHistory(entry);
}

export async function getPointHistory(): Promise<PointHistory[]> {
  console.warn("[DEPRECATED] getPointHistory() from points.ts → Use getFirestorePointHistory() from firestorePoints.ts");
  return getFirestorePointHistory();
}

export async function getCustomerPointHistory(customerPhone: string): Promise<PointHistory[]> {
  console.warn("[DEPRECATED] getCustomerPointHistory() from points.ts → Use getFirestoreCustomerPointHistory() from firestorePoints.ts");
  return getFirestoreCustomerPointHistory(customerPhone);
}

export async function getCustomerPointHistoryByEmail(customerEmail: string): Promise<PointHistory[]> {
  console.warn("[DEPRECATED] getCustomerPointHistoryByEmail() from points.ts → Use getFirestoreCustomerPointHistoryByEmail() from firestorePoints.ts");
  return getFirestoreCustomerPointHistoryByEmail(customerEmail);
}

// ─── Pure Business Logic (KEPT - Not deprecated) ────────────────────────────

/**
 * Calculate points earned for an order based on active rules
 * @param orderAmount Total order amount in VND
 * @returns Total points earned
 */
export function calculatePoints(orderAmount: number): number {
  // Note: This function uses getPointRules() which now redirects to Firestore.
  // In a full async migration, this should be made async too.
  const rules = DEFAULT_POINT_RULES.filter((r) => r.enabled); // Use defaults for now to avoid async in pure function

  let totalPoints = 0;

  rules
    .filter((r) => r.type === "per_order")
    .forEach((r) => {
      totalPoints += r.points;
    });

  const thresholdRules = rules
    .filter((r) => r.type === "amount_threshold" && r.threshold! <= orderAmount)
    .sort((a, b) => (b.threshold || 0) - (a.threshold || 0));

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
  const rules = DEFAULT_POINT_RULES.filter((r) => r.enabled);
  const explanations: string[] = [];

  rules
    .filter((r) => r.type === "per_order")
    .forEach((r) => {
      explanations.push(`+${r.points} điểm: ${r.name}`);
    });

  const thresholdRules = rules
    .filter((r) => r.type === "amount_threshold" && r.threshold! <= orderAmount)
    .sort((a, b) => (b.threshold || 0) - (a.threshold || 0));

  if (thresholdRules.length > 0) {
    const rule = thresholdRules[0];
    explanations.push(`+${rule.points} điểm: ${rule.name}`);
  }

  return explanations;
}