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
    setMembers(getMembers());
    return newMember;
  }, []);

  const handleUpdateMember = useCallback((updated: Member) => {
    updateMember(updated.id, updated);
    setMembers(getMembers());
  }, []);

  const handleDeleteMember = useCallback((id: number) => {
    deleteMember(id);
    setMembers(getMembers());
  }, []);

  const handleApprove = useCallback((id: number) => {
    const result = approveAndLinkMember(id);
    if (result.success) {
      setMembers(getMembers()); // refresh to sync with user link
      // TODO: Could dispatch toast for linked User update
    } else if (result.error) {
      // TODO: proper error handling (no console in prod)
      console.error("Approve failed:", result.error);
    }
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
    updateMember: handleUpdateMember,
    deleteMember: handleDeleteMember,
    approveMember: handleApprove,
    rejectMember: handleReject,
    approveAll: handleApproveAll,
    rejectAll: handleRejectAll,
    addCourse: handleAddCourse,
    deleteCourse: handleDeleteCourse,
  };
}
