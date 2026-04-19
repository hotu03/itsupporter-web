import { collection, doc, getDocs, addDoc, query, where, deleteDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const COLLECTION_NAME = 'redeemed_vouchers';

export interface RedeemedVoucher {
  id: string;
  customerPhone: string;
  customerEmail?: string;
  customerName: string;
  voucherCode: string;
  voucherName: string;
  pointsSpent: number;
  redeemedAt: string;
}

// Get all redeemed vouchers from Firestore
export async function getFirestoreRedeemedVouchers(): Promise<RedeemedVoucher[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as RedeemedVoucher));
}

// Add a redeemed voucher
export async function addFirestoreRedeemedVoucher(voucher: Omit<RedeemedVoucher, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), voucher);
  return docRef.id;
}

// Get redeemed vouchers by customer phone
export async function getFirestoreCustomerRedeemedVouchers(customerPhone: string): Promise<RedeemedVoucher[]> {
  const q = query(collection(db, COLLECTION_NAME), where('customerPhone', '==', customerPhone));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as RedeemedVoucher));
}

// Get redeemed vouchers by customer email
export async function getFirestoreCustomerRedeemedVouchersByEmail(customerEmail: string): Promise<RedeemedVoucher[]> {
  const normalized = customerEmail.toLowerCase();
  const q = query(collection(db, COLLECTION_NAME), where('customerEmail', '==', normalized));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as RedeemedVoucher));
}

// Check if a specific voucher code is redeemed by customer email
export async function isFirestoreVoucherRedeemedByCustomerEmail(customerEmail: string, voucherCode: string): Promise<boolean> {
  const normalized = customerEmail.toLowerCase();
  const q = query(
    collection(db, COLLECTION_NAME),
    where('customerEmail', '==', normalized),
    where('voucherCode', '==', voucherCode)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

// Delete redeemed voucher by id
export async function deleteFirestoreRedeemedVoucher(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}