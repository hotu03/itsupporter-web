import type { Member } from "./members";
import type { User, UserRole } from "./users";
import { updateMember, getMembers, saveMembers } from "./members";
import { getUsers, saveUsers, getCurrentUser, hasPermission, setCurrentUser } from "./users";
import {
  getFirestoreMemberByEmail,
  addFirestoreMember,
  updateFirestoreMember,
  getFirestoreMembers,
} from "./firestoreMembers";

export type RegistrationStatus = "not_registered" | "pending" | "approved" | "rejected";

export function generateMockUid(email: string): string {
  return `local-${email.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
}

function getNextUserId(users: User[]): number {
  if (users.length === 0) return 1;
  return Math.max(...users.map((user) => user.id)) + 1;
}

export function mapMemberToUserRoleAndPermissions(member: Member): { role: UserRole; permissions: string[]; isRoot?: boolean } {
  const position = member.position?.toLowerCase() || "";
  const isAdmin = Boolean(member.isAdmin);

  if (isAdmin) {
    return {
      role: "admin",
      permissions: ["manage:personnel", "view:finance", "execute:repair", "view:machines"],
      isRoot: position.includes("president"),
    };
  }

  if (member.type === "technician") {
    return {
      role: "technician",
      permissions: ["execute:repair", "view:machines"],
    };
  }

  if (member.type === "tester") {
    return {
      role: "tester",
      permissions: ["execute:test", "view:machines"],
    };
  }

  return {
    role: "member",
    permissions: ["view:machines"],
  };
}

// Link existing seed data (idempotent migration)
export function linkExistingSeeds(): void {
  const members = getMembers();
  const users = getUsers();
  let changed = false;

  const updatedMembers = members.map((member) => {
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
    saveMembers(updatedMembers);

    let nextUserId = getNextUserId(users);
    const newUsers = updatedMembers
      .filter((m) => m.email)
      .filter((m) => !users.some((u) => u.uid === m.uid || u.email === m.email || u.username === m.username))
      .map((m) => {
        const { role, permissions, isRoot } = mapMemberToUserRoleAndPermissions(m);
        return {
          id: nextUserId++,
          uid: m.uid,
          name: m.name,
          username: m.username,
          email: m.email!,
          role,
          permissions: [...permissions],
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

export async function getRegistrationStatusByEmail(email: string): Promise<RegistrationStatus> {
  if (!email) return "not_registered";
  const normalized = email.trim().toLowerCase();

  try {
    const firestoreMember = await getFirestoreMemberByEmail(normalized);
    if (firestoreMember) {
      return firestoreMember.approvalStatus;
    }
  } catch {
    // Fallback to local data when Firestore is temporarily unavailable
  }

  const members = getMembers();
  const existing = members.find((m) => m.email?.trim().toLowerCase() === normalized);
  if (!existing) return "not_registered";
  return existing.approvalStatus;
}

export async function registerUserAndPendingMember(
  formData: Omit<Member, "id" | "approvalStatus" | "status" | "machinesDone" | "testsRun"> & { uid?: string },
): Promise<{ user: User; member: Member }> {
  const normalizedEmail = (formData.email || "").trim().toLowerCase();
  const normalizedUsername = formData.username.trim().toLowerCase();
  const uid = formData.uid || generateMockUid(normalizedEmail || normalizedUsername);

  const existingMembers = getMembers();
  const users = getUsers();
  const duplicateMember = existingMembers.find(
    (m) => m.email?.trim().toLowerCase() === normalizedEmail || m.username.trim().toLowerCase() === normalizedUsername,
  );
  if (duplicateMember) {
    throw new Error("Email hoặc username đã tồn tại trong danh sách đăng ký.");
  }

  const existingUser = users.find(
    (u) => u.uid === uid || u.email.trim().toLowerCase() === normalizedEmail || u.username.trim().toLowerCase() === normalizedUsername,
  );

  if (existingUser) {
    throw new Error("Tài khoản user đã tồn tại. Vui lòng dùng email/username khác.");
  }

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

  const firestoreId = await addFirestoreMember(memberData);
  const member: Member = {
    ...memberData,
    id: firestoreId,
  };

  saveMembers([...existingMembers, member]);

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

export async function approveAndLinkMember(
  id: string | number,
  updates?: Partial<Pick<Member, "type" | "isAdmin" | "position" | "status">>,
): Promise<{ success: boolean; member?: Member; user?: User; error?: string }> {
  const currentUser = getCurrentUser();
  if (!currentUser || !hasPermission(currentUser, "manage:personnel")) {
    return { success: false, error: "Unauthorized" };
  }

  const members = getMembers();
  const originalMember = members.find((m) => String(m.id) === String(id));
  if (!originalMember) {
    return { success: false, error: "Member not found" };
  }

  const approvedMember: Member = {
    ...originalMember,
    ...updates,
    approvalStatus: "approved",
    status: updates?.status ?? "active",
  };

  const updatedMembers = members.map((member) =>
    String(member.id) === String(id) ? approvedMember : member,
  );
  saveMembers(updatedMembers);

  try {
    await updateFirestoreMember(String(originalMember.id), {
      type: approvedMember.type,
      isAdmin: approvedMember.isAdmin,
      position: approvedMember.position,
      status: approvedMember.status,
      approvalStatus: "approved",
    });
  } catch {
    // Keep local sync even if Firestore update fails temporarily
  }

  const { role, permissions, isRoot } = mapMemberToUserRoleAndPermissions(approvedMember);
  const users = getUsers();
  const existingUser = users.find(
    (user) => user.uid === approvedMember.uid || user.email === approvedMember.email,
  );

  let linkedUser: User | undefined;

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
        : user,
    );
    saveUsers(updatedUsers);
    linkedUser = updatedUsers.find((user) => user.id === existingUser.id);
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

  return { success: true, member: approvedMember, user: linkedUser };
}

export function syncMemberRoleToUser(
  id: string | number,
  updates: Partial<Member>,
): { success: boolean; member?: Member; user?: User; error?: string } {
  const currentUser = getCurrentUser();
  if (!currentUser || !hasPermission(currentUser, "manage:personnel")) {
    return { success: false, error: "Unauthorized" };
  }

  const members = getMembers();
  const originalMember = members.find((member) => String(member.id) === String(id));
  if (!originalMember) {
    return { success: false, error: "Member not found" };
  }

  const nextMember: Member = {
    ...originalMember,
    ...updates,
  };

  const updatedMembers = updateMember(id, updates);
  const savedMember = updatedMembers.find((member) => String(member.id) === String(id)) || nextMember;
  const { role, permissions, isRoot } = mapMemberToUserRoleAndPermissions(savedMember);
  const users = getUsers();
  const existingUser = users.find((user) => user.uid === savedMember.uid || user.email === savedMember.email);

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
      : user,
  );

  saveUsers(updatedUsers);
  const syncedUser = updatedUsers.find((user) => user.id === existingUser.id);
  if (currentUser.id === existingUser.id && syncedUser) {
    setCurrentUser(syncedUser);
  }

  return {
    success: true,
    member: savedMember,
    user: syncedUser,
  };
}

export async function rejectMember(id: string | number): Promise<Member[]> {
  const currentUser = getCurrentUser();
  if (!currentUser || !hasPermission(currentUser, "manage:personnel")) {
    return getMembers();
  }

  const members = getMembers();
  const member = members.find((m) => String(m.id) === String(id));
  if (!member) {
    return members;
  }

  const updated = updateMember(id, { approvalStatus: "rejected", status: "inactive" });

  try {
    await updateFirestoreMember(String(member.id), {
      approvalStatus: "rejected",
      status: "inactive",
    });
  } catch {
    // Keep local sync even if Firestore update fails temporarily
  }

  return updated;
}

export async function syncMembersFromFirestore(): Promise<void> {
  try {
    const firestoreMembers = await getFirestoreMembers();
    if (firestoreMembers.length > 0) {
      saveMembers(firestoreMembers);
    }
  } catch {
    // Keep existing local cache when Firestore is temporarily unavailable
  }
}
