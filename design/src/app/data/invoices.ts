/**
 * @deprecated Use firestoreInvoices.ts instead.
 * This file is kept as a deprecated stub for backward compatibility.
 * All calls are redirected to the Firestore implementation.
 */

import {
  getFirestoreInvoices,
  getFirestoreInvoiceById,
  getFirestoreInvoicesByEmail,
  addFirestoreInvoice,
  updateFirestoreInvoice,
  deleteFirestoreInvoice,
} from './firestoreInvoices';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  machineId?: string | number;
  customerName: string;
  customerEmail: string;
  phone: string;
  registrationType: "online" | "in-person";

  services: {
    name: string;
    price: number;
  }[];
  machineCondition?: string;
  needs?: string;
  category: string;
  warranty: "con" | "het";
  charger: boolean;
  password?: string;

  createdAt: string;
  createdTime: string;
  dropOffTime?: string;
  appointmentTime?: string;

  serviceAmount: number;
  discountCode?: string;
  discountAmount: number;
  finalAmount: number;
  paymentStatus: "paid" | "pending" | "free";

  pointsEarned?: number;

  tester?: string;
  createdBy?: string;

  notes?: string;
  operationId?: string;
  source?: "online" | "approval" | "in_person" | "edit";
}

// ─── Deprecated Stubs (redirect to Firestore) ───────────────────────────────

export async function getInvoices(): Promise<Invoice[]> {
  console.warn("[DEPRECATED] getInvoices() from invoices.ts → Use getFirestoreInvoices() from firestoreInvoices.ts");
  return getFirestoreInvoices();
}

export async function addInvoice(invoice: Omit<Invoice, "id" | "invoiceNumber">): Promise<Invoice> {
  console.warn("[DEPRECATED] addInvoice() from invoices.ts → Use addFirestoreInvoice() from firestoreInvoices.ts");
  const id = await addFirestoreInvoice(invoice);
  const persistedInvoice = await getFirestoreInvoiceById(id);

  if (!persistedInvoice) {
    throw new Error("Cannot load created invoice from Firestore");
  }

  return persistedInvoice;
}

export async function getInvoiceById(id: string): Promise<Invoice | undefined> {
  console.warn("[DEPRECATED] getInvoiceById() from invoices.ts → Use getFirestoreInvoiceById() from firestoreInvoices.ts");
  const invoice = await getFirestoreInvoiceById(id);
  return invoice || undefined;
}

export async function getInvoicesByPhone(phone: string): Promise<Invoice[]> {
  console.warn("[DEPRECATED] getInvoicesByPhone() from invoices.ts");
  // Note: firestoreInvoices doesn't have this exact method yet. For now return all and filter
  const all = await getFirestoreInvoices();
  return all.filter(inv => inv.phone === phone);
}

export async function getInvoicesByEmail(email: string): Promise<Invoice[]> {
  console.warn("[DEPRECATED] getInvoicesByEmail() from invoices.ts → Use getFirestoreInvoicesByEmail() from firestoreInvoices.ts");
  return getFirestoreInvoicesByEmail(email);
}

export async function getInvoicesByCustomerName(customerName: string): Promise<Invoice[]> {
  console.warn("[DEPRECATED] getInvoicesByCustomerName() from invoices.ts");
  const all = await getFirestoreInvoices();
  return all.filter(inv =>
    inv.customerName.toLowerCase().includes(customerName.toLowerCase())
  );
}

export async function updateInvoicePaymentStatus(id: string, paymentStatus: "paid" | "pending" | "free"): Promise<void> {
  console.warn("[DEPRECATED] updateInvoicePaymentStatus() from invoices.ts → Use updateFirestoreInvoice() from firestoreInvoices.ts");
  await updateFirestoreInvoice(id, { paymentStatus });
}

export async function updateInvoice(id: string, updates: Partial<Invoice>): Promise<void> {
  console.warn("[DEPRECATED] updateInvoice() from invoices.ts → Use updateFirestoreInvoice() from firestoreInvoices.ts");
  await updateFirestoreInvoice(id, updates);
}

export async function deleteInvoice(id: string): Promise<void> {
  console.warn("[DEPRECATED] deleteInvoice() from invoices.ts → Use deleteFirestoreInvoice() from firestoreInvoices.ts");
  await deleteFirestoreInvoice(id);
}

// Pure function - can keep
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
