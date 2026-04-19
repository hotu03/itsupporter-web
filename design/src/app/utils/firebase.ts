import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';

// Staff Firebase config (existing - for Auth + Data)
const staffFirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string,
};

// Customer Firebase config (new - for Auth only)
const customerFirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_CUSTOMER_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_CUSTOMER_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_CUSTOMER_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_CUSTOMER_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_CUSTOMER_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_CUSTOMER_APP_ID as string,
  measurementId: import.meta.env.VITE_FIREBASE_CUSTOMER_MEASUREMENT_ID as string,
};

// Initialize Staff Firebase (existing project - for Auth + Data)
const staffAppName = 'staff';
const staffApp: FirebaseApp = getApps().find(a => a.name === staffAppName) || initializeApp(staffFirebaseConfig, staffAppName);
const staffAuth: Auth = getAuth(staffApp);
const db = getFirestore(staffApp);
const storage = getStorage(staffApp);

// Initialize Customer Firebase (new project - Auth only)
const customerAppName = 'customer';
const customerApp: FirebaseApp = getApps().find(a => a.name === customerAppName) || initializeApp(customerFirebaseConfig, customerAppName);
const customerAuth: Auth = getAuth(customerApp);

// Backward compatibility: export staffAuth as 'auth' for existing code
export const auth = staffAuth;

export { staffApp, staffAuth, customerApp, customerAuth, db, storage };
export type { FirebaseApp };
export type { Auth as FirebaseAuth } from 'firebase/auth';
export type { User as FirebaseUser } from 'firebase/auth';
