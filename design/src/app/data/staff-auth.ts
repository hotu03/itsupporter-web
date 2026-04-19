import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import { staffAuth } from '../utils/firebase';

export interface StaffAuthResult {
  user: User;
}

// Create new staff account with Staff Firebase Auth (existing project)
export async function createStaffUser(email: string, password: string): Promise<StaffAuthResult> {
  const result = await createUserWithEmailAndPassword(staffAuth, email, password);
  return { user: result.user };
}

// Sign in existing staff
export async function signInStaffUser(email: string, password: string): Promise<StaffAuthResult> {
  const result = await signInWithEmailAndPassword(staffAuth, email, password);
  return { user: result.user };
}

// Send password reset email for staff
export async function resetStaffPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(staffAuth, email);
}

// Sign out staff
export async function signOutStaff(): Promise<void> {
  await firebaseSignOut(staffAuth);
}
