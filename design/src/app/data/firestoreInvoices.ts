import { collection, doc, getDocs, getDoc, query, where, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import type { Invoice } from './invoices';
import { buildInvoiceDocumentId } from './operationKeys';

// Re-export types for convenience
export type { Invoice };

const COLLECTION_NAME = 'invoices';
const INVOICE_CHANNEL_CODE: Record<Invoice['registrationType'], string> = {
  online: 'ONL',
  'in-person': 'OFF',
};

function formatInvoiceDatePart(date: Date): string {
  const yy = date.getFullYear().toString().slice(-2);
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');
  return `${yy}${mm}${dd}`;
}

function generateInvoiceRandomPart(length = 6): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return result;
}

async function generateInvoiceNumber(registrationType: Invoice['registrationType']): Promise<string> {
  const datePart = formatInvoiceDatePart(new Date());
  const channelPart = INVOICE_CHANNEL_CODE[registrationType] ?? 'GEN';

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const randomPart = generateInvoiceRandomPart();
    const invoiceNumber = `INV-${datePart}-${channelPart}-${randomPart}`;

    const duplicateSnapshot = await getDocs(
      query(collection(db, COLLECTION_NAME), where('invoiceNumber', '==', invoiceNumber)),
    );

    if (duplicateSnapshot.empty) {
      return invoiceNumber;
    }
  }

  const fallbackRandomPart = Date.now().toString(36).slice(-6).toUpperCase();
  return `INV-${datePart}-${channelPart}-${fallbackRandomPart}`;
}

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

// Add new invoice
export async function addFirestoreInvoice(invoice: Omit<Invoice, 'id' | 'invoiceNumber'>): Promise<string> {
  const canonicalId = invoice.machineId ? buildInvoiceDocumentId(String(invoice.machineId)) : null;

  if (!canonicalId) {
    const invoiceNumber = await generateInvoiceNumber(invoice.registrationType);
    const invoiceRef = doc(collection(db, COLLECTION_NAME));
    await setDoc(invoiceRef, {
      ...invoice,
      customerEmail: invoice.customerEmail.toLowerCase(),
      invoiceNumber,
      createdAt: invoice.createdAt || new Date().toLocaleDateString('vi-VN'),
      updatedAt: new Date().toISOString(),
    });
    return invoiceRef.id;
  }

  const invoiceRef = doc(db, COLLECTION_NAME, canonicalId);
  const existingSnapshot = await getDoc(invoiceRef);
  const invoiceNumber = existingSnapshot.exists()
    ? ((existingSnapshot.data() as Invoice).invoiceNumber || await generateInvoiceNumber(invoice.registrationType))
    : await generateInvoiceNumber(invoice.registrationType);

  await setDoc(invoiceRef, {
    ...invoice,
    customerEmail: invoice.customerEmail.toLowerCase(),
    invoiceNumber,
    createdAt: existingSnapshot.exists() ? (existingSnapshot.data() as Invoice).createdAt : (invoice.createdAt || new Date().toLocaleDateString('vi-VN')),
    updatedAt: new Date().toISOString(),
  }, { merge: true });
  return invoiceRef.id;
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
