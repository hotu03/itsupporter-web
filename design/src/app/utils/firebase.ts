import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Database } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL as string,
};

// Real Firebase initialization (config from .env)
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const database: Database = getDatabase(app);

export { app, auth, database };
export type { FirebaseApp };
export type { Auth as FirebaseAuth } from 'firebase/auth';
export type { User as FirebaseUser } from 'firebase/auth';
export type { Database } from 'firebase/database';
