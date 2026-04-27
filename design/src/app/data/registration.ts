import type { Member } from "./members";
import type { User, UserRole } from "./users";
import { updateMember, getMembers, saveMembers } from "./members";
import { getCurrentUser, hasPermission, setCurrentUser } from "./users";
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

function toDateInputValue(dob: string): string {
  if (!dob) return "";
  const parts = dob.split("/");
  if (parts.length !== 3) return dob;
  const [day, month, year] = parts;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function mapMemberProfileToUser(member: Member): Pick<User, "phone" | "dob" | "gender" | "hometown" | "position" | "techType" | "course" | "classRoom" | "avatar"> {
  return {
    phone: member.phone,
    dob: toDateInputValue(member.dob),
    gender: member.gender,
    hometown: member.hometown,
    position: member.position,
    techType: member.type === "technician" ? "Technician" : "Tester",
    course: member.course,
    classRoom: member.class,
    avatar: member.avatar,
  };
}

function clearCurrentUserSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("its_current_user");
}

function isSameIdentity(user: User, member: Member): boolean {
  return (
    Boolean(member.uid && user.uid && member.uid === user.uid)
    || Boolean(member.email && user.email && member.email.toLowerCase() === user.email.toLowerCase())
    || member.username === user.username
  );
}

function mapMemberStatusToUserStatus(memberStatus: string): User["status"] {
  return memberStatus === "inactive" ? "inactive" : "active";
}

function buildUserFromMember(member: Member, overrideStatus?: User["status"]): User {
  const { role, permissions, isRoot } = mapMemberToUserRoleAndPermissions(member);
  return {
    id: 0,
    uid: member.uid,
    name: member.name,
    username: member.username,
    email: member.email || "",
    role,
    permissions: [...permissions],
    isRoot,
    status: overrideStatus ?? mapMemberStatusToUserStatus(member.status),
    registeredAt: member.registeredAt || new Date().toISOString(),
    ...mapMemberProfileToUser(member),
  };
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

  let sourceMembers: Member[];
  try {
    sourceMembers = await getFirestoreMembers();
    saveMembers(sourceMembers);
  } catch {
    sourceMembers = getMembers();
  }

  const duplicateMember = sourceMembers.find(
    (m) => m.email?.trim().toLowerCase() === normalizedEmail || m.username.trim().toLowerCase() === normalizedUsername,
  );
  if (duplicateMember) {
    throw new Error("Email hoặc username đã tồn tại trong danh sách đăng ký.");
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

  saveMembers([...sourceMembers, member]);

  const user = buildUserFromMember(member, "inactive");
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

  const linkedUser = buildUserFromMember(approvedMember, mapMemberStatusToUserStatus(approvedMember.status));

  if (currentUser && isSameIdentity(currentUser, approvedMember)) {
    if (linkedUser.status === "active") {
      setCurrentUser({ ...currentUser, ...linkedUser });
    } else {
      clearCurrentUserSession();
    }
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

  const updatedMembers = updateMember(id, updates);
  const savedMember = updatedMembers.find((member) => String(member.id) === String(id));
  if (!savedMember) {
    return { success: false, error: "Member not found" };
  }

  const syncedUser = buildUserFromMember(savedMember, mapMemberStatusToUserStatus(savedMember.status));

  if (currentUser && isSameIdentity(currentUser, savedMember)) {
    if (savedMember.approvalStatus === "approved" && syncedUser.status === "active") {
      setCurrentUser({ ...currentUser, ...syncedUser });
    } else {
      clearCurrentUserSession();
    }
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

  const updatedMember: Partial<Member> = { approvalStatus: "rejected", status: "inactive" };
  const updated = updateMember(id, updatedMember);

  if (currentUser && isSameIdentity(currentUser, member)) {
    clearCurrentUserSession();
  }

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
      syncUserProfilesFromMembers();
    }
  } catch {
    // Keep existing local cache when Firestore is temporarily unavailable
  }
}

export function syncUserProfilesFromMembers(): void {
  const current = getCurrentUser();
  if (!current || current.isRoot) return;

  const members = getMembers();
  const member = members.find((m) => isSameIdentity(current, m));

  if (!member || member.approvalStatus !== "approved") {
    clearCurrentUserSession();
    return;
  }

  const nextUser = {
    ...current,
    ...buildUserFromMember(member, mapMemberStatusToUserStatus(member.status)),
  };

  if (nextUser.status === "inactive") {
    clearCurrentUserSession();
    return;
  }

  setCurrentUser(nextUser);
}
