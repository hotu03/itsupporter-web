// Shared user data management for staff auth + roles (Firestore/member-derived)

export type UserRole = 'root' | 'admin' | 'technician' | 'tester' | 'member';

export interface User {
  id: number;
  uid?: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  role: UserRole;
  isRoot?: boolean;
  permissions: string[];
  status: 'active' | 'inactive';
  registeredAt: string;
  avatar?: string;
  dob?: string;
  gender?: string;
  hometown?: string;
  position?: string;
  techType?: string;
  course?: string;
  classRoom?: string;
}

import type { Machine } from './machines';
import { getMembers } from './members';

const ROOT_ADMIN: User = {
  id: 0,
  name: 'Root Admin',
  username: 'root',
  email: 'root@itsupporter.com',
  role: 'root',
  isRoot: true,
  permissions: ['*'],
  status: 'active',
  registeredAt: new Date().toISOString(),
};

function toDateInputValue(dob: string): string {
  if (!dob) return '';
  const parts = dob.split('/');
  if (parts.length !== 3) return dob;
  const [day, month, year] = parts;
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

function mapMemberProfileToUser(member: ReturnType<typeof getMembers>[number]): Pick<User, 'phone' | 'dob' | 'gender' | 'hometown' | 'position' | 'techType' | 'course' | 'classRoom'> {
  return {
    phone: member.phone,
    dob: toDateInputValue(member.dob),
    gender: member.gender,
    hometown: member.hometown,
    position: member.position,
    techType: member.type === 'technician' ? 'Technician' : 'Tester',
    course: member.course,
    classRoom: member.class,
  };
}

function deriveUserFromMember(uidOrEmailOrUsername: {
  uid?: string;
  email?: string;
  username?: string;
}): User | null {
  const members = getMembers();
  const member = members.find((m) =>
    (uidOrEmailOrUsername.uid && m.uid === uidOrEmailOrUsername.uid)
    || (uidOrEmailOrUsername.email && m.email?.toLowerCase() === uidOrEmailOrUsername.email.toLowerCase())
    || (uidOrEmailOrUsername.username && m.username === uidOrEmailOrUsername.username)
  );

  if (!member || member.approvalStatus !== 'approved') {
    return null;
  }

  const role: UserRole = member.isAdmin ? 'admin' : member.type;
  const permissions = member.isAdmin
    ? ['manage:personnel', 'view:finance', 'execute:repair', 'view:machines']
    : member.type === 'technician'
      ? ['execute:repair', 'view:machines']
      : ['execute:test', 'view:machines'];

  return {
    id: 0,
    uid: member.uid,
    name: member.name,
    username: member.username,
    email: member.email || '',
    role,
    isRoot: false,
    permissions,
    status: member.status === 'inactive' ? 'inactive' : 'active',
    registeredAt: member.registeredAt || new Date().toISOString(),
    ...mapMemberProfileToUser(member),
  };
}

export function getActiveUserByIdentity(uidOrEmailOrUsername: {
  uid?: string;
  email?: string;
  username?: string;
}): User | null {
  if (uidOrEmailOrUsername.email?.toLowerCase() === ROOT_ADMIN.email.toLowerCase()) {
    return { ...ROOT_ADMIN, uid: uidOrEmailOrUsername.uid || ROOT_ADMIN.uid };
  }

  const derived = deriveUserFromMember(uidOrEmailOrUsername);
  if (!derived || derived.status !== 'active') {
    return null;
  }

  return derived;
}

// Keep only root in list model, clear legacy persisted users list
export function getUsers(): User[] {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('its_users');
  }
  return [ROOT_ADMIN];
}

export function saveUsers(_users: User[]): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('its_users');
}

export function initUsers(): User[] {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('its_users');
    localStorage.removeItem('its_root_seeded');
  }
  return [ROOT_ADMIN];
}

export function updateUserRole(_userId: number, _newRole: UserRole, _newPermissions: string[]): User[] {
  return getUsers();
}

export function hasPermission(user: User | null, requiredPermission: string): boolean {
  if (!user) return false;
  if (user.isRoot || user.permissions.includes('*')) return true;
  return user.permissions.includes(requiredPermission);
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('its_current_user');
  if (!stored) return null;

  try {
    const current = JSON.parse(stored) as User;
    if (current.isRoot || current.email === ROOT_ADMIN.email) {
      return { ...ROOT_ADMIN, uid: current.uid || ROOT_ADMIN.uid };
    }

    const derived = deriveUserFromMember({
      uid: current.uid,
      email: current.email,
      username: current.username,
    });

    if (!derived || derived.status !== 'active') {
      localStorage.removeItem('its_current_user');
      return null;
    }

    return derived;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('its_current_user', JSON.stringify(user));
}

export function updateCurrentUserProfile(updates: Partial<Omit<User, 'id' | 'role' | 'isRoot' | 'permissions' | 'status'>>): User | null {
  const current = getCurrentUser();
  if (!current) return null;

  const updatedUser: User = { ...current, ...updates };
  setCurrentUser(updatedUser);
  return updatedUser;
}

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

export function canEditMachine(user: User | null, machine: Machine): boolean {
  if (!user) return false;

  if (isRoot(user) || isAdmin(user)) return true;
  if (user.role === 'member') return false;

  const isUnassigned =
    (!machine.technician || machine.technician === '—' || machine.technician === 'Chưa gán') &&
    (!machine.tester || machine.tester === '—' || machine.tester === 'Chưa gán');

  if (isUnassigned) {
    return user.role === 'technician' || user.role === 'tester';
  }

  if (user.role === 'technician') {
    return machine.technician === user.name || machine.technician?.includes(user.name);
  }

  if (user.role === 'tester') {
    const isAssignedToMe = machine.tester === user.name || machine.tester?.includes(user.name);
    const isRetesting = machine.status === 'RETESTING';
    return isAssignedToMe || isRetesting;
  }

  return false;
}

export function canDeleteMachine(user: User | null, _machine: Machine): boolean {
  if (!user) return false;
  return isRoot(user) || isAdmin(user);
}

export function canManagePersonnel(user: User | null): boolean {
  return hasPermission(user, 'manage:personnel');
}

export function canViewFinance(_user: User | null): boolean {
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
  return user.role !== 'member';
}
