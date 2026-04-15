import { useState, useMemo } from "react";
import { Search, CheckCircle, XCircle, Clock, UserCheck } from "lucide-react";
import type { Member } from "../../data/members";
import { POSITION_COLORS } from "../../data/members";

interface ApprovalTabProps {
  members: Member[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onApproveAll: () => void;
  onRejectAll: () => void;
}

export function ApprovalTab({ members, onApprove, onReject, onApproveAll, onRejectAll }: ApprovalTabProps) {
  const [search, setSearch] = useState("");
  const pending = members.filter((m) => m.approvalStatus === "pending");

  const filtered = useMemo(() => {
    return pending.filter((m) => {
      const q = search.toLowerCase();
      return (
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.username.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q)
      );
    });
  }, [search, pending]);

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock size={18} className="text-amber-500" />
            </div>
            <div>
              <h3 className="text-gray-900 text-sm" style={{ fontWeight: 700 }}>
                Phê duyệt thành viên
              </h3>
              <p className="text-gray-400 text-xs">
                {pending.length} thành viên đang chờ phê duyệt
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-1 min-w-[200px] justify-end">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm theo tên, username, email..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-white transition-all"
              />
            </div>
            {pending.length > 0 && (
              <>
                <button
                  onClick={onApproveAll}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm transition-colors shadow-sm whitespace-nowrap"
                  style={{ fontWeight: 600 }}
                >
                  <CheckCircle size={15} />
                  Chấp nhận tất cả
                </button>
                <button
                  onClick={onRejectAll}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm transition-colors shadow-sm whitespace-nowrap"
                  style={{ fontWeight: 600 }}
                >
                  <XCircle size={15} />
                  Từ chối tất cả
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* List */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((member) => (
            <PendingMemberCard key={member.id} member={member} onApprove={onApprove} onReject={onReject} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 flex flex-col items-center justify-center text-gray-400">
          {pending.length === 0 ? (
            <>
              <UserCheck size={48} className="mb-3 opacity-30" />
              <p className="text-sm">Không có thành viên nào đang chờ phê duyệt</p>
            </>
          ) : (
            <>
              <Search size={48} className="mb-3 opacity-30" />
              <p className="text-sm">Không tìm thấy thành viên nào</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Extracted: Pending Member Card ───────────────────────────────────────────
function PendingMemberCard({ member, onApprove, onReject }: {
  member: Member;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}) {
  const gradient = POSITION_COLORS[member.position] ?? "from-orange-400 to-orange-500";
  const initials = member.name.split(" ").slice(-2).map((w) => w[0]).join("").toUpperCase();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow`}>
            <span className="text-white font-bold text-base">{initials}</span>
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white bg-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h4 className="text-gray-900 text-base" style={{ fontWeight: 700 }}>
                {member.name}
              </h4>
              <p className="text-gray-400 text-xs mt-0.5">@{member.username}</p>
            </div>
            <div className="flex gap-1.5">
              <span className="text-[10px] text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">
                {member.position}
              </span>
              <span className={`text-[10px] text-white rounded-full px-2 py-0.5 ${member.type === "technician" ? "bg-blue-500" : "bg-purple-500"}`}>
                {member.type === "technician" ? "Technician" : "Tester"}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-blue-500"><MailIcon size={13} /></span>
              <span className="text-gray-600 text-xs truncate">{member.email || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500"><PhoneIcon size={13} /></span>
              <span className="text-gray-600 text-xs truncate">{member.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-500"><GradIcon size={13} /></span>
              <span className="text-gray-600 text-xs truncate">{member.course} · {member.class}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500"><PinIcon size={13} /></span>
              <span className="text-gray-600 text-xs truncate">{member.hometown}</span>
            </div>
          </div>
          {member.registeredAt && (
            <p className="text-gray-400 text-[10px] mb-3">
              <Clock size={10} className="inline mr-1" />
              Đăng ký lúc: {member.registeredAt}
            </p>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => onApprove(member.id)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm transition-colors shadow-sm"
              style={{ fontWeight: 600 }}
            >
              <CheckCircle size={15} />
              Chấp nhận
            </button>
            <button
              onClick={() => onReject(member.id)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm transition-colors shadow-sm"
              style={{ fontWeight: 600 }}
            >
              <XCircle size={15} />
              Từ chối
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Small inline icons to avoid re-importing ─────────────────────────────────
function MailIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width={20} height={16} x={2} y={4} rx={2} />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function PhoneIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function GradIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
function PinIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx={12} cy={10} r={3} />
    </svg>
  );
}
