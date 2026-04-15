import { useState, useEffect, useCallback } from "react";
import {
  getMembers,
  saveMembers,
  addMember,
  updateMember,
  deleteMember,
  type Member,
  COURSES_DEFAULT,
} from "../../../data/members";

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [courses, setCourses] = useState<string[]>(COURSES_DEFAULT);
  const [loading, setLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
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
    const updated = updateMember(id, { approvalStatus: "approved" });
    setMembers(updated);
  }, []);

  const handleReject = useCallback((id: number) => {
    const updated = updateMember(id, { approvalStatus: "rejected" });
    setMembers(updated);
  }, []);

  const handleApproveAll = useCallback(() => {
    const updated = members.map(m =>
      m.approvalStatus === "pending" ? { ...m, approvalStatus: "approved" as const } : m
    );
    saveMembers(updated);
    setMembers(updated);
  }, [members]);

  const handleRejectAll = useCallback(() => {
    const updated = members.map(m =>
      m.approvalStatus === "pending" ? { ...m, approvalStatus: "rejected" as const } : m
    );
    saveMembers(updated);
    setMembers(updated);
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
