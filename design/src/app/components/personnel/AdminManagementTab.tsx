import { useMemo, useState } from "react";
import { Search, ShieldCheck, ShieldOff, AlertTriangle } from "lucide-react";
import type { Member } from "../../data/members";
import { POSITION_COLORS } from "../../data/members";

interface AdminManagementTabProps {
  members: Member[];
  onSetAdmin: (id: number, isAdmin: boolean) => void;
}

function ConfirmDialog({
  memberName,
  onConfirm,
  onCancel,
}: {
  memberName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl border border-red-200 flex flex-col items-center justify-center p-6 z-10">
      <AlertTriangle size={28} className="text-red-500 mb-3" />
      <p className="text-gray-900 text-sm font-semibold text-center mb-1">
        Gỡ quyền Admin?
      </p>
      <p className="text-gray-500 text-xs text-center mb-4">
        Bạn chắc chắn muốn gỡ quyền Admin của <strong>{memberName}</strong>? Họ sẽ không thể truy cập trang Quản lý Nhân sự.
      </p>
      <div className="flex gap-3 w-full">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors"
          style={{ fontWeight: 600 }}
        >
          Huỷ
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 py-2 rounded-xl bg-red-500 text-white text-sm hover:bg-red-600 transition-colors"
          style={{ fontWeight: 600 }}
        >
          Gỡ Admin
        </button>
      </div>
    </div>
  );
}

export function AdminManagementTab({ members, onSetAdmin }: AdminManagementTabProps) {
  const [search, setSearch] = useState("");

  const approvedMembers = useMemo(
    () => members.filter(member => member.approvalStatus === "approved"),
    [members]
  );

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return approvedMembers.filter(member => {
      if (!query) {
        return true;
      }

      return [member.name, member.username, member.email || "", member.position]
        .some(value => value.toLowerCase().includes(query));
    });
  }, [approvedMembers, search]);

  const adminCount = approvedMembers.filter(member => member.isAdmin).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="text-gray-900 text-sm" style={{ fontWeight: 700 }}>
              Quản lý Admin
            </h3>
            <p className="text-gray-400 text-xs mt-1">
              {adminCount} admin / {approvedMembers.length} thành viên đã phê duyệt
            </p>
          </div>
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên, username, email..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredMembers.map(member => (
            <AdminMemberCard key={member.id} member={member} onSetAdmin={onSetAdmin} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center text-sm text-gray-400">
          Không tìm thấy thành viên phù hợp
        </div>
      )}
    </div>
  );
}

interface AdminMemberCardProps {
  member: Member;
  onSetAdmin: (id: number, isAdmin: boolean) => void;
}

function AdminMemberCard({ member, onSetAdmin }: AdminMemberCardProps) {
  const [confirming, setConfirming] = useState(false);
  const gradient = POSITION_COLORS[member.position] ?? "from-orange-400 to-orange-500";
  const initials = member.name.split(" ").slice(-2).map(word => word[0]).join("").toUpperCase();
  const nextAdminState = !member.isAdmin;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow relative">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-4 min-w-0">
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow shrink-0`}>
            <span className="text-white font-bold text-base">{initials}</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-gray-900 text-base" style={{ fontWeight: 700 }}>
                {member.name}
              </h4>
              <span className={`text-[10px] rounded-full px-2 py-0.5 border ${member.isAdmin ? "bg-orange-50 border-orange-200 text-orange-600" : "bg-gray-50 border-gray-200 text-gray-500"}`}>
                {member.isAdmin ? "Admin" : "Member"}
              </span>
            </div>
            <p className="text-gray-400 text-xs mt-1">@{member.username}</p>
            <div className="flex items-center gap-2 flex-wrap mt-2 text-xs text-gray-500">
              <span className="bg-gray-100 rounded-full px-2 py-0.5">{member.position}</span>
              <span className={`rounded-full px-2 py-0.5 text-white ${member.type === "technician" ? "bg-blue-500" : "bg-purple-500"}`}>
                {member.type === "technician" ? "Technician" : "Tester"}
              </span>
              {member.email && <span className="truncate">{member.email}</span>}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (member.isAdmin) {
              setConfirming(true);
            } else {
              onSetAdmin(member.id, nextAdminState);
            }
          }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors shadow-sm ${member.isAdmin ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-orange-500 text-white hover:bg-orange-600"}`}
          style={{ fontWeight: 600 }}
        >
          {member.isAdmin ? <ShieldOff size={15} /> : <ShieldCheck size={15} />}
          {member.isAdmin ? "Gỡ Admin" : "Cấp Admin"}
        </button>
      </div>

      {confirming && (
        <ConfirmDialog
          memberName={member.name}
          onConfirm={() => {
            onSetAdmin(member.id, false);
            setConfirming(false);
          }}
          onCancel={() => setConfirming(false)}
        />
      )}
    </div>
  );
}
