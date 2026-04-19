import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../utils/firebase';
import type { Transaction } from './finance';

const COLLECTION_NAME = 'transactions';

// Get all transactions from Firestore
export async function getFirestoreTransactions(): Promise<Transaction[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Transaction));
}

// Get transaction by ID
export async function getFirestoreTransactionById(id: string): Promise<Transaction | null> {
  const snapshot = await getDoc(doc(db, COLLECTION_NAME, id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as unknown as Transaction;
}

// Get transactions by machine ID
export async function getFirestoreTransactionsByMachineId(machineId: string): Promise<Transaction[]> {
  const q = query(collection(db, COLLECTION_NAME), where('machineId', '==', machineId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Transaction));
}

// Add new transaction
export async function addFirestoreTransaction(transaction: Omit<Transaction, 'id'>): Promise<string> {
  console.log("[firestoreTransactions] Adding transaction to collection:", COLLECTION_NAME);
  console.log("[firestoreTransactions] Transaction data:", JSON.stringify(transaction));
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...transaction,
      createdAt: new Date().toISOString(),
    });
    console.log("[firestoreTransactions] Success! Doc ID:", docRef.id);
    return docRef.id;
  } catch (err) {
    console.error("[firestoreTransactions] Error:", err);
    throw err;
  }
}

// Update transaction
export async function updateFirestoreTransaction(id: string, updates: Partial<Transaction>): Promise<void> {
  await updateDoc(doc(db, COLLECTION_NAME, id), {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

// Delete transaction
export async function deleteFirestoreTransaction(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}

// Update transaction by machine ID (for P5 admin confirm)
export async function updateFirestoreTransactionByMachineId(
  machineId: string | number,
  updates: Partial<Transaction>
): Promise<void> {
  const transactions = await getFirestoreTransactionsByMachineId(String(machineId));
  if (transactions.length > 0) {
    // Update the first matching transaction
    await updateFirestoreTransaction(transactions[0].id, updates);
  }
}
