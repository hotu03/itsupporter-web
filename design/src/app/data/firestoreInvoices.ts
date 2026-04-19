import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where, runTransaction } from 'firebase/firestore';
import { db } from '../utils/firebase';
import type { Invoice } from './invoices';

const COLLECTION_NAME = 'invoices';
const COUNTER_COLLECTION = 'counters';

// Get all invoices from Firestore
export async function getFirestoreInvoices(): Promise<Invoice[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Invoice));
}

// Get invoice by ID
export async function getFirestoreInvoiceById(id: string): Promise<Invoice | null> {
  const snapshot = await getDoc(doc(db, COLLECTION_NAME, id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as unknown as Invoice;
}

// Get invoices by machine ID
export async function getFirestoreInvoicesByMachineId(machineId: string): Promise<Invoice[]> {
  const q = query(collection(db, COLLECTION_NAME), where('machineId', '==', machineId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Invoice));
}

// Get invoices by customer email
export async function getFirestoreInvoicesByEmail(email: string): Promise<Invoice[]> {
  const q = query(collection(db, COLLECTION_NAME), where('customerEmail', '==', email.toLowerCase()));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Invoice));
}

// Get next invoice number atomically using a counter document
async function getNextInvoiceNumber(): Promise<string> {
  const counterRef = doc(db, COUNTER_COLLECTION, 'invoiceCounter');

  const newNumber = await runTransaction(db, async (transaction) => {
    const counterDoc = await transaction.get(counterRef);
    const currentCount = counterDoc.exists() ? counterDoc.data().count : 0;
    const nextCount = currentCount + 1;
    transaction.set(counterRef, { count: nextCount });
    return nextCount;
  });

  return `HD-${newNumber.toString().padStart(4, '0')}`;
}

// Add new invoice
export async function addFirestoreInvoice(invoice: Omit<Invoice, 'id' | 'invoiceNumber'>): Promise<string> {
  // Generate invoice number atomically to prevent duplicates under concurrent calls
  const invoiceNumber = await getNextInvoiceNumber();

  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...invoice,
    invoiceNumber,
    createdAt: invoice.createdAt || new Date().toLocaleDateString('vi-VN'),
  });
  return docRef.id;
}

// Update invoice
export async function updateFirestoreInvoice(id: string, updates: Partial<Invoice>): Promise<void> {
  await updateDoc(doc(db, COLLECTION_NAME, id), {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

// Delete invoice
export async function deleteFirestoreInvoice(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}
