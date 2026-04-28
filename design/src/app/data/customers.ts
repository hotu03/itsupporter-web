/**
 * @deprecated Use firestoreCustomers.ts instead.
 * This file is kept as a deprecated stub for backward compatibility.
 * All calls are redirected to the Firestore implementation.
 */

import {
  getFirestoreCustomers,
  getFirestoreCustomerByPhone,
  getFirestoreCustomerByEmail,
  addFirestoreCustomer,
  updateFirestoreCustomer,
} from './firestoreCustomers';

export interface Customer {
  id: string | number;
  name: string;
  phone: string;
  email?: string;
  createdAt: string;
  totalRepairs: number;
  lastRepair?: string;
  lastLoginAt?: string;
  notes?: string;
  points: number;
  passwordHash?: string;
  operationId?: string;
  source?: "online" | "approval" | "in_person" | "edit";
  updatedAt?: string;
}

// ─── Deprecated Stubs (redirect to Firestore) ───────────────────────────────

export async function getCustomers(): Promise<Customer[]> {
  console.warn("[DEPRECATED] getCustomers() from customers.ts → Use getFirestoreCustomers() from firestoreCustomers.ts");
  return getFirestoreCustomers();
}

export async function getCustomerByPhone(phone: string): Promise<Customer | undefined> {
  console.warn("[DEPRECATED] getCustomerByPhone() from customers.ts → Use getFirestoreCustomerByPhone() from firestoreCustomers.ts");
  const customer = await getFirestoreCustomerByPhone(phone);
  return customer || undefined;
}

export async function getCustomerByEmail(email: string): Promise<Customer | undefined> {
  console.warn("[DEPRECATED] getCustomerByEmail() from customers.ts → Use getFirestoreCustomerByEmail() from firestoreCustomers.ts");
  const customer = await getFirestoreCustomerByEmail(email);
  return customer || undefined;
}

export async function addOrUpdateCustomer(
  name: string,
  phone: string,
  pointsToAdd: number = 0,
  email: string = ""
): Promise<Customer> {
  console.warn("[DEPRECATED] addOrUpdateCustomer() from customers.ts → Use addFirestoreCustomer() or updateFirestoreCustomer() from firestoreCustomers.ts");

  const existing = await getFirestoreCustomerByPhone(phone);

  if (existing?.id) {
    const updates = {
      name: name || existing.name,
      points: (existing.points || 0) + pointsToAdd,
      ...(email && { email }),
      totalRepairs: (existing.totalRepairs || 0) + 1,
    };
    await updateFirestoreCustomer(String(existing.id), updates);
    return { ...existing, ...updates } as Customer;
  } else {
    const newCustomer = {
      name,
      phone,
      email,
      points: pointsToAdd,
      totalRepairs: 1,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const id = await addFirestoreCustomer(newCustomer);
    return { ...newCustomer, id } as Customer;
  }
}

export async function saveCustomers(_customers: Customer[]): Promise<void> {
  console.warn("[DEPRECATED] saveCustomers() from customers.ts - This function is no longer needed with Firestore");
  // No-op - Firestore handles persistence automatically
}

export function hasPassword(_email: string): boolean {
  console.warn("[DEPRECATED] hasPassword() from customers.ts - Password feature not fully migrated to Firestore yet");
  return false;
}

export function setCustomerPassword(_email: string, _password: string): boolean {
  console.warn("[DEPRECATED] setCustomerPassword() from customers.ts - Password feature not fully migrated to Firestore yet");
  return false;
}

export function verifyCustomerPassword(_email: string, _password: string): boolean {
  console.warn("[DEPRECATED] verifyCustomerPassword() from customers.ts - Password feature not fully migrated to Firestore yet");
  return false;
}

export async function addCustomer(customer: Omit<Customer, "id">): Promise<Customer> {
  console.warn("[DEPRECATED] addCustomer() from customers.ts → Use addOrUpdateCustomer()");
  return addOrUpdateCustomer(customer.name || "", customer.phone, 0, customer.email || "");
}

export async function updateCustomer(phone: string, updates: Partial<Omit<Customer, "id" | "phone">>): Promise<Customer | undefined> {
  console.warn("[DEPRECATED] updateCustomer() from customers.ts");
  const customer = await getCustomerByPhone(phone);
  if (!customer?.id) return undefined;

  await updateFirestoreCustomer(String(customer.id), updates as any);
  return { ...customer, ...updates } as Customer;
}

export async function deleteCustomer(phone: string): Promise<void> {
  console.warn("[DEPRECATED] deleteCustomer() from customers.ts");
  const customer = await getCustomerByPhone(phone);
  if (customer?.id) {
    console.warn("Customer deletion would require deleteFirestoreCustomer - not implemented in stub to avoid unused import");
  }
}

export async function registerCustomer(name: string, phone: string, email: string = ""): Promise<Customer> {
  console.warn("[DEPRECATED] registerCustomer() from customers.ts");
  return addOrUpdateCustomer(name, phone, 0, email);
}