import { collection, doc, getDocs, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import type { Customer } from './customers';

// Re-export types for convenience
export type { Customer };

const COLLECTION_NAME = 'customers';

// Get all customers from Firestore
export async function getFirestoreCustomers(): Promise<Customer[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Customer));
}

// Get customer by email
export async function getFirestoreCustomerByEmail(email: string): Promise<Customer | null> {
  const normalizedEmail = email.trim().toLowerCase();

  const normalizedQuery = query(collection(db, COLLECTION_NAME), where('email', '==', normalizedEmail));
  const normalizedSnapshot = await getDocs(normalizedQuery);
  if (!normalizedSnapshot.empty) {
    const customerDoc = normalizedSnapshot.docs[0];
    return { id: customerDoc.id, ...customerDoc.data() } as unknown as Customer;
  }

  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  const legacyMatch = snapshot.docs.find((customerDoc) => {
    const rawEmail = (customerDoc.data() as { email?: string }).email;
    return typeof rawEmail === 'string' && rawEmail.trim().toLowerCase() === normalizedEmail;
  });

  if (!legacyMatch) return null;
  return { id: legacyMatch.id, ...legacyMatch.data() } as unknown as Customer;
}

// Get customer by phone
export async function getFirestoreCustomerByPhone(phone: string): Promise<Customer | null> {
  const q = query(collection(db, COLLECTION_NAME), where('phone', '==', phone));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as unknown as Customer;
}

// Add new customer
export async function addFirestoreCustomer(customer: Omit<Customer, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...customer,
      email: customer.email?.trim().toLowerCase() || "",
      createdAt: customer.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (err) {
    console.error("[firestoreCustomers] Error:", err);
    throw err;
  }
}

// Update customer
export async function updateFirestoreCustomer(id: string, updates: Partial<Customer>): Promise<void> {
  const normalizedUpdates: Partial<Customer> = {
    ...updates,
    ...(typeof updates.email === 'string' ? { email: updates.email.trim().toLowerCase() } : {}),
  };

  await updateDoc(doc(db, COLLECTION_NAME, id), {
    ...normalizedUpdates,
    updatedAt: new Date().toISOString(),
  });
}

// Delete customer
export async function deleteFirestoreCustomer(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}
