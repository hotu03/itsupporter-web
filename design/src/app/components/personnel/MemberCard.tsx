import { User, Calendar, Phone, UserCircle, GraduationCap, School, MapPin, QrCode, Pencil, Trash2, Shield, ShieldCheck } from "lucide-react";
import type { Member } from "../../data/members";
import { POSITION_COLORS } from "../../data/members";

interface MemberCardProps {
  member: Member;
  onEdit: (m: Member) => void;
  onDelete: (id: number) => void;
}

export function MemberCard({ member, onEdit, onDelete }: MemberCardProps) {
  const gradient = POSITION_COLORS[member.position] ?? "from-orange-400 to-orange-500";
  const initials = member.name.split(" ").slice(-2).map((w) => w[0]).join("").toUpperCase();

  return (
    <div className={`bg-white rounded-2xl shadow-sm border p-5 flex flex-col items-center gap-3 hover:shadow-md transition-shadow ${member.isAdmin ? "border-orange-300 ring-1 ring-orange-200" : "border-gray-100"}`}>
      <div className="relative">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow`}>
          <span className="text-white font-bold text-lg">{initials}</span>
        </div>
        <span className={`absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2 border-white ${member.status === "active" ? "bg-green-400" : "bg-gray-300"}`} />
        {member.isAdmin && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
            <Shield size={9} className="text-white" />
          </span>
        )}
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <p className="text-gray-800 text-sm leading-tight" style={{ fontWeight: 600 }}>{member.name}</p>
          {member.isAdmin && <ShieldCheck size={12} className="text-orange-500 shrink-0" />}
        </div>
        <span className="inline-block mt-1 text-[10px] text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">{member.position}</span>
        {member.isAdmin && (
          <span className="inline-block ml-1 mt-1 text-[10px] text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-2 py-0.5">Admin</span>
        )}
      </div>
      <div className="w-full text-xs text-gray-500 flex flex-col gap-1.5 border-t border-gray-50 pt-3">
        {[
          { field: "username", icon: User, label: member.username, color: "text-blue-500" },
          { field: "dob", icon: Calendar, label: member.dob, color: "text-purple-500" },
          { field: "phone", icon: Phone, label: member.phone, color: "text-green-500" },
          { field: "gender", icon: UserCircle, label: member.gender, color: "text-pink-500" },
          { field: "course", icon: GraduationCap, label: member.course, color: "text-orange-500" },
          { field: "class", icon: School, label: member.class, color: "text-blue-500" },
          { field: "hometown", icon: MapPin, label: member.hometown, color: "text-red-500" },
        ].map(({ field, icon: Icon, label, color }) => (
          <div key={field} className="flex items-center justify-between gap-2">
            <Icon size={13} className={color} />
            <span className="text-gray-700 text-right truncate flex-1">{label}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-1">
        <button className="w-8 h-8 rounded-lg bg-orange-50 hover:bg-orange-100 flex items-center justify-center transition-colors">
          <QrCode size={14} className="text-orange-500" />
        </button>
        <button
          onClick={() => onEdit(member)}
          className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors"
        >
          <Pencil size={14} className="text-blue-500" />
        </button>
        <button
          onClick={() => onDelete(member.id)}
          className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
        >
          <Trash2 size={14} className="text-red-500" />
        </button>
      </div>
    </div>
  );
}
