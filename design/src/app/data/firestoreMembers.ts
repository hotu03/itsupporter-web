import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../utils/firebase';
import type { Member, MemberType, ApprovalStatus } from './members';

const COLLECTION_NAME = 'members';

// Get all members from Firestore
export async function getFirestoreMembers(): Promise<Member[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Member));
}

// Get member by ID
export async function getFirestoreMemberById(id: string): Promise<Member | null> {
  const snapshot = await getDoc(doc(db, COLLECTION_NAME, id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as unknown as Member;
}

// Get members by type
export async function getFirestoreMembersByType(type: MemberType): Promise<Member[]> {
  const q = query(collection(db, COLLECTION_NAME), where('type', '==', type));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Member));
}

// Get members by approval status
export async function getFirestoreMembersByStatus(status: ApprovalStatus): Promise<Member[]> {
  const q = query(collection(db, COLLECTION_NAME), where('approvalStatus', '==', status));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Member));
}

// Get member by email
export async function getFirestoreMemberByEmail(email: string): Promise<Member | null> {
  const q = query(collection(db, COLLECTION_NAME), where('email', '==', email.toLowerCase()));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() } as unknown as Member;
}

// Add new member
export async function addFirestoreMember(member: Omit<Member, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...member,
    registeredAt: member.registeredAt || new Date().toISOString(),
  });
  return docRef.id;
}

// Update member
export async function updateFirestoreMember(id: string, updates: Partial<Member>): Promise<void> {
  await updateDoc(doc(db, COLLECTION_NAME, id), {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

// Delete member
export async function deleteFirestoreMember(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}
