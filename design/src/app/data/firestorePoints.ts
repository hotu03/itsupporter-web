import { collection, doc, getDocs, addDoc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../utils/firebase';
import type { PointRule, PointHistory } from './points';

// Re-export types for convenience
export type { PointRule, PointHistory };

const POINT_RULES_COLLECTION = 'point_rules';
const POINT_HISTORY_COLLECTION = 'point_history';

// ─── Point Rules ───────────────────────────────────────────────────────────────

export async function getFirestorePointRules(): Promise<PointRule[]> {
  const snapshot = await getDocs(collection(db, POINT_RULES_COLLECTION));
  if (snapshot.empty) {
    // Return default rules if no data in Firestore
    return [];
  }
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as PointRule));
}

export async function saveFirestorePointRules(rules: PointRule[]): Promise<void> {
  // Clear existing rules and save new ones
  const snapshot = await getDocs(collection(db, POINT_RULES_COLLECTION));
  const deletePromises = snapshot.docs.map(d => updateDoc(doc(db, POINT_RULES_COLLECTION, d.id), { _deleted: true }));
  await Promise.all(deletePromises);

  // Add new rules
  const addPromises = rules.map(rule => addDoc(collection(db, POINT_RULES_COLLECTION), rule));
  await Promise.all(addPromises);
}

export async function addFirestorePointRule(rule: Omit<PointRule, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, POINT_RULES_COLLECTION), rule);
  return docRef.id;
}

export async function updateFirestorePointRule(id: string, updates: Partial<PointRule>): Promise<void> {
  await updateDoc(doc(db, POINT_RULES_COLLECTION, id), {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

// ─── Point History ────────────────────────────────────────────────────────────

export async function getFirestorePointHistory(): Promise<PointHistory[]> {
  const snapshot = await getDocs(collection(db, POINT_HISTORY_COLLECTION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as PointHistory));
}

export async function addFirestorePointHistory(entry: Omit<PointHistory, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, POINT_HISTORY_COLLECTION), {
    ...entry,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

export async function getFirestoreCustomerPointHistory(customerPhone: string): Promise<PointHistory[]> {
  const q = query(collection(db, POINT_HISTORY_COLLECTION), where('customerPhone', '==', customerPhone));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as PointHistory));
}

export async function getFirestoreCustomerPointHistoryByEmail(customerEmail: string): Promise<PointHistory[]> {
  const normalized = customerEmail.toLowerCase();
  const q = query(collection(db, POINT_HISTORY_COLLECTION), where('customerEmail', '==', normalized));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as PointHistory));
}
