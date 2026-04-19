import { collection, doc, getDocs, getDoc, setDoc, updateDoc, query, where } from 'firebase/firestore';
import { customerAuth, customerApp } from '../utils/firebase';
import type { Customer } from './customers';

const CUSTOMERS_COLLECTION = 'customers';
const MACHINES_COLLECTION = 'machines';

// Get Customer Firebase instance
function getCustomerDb() {
  const { getFirestore } = require('firebase/firestore');
  return getFirestore(customerApp);
}

// Sync customer data to Customer Firebase
export async function syncCustomerToCustomerFirebase(customer: Customer): Promise<void> {
  const db = getCustomerDb();
  const customerRef = doc(db, CUSTOMERS_COLLECTION, customer.email.toLowerCase());
  await setDoc(customerRef, {
    ...customer,
    syncedAt: new Date().toISOString(),
  });
}

// Get customer from Customer Firebase by email
export async function getCustomerFromCustomerFirebase(email: string): Promise<Customer | null> {
  const db = getCustomerDb();
  const customerRef = doc(db, CUSTOMERS_COLLECTION, email.toLowerCase());
  const snapshot = await getDoc(customerRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as unknown as Customer;
}

// Get machines for customer from Customer Firebase
export async function getCustomerMachinesFromCustomerFirebase(email: string): Promise<any[]> {
  const db = getCustomerDb();
  const q = query(
    collection(db, MACHINES_COLLECTION),
    where('customerEmail', '==', email.toLowerCase())
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Update customer in Customer Firebase
export async function updateCustomerInCustomerFirebase(email: string, updates: Partial<Customer>): Promise<void> {
  const db = getCustomerDb();
  const customerRef = doc(db, CUSTOMERS_COLLECTION, email.toLowerCase());
  await updateDoc(customerRef, {
    ...updates,
    syncedAt: new Date().toISOString(),
  });
}

// Sync machine to Customer Firebase
export async function syncMachineToCustomerFirebase(machine: any): Promise<void> {
  const db = getCustomerDb();
  const machineRef = doc(db, MACHINES_COLLECTION, String(machine.id));
  await setDoc(machineRef, {
    ...machine,
    syncedAt: new Date().toISOString(),
  });
}
