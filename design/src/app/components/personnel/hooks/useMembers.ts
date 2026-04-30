import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  getFirestoreMembers,
  addFirestoreMember,
  updateFirestoreMember,
  deleteFirestoreMember,
} from "../../../data/firestoreMembers";
import {
  getFirestoreCourses,
  addFirestoreCourse,
  deleteFirestoreCourse,
} from "../../../data/firestoreCourses";
import type { Member } from "../../../data/members";
import {
  approveAndLinkMember,
  rejectMember as rejectMemberReg,
  linkExistingSeeds,
  syncMemberRoleToUser,
  syncMembersFromFirestore,
} from "../../../data/registration";

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    linkExistingSeeds();
    async function loadData() {
      await syncMembersFromFirestore();
      const [firestoreMembers, firestoreCourses] = await Promise.all([
        getFirestoreMembers(),
        getFirestoreCourses(),
      ]);
      setMembers(firestoreMembers);
      setCourses(firestoreCourses);
      setLoading(false);
    }
    void loadData();
  }, []);

  const refreshMembers = useCallback(async () => {
    const [firestoreMembers, firestoreCourses] = await Promise.all([
      getFirestoreMembers(),
      getFirestoreCourses(),
    ]);
    setMembers(firestoreMembers);
    setCourses(firestoreCourses);
  }, []);

  const handleAddMember = useCallback(async (member: Omit<Member, "id">) => {
    try {
      const id = await addFirestoreMember(member);
      const newMember = { ...member, id } as Member;
      await refreshMembers();
      toast.success("Thêm thành viên mới thành công");
      return newMember;
    } catch (error) {
      toast.error("Không thể thêm thành viên: " + (error instanceof Error ? error.message : "Lỗi không xác định"));
      return null;
    }
  }, [refreshMembers]);

  const handleDeleteMember = useCallback(async (id: number | string) => {
    try {
      await deleteFirestoreMember(String(id));
      await refreshMembers();
      toast.success("Xóa thành viên thành công");
    } catch (error) {
      toast.error("Không thể xóa thành viên: " + (error instanceof Error ? error.message : "Lỗi không xác định"));
    }
  }, [refreshMembers]);

  const handleApprove = useCallback(async (
    id: number | string,
    updates?: Partial<Pick<Member, "type" | "isAdmin" | "position" | "status">>
  ) => {
    try {
      const result = await approveAndLinkMember(id, updates);
      if (result.success) {
        await refreshMembers();
        toast.success("Duyệt thành viên thành công");
      } else {
        toast.error(result.error || "Không thể duyệt thành viên");
      }
    } catch (error) {
      toast.error("Không thể duyệt thành viên: " + (error instanceof Error ? error.message : "Lỗi không xác định"));
    }
  }, [refreshMembers]);

  const handleSetAdmin = useCallback(async (id: number | string, isAdminFlag: boolean) => {
    try {
      const result = syncMemberRoleToUser(id, { isAdmin: isAdminFlag });
      if (result.success) {
        await updateFirestoreMember(String(id), { isAdmin: isAdminFlag });
        await refreshMembers();
        toast.success(isAdminFlag ? "Đã cấp quyền admin" : "Đã hủy quyền admin");
      } else {
        toast.error(result.error || "Không thể cập nhật quyền admin");
      }
    } catch (error) {
      toast.error("Không thể cập nhật quyền admin: " + (error instanceof Error ? error.message : "Lỗi không xác định"));
    }
  }, [refreshMembers]);

  const handleSyncMember = useCallback(async (updated: Member) => {
    try {
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
      toast.success("Cập nhật thông tin thành viên thành công");
    } catch (error) {
      toast.error("Không thể cập nhật thông tin: " + (error instanceof Error ? error.message : "Lỗi không xác định"));
    }
  }, [refreshMembers]);

  const handleReject = useCallback(async (id: number | string) => {
    try {
      const updated = await rejectMemberReg(id);
      await refreshMembers();
      toast.success("Từ chối thành viên thành công");
      return updated;
    } catch (error) {
      toast.error("Không thể từ chối thành viên: " + (error instanceof Error ? error.message : "Lỗi không xác định"));
      return null;
    }
  }, [refreshMembers]);

  const handleApproveAll = useCallback(async () => {
    try {
      const pendingIds = members
        .filter((m) => m.approvalStatus === "pending")
        .map((m) => m.id);

      for (const id of pendingIds) {
        await approveAndLinkMember(id);
      }

      await refreshMembers();
      toast.success(`Đã duyệt ${pendingIds.length} thành viên`);
    } catch (error) {
      toast.error("Không thể duyệt tất cả: " + (error instanceof Error ? error.message : "Lỗi không xác định"));
    }
  }, [members, refreshMembers]);

  const handleRejectAll = useCallback(async () => {
    try {
      const pendingIds = members
        .filter((m) => m.approvalStatus === "pending")
        .map((m) => m.id);

      for (const id of pendingIds) {
        await rejectMemberReg(id);
      }

      await refreshMembers();
      toast.success(`Đã từ chối ${pendingIds.length} thành viên`);
    } catch (error) {
      toast.error("Không thể từ chối tất cả: " + (error instanceof Error ? error.message : "Lỗi không xác định"));
    }
  }, [members, refreshMembers]);

  const handleAddCourse = useCallback(async (c: string) => {
    try {
      await addFirestoreCourse(c);
      setCourses(prev => prev.includes(c) ? prev : [...prev, c]);
      toast.success("Thêm khóa thành công");
    } catch (error) {
      toast.error("Không thể thêm khóa: " + (error instanceof Error ? error.message : "Lỗi không xác định"));
    }
  }, []);

  const handleDeleteCourse = useCallback(async (c: string) => {
    try {
      await deleteFirestoreCourse(c);
      setCourses(prev => prev.filter(x => x !== c));
      toast.success("Xóa khóa thành công");
    } catch (error) {
      toast.error("Không thể xóa khóa: " + (error instanceof Error ? error.message : "Lỗi không xác định"));
    }
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
