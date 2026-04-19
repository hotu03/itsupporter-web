import { useState } from "react";
import { Users, Cpu, FlaskConical, ShieldCheck, GraduationCap } from "lucide-react";
import { useMembers } from "../components/personnel/hooks/useMembers";
import { OverviewTab } from "../components/personnel/OverviewTab";
import { MemberListTab } from "../components/personnel/MemberListTab";
import { ApprovalTab } from "../components/personnel/ApprovalTab";
import { AdminManagementTab } from "../components/personnel/AdminManagementTab";
import { ManageCoursesModal } from "../components/personnel/ManageCoursesModal";
import { useAuth } from "../contexts/AuthContext";
import { isAdmin } from "../data/users";

const TABS = [
  { key: "overview", label: "Tổng quan", icon: Users },
  { key: "technician", label: "Technicians", icon: Cpu },
  { key: "tester", label: "Testers", icon: FlaskConical },
  { key: "approval", label: "Phê duyệt", icon: ShieldCheck, adminOnly: true },
  { key: "admin", label: "Quản lý Admin", icon: ShieldCheck, adminOnly: true },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function Personnel() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [showCourses, setShowCourses] = useState(false);

  const {
    members, courses,
    addMember, updateMember, deleteMember,
    approveMember, setAdmin, rejectMember, approveAll, rejectAll,
    addCourse, deleteCourse,
  } = useMembers();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">Quản lý Nhân sự</h1>
          <button
            onClick={() => setShowCourses(true)}
            className="flex items-center gap-2 px-3 py-2 bg-orange-50 text-orange-600 rounded-xl text-sm hover:bg-orange-100 transition-colors"
          >
            <GraduationCap size={14} /> Quản lý Khoá
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-1">
          {TABS.filter(tab => !('adminOnly' in tab && tab.adminOnly && !isAdmin(user))).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === key
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon size={15} />
              {label}
              {key === "approval" && (
                <span className="ml-1 px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] rounded-full">
                  {members.filter(m => m.approvalStatus === "pending").length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {activeTab === "overview" && <OverviewTab members={members} courses={courses} />}
        {activeTab === "technician" && (
          <MemberListTab type="technician" courses={courses} members={members} onAddMember={addMember} onUpdateMember={updateMember} onDeleteMember={deleteMember} />
        )}
        {activeTab === "tester" && (
          <MemberListTab type="tester" courses={courses} members={members} onAddMember={addMember} onUpdateMember={updateMember} onDeleteMember={deleteMember} />
        )}
        {activeTab === "approval" && (
          <ApprovalTab members={members} onApprove={approveMember} onReject={rejectMember} onApproveAll={approveAll} onRejectAll={rejectAll} />
        )}
        {activeTab === "admin" && (
          <AdminManagementTab members={members} onSetAdmin={setAdmin} />
        )}
      </div>

      {/* Course management modal */}
      <ManageCoursesModal isOpen={showCourses} onClose={() => setShowCourses(false)} courses={courses} onAdd={addCourse} onDelete={deleteCourse} />
    </div>
  );
}
