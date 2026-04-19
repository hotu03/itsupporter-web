import { collection, doc, getDocs, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import type { Customer } from './customers';

const COLLECTION_NAME = 'customers';

// Get all customers from Firestore
export async function getFirestoreCustomers(): Promise<Customer[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Customer));
}

// Get customer by email
export async function getFirestoreCustomerByEmail(email: string): Promise<Customer | null> {
  const q = query(collection(db, COLLECTION_NAME), where('email', '==', email.toLowerCase()));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as unknown as Customer;
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
  console.log("[firestoreCustomers] Adding customer to collection:", COLLECTION_NAME);
  console.log("[firestoreCustomers] Customer data:", JSON.stringify(customer));
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...customer,
      createdAt: customer.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString(),
    });
    console.log("[firestoreCustomers] Success! Doc ID:", docRef.id);
    return docRef.id;
  } catch (err) {
    console.error("[firestoreCustomers] Error:", err);
    throw err;
  }
}

// Update customer
export async function updateFirestoreCustomer(id: string, updates: Partial<Customer>): Promise<void> {
  await updateDoc(doc(db, COLLECTION_NAME, id), {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

// Delete customer
export async function deleteFirestoreCustomer(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}
