import { useState, useEffect, useCallback } from "react";
import {
  getFirestoreMembers,
  addFirestoreMember,
  updateFirestoreMember,
  deleteFirestoreMember,
} from "../../../data/firestoreMembers";
import type { Member } from "../../../data/members";
import { COURSES_DEFAULT } from "../../../data/members";
import {
  approveAndLinkMember,
  rejectMember as rejectMemberReg,
  linkExistingSeeds,
  syncMemberRoleToUser,
  syncMembersFromFirestore,
} from "../../../data/registration";

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [courses, setCourses] = useState<string[]>(COURSES_DEFAULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    linkExistingSeeds();
    async function loadData() {
      await syncMembersFromFirestore();
      const firestoreMembers = await getFirestoreMembers();
      setMembers(firestoreMembers);
      const storedCourses = localStorage.getItem("its_member_courses");
      if (storedCourses) {
        try {
          setCourses(JSON.parse(storedCourses));
        } catch {
          setCourses(COURSES_DEFAULT);
        }
      }
      setLoading(false);
    }
    void loadData();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("its_member_courses", JSON.stringify(courses));
    }
  }, [courses, loading]);

  const refreshMembers = useCallback(async () => {
    const firestoreMembers = await getFirestoreMembers();
    setMembers(firestoreMembers);
  }, []);

  const handleAddMember = useCallback(async (member: Omit<Member, "id">) => {
    const id = await addFirestoreMember(member);
    const newMember = { ...member, id } as Member;
    await refreshMembers();
    return newMember;
  }, [refreshMembers]);

  const handleDeleteMember = useCallback(async (id: number | string) => {
    await deleteFirestoreMember(String(id));
    await refreshMembers();
  }, [refreshMembers]);

  const handleApprove = useCallback(async (
    id: number | string,
    updates?: Partial<Pick<Member, "type" | "isAdmin" | "position" | "status">>
  ) => {
    const result = await approveAndLinkMember(id, updates);
    if (result.success) {
      await refreshMembers();
    }
  }, [refreshMembers]);

  const handleSetAdmin = useCallback(async (id: number | string, isAdminFlag: boolean) => {
    const result = syncMemberRoleToUser(id, { isAdmin: isAdminFlag });
    if (result.success) {
      await updateFirestoreMember(String(id), { isAdmin: isAdminFlag });
      await refreshMembers();
    }
  }, [refreshMembers]);

  const handleSyncMember = useCallback(async (updated: Member) => {
    await updateFirestoreMember(String(updated.id), {
      type: updated.type,
      isAdmin: updated.isAdmin,
      position: updated.position,
      status: updated.status,
    });

    syncMemberRoleToUser(updated.id, {
      type: updated.type,
      isAdmin: updated.isAdmin,
      position: updated.position,
      status: updated.status,
    });

    await refreshMembers();
  }, [refreshMembers]);

  const handleReject = useCallback(async (id: number | string) => {
    const updated = await rejectMemberReg(id);
    await refreshMembers();
    return updated;
  }, [refreshMembers]);

  const handleApproveAll = useCallback(async () => {
    const pendingIds = members
      .filter((m) => m.approvalStatus === "pending")
      .map((m) => m.id);

    for (const id of pendingIds) {
      await approveAndLinkMember(id);
    }

    await refreshMembers();
  }, [members, refreshMembers]);

  const handleRejectAll = useCallback(async () => {
    const pendingIds = members
      .filter((m) => m.approvalStatus === "pending")
      .map((m) => m.id);

    for (const id of pendingIds) {
      await rejectMemberReg(id);
    }

    await refreshMembers();
  }, [members, refreshMembers]);

  const handleAddCourse = useCallback((c: string) => {
    setCourses((prev) => [...prev, c]);
  }, []);

  const handleDeleteCourse = useCallback((c: string) => {
    setCourses((prev) => prev.filter((x) => x !== c));
  }, []);

  return {
    members,
    courses,
    loading,
    refreshMembers,
    addMember: handleAddMember,
    updateMember: handleSyncMember,
    deleteMember: handleDeleteMember,
    approveMember: handleApprove,
    setAdmin: handleSetAdmin,
    rejectMember: handleReject,
    approveAll: handleApproveAll,
    rejectAll: handleRejectAll,
    addCourse: handleAddCourse,
    deleteCourse: handleDeleteCourse,
  };
}
