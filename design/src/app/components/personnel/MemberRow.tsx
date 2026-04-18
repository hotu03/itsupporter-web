import { useState } from "react";
import { QrCode, Pencil, Trash2, Shield, AlertTriangle, X, Check } from "lucide-react";
import type { Member } from "../../data/members";
import { POSITION_COLORS } from "../../data/members";

interface MemberRowProps {
  member: Member;
  rank?: number;
  onEdit: (m: Member) => void;
  onDelete?: (id: number) => void;
}

export function MemberRow({ member, rank, onEdit, onDelete }: MemberRowProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const gradient = POSITION_COLORS[member.position] ?? "from-orange-400 to-orange-500";
  const initials = member.name.split(" ").slice(-2).map((w) => w[0]).join("").toUpperCase();

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    onDelete?.(member.id);
    setShowConfirm(false);
  };

  return (
    <>
      <tr className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
        {rank !== undefined && (
          <td className="px-4 py-3 text-center">
            {rank <= 3 ? (
              <span className={`inline-flex w-7 h-7 rounded-full items-center justify-center text-xs font-bold ${rank === 1 ? "bg-yellow-400 text-white" : rank === 2 ? "bg-gray-300 text-white" : "bg-amber-600/80 text-white"}`}>{rank}</span>
            ) : (
              <span className="text-gray-400 text-xs">{rank}</span>
            )}
          </td>
        )}
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 relative`}>
              <span className="text-white text-xs font-bold">{initials}</span>
              {member.isAdmin && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-orange-500 rounded-full flex items-center justify-center border border-white">
                  <Shield size={7} className="text-white" />
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-gray-800 text-sm" style={{ fontWeight: 600 }}>{member.name}</p>
                {member.isAdmin && <span className="text-[9px] text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-1.5 py-0.5 font-semibold">Admin</span>}
              </div>
              <p className="text-gray-400 text-[10px]">@{member.username}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-center">
          <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">{member.position}</span>
        </td>
        <td className="px-4 py-3 text-center text-xs text-gray-600">{member.course}</td>
        <td className="px-4 py-3 text-center text-xs text-gray-600">{member.class}</td>
        <td className="px-4 py-3 text-center text-xs text-gray-600">{member.gender}</td>
        <td className="px-4 py-3 text-center text-xs text-gray-600">{member.phone}</td>
        <td className="px-4 py-3 text-center">
          <span className={`w-2 h-2 rounded-full inline-block ${member.status === "active" ? "bg-green-400" : "bg-gray-300"}`} />
        </td>
        <td className="px-4 py-3 text-center">
          <div className="flex gap-1.5 justify-center">
            <button className="w-7 h-7 rounded-lg bg-orange-50 hover:bg-orange-100 flex items-center justify-center">
              <QrCode size={12} className="text-orange-500" />
            </button>
            <button
              onClick={() => onEdit(member)}
              className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center"
            >
              <Pencil size={12} className="text-blue-500" />
            </button>
            {onDelete && (
              <button
                onClick={handleDelete}
                className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center"
              >
                <Trash2 size={12} className="text-red-500" />
              </button>
            )}
          </div>
        </td>
      </tr>

      {/* Delete confirmation popup - rendered as fixed overlay outside table */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[320px]">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mx-auto mb-4">
              <AlertTriangle size={24} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Xóa thành viên?</h3>
            <p className="text-sm text-gray-500 text-center mb-5">
              Bạn có chắc chắn muốn xóa <strong>{member.name}</strong>? Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
              >
                <X size={16} />
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors"
              >
                <Check size={16} />
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
