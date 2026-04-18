// Registration orchestration layer - links User (auth/roles) and Member (personnel/approval)
// Reuses patterns from users.ts, members.ts, and AuthContext mapFirebaseToLocalUser
// Supports both email/password and Google signup with completion modal

import type { Member } from "./members";
import type { User, UserRole } from "./users";
import { addMember, updateMember, getMembers, saveMembers } from "./members";
import { getUsers, saveUsers, getCurrentUser, hasPermission, setCurrentUser } from "./users";

export type RegistrationStatus = "not_registered" | "pending" | "approved" | "rejected";

export function generateMockUid(email: string): string {
  return `local-${email.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
}

function getNextUserId(users: User[]): number {
  if (users.length === 0) return 1;
  return Math.max(...users.map(user => user.id)) + 1;
}

export function mapMemberToUserRoleAndPermissions(member: Member): { role: UserRole; permissions: string[]; isRoot?: boolean } {
  const position = member.position?.toLowerCase() || "";
  const isAdmin = Boolean(member.isAdmin);

  if (isAdmin) {
    return {
      role: "admin",
      permissions: ["manage:personnel", "view:finance", "execute:repair", "view:machines"],
      isRoot: position.includes("president")
    };
  }

  if (member.type === "technician") {
    return {
      role: "technician",
      permissions: ["execute:repair", "view:machines"]
    };
  }

  if (member.type === "tester") {
    return {
      role: "tester",
      permissions: ["execute:test", "view:machines"]
    };
  }

  return {
    role: "member",
    permissions: ["view:machines"]
  };
}

// Link existing seed data (idempotent migration)
export function linkExistingSeeds(): void {
  const members = getMembers();
  const users = getUsers();
  let changed = false;

  const updatedMembers = members.map(member => {
    if (!member.uid) {
      const uid = generateMockUid(member.email || member.username || "");
      changed = true;
      return {
        ...member,
        uid,
        registeredAt: member.registeredAt || new Date().toISOString(),
      } as Member;
    }
    return member;
  });

  if (changed) {
    // Persist the uid updates to members (critical fix)
    saveMembers(updatedMembers);

    // Ensure corresponding users exist (immutable)
    let nextUserId = getNextUserId(users);
    const newUsers = updatedMembers
      .filter(m => m.email)
      .filter(m => !users.some(u => u.uid === m.uid || u.email === m.email || u.username === m.username))
      .map(m => {
        const { role, permissions, isRoot } = mapMemberToUserRoleAndPermissions(m);
        return {
          id: nextUserId++,
          uid: m.uid,
          name: m.name,
          username: m.username,
          email: m.email!,
          role,
          permissions: [...permissions], // immutable copy
          isRoot,
          status: m.status || "active",
          registeredAt: m.registeredAt || new Date().toISOString(),
        } as User;
      });
    if (newUsers.length > 0) {
      saveUsers([...users, ...newUsers]);
    }
  }
}

export function getRegistrationStatusByEmail(email: string): RegistrationStatus {
  if (!email) return "not_registered";
  const normalized = email.trim().toLowerCase();
  const members = getMembers();
  const existing = members.find(m => m.email?.trim().toLowerCase() === normalized);
  if (!existing) return "not_registered";
  return existing.approvalStatus;
}

export function registerUserAndPendingMember(
  formData: Omit<Member, "id" | "approvalStatus" | "status" | "machinesDone" | "testsRun"> & { uid?: string }
): { user: User; member: Member } {
  const normalizedEmail = (formData.email || "").trim().toLowerCase();
  const normalizedUsername = formData.username.trim().toLowerCase();
  const uid = formData.uid || generateMockUid(normalizedEmail || normalizedUsername);

  const existingMembers = getMembers();
  const users = getUsers();
  const duplicateMember = existingMembers.find(
    m => m.email?.trim().toLowerCase() === normalizedEmail || m.username.trim().toLowerCase() === normalizedUsername
  );
  if (duplicateMember) {
    throw new Error("Email hoặc username đã tồn tại trong danh sách đăng ký.");
  }

  const existingUser = users.find(
    u => u.uid === uid || u.email.trim().toLowerCase() === normalizedEmail || u.username.trim().toLowerCase() === normalizedUsername
  );

  if (existingUser) {
    throw new Error("Tài khoản user đã tồn tại. Vui lòng dùng email/username khác.");
  }

  // Create pending Member
  const memberData: Omit<Member, "id"> = {
    name: formData.name.trim(),
    username: formData.username.trim(),
    dob: formData.dob,
    phone: formData.phone.trim(),
    gender: formData.gender,
    course: formData.course,
    class: formData.class,
    hometown: formData.hometown,
    position: formData.position,
    type: formData.type,
    email: normalizedEmail,
    uid,
    isAdmin: Boolean(formData.isAdmin),
    approvalStatus: "pending",
    status: "active",
    registeredAt: new Date().toISOString(),
    machinesDone: 0,
    testsRun: 0,
  };

  const member = addMember(memberData);

  // Create linked User (pending => inactive until approval)
  const { role, permissions, isRoot } = mapMemberToUserRoleAndPermissions(member);

  const user: User = {
    id: getNextUserId(users),
    uid,
    name: member.name,
    username: member.username,
    email: normalizedEmail,
    role,
    permissions: [...permissions],
    isRoot,
    status: "inactive",
    registeredAt: member.registeredAt || new Date().toISOString(),
  };
  saveUsers([...users, user]);

  return { user, member };
}

export function approveAndLinkMember(
  id: number,
  updates?: Partial<Pick<Member, "type" | "isAdmin" | "position" | "status">>
): { success: boolean; member: Member; user?: User; error?: string } {
  const currentUser = getCurrentUser();
  if (!currentUser || !hasPermission(currentUser, "manage:personnel")) {
    return { success: false, member: {} as Member, error: "Unauthorized" };
  }

  const members = getMembers();
  const memberIndex = members.findIndex(m => m.id === id);
  if (memberIndex === -1) {
    return { success: false, member: {} as Member, error: "Member not found" };
  }

  const originalMember = members[memberIndex];
  const approvedMember: Member = {
    ...originalMember,
    ...updates,
    approvalStatus: "approved" as const,
    status: updates?.status ?? "active",
  };

  const updatedMembers = members.map((member, index) =>
    index === memberIndex ? approvedMember : member
  );

  let linkedUser: User | undefined;
  const { role, permissions, isRoot } = mapMemberToUserRoleAndPermissions(approvedMember);
  const users = getUsers();
  const existingUser = users.find(user => user.uid === approvedMember.uid || user.email === approvedMember.email);

  if (existingUser) {
    const updatedUsers: User[] = users.map((user): User =>
      user.id === existingUser.id
        ? {
            ...user,
            uid: user.uid || approvedMember.uid,
            name: approvedMember.name,
            username: approvedMember.username,
            email: approvedMember.email || user.email,
            role,
            permissions: [...permissions],
            isRoot,
            status: approvedMember.status === "inactive" ? "inactive" : "active",
          }
        : user
    );
    saveUsers(updatedUsers);
    linkedUser = updatedUsers.find(user => user.id === existingUser.id);
  } else if (approvedMember.email) {
    const newUser: User = {
      id: getNextUserId(users),
      uid: approvedMember.uid || generateMockUid(approvedMember.email),
      name: approvedMember.name,
      username: approvedMember.username,
      email: approvedMember.email,
      role,
      permissions: [...permissions],
      isRoot,
      status: approvedMember.status === "inactive" ? "inactive" : "active",
      registeredAt: approvedMember.registeredAt || new Date().toISOString(),
    };
    saveUsers([...users, newUser]);
    linkedUser = newUser;
  }

  saveMembers(updatedMembers);

  return { success: true, member: approvedMember, user: linkedUser };
}

export function syncMemberRoleToUser(
  id: number,
  updates: Partial<Member>
): { success: boolean; member?: Member; user?: User; error?: string } {
  const currentUser = getCurrentUser();
  if (!currentUser || !hasPermission(currentUser, "manage:personnel")) {
    return { success: false, error: "Unauthorized" };
  }

  const members = getMembers();
  const originalMember = members.find(member => member.id === id);
  if (!originalMember) {
    return { success: false, error: "Member not found" };
  }

  const nextMember: Member = {
    ...originalMember,
    ...updates,
  };

  const updatedMembers = updateMember(id, updates);
  const savedMember = updatedMembers.find(member => member.id === id) || nextMember;
  const { role, permissions, isRoot } = mapMemberToUserRoleAndPermissions(savedMember);
  const users = getUsers();
  const existingUser = users.find(user => user.uid === savedMember.uid || user.email === savedMember.email);

  if (!existingUser) {
    if (!savedMember.email) {
      return { success: true, member: savedMember };
    }

    const createdUser: User = {
      id: getNextUserId(users),
      uid: savedMember.uid || generateMockUid(savedMember.email),
      name: savedMember.name,
      username: savedMember.username,
      email: savedMember.email,
      role,
      permissions: [...permissions],
      isRoot,
      status: savedMember.status === "inactive" ? "inactive" : "active",
      registeredAt: savedMember.registeredAt || new Date().toISOString(),
    };

    saveUsers([...users, createdUser]);
    return {
      success: true,
      member: savedMember,
      user: createdUser,
    };
  }

  const updatedUsers = users.map((user): User =>
    user.id === existingUser.id
      ? {
          ...user,
          uid: user.uid || savedMember.uid,
          name: savedMember.name,
          username: savedMember.username,
          email: savedMember.email || user.email,
          role,
          permissions: [...permissions],
          isRoot,
          status: savedMember.status === "inactive" ? "inactive" : "active",
        }
      : user
  );

  saveUsers(updatedUsers);
  const syncedUser = updatedUsers.find(user => user.id === existingUser.id);
  if (currentUser.id === existingUser.id && syncedUser) {
    setCurrentUser(syncedUser);
  }

  return {
    success: true,
    member: savedMember,
    user: syncedUser,
  };
}

export function rejectMember(id: number): Member[] {
  const currentUser = getCurrentUser();
  if (!currentUser || !hasPermission(currentUser, "manage:personnel")) {
    return getMembers();
  }

  return updateMember(id, { approvalStatus: "rejected" as const, status: "inactive" });
}
