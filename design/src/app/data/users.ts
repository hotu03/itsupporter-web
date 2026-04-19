// Shared user data management for Phase 1 auth + roles (mock localStorage)
// Reuses patterns from machines.ts (get/save, initial seed on first load)

export type UserRole = 'root' | 'admin' | 'technician' | 'tester' | 'member';

export interface User {
  id: number;
  uid?: string; // for future Firebase
  name: string;
  username: string;
  email: string;
  phone?: string;
  role: UserRole;
  isRoot?: boolean;
  permissions: string[]; // e.g. ['*'] for root, or ['manage:personnel', 'view:finance']
  status: 'active' | 'inactive';
  registeredAt: string;
  // Extended profile fields
  avatar?: string;
  dob?: string;
  gender?: string;
  hometown?: string;
  position?: string;
  techType?: string;
  course?: string;
  classRoom?: string;
}

// Import Machine type for ownership checks
import type { Machine } from './machines';

const ROOT_ADMIN: User = {
  id: 0,
  name: "Root Admin",
  username: "root",
  email: "root@itsupporter.com",
  role: 'root',
  isRoot: true,
  permissions: ['*'],
  status: 'active',
  registeredAt: new Date().toISOString(),
};

// Get users from localStorage
export function getUsers(): User[] {
  if (typeof window === "undefined") return [ROOT_ADMIN];

  const stored = localStorage.getItem("its_users");
  if (stored) {
    try {
      const users = JSON.parse(stored);
      // Ensure root is always present
      if (!users.some((u: User) => u.isRoot)) {
        return [ROOT_ADMIN, ...users];
      }
      return users;
    } catch {
      return [ROOT_ADMIN];
    }
  }
  return [ROOT_ADMIN];
}

// Save users to localStorage (immutable - always creates new array)
export function saveUsers(users: User[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("its_users", JSON.stringify(users));
}

// Initialize / seed users (called on app start or Personnel mount)
export function initUsers(): User[] {
  const users = getUsers();
  const seeded = localStorage.getItem("its_root_seeded");
  if (!seeded) {
    localStorage.setItem("its_root_seeded", "true");
    // Add some test accounts if none exist
    if (users.length === 1) {
      const testUsers: User[] = [
        {
          id: 1,
          name: "Nguyễn Mạnh Cường",
          username: "nguyenmanhcuong",
          email: "cuong@itsupporter.com",
          role: 'admin',
          permissions: ['manage:personnel', 'view:finance'],
          status: 'active',
          registeredAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          gender: "Male",
          hometown: "Hà Nội",
          position: "President",
          techType: "Technician",
          course: "K15",
        },
        {
          id: 2,
          name: "Hà Gia Linh",
          username: "halinhit",
          email: "linh@itsupporter.com",
          role: 'technician',
          permissions: ['execute:repair'],
          status: 'active',
          registeredAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          gender: "Female",
          hometown: "Hà Nội",
          position: "Member",
          techType: "Technician",
          course: "K15",
        },
      ];
      const allUsers = [ROOT_ADMIN, ...testUsers];
      saveUsers(allUsers);
      return allUsers;
    }
  }
  return users;
}

// Immutable update role (returns new array, original unchanged)
export function updateUserRole(userId: number, newRole: UserRole, newPermissions: string[]): User[] {
  const users = getUsers();
  const updated = users.map(user =>
    user.id === userId
      ? { ...user, role: newRole, permissions: [...newPermissions] }
      : user
  );
  saveUsers(updated);
  return updated;
}

// Check permission (root bypass)
export function hasPermission(user: User | null, requiredPermission: string): boolean {
  if (!user) return false;
  if (user.isRoot || user.permissions.includes('*')) return true;
  return user.permissions.includes(requiredPermission);
}

// Get current logged in user from localStorage (for mock auth)
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("its_current_user");
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("its_current_user", JSON.stringify(user));
}

// Update current user profile
export function updateCurrentUserProfile(updates: Partial<Omit<User, "id" | "role" | "isRoot" | "permissions" | "status">>): User | null {
  const current = getCurrentUser();
  if (!current) return null;

  const updatedUser: User = { ...current, ...updates };
  const allUsers = getUsers().map(u => u.id === current.id ? updatedUser : u);
  saveUsers(allUsers);
  setCurrentUser(updatedUser);
  return updatedUser;
}

// ─── Permission Helpers ───────────────────────────────────────────────────────

export function isRoot(user: User | null): boolean {
  if (!user) return false;
  return user.isRoot === true || user.permissions.includes('*');
}

export function isAdmin(user: User | null): boolean {
  if (!user) return false;
  if (isRoot(user)) return true;
  return user.role === 'admin';
}

export function isTechnician(user: User | null): boolean {
  if (!user) return false;
  return user.role === 'technician';
}

export function isTester(user: User | null): boolean {
  if (!user) return false;
  return user.role === 'tester';
}

// Check if user can edit a specific machine (ownership check)
export function canEditMachine(user: User | null, machine: Machine): boolean {
  if (!user) return false;

  // Root/Admin can edit anything
  if (isRoot(user) || isAdmin(user)) return true;

  // Member cannot edit machines
  if (user.role === 'member') return false;

  // Check if machine is unassigned
  const isUnassigned =
    (!machine.technician || machine.technician === '—' || machine.technician === 'Chưa gán') &&
    (!machine.tester || machine.tester === '—' || machine.tester === 'Chưa gán');

  if (isUnassigned) {
    // All authenticated users except member can edit unassigned
    return user.role === 'technician' || user.role === 'tester';
  }

  // Technician: can only edit machines assigned to them
  if (user.role === 'technician') {
    return machine.technician === user.name || machine.technician?.includes(user.name);
  }

  // Tester: can edit machines assigned to them OR status is RETESTING
  if (user.role === 'tester') {
    const isAssignedToMe = machine.tester === user.name || machine.tester?.includes(user.name);
    const isRetesting = machine.status === 'RETESTING';
    return isAssignedToMe || isRetesting;
  }

  return false;
}

export function canDeleteMachine(user: User | null, _machine: Machine): boolean {
  if (!user) return false;
  // Only root and admin can delete machines
  return isRoot(user) || isAdmin(user);
}

export function canManagePersonnel(user: User | null): boolean {
  return hasPermission(user, 'manage:personnel');
}

export function canViewFinance(_user: User | null): boolean {
  // All roles can view finance (edit is blocked at UI level)
  return true;
}

export function canManageInvoices(user: User | null): boolean {
  return isRoot(user) || isAdmin(user);
}

export function canManageCustomers(user: User | null): boolean {
  return isRoot(user) || isAdmin(user);
}

export function canCreateMachine(user: User | null): boolean {
  if (!user) return false;
  // All roles except member can create machines
  return user.role !== 'member';
}
