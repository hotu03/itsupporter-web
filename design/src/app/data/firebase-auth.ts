import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  updatePassword,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import { customerAuth } from '../utils/firebase';

export interface FirebaseAuthResult {
  user: User;
}

// Create new customer account with Customer Firebase Auth (new project)
export async function createFirebaseCustomer(email: string, password: string): Promise<FirebaseAuthResult> {
  const result = await createUserWithEmailAndPassword(customerAuth, email, password);
  return { user: result.user };
}

// Sign in existing customer
export async function signInCustomer(email: string, password: string): Promise<FirebaseAuthResult> {
  const result = await signInWithEmailAndPassword(customerAuth, email, password);
  return { user: result.user };
}

// Send password reset email via Firebase
export async function sendCustomerPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(customerAuth, email);
}

// Verify password reset code (get the email from the oobCode)
export async function verifyResetCode(oobCode: string): Promise<string> {
  return await verifyPasswordResetCode(customerAuth, oobCode);
}

// Confirm new password with oobCode
export async function resetPassword(oobCode: string, newPassword: string): Promise<void> {
  await confirmPasswordReset(customerAuth, oobCode, newPassword);
}

// Update customer password (requires recent sign-in)
export async function updateCustomerPassword(user: User, newPassword: string): Promise<void> {
  await updatePassword(user, newPassword);
}

// Sign out
export async function signOutCustomer(): Promise<void> {
  await firebaseSignOut(customerAuth);
}

// Listen to auth state changes
export function onAuthStateChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(customerAuth, callback);
}

// Get current user (synchronous, may be null)
export function getCurrentUser(): User | null {
  return customerAuth.currentUser;
}
