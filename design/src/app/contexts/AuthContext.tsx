import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { User, UserRole } from '../data/users';
import { initUsers, getCurrentUser, setCurrentUser, hasPermission, updateUserRole } from '../data/users';
import { getRegistrationStatusByEmail, syncUserProfilesFromMembers } from '../data/registration';
import { staffAuth } from '../utils/firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth';

interface GoogleLoginResult {
  success: boolean;
  needsProfileCompletion?: boolean;
  email?: string;
  uid?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  googleLogin: () => Promise<GoogleLoginResult>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  updateRole: (userId: number, newRole: UserRole, newPermissions: string[]) => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapFirebaseToLocalUser(firebaseUser: FirebaseUser): User | null {
  const users = initUsers();
  const localUser = users.find(u => u.email === firebaseUser.email);

  if (!localUser) {
    return null;
  }

  return { ...localUser, uid: firebaseUser.uid };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Real Firebase auth state listener + local role sync
  useEffect(() => {
    initUsers(); // Ensure local seed
    syncUserProfilesFromMembers();

    const unsubscribe = onAuthStateChanged(staffAuth, (firebaseUser) => {
      if (firebaseUser) {
        const mappedUser = mapFirebaseToLocalUser(firebaseUser);
        if (mappedUser && mappedUser.status === 'active') {
          setCurrentUser(mappedUser);
          setUser(mappedUser);
        } else {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('its_current_user');
          }
          setUser(null);
        }
      } else {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('its_current_user');
        }
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await signInWithEmailAndPassword(staffAuth, email, password);
      const mappedUser = mapFirebaseToLocalUser(userCredential.user);
      if (!mappedUser || mappedUser.status !== 'active') {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('its_current_user');
        }
        await firebaseSignOut(staffAuth);
        return false;
      }
      setCurrentUser(mappedUser);
      setUser(mappedUser);
      return true;
    } catch (error: unknown) {
      console.error('Login failed:', error); // Dev only
      return false;
    }
  }, []);

  const googleLogin = useCallback(async (): Promise<GoogleLoginResult> => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      const result = await signInWithPopup(staffAuth, provider);
      const email = result.user.email || '';
      const registrationStatus = await getRegistrationStatusByEmail(email);

      const mappedUser = mapFirebaseToLocalUser(result.user);
      if (registrationStatus === 'not_registered') {
        return {
          success: true,
          needsProfileCompletion: true,
          email,
          uid: result.user.uid,
        };
      }

      if (!mappedUser || mappedUser.status !== 'active') {
        await firebaseSignOut(staffAuth);
        return { success: false };
      }

      setCurrentUser(mappedUser);
      setUser(mappedUser);
      return { success: true, needsProfileCompletion: false, email };
    } catch (error: unknown) {
      console.error('Google login failed:', error); // Dev only
      return { success: false };
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await firebaseSignOut(staffAuth);
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
    if (!user || !hasPermission(user, 'manage:personnel')) {
      return;
    }

    updateUserRole(userId, newRole, newPermissions);
    const current = getCurrentUser();
    if (current && current.id === userId) {
      setCurrentUser(current);
      setUser(current);
    }
  }, [user]);

  const updateUser = useCallback((updatedUser: User) => {
    setCurrentUser(updatedUser);
    setUser(updatedUser);
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    login,
    googleLogin,
    logout,
    hasPermission: hasPermissionFn,
    updateRole,
    updateUser,
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
