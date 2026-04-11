import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { User, UserRole } from '../data/users';
import { initUsers, getCurrentUser, setCurrentUser, hasPermission, updateUserRole } from '../data/users';
import { auth } from '../utils/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  googleLogin: () => Promise<boolean>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  updateRole: (userId: number, newRole: UserRole, newPermissions: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapFirebaseToLocalUser(firebaseUser: FirebaseUser): User {
  const users = initUsers();
  let localUser = users.find(u => u.email === firebaseUser.email);

  if (!localUser) {
    // Create basic user for new Firebase accounts (immutable)
    localUser = {
      id: Date.now(),
      uid: firebaseUser.uid,
      name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'New User',
      username: firebaseUser.email?.split('@')[0] || 'user',
      email: firebaseUser.email || '',
      role: 'tester' as UserRole,
      permissions: ['view:machines'],
      status: 'active',
      registeredAt: new Date().toISOString(),
    };
    // Note: In production, use Firebase custom claims or Firestore for roles
  }

  return { ...localUser, uid: firebaseUser.uid };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Seed root admin to real Firebase on first deploy/load (if not exists)
  const seedRootToFirebase = useCallback(async () => {
    const seeded = localStorage.getItem('root_firebase_seeded');
    if (seeded) return;

    const rootEmail = 'root@itsupporter.com';
    const rootPassword = import.meta.env.VITE_ROOT_PASSWORD || 'RootAdminPass2026!';

    try {
      await createUserWithEmailAndPassword(auth, rootEmail, rootPassword);
      console.log('Root admin seeded to Firebase (change password in Console after first login)');
      localStorage.setItem('root_firebase_seeded', 'true');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        localStorage.setItem('root_firebase_seeded', 'true');
      } else {
        console.error('Root seed failed:', error);
      }
    }
  }, []);

  // Real Firebase auth state listener + local role sync + root seed
  useEffect(() => {
    initUsers(); // Ensure local seed
    seedRootToFirebase();

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const mappedUser = mapFirebaseToLocalUser(firebaseUser);
        setCurrentUser(mappedUser);
        setUser(mappedUser);
      } else {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('its_current_user');
        }
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [seedRootToFirebase]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const mappedUser = mapFirebaseToLocalUser(userCredential.user);
      setCurrentUser(mappedUser);
      setUser(mappedUser);
      return true;
    } catch (error: unknown) {
      console.error('Login failed:', error); // Dev only
      return false;
    }
  }, []);

  const googleLogin = useCallback(async (): Promise<boolean> => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      const result = await signInWithPopup(auth, provider);
      const mappedUser = mapFirebaseToLocalUser(result.user);
      setCurrentUser(mappedUser);
      setUser(mappedUser);
      return true;
    } catch (error: unknown) {
      console.error('Google login failed:', error); // Dev only
      return false;
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
    } catch (error: unknown) {
      console.error('Logout failed:', error);
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('its_current_user');
    }
    setUser(null);
  }, []);

  const hasPermissionFn = useCallback((permission: string): boolean => {
    return hasPermission(user, permission);
  }, [user]);

  const updateRole = useCallback((userId: number, newRole: UserRole, newPermissions: string[]) => {
    updateUserRole(userId, newRole, newPermissions);
    const current = getCurrentUser();
    if (current && current.id === userId) {
      setCurrentUser(current);
      setUser(current);
    }
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    login,
    googleLogin,
    logout,
    hasPermission: hasPermissionFn,
    updateRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { hasPermission } from '../data/users';
