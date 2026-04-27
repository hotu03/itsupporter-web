import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { User, UserRole } from '../data/users';
import { initUsers, getCurrentUser, setCurrentUser, hasPermission, updateUserRole, getActiveUserByIdentity } from '../data/users';
import { getRegistrationStatusByEmail, syncUserProfilesFromMembers } from '../data/registration';
import { getFirestoreMemberByEmail } from '../data/firestoreMembers';
import type { Member } from '../data/members';
import { getMembers, saveMembers } from '../data/members';
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
  return getActiveUserByIdentity({
    uid: firebaseUser.uid,
    email: firebaseUser.email || undefined,
  });
}

function upsertMemberCache(member: Member): void {
  const cachedMembers = getMembers();
  const normalizedEmail = member.email?.trim().toLowerCase();

  const nextMembers = cachedMembers.filter((existing) => {
    if (String(existing.id) === String(member.id)) return false;
    if (member.uid && existing.uid === member.uid) return false;
    if (normalizedEmail && existing.email?.trim().toLowerCase() === normalizedEmail) return false;
    return true;
  });

  saveMembers([...nextMembers, member]);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const resolveFirebaseUser = useCallback(async (firebaseUser: FirebaseUser): Promise<User | null> => {
    const mappedUser = mapFirebaseToLocalUser(firebaseUser);
    if (mappedUser) return mappedUser;

    const normalizedEmail = firebaseUser.email?.trim().toLowerCase();
    if (!normalizedEmail) return null;

    try {
      const firestoreMember = await getFirestoreMemberByEmail(normalizedEmail);
      if (!firestoreMember) return null;

      upsertMemberCache(firestoreMember);
      return getActiveUserByIdentity({
        uid: firebaseUser.uid,
        email: normalizedEmail,
      });
    } catch {
      return null;
    }
  }, []);

  // Real Firebase auth state listener + local role sync
  useEffect(() => {
    initUsers();
    syncUserProfilesFromMembers();

    let mounted = true;

    const unsubscribe = onAuthStateChanged(staffAuth, (firebaseUser) => {
      void (async () => {
        if (!mounted) return;

        if (firebaseUser) {
          const mappedUser = await resolveFirebaseUser(firebaseUser);
          if (!mounted) return;

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
      })();
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [resolveFirebaseUser]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await signInWithEmailAndPassword(staffAuth, email, password);
      const mappedUser = await resolveFirebaseUser(userCredential.user);
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
      console.error('Login failed:', error);
      return false;
    }
  }, [resolveFirebaseUser]);

  const googleLogin = useCallback(async (): Promise<GoogleLoginResult> => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      const result = await signInWithPopup(staffAuth, provider);
      const email = result.user.email || '';
      const registrationStatus = await getRegistrationStatusByEmail(email);

      const mappedUser = await resolveFirebaseUser(result.user);
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
      console.error('Google login failed:', error);
      return { success: false };
    }
  }, [resolveFirebaseUser]);

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
