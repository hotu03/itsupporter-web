import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../utils/firebase';
import type { Machine, Status } from './machines';

// Re-export types for convenience when importing from this file
export type { Machine, Status };

const COLLECTION_NAME = 'machines';

// Get all machines from Firestore
export async function getFirestoreMachines(): Promise<Machine[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Machine));
}

// Get machines by status
export async function getFirestoreMachinesByStatus(status: Status): Promise<Machine[]> {
  const q = query(collection(db, COLLECTION_NAME), where('status', '==', status));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Machine));
}

// Get machines by customer email
export async function getFirestoreMachinesByEmail(email: string): Promise<Machine[]> {
  const q = query(collection(db, COLLECTION_NAME), where('customerEmail', '==', email.toLowerCase()));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Machine));
}

// Get machines by date (yyyy-mm-dd format from dropOffTime or time)
export async function getFirestoreMachinesByDate(date: string): Promise<Machine[]> {
  const q = query(collection(db, COLLECTION_NAME), where('dropOffTime', '>=', date), where('dropOffTime', '<', date + 'T23:59:59'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Machine));
}

// Get machine by ID
export async function getFirestoreMachineById(id: string): Promise<Machine | null> {
  const snapshot = await getDoc(doc(db, COLLECTION_NAME, id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as unknown as Machine;
}

// Add new machine
export async function addFirestoreMachine(machine: Omit<Machine, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...machine,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

// Update machine
export async function updateFirestoreMachine(id: string, updates: Partial<Machine>): Promise<void> {
  await updateDoc(doc(db, COLLECTION_NAME, id), {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

// Delete machine
export async function deleteFirestoreMachine(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}

// Get next sequential ID (for compatibility with existing code)
export async function getNextFirestoreMachineId(): Promise<number> {
  const machines = await getFirestoreMachines();
  if (machines.length === 0) return 1;
  const maxId = machines.reduce((max, m) => {
    const id = typeof m.id === 'number' && !isNaN(m.id) && m.id < 1000000000 ? m.id : 0;
    return id > max ? id : max;
  }, 0);
  return maxId + 1;
}
