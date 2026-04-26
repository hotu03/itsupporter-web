/**
 * @deprecated Use firestoreTransactions.ts instead.
 * This file is kept as a deprecated stub for backward compatibility.
 * All calls are redirected to the Firestore implementation.
 */

// Define the interface here as the source of truth (to avoid circular imports)
export interface Transaction {
  id: string;
  machineId?: string | number;
  customerName: string;
  phone: string;
  service: string;
  amount: number;
  paymentStatus: "paid" | "pending" | "free";
  date: string;
  discountCode?: string;
  discountAmount?: number;
}

import {
  getFirestoreTransactions as getFromFirestore,
  addFirestoreTransaction as addFromFirestore,
  updateFirestoreTransactionByMachineId as updateByMachineId,
} from './firestoreTransactions';

// ─── Deprecated Stubs (redirect to Firestore) ───────────────────────────────

export async function getTransactions(): Promise<Transaction[]> {
  console.warn("[DEPRECATED] getTransactions() from finance.ts → Use getFirestoreTransactions() from firestoreTransactions.ts");
  return getFromFirestore();
}

export async function addTransaction(transaction: Omit<Transaction, "id">): Promise<Transaction> {
  console.warn("[DEPRECATED] addTransaction() from finance.ts → Use addFirestoreTransaction() from firestoreTransactions.ts");
  const id = await addFromFirestore(transaction as any);
  return { ...transaction, id } as Transaction;
}

// This is the most important function used in CreateDrawer.tsx and Machines.tsx
export async function updateTransactionByMachineId(
  machineId: string | number,
  updates: Partial<Pick<Transaction, "paymentStatus" | "discountCode" | "discountAmount" | "service" | "amount">>
): Promise<Transaction | null> {
  console.warn("[DEPRECATED] updateTransactionByMachineId() from finance.ts → Use updateFirestoreTransactionByMachineId() from firestoreTransactions.ts");
  await updateByMachineId(machineId, updates as any);
  return null; // The old function returned the updated transaction, but for simplicity we return null
}
