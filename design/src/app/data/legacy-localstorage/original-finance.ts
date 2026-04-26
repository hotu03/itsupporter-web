// ORIGINAL LOCALSTORAGE IMPLEMENTATION - ARCHIVED FOR REFERENCE ONLY
// This is the complete original localStorage-based finance/transaction management before migration to Firestore.
// It is NO LONGER USED in production. All active code uses firestoreTransactions.ts.

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

const STORAGE_KEY = "its_transactions";

export function getTransactions(): Transaction[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function saveTransactions(transactions: Transaction[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export function addTransaction(transaction: Omit<Transaction, "id">): Transaction {
  const transactions = getTransactions();
  const newId = `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const newTransaction: Transaction = {
    ...transaction,
    id: newId,
  };

  transactions.push(newTransaction);
  saveTransactions(transactions);

  return newTransaction;
}

export function updateTransactionByMachineId(
  machineId: string | number,
  updates: Partial<Pick<Transaction, "paymentStatus" | "discountCode" | "discountAmount" | "service" | "amount">>
): Transaction | null {
  const transactions = getTransactions();
  const index = transactions.findIndex(t => t.machineId === machineId);

  if (index === -1) return null;

  transactions[index] = { ...transactions[index], ...updates };
  saveTransactions(transactions);

  return transactions[index];
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
