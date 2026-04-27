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

export const DEFAULT_POINT_RULES: PointRule[] = [];

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

function getActiveRules(rules: PointRule[]): PointRule[] {
  return rules.filter((rule) => rule.enabled);
}

export function calculatePoints(orderAmount: number, rules: PointRule[] = DEFAULT_POINT_RULES): number {
  const activeRules = getActiveRules(rules);
  if (activeRules.length === 0) {
    return 0;
  }

  let totalPoints = 0;

  activeRules
    .filter((rule) => rule.type === "per_order")
    .forEach((rule) => {
      totalPoints += rule.points;
    });

  const thresholdRules = activeRules
    .filter((rule) => rule.type === "amount_threshold" && (rule.threshold ?? 0) <= orderAmount)
    .sort((a, b) => (b.threshold ?? 0) - (a.threshold ?? 0));

  if (thresholdRules.length > 0) {
    totalPoints += thresholdRules[0].points;
  }

  return totalPoints;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function getPointsExplanation(orderAmount: number, rules: PointRule[] = DEFAULT_POINT_RULES): string[] {
  const activeRules = getActiveRules(rules);
  if (activeRules.length === 0) {
    return [];
  }

  const explanations: string[] = [];

  activeRules
    .filter((rule) => rule.type === "per_order")
    .forEach((rule) => {
      explanations.push(`+${rule.points} điểm: ${rule.name}`);
    });

  const thresholdRules = activeRules
    .filter((rule) => rule.type === "amount_threshold" && (rule.threshold ?? 0) <= orderAmount)
    .sort((a, b) => (b.threshold ?? 0) - (a.threshold ?? 0));

  if (thresholdRules.length > 0) {
    const rule = thresholdRules[0];
    explanations.push(`+${rule.points} điểm: ${rule.name}`);
  }

  return explanations;
}
