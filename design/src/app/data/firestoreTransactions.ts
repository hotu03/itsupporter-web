import { collection, doc, getDocs, getDoc, addDoc, setDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../utils/firebase';
import type { Transaction } from './finance';
import { buildTransactionDocumentId } from './operationKeys';

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
  const canonicalId = transaction.machineId ? buildTransactionDocumentId(String(transaction.machineId)) : null;

  if (!canonicalId) {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...transaction,
      createdAt: transaction.createdAt || new Date().toISOString(),
    });
    return docRef.id;
  }

  const transactionRef = doc(db, COLLECTION_NAME, canonicalId);
  await setDoc(transactionRef, {
    ...transaction,
    createdAt: transaction.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, { merge: true });
  return transactionRef.id;
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
  const canonicalId = buildTransactionDocumentId(String(machineId));
  const canonicalRef = doc(db, COLLECTION_NAME, canonicalId);
  const canonicalSnapshot = await getDoc(canonicalRef);

  if (canonicalSnapshot.exists()) {
    await updateFirestoreTransaction(canonicalId, updates);
    return;
  }

  const transactions = await getFirestoreTransactionsByMachineId(String(machineId));
  if (transactions.length > 0) {
    await updateFirestoreTransaction(transactions[0].id, updates);
  }
}
