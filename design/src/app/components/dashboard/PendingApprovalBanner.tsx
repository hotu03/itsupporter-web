import { UserCheck, ChevronRight } from "lucide-react";
import type { Member } from "../../../data/members";

interface PendingApprovalBannerProps {
  pendingMembers: Member[];
}

export function PendingApprovalBanner({ pendingMembers }: PendingApprovalBannerProps) {
  if (pendingMembers.length === 0) return null;

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-3.5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
          <UserCheck size={16} className="text-orange-500" />
        </div>
        <div>
          <p className="text-orange-700 text-sm font-semibold">
            {pendingMembers.length} thành viên đang chờ phê duyệt
          </p>
          <p className="text-orange-500 text-xs mt-0.5">
            {pendingMembers.map(m => m.name).join(", ")}
          </p>
        </div>
      </div>
      <a
        href="/dashboard/nhan-su"
        className="flex items-center gap-1.5 bg-orange-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors shrink-0"
      >
        Xem ngay <ChevronRight size={13} />
      </a>
    </div>
  );
}
