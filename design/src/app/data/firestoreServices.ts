import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import type { ServiceData } from './services';

const COLLECTION_NAME = 'services';

// Default services with prices
export const DEFAULT_SERVICES: ServiceData[] = [
  { id: "1", name: "Sửa chữa laptop", price: 500000 },
  { id: "2", name: "Cài đặt phần mềm", price: 100000 },
  { id: "3", name: "Nâng cấp RAM", price: 800000 },
  { id: "4", name: "Thay ổ cứng SSD", price: 1200000 },
  { id: "5", name: "Vệ sinh laptop", price: 150000 },
  { id: "6", name: "Sửa nguồn laptop", price: 350000 },
  { id: "7", name: "Thay màn hình", price: 2000000 },
  { id: "8", name: "Thay bàn phím", price: 400000 },
  { id: "9", name: "Tư vấn kỹ thuật", price: 0 },
  { id: "10", name: "Khác", price: 0 },
];

// Get all services from Firestore
export async function getFirestoreServices(): Promise<ServiceData[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  if (snapshot.empty) {
    // If no services in Firestore, return defaults and optionally seed them
    return DEFAULT_SERVICES;
  }
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as ServiceData));
}

// Get service by ID
export async function getFirestoreServiceById(id: string): Promise<ServiceData | null> {
  const snapshot = await getDoc(doc(db, COLLECTION_NAME, id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as unknown as ServiceData;
}

// Add new service
export async function addFirestoreService(service: Omit<ServiceData, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), service);
  return docRef.id;
}

// Update service
export async function updateFirestoreService(id: string, updates: Partial<ServiceData>): Promise<void> {
  await updateDoc(doc(db, COLLECTION_NAME, id), updates);
}

// Delete service
export async function deleteFirestoreService(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}

// Seed default services to Firestore (one-time setup)
export async function seedDefaultServices(): Promise<void> {
  for (const service of DEFAULT_SERVICES) {
    await addFirestoreService(service);
  }
}
