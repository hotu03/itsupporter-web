// Finance data management

export interface Transaction {
  id: string;
  machineId?: number;
  customerName: string;
  phone: string;
  service: string;
  amount: number;
  paymentStatus: "paid" | "pending" | "free";
  date: string;
  discountCode?: string;
  discountAmount?: number;
}

// Get transactions from localStorage
export function getTransactions(): Transaction[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem("its_transactions");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

// Save transactions to localStorage
export function saveTransactions(transactions: Transaction[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("its_transactions", JSON.stringify(transactions));
}

// Add a new transaction
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

// Update an existing transaction by machineId
export function updateTransactionByMachineId(
  machineId: number,
  updates: Partial<Pick<Transaction, "paymentStatus" | "discountCode" | "discountAmount">>
): Transaction | null {
  const transactions = getTransactions();
  const index = transactions.findIndex(t => t.machineId === machineId);

  if (index === -1) return null;

  transactions[index] = { ...transactions[index], ...updates };
  saveTransactions(transactions);

  return transactions[index];
}
