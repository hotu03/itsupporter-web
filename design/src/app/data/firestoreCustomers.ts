import { collection, doc, getDoc, getDocs, query, setDoc, where, updateDoc, deleteDoc, runTransaction } from 'firebase/firestore';
import { db } from '../utils/firebase';
import type { Customer } from './customers';
import { buildCustomerDocumentId } from './operationKeys';

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
  const customerRef = doc(db, COLLECTION_NAME, buildCustomerDocumentId({
    phone: customer.phone,
    email: customer.email,
  }));
  const existingSnapshot = await getDoc(customerRef);

  await setDoc(customerRef, {
    ...customer,
    email: customer.email?.trim().toLowerCase() || "",
    createdAt: existingSnapshot.exists() ? (existingSnapshot.data() as Customer).createdAt : (customer.createdAt || new Date().toISOString().split('T')[0]),
    updatedAt: new Date().toISOString(),
  }, { merge: true });

  return customerRef.id;
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

export async function upsertFirestoreCustomerByIdentity(customer: Omit<Customer, 'id'>): Promise<string> {
  return addFirestoreCustomer(customer);
}

// Delete customer
export async function deleteFirestoreCustomer(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}

// Decrement customer points and totalRepairs atomically
export async function decrementCustomerPointsAndRepairs(
  phone: string,
  pointsToSubtract: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const customerRef = doc(db, COLLECTION_NAME, buildCustomerDocumentId({ phone }));
    await runTransaction(db, async (transaction) => {
      const customerSnap = await transaction.get(customerRef);
      if (!customerSnap.exists()) {
        return; // Customer not found, nothing to adjust
      }

      const customer = customerSnap.data() as Customer;
      const currentPoints = customer.points || 0;
      const currentRepairs = customer.totalRepairs || 0;

      const newPoints = Math.max(0, currentPoints - pointsToSubtract);
      const newRepairs = Math.max(0, currentRepairs - 1);

      transaction.update(customerRef, {
        points: newPoints,
        totalRepairs: newRepairs,
        updatedAt: new Date().toISOString(),
      });
    });
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: message };
  }
}
