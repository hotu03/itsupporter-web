import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  QueryConstraint,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';
import { db } from '../utils/firebase';

// Generic get all documents from a collection
export async function getCollection<T>(collectionName: string): Promise<T[]> {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T);
}

// Get document by ID
export async function getDocument<T>(collectionName: string, id: string): Promise<T | null> {
  const snapshot = await getDoc(doc(db, collectionName, id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as T;
}

// Set document (create or overwrite)
export async function setDocument<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: T
): Promise<void> {
  await setDoc(doc(db, collectionName, id), data);
}

// Update existing document
export async function updateDocument<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> {
  await updateDoc(doc(db, collectionName, id), data);
}

// Delete document
export async function deleteDocument(collectionName: string, id: string): Promise<void> {
  await deleteDoc(doc(db, collectionName, id));
}

// Query collection with constraints
export async function queryCollection<T>(
  collectionName: string,
  constraints: QueryConstraint[]
): Promise<T[]> {
  const q = query(collection(db, collectionName), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T);
}

// Real-time listener for collection
export function onCollectionSnapshot<T>(
  collectionName: string,
  callback: (data: T[]) => void,
  constraints: QueryConstraint[] = []
): () => void {
  const q = query(collection(db, collectionName), ...constraints);
  const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T);
    callback(data);
  });
  return unsubscribe;
}

// Real-time listener for single document
export function onDocumentSnapshot<T>(
  collectionName: string,
  id: string,
  callback: (data: T | null) => void
): () => void {
  const unsubscribe = onSnapshot(doc(db, collectionName, id), (snapshot) => {
    if (!snapshot.exists()) {
      callback(null);
    } else {
      callback({ id: snapshot.id, ...snapshot.data() } as T);
    }
  });
  return unsubscribe;
}
