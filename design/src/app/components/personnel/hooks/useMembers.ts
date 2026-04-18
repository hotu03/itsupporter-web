import { useState, useEffect, useCallback } from "react";
import {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
  type Member,
  COURSES_DEFAULT,
} from "../../../data/members";
import {
  approveAndLinkMember,
  rejectMember as rejectMemberReg,
  linkExistingSeeds,
  syncMemberRoleToUser,
} from "../../../data/registration";

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [courses, setCourses] = useState<string[]>(COURSES_DEFAULT);
  const [loading, setLoading] = useState(true);

  // Load from localStorage + link seeds for User-Member architecture
  useEffect(() => {
    linkExistingSeeds(); // idempotent migration for uid + users
    setMembers(getMembers());
    const storedCourses = localStorage.getItem("its_member_courses");
    if (storedCourses) {
      try {
        setCourses(JSON.parse(storedCourses));
      } catch {
        setCourses(COURSES_DEFAULT);
      }
    }
    setLoading(false);
  }, []);

  // Sync courses to localStorage when changed
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("its_member_courses", JSON.stringify(courses));
    }
  }, [courses, loading]);

  const refreshMembers = useCallback(() => {
    setMembers(getMembers());
  }, []);

  const handleAddMember = useCallback((member: Omit<Member, "id">) => {
    const newMember = addMember(member);
    syncMemberRoleToUser(newMember.id, newMember);
    setMembers(getMembers());
    return newMember;
  }, []);


  const handleDeleteMember = useCallback((id: number) => {
    deleteMember(id);
    setMembers(getMembers());
  }, []);

  const handleApprove = useCallback((
    id: number,
    updates?: Partial<Pick<Member, "type" | "isAdmin" | "position" | "status">>
  ) => {
    const result = approveAndLinkMember(id, updates);
    if (result.success) {
      setMembers(getMembers());
    }
  }, []);

  const handleSetAdmin = useCallback((id: number, isAdmin: boolean) => {
    const result = syncMemberRoleToUser(id, { isAdmin });
    if (result.success) {
      setMembers(getMembers());
    }
  }, []);

  const handleSyncMember = useCallback((updated: Member) => {
    const persistedMembers = updateMember(updated.id, updated);
    const savedMember = persistedMembers.find((member) => member.id === updated.id) || updated;

    syncMemberRoleToUser(savedMember.id, {
      type: savedMember.type,
      isAdmin: savedMember.isAdmin,
      position: savedMember.position,
      status: savedMember.status,
    });

    setMembers(getMembers());
  }, []);

  const handleReject = useCallback((id: number) => {
    // Use registration reject which sets inactive
    const updated = rejectMemberReg(id);
    setMembers(updated);
    return updated;
  }, []);

  const handleApproveAll = useCallback(() => {
    const pendingIds = members
      .filter(m => m.approvalStatus === "pending")
      .map(m => m.id);
    pendingIds.forEach(id => {
      approveAndLinkMember(id); // links user + role for each
    });
    setMembers(getMembers()); // final refresh
  }, [members]);

  const handleRejectAll = useCallback(() => {
    const pendingIds = members
      .filter(m => m.approvalStatus === "pending")
      .map(m => m.id);
    pendingIds.forEach(id => {
      rejectMemberReg(id);
    });
    setMembers(getMembers());
  }, [members]);

  const handleAddCourse = useCallback((c: string) => {
    setCourses(prev => [...prev, c]);
  }, []);

  const handleDeleteCourse = useCallback((c: string) => {
    setCourses(prev => prev.filter(x => x !== c));
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
