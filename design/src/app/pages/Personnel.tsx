import { useState, useMemo, useRef } from "react";
import { Pagination, usePagination } from "../components/Pagination";
import {
  Search, Filter, LayoutGrid, List, QrCode, Pencil,
  Trophy, Cpu, FlaskConical, Users, TrendingUp, Star,
  User, Calendar, Phone, UserCircle, GraduationCap, School, MapPin,
  Camera, ChevronDown, Lock, X, Settings2, Plus, Trash2, Eye, EyeOff, Mail,
  CheckCircle, XCircle, Clock, UserCheck, Shield, ShieldCheck, ShieldOff,
} from "lucide-react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Member {
  id: number;
  name: string;
  username: string;
  dob: string;
  phone: string;
  gender: string;
  course: string;
  class: string;
  hometown: string;
  position: string;
  type: "technician" | "tester";
  machinesDone: number;
  testsRun: number;
  status: string;
  approvalStatus: "pending" | "approved" | "rejected";
  email?: string;
  registeredAt?: string;
  isAdmin?: boolean;
}

// ─── Date helpers ─────────────────────────────────────────────────────────────
const dobToInput = (dob: string) => {
  const p = dob.split("/");
  if (p.length !== 3) return "";
  return `${p[2]}-${p[1].padStart(2, "0")}-${p[0].padStart(2, "0")}`;
};
const inputToDob = (val: string) => {
  if (!val) return "";
  const [y, m, d] = val.split("-");
  return `${d}/${m}/${y}`;
};
const splitName = (fullName: string) => {
  const words = fullName.trim().split(" ");
  if (words.length === 1) return { lastName: "", firstName: words[0] };
  return { lastName: words.slice(0, -1).join(" "), firstName: words[words.length - 1] };
};

// ─── Mock data ────────────────────────────────────────────────────────────────
const MEMBERS_INITIAL: Member[] = [
  { id: 1, name: "Hà Gia Linh", username: "halinhit", dob: "25/10/2002", phone: "0945022510", gender: "Male", course: "K15", class: "KTPM01", hometown: "Vĩnh Phúc", position: "Member", type: "technician", machinesDone: 48, testsRun: 0, status: "active", approvalStatus: "approved" },
  { id: 2, name: "Phạm Việt Anh", username: "vietanh", dob: "15/11/2002", phone: "0974318363", gender: "Male", course: "K15", class: "KHMT02", hometown: "Hưng Yên", position: "Member", type: "technician", machinesDone: 63, testsRun: 0, status: "active", approvalStatus: "approved" },
  { id: 3, name: "Nguyễn Mạnh Cường", username: "nguyenmanhcuong", dob: "12/08/2002", phone: "0865561285", gender: "Male", course: "K15", class: "KHMT2", hometown: "Phú Thọ", position: "President", type: "technician", machinesDone: 91, testsRun: 0, status: "active", approvalStatus: "approved", isAdmin: true },
  { id: 4, name: "Nguyễn Trọng Quân", username: "kiaya1011", dob: "20/11/2002", phone: "0853001127", gender: "Male", course: "K15", class: "HTTT01", hometown: "Ninh Bình", position: "Member", type: "technician", machinesDone: 37, testsRun: 0, status: "inactive", approvalStatus: "approved" },
  { id: 5, name: "Trần Đức Minh", username: "tranducminh151102", dob: "15/11/2002", phone: "0705723093", gender: "Female", course: "K15", class: "ĐIỆN04", hometown: "Hưng Yên", position: "Member", type: "technician", machinesDone: 55, testsRun: 0, status: "active", approvalStatus: "approved" },
  { id: 6, name: "Phan Anh Khoa", username: "khoaphan15.Nu", dob: "15/04/2002", phone: "0865207306", gender: "Male", course: "K15", class: "HTTT01", hometown: "Hà Nội", position: "Vice President", type: "technician", machinesDone: 72, testsRun: 0, status: "active", approvalStatus: "approved", isAdmin: true },
  { id: 7, name: "Nguyễn Phạm Nguyên Hoàng", username: "hoangshinju", dob: "02/09/2002", phone: "0372816013", gender: "Male", course: "K15", class: "KHMT1", hometown: "Nam Định", position: "Member", type: "technician", machinesDone: 29, testsRun: 0, status: "inactive", approvalStatus: "approved" },
  { id: 8, name: "Nguyễn Tuấn Đạt", username: "datngdev", dob: "19/03/2002", phone: "0845119189", gender: "Male", course: "K15", class: "CNTT05", hometown: "Nam Định", position: "Commissioner", type: "technician", machinesDone: 44, testsRun: 0, status: "active", approvalStatus: "approved" },
  { id: 9, name: "Lê Minh Hiếu", username: "hieulm.it", dob: "07/01/2003", phone: "0912345678", gender: "Male", course: "K16", class: "CNTT01", hometown: "Hà Nội", position: "Member", type: "technician", machinesDone: 18, testsRun: 0, status: "active", approvalStatus: "approved" },
  { id: 10, name: "Bùi Thị Lan", username: "lantb.k16", dob: "22/06/2003", phone: "0923456789", gender: "Female", course: "K16", class: "KTPM02", hometown: "Thái Nguyên", position: "Member", type: "technician", machinesDone: 31, testsRun: 0, status: "active", approvalStatus: "approved" },
  { id: 11, name: "Đặng Quốc Huy", username: "huy.dq.k16", dob: "11/09/2003", phone: "0934567890", gender: "Male", course: "K16", class: "HTTT02", hometown: "Hải Dương", position: "Member", type: "technician", machinesDone: 22, testsRun: 0, status: "inactive", approvalStatus: "approved" },
  { id: 12, name: "Trần Thị Mai", username: "maitran.k17", dob: "03/03/2004", phone: "0945678901", gender: "Female", course: "K17", class: "CNTT03", hometown: "Bắc Ninh", position: "Member", type: "technician", machinesDone: 9, testsRun: 0, status: "active", approvalStatus: "approved" },
  { id: 13, name: "Ngô Hải Đăng", username: "dang.nh.test", dob: "14/05/2002", phone: "0956789012", gender: "Male", course: "K15", class: "KHMT03", hometown: "Hà Nội", position: "Member", type: "tester", machinesDone: 0, testsRun: 87, status: "active", approvalStatus: "approved" },
  { id: 14, name: "Phạm Thu Hà", username: "hapt.tester", dob: "28/07/2002", phone: "0967890123", gender: "Female", course: "K15", class: "HTTT03", hometown: "Hà Nội", position: "Member", type: "tester", machinesDone: 0, testsRun: 102, status: "active", approvalStatus: "approved" },
  { id: 15, name: "Vũ Đình Khải", username: "khaivd.qa", dob: "19/02/2003", phone: "0978901234", gender: "Male", course: "K16", class: "CNTT04", hometown: "Quảng Ninh", position: "Commissioner", type: "tester", machinesDone: 0, testsRun: 75, status: "active", approvalStatus: "approved" },
  { id: 16, name: "Hoàng Thúy Linh", username: "linhht.check", dob: "30/11/2002", phone: "0989012345", gender: "Female", course: "K15", class: "KTPM03", hometown: "Ninh Bình", position: "Member", type: "tester", machinesDone: 0, testsRun: 118, status: "inactive", approvalStatus: "approved" },
  { id: 17, name: "Đinh Văn Nam", username: "namdv.qa15", dob: "05/04/2002", phone: "0990123456", gender: "Male", course: "K15", class: "KHMT01", hometown: "Hà Nam", position: "Vice President", type: "tester", machinesDone: 0, testsRun: 64, status: "active", approvalStatus: "approved", isAdmin: true },
  { id: 18, name: "Lý Thị Phương", username: "phuonglt.k16", dob: "18/08/2003", phone: "0901234567", gender: "Female", course: "K16", class: "CNTT02", hometown: "Bắc Giang", position: "Member", type: "tester", machinesDone: 0, testsRun: 43, status: "active", approvalStatus: "approved" },
  { id: 19, name: "Cao Minh Tuấn", username: "tuancm.dev", dob: "22/12/2003", phone: "0912340678", gender: "Male", course: "K16", class: "HTTT04", hometown: "Vĩnh Phúc", position: "Member", type: "tester", machinesDone: 0, testsRun: 58, status: "active", approvalStatus: "approved" },
  { id: 20, name: "Nguyễn Khánh Vy", username: "vynk.test", dob: "09/06/2004", phone: "0923451789", gender: "Female", course: "K17", class: "KTPM01", hometown: "Hải Phòng", position: "Member", type: "tester", machinesDone: 0, testsRun: 29, status: "active", approvalStatus: "approved" },
];

// ─── Avatar gradient by position ─────────────────────────────────────────────
const POSITION_COLORS: Record<string, string> = {
  President: "from-red-400 to-red-600",
  "Vice President": "from-purple-400 to-purple-600",
  Commissioner: "from-blue-400 to-blue-600",
  Member: "from-orange-400 to-orange-500",
  Collaborators: "from-green-400 to-green-500",
};

// ─── Shared form helpers ──────────────────────────────────────────────────────
const inputCls = (err?: string) =>
  `w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all bg-white ${err ? "border-red-400" : "border-gray-200"} text-gray-700 placeholder-gray-400`;

const selectCls = (hasVal: boolean, err?: string) =>
  `w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all appearance-none bg-white ${err ? "border-red-400" : "border-gray-200"} ${hasVal ? "text-gray-700" : "text-gray-400"}`;

function FormField({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1.5">
        {label}{required && <span className="text-orange-500 ml-0.5">(*)</span>}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────
const PROVINCES = [
  "Hà Nội", "Hồ Chí Minh", "Hải Phòng", "Đà Nẵng", "Cần Thơ", "An Giang",
  "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định",
  "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk",
  "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang",
  "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình", "Hưng Yên",
  "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn",
  "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận",
  "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh",
  "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên",
  "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang",
  "Vĩnh Long", "Vĩnh Phúc", "Yên Bái",
];
const COURSES_DEFAULT = ["K14", "K15", "K16", "K17", "K18", "K19"];

// ─── Member Card ──────────────────────────────────────────────────────────────
function MemberCard({ member, onEdit, onDelete }: { member: Member; onEdit: (m: Member) => void; onDelete: (id: number) => void }) {
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

// ─── Member Row ──────────────────────────────────────────────────────────────
function MemberRow({ member, rank, onEdit, onDelete }: { member: Member; rank?: number; onEdit: (m: Member) => void; onDelete?: (id: number) => void }) {
  const gradient = POSITION_COLORS[member.position] ?? "from-orange-400 to-orange-500";
  const initials = member.name.split(" ").slice(-2).map((w) => w[0]).join("").toUpperCase();

  return (
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
              onClick={() => onDelete(member.id)}
              className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center"
            >
              <Trash2 size={12} className="text-red-500" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

// ─── Approval Tab ─────────────────────────────────────────────────────────────
function ApprovalTab({ members, onApprove, onReject, onApproveAll, onRejectAll }: {
  members: Member[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onApproveAll: () => void;
  onRejectAll: () => void;
}) {
  const [search, setSearch] = useState("");
  const { page, pageSize, handlePageChange, handlePageSizeChange, paginate } = usePagination(10);
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
          {filtered.map((member) => {
            const gradient = POSITION_COLORS[member.position] ?? "from-orange-400 to-orange-500";
            const initials = member.name.split(" ").slice(-2).map((w) => w[0]).join("").toUpperCase();

            return (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div
                      className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow`}
                    >
                      <span className="text-white font-bold text-base">{initials}</span>
                    </div>
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white bg-amber-400" />
                  </div>

                  {/* Info */}
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
                        <span
                          className={`text-[10px] text-white rounded-full px-2 py-0.5 ${
                            member.type === "technician" ? "bg-blue-500" : "bg-purple-500"
                          }`}
                        >
                          {member.type === "technician" ? "Technician" : "Tester"}
                        </span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 mb-4">
                      {[
                        { icon: Mail, label: member.email || "N/A", color: "text-blue-500" },
                        { icon: Phone, label: member.phone, color: "text-green-500" },
                        { icon: GraduationCap, label: `${member.course} · ${member.class}`, color: "text-orange-500" },
                        { icon: MapPin, label: member.hometown, color: "text-red-500" },
                      ].map(({ icon: Icon, label, color }, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Icon size={13} className={color} />
                          <span className="text-gray-600 text-xs truncate">{label}</span>
                        </div>
                      ))}
                    </div>

                    {member.registeredAt && (
                      <p className="text-gray-400 text-[10px] mb-3">
                        <Clock size={10} className="inline mr-1" />
                        Đăng ký lúc: {member.registeredAt}
                      </p>
                    )}

                    {/* Action buttons */}
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
          })}
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

// ─── Overview Tab ─────────────────────────────────────────────────────────────
function OverviewTab({ members }: { members: Member[] }) {
  // Only show approved members in overview
  const approvedMembers = members.filter((m) => m.approvalStatus === "approved");
  const technicians = approvedMembers.filter((m) => m.type === "technician");
  const testers = approvedMembers.filter((m) => m.type === "tester");
  const activeCount = approvedMembers.filter((m) => m.status === "active").length;
  const adminCount = approvedMembers.filter((m) => m.isAdmin).length;
  const topTech = [...technicians].sort((a, b) => b.machinesDone - a.machinesDone).slice(0, 5);
  const topTesters = [...testers].sort((a, b) => b.testsRun - a.testsRun).slice(0, 5);

  const courseGroups = approvedMembers.reduce<Record<string, number>>((acc, m) => {
    acc[m.course] = (acc[m.course] || 0) + 1;
    return acc;
  }, {});
  const courseData = Object.entries(courseGroups)
    .map(([course, count]) => ({ course, count }))
    .sort((a, b) => a.course.localeCompare(b.course));
  const maxCount = Math.max(...courseData.map((d) => d.count), 1);
  const BAR_COLORS = ["#f97316", "#fb923c", "#fdba74", "#fed7aa", "#ffedd5", "#fff7ed"];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: "Tổng thành viên", value: approvedMembers.length, icon: Users, color: "bg-orange-50 text-orange-500" },
          { label: "Technicians", value: technicians.length, icon: Cpu, color: "bg-blue-50 text-blue-500" },
          { label: "Testers", value: testers.length, icon: FlaskConical, color: "bg-purple-50 text-purple-500" },
          { label: "Đang hoạt động", value: activeCount, icon: TrendingUp, color: "bg-green-50 text-green-500" },
          { label: "Quản trị viên", value: adminCount, icon: Shield, color: "bg-amber-50 text-amber-500" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}><Icon size={20} /></div>
            <div>
              <p className="text-2xl text-gray-900" style={{ fontWeight: 700 }}>{value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Bar chart */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center"><Users size={14} className="text-orange-500" /></div>
            <p className="text-gray-700 text-sm" style={{ fontWeight: 600 }}>Thành viên theo khoá</p>
          </div>
          <div className="flex items-end gap-2 h-[160px] px-1">
            {courseData.map(({ course, count }, i) => (
              <div key={course} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] rounded-lg px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {course}: {count} người
                </div>
                <span className="text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontWeight: 600 }}>{count}</span>
                <div className="w-full rounded-t-lg" style={{ height: `${(count / maxCount) * 100}%`, backgroundColor: BAR_COLORS[i % BAR_COLORS.length], minHeight: 4 }} />
              </div>
            ))}
          </div>
          <div className="flex gap-2 px-1 mt-1.5">
            {courseData.map(({ course }) => (
              <div key={course} className="flex-1 text-center text-[10px] text-gray-400">{course}</div>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-1.5 border-t border-gray-50 pt-3">
            {courseData.map(({ course, count }, i) => (
              <div key={course} className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: BAR_COLORS[i % BAR_COLORS.length] }} />
                  {course}
                </div>
                <span className="text-gray-700" style={{ fontWeight: 600 }}>{count} người</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Technicians */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center"><Trophy size={14} className="text-blue-500" /></div>
            <p className="text-gray-700 text-sm" style={{ fontWeight: 600 }}>BXH Technician (máy)</p>
          </div>
          <div className="flex flex-col gap-3">
            {topTech.map((m, i) => {
              const initials = m.name.split(" ").slice(-2).map((w) => w[0]).join("").toUpperCase();
              const gradient = POSITION_COLORS[m.position] ?? "from-orange-400 to-orange-500";
              return (
                <div key={m.id} className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${i === 0 ? "bg-yellow-400 text-white" : i === 1 ? "bg-gray-300 text-white" : i === 2 ? "bg-amber-600/80 text-white" : "bg-gray-100 text-gray-500"}`}>{i + 1}</span>
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
                    <span className="text-white text-xs font-bold">{initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 text-xs truncate" style={{ fontWeight: 600 }}>{m.name}</p>
                    <p className="text-gray-400 text-[10px]">{m.course} · {m.class}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Cpu size={11} className="text-blue-400" />
                    <span className="text-blue-600 text-xs font-bold">{m.machinesDone}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Testers */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center"><Star size={14} className="text-purple-500" /></div>
            <p className="text-gray-700 text-sm" style={{ fontWeight: 600 }}>BXH Tester (lần test)</p>
          </div>
          <div className="flex flex-col gap-3">
            {topTesters.map((m, i) => {
              const initials = m.name.split(" ").slice(-2).map((w) => w[0]).join("").toUpperCase();
              const gradient = POSITION_COLORS[m.position] ?? "from-orange-400 to-orange-500";
              return (
                <div key={m.id} className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${i === 0 ? "bg-yellow-400 text-white" : i === 1 ? "bg-gray-300 text-white" : i === 2 ? "bg-amber-600/80 text-white" : "bg-gray-100 text-gray-500"}`}>{i + 1}</span>
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
                    <span className="text-white text-xs font-bold">{initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 text-xs truncate" style={{ fontWeight: 600 }}>{m.name}</p>
                    <p className="text-gray-400 text-[10px]">{m.course} · {m.class}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <FlaskConical size={11} className="text-purple-400" />
                    <span className="text-purple-600 text-xs font-bold">{m.testsRun}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Member List Tab ──────────────────────────────────────────────────────────
function MemberListTab({ type, courses, members, onUpdateMember, onDeleteMember }: {
  type: "technician" | "tester";
  courses: string[];
  members: Member[];
  onUpdateMember: (updated: Member) => void;
  onDeleteMember: (id: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterCourse, setFilterCourse] = useState("All");
  const [showCreate, setShowCreate] = useState(false);
  const [editMember, setEditMember] = useState<Member | null>(null);
  const { page, pageSize, handlePageChange, handlePageSizeChange, paginate } = usePagination(10);

  // Only show approved members
  const all = members.filter((m) => m.type === type && m.approvalStatus === "approved");
  const filterCourses = ["All", ...courses];

  const filtered = useMemo(() => {
    return all.filter((m) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.username.toLowerCase().includes(q) ||
        m.class.toLowerCase().includes(q);
      const matchCourse = filterCourse === "All" || m.course === filterCourse;
      return matchSearch && matchCourse;
    });
  }, [search, filterCourse, all]);

  const paged = paginate(filtered);

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Tìm kiếm ${type === "technician" ? "technician" : "tester"}...`}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-white transition-all"
          />
        </div>
        <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-1.5">
          <Filter size={13} className="text-gray-400" />
          <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)} className="text-sm text-gray-600 outline-none bg-transparent cursor-pointer">
            {filterCourses.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <span className="text-sm text-gray-500 ml-1">
          <span className="font-semibold text-gray-700">{filtered.length}</span> {type === "technician" ? "Technicians" : "Testers"}
        </span>
        <div className="ml-auto flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
          <button onClick={() => setViewMode("grid")} className={`p-2 transition-colors ${viewMode === "grid" ? "bg-orange-500 text-white" : "text-gray-400 hover:text-gray-600"}`}><LayoutGrid size={15} /></button>
          <button onClick={() => setViewMode("list")} className={`p-2 transition-colors ${viewMode === "list" ? "bg-orange-500 text-white" : "text-gray-400 hover:text-gray-600"}`}><List size={15} /></button>
        </div>
        <button onClick={() => setShowCreate(true)} className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm" style={{ fontWeight: 600 }}>
          + Create
        </button>
      </div>

      {/* Grid / List */}
      {viewMode === "grid" ? (
        filtered.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {paged.map((m) => <MemberCard key={m.id} member={m} onEdit={setEditMember} onDelete={onDeleteMember} />)}
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4">
              <Pagination
                total={filtered.length}
                page={page}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Search size={40} className="mb-3 opacity-30" />
            <p className="text-sm">Không tìm thấy thành viên nào</p>
          </div>
        )
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Thành viên", "Vị trí", "Khoá", "Lớp", "Giới tính", "SĐT", "Trạng thái", "Thao tác"].map(h => (
                  <th key={h} className="px-4 py-3 text-center text-xs text-gray-400 uppercase tracking-wide first:text-left" style={{ fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((m) => <MemberRow key={m.id} member={m} onEdit={setEditMember} onDelete={onDeleteMember} />)}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex items-center justify-center py-16 text-gray-400 text-sm">Không tìm thấy thành viên nào</div>
          )}
          <div className="px-4 border-t border-gray-100">
            <Pagination
              total={filtered.length}
              page={page}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </div>
      )}

      <CreateMemberModal isOpen={showCreate} onClose={() => setShowCreate(false)} techType={type} courses={courses} />
      <EditMemberModal
        member={editMember}
        onClose={() => setEditMember(null)}
        onSave={(updated) => { onUpdateMember(updated); setEditMember(null); }}
        courses={courses}
      />
    </div>
  );
}

// ─── Manage Courses Modal ─────────────────────────────────────────────────────
function ManageCoursesModal({ isOpen, onClose, courses, onAdd, onDelete }: {
  isOpen: boolean; onClose: () => void; courses: string[];
  onAdd: (c: string) => void; onDelete: (c: string) => void;
}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    const val = input.trim().toUpperCase();
    if (!val) { setError("Vui lòng nhập tên khoá."); return; }
    if (courses.includes(val)) { setError(`Khoá "${val}" đã tồn tại.`); return; }
    onAdd(val); setInput(""); setError("");
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[400px]" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center"><GraduationCap size={16} className="text-orange-500" /></div>
            <div>
              <h2 className="text-gray-900 text-sm" style={{ fontWeight: 700 }}>Quản lý Khoá</h2>
              <p className="text-gray-400 text-xs">{courses.length} khoá hiện có</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"><X size={14} className="text-gray-500" /></button>
        </div>
        <div className="px-6 py-4 max-h-64 overflow-y-auto flex flex-col gap-2">
          {courses.length === 0 && <p className="text-center text-gray-400 text-sm py-4">Chưa có khoá nào</p>}
          {courses.map((c) => (
            <div key={c} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5 group">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center"><GraduationCap size={12} className="text-orange-500" /></div>
                <span className="text-gray-700 text-sm" style={{ fontWeight: 600 }}>{c}</span>
              </div>
              <button onClick={() => onDelete(c)} className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 size={12} className="text-red-400" />
              </button>
            </div>
          ))}
        </div>
        <div className="px-6 pb-6 border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-500 mb-2" style={{ fontWeight: 600 }}>Thêm khoá mới</p>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => { setInput(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleAdd()}
              placeholder="VD: K20, K21..."
              className={`flex-1 px-3.5 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-white text-gray-700 placeholder-gray-400 ${error ? "border-red-400" : "border-gray-200"}`}
            />
            <button onClick={handleAdd} className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm transition-colors flex items-center gap-1.5 shrink-0 shadow-sm" style={{ fontWeight: 600 }}>
              <Plus size={14} />Thêm
            </button>
          </div>
          {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
        </div>
      </div>
    </div>
  );
}

// ─── Create Member Modal ──────────────────────────────────────────────────────
function CreateMemberModal({ isOpen, onClose, techType, courses }: {
  isOpen: boolean; onClose: () => void; techType: "technician" | "tester"; courses: string[];
}) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [hometown, setHometown] = useState("");
  const [position, setPosition] = useState("Member");
  const [course, setCourse] = useState("");
  const [classVal, setClassVal] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const techPosition = techType === "technician" ? "Technician" : "Tester";
  const reset = () => {
    setAvatar(null); setLastName(""); setFirstName(""); setUsername("");
    setEmail(""); setPassword(""); setShowPassword(false); setPhone("");
    setBirthday(""); setGender(""); setHometown(""); setPosition("Member");
    setCourse(""); setClassVal(""); setErrors({});
  };
  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!lastName.trim()) errs.lastName = "Bắt buộc";
    if (!firstName.trim()) errs.firstName = "Bắt buộc";
    if (!username.trim()) errs.username = "Bắt buộc";
    if (!email.trim()) errs.email = "Bắt buộc";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Email không hợp lệ";
    if (!password.trim()) errs.password = "Bắt buộc";
    else if (password.length < 6) errs.password = "Tối thiểu 6 ký tự";
    if (!phone.trim()) errs.phone = "Bắt buộc";
    if (!gender) errs.gender = "Bắt buộc";
    if (!course) errs.course = "Bắt buộc";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    handleClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={handleClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[500px] max-h-[92vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
        <div className="p-8 pb-7">
          <button onClick={handleClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"><X size={15} className="text-gray-500" /></button>
          <div className="text-center mb-6">
            <h2 className="text-gray-900" style={{ fontSize: "1.35rem", fontWeight: 700 }}>Đăng ký thành viên</h2>
            <p className="text-gray-400 text-sm mt-1">Điền đầy đủ thông tin để trở thành thành viên CLB IT Supporter</p>
          </div>
          <div className="flex justify-center mb-7">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-2 border-orange-400 flex items-center justify-center bg-gray-50 overflow-hidden">
                {avatar ? <img src={avatar} alt="avatar" className="w-full h-full object-cover" /> : <UserCircle size={38} className="text-gray-300" />}
              </div>
              <label className="absolute bottom-0 right-0 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-orange-600 transition-colors">
                <Camera size={13} className="text-white" />
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) setAvatar(URL.createObjectURL(f)); }} />
              </label>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Last Name" required error={errors.lastName}>
                <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Nguyễn Văn" className={inputCls(errors.lastName)} />
              </FormField>
              <FormField label="First Name" required error={errors.firstName}>
                <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="An" className={inputCls(errors.firstName)} />
              </FormField>
            </div>
            <FormField label="Username" required error={errors.username}>
              <input value={username} onChange={e => setUsername(e.target.value)} placeholder="nguyenanit, an.it, ..." className={inputCls(errors.username)} />
            </FormField>
            <FormField label="Email" required error={errors.email}>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }}
                  placeholder="example@email.com"
                  className={`${inputCls(errors.email)} pl-9`}
                />
              </div>
            </FormField>
            <FormField label="Password" required error={errors.password}>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: "" })); }}
                  placeholder="Tối thiểu 6 ký tự"
                  className={inputCls(errors.password)}
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Phone Number" required error={errors.phone}>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="0123456789" className={inputCls(errors.phone)} />
              </FormField>
              <FormField label="Birthday">
                <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} className={inputCls()} />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Gender" required error={errors.gender}>
                <div className="relative">
                  <select value={gender} onChange={e => setGender(e.target.value)} className={selectCls(!!gender, errors.gender)}>
                    <option value="" disabled>Select</option>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </FormField>
              <FormField label="Hometown">
                <div className="relative">
                  <select value={hometown} onChange={e => setHometown(e.target.value)} className={selectCls(!!hometown)}>
                    <option value="">Select Items</option>
                    {PROVINCES.map(p => <option key={p}>{p}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Position" required>
                <div className="relative">
                  <select value={position} onChange={e => setPosition(e.target.value)} className={selectCls(true)}>
                    <option>Member</option><option>Collaborators</option><option>Commissioner</option>
                    <option>Vice President</option><option>President</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </FormField>
              <FormField label="Tech Position" required>
                <div className="w-full px-3.5 py-2.5 rounded-xl border border-gray-100 text-sm bg-gray-50 flex items-center justify-between cursor-not-allowed select-none">
                  <span className="text-gray-600">{techPosition}</span>
                  <Lock size={13} className="text-gray-400 shrink-0" />
                </div>
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Course" required error={errors.course}>
                <div className="relative">
                  <select value={course} onChange={e => setCourse(e.target.value)} className={selectCls(!!course, errors.course)}>
                    <option value="">Select Items</option>
                    {courses.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </FormField>
              <FormField label="Class">
                <input value={classVal} onChange={e => setClassVal(e.target.value)} placeholder="CNTT01" className={inputCls()} />
              </FormField>
            </div>
            <button type="submit" className="w-full mt-1 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm transition-colors shadow-md" style={{ fontWeight: 600 }}>
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Member Modal ────────────────────────────────────────────────────────
function EditMemberModal({ member, onClose, onSave, courses }: {
  member: Member | null;
  onClose: () => void;
  onSave: (updated: Member) => void;
  courses: string[];
}) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [hometown, setHometown] = useState("");
  const [position, setPosition] = useState("Member");
  const [techType, setTechType] = useState<"technician" | "tester">("technician");
  const [course, setCourse] = useState("");
  const [classVal, setClassVal] = useState("");
  const [status, setStatus] = useState("active");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);
  const prevIdRef = useRef<number | null>(null);

  // Sync form fields when member changes
  if (member && member.id !== prevIdRef.current) {
    prevIdRef.current = member.id;
    const { lastName: l, firstName: f } = splitName(member.name);
    setLastName(l); setFirstName(f);
    setUsername(member.username); setPhone(member.phone);
    setBirthday(dobToInput(member.dob)); setGender(member.gender);
    setHometown(member.hometown); setPosition(member.position);
    setTechType(member.type); setCourse(member.course);
    setClassVal(member.class); setStatus(member.status);
    setEmail(""); setNewPassword(""); setShowPassword(false);
    setAvatar(null); setErrors({});
  }

  if (!member) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!lastName.trim()) errs.lastName = "Bắt buộc";
    if (!firstName.trim()) errs.firstName = "Bắt buộc";
    if (!username.trim()) errs.username = "Bắt buộc";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Email không hợp lệ";
    if (!phone.trim()) errs.phone = "Bắt buộc";
    if (!gender) errs.gender = "Bắt buộc";
    if (!course) errs.course = "Bắt buộc";
    if (newPassword && newPassword.length < 6) errs.newPassword = "Tối thiểu 6 ký tự";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSave({
      ...member,
      name: `${lastName.trim()} ${firstName.trim()}`,
      username: username.trim(),
      phone: phone.trim(),
      dob: inputToDob(birthday),
      gender, hometown, position,
      type: techType,
      course, class: classVal.trim(), status,
    });
  };

  const gradient = POSITION_COLORS[position] ?? "from-orange-400 to-orange-500";
  const initials = `${lastName} ${firstName}`.trim().split(" ").slice(-2).map(w => w[0]).join("").toUpperCase() || "?";
  const techChanged = techType !== member.type;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[500px] max-h-[92vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
        <div className="p-8 pb-7">
          {/* Close */}
          <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <X size={15} className="text-gray-500" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-gray-900" style={{ fontSize: "1.35rem", fontWeight: 700 }}>Chỉnh sửa thành viên</h2>
            <p className="text-gray-400 text-sm mt-1">Cập nhật thông tin thành viên</p>
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-7">
            <div className="relative">
              <div className={`w-20 h-20 rounded-full border-2 border-orange-400 flex items-center justify-center overflow-hidden ${!avatar ? `bg-gradient-to-br ${gradient}` : ""}`}>
                {avatar
                  ? <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                  : <span className="text-white text-2xl" style={{ fontWeight: 700 }}>{initials}</span>
                }
              </div>
              {/* Status dot */}
              <span className={`absolute top-0 right-0 w-4 h-4 rounded-full border-2 border-white ${status === "active" ? "bg-green-400" : "bg-gray-300"}`} />
              <label className="absolute bottom-0 right-0 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-orange-600 transition-colors">
                <Camera size={13} className="text-white" />
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) setAvatar(URL.createObjectURL(f)); }} />
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Last + First */}
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Last Name" required error={errors.lastName}>
                <input value={lastName} onChange={e => setLastName(e.target.value)} className={inputCls(errors.lastName)} />
              </FormField>
              <FormField label="First Name" required error={errors.firstName}>
                <input value={firstName} onChange={e => setFirstName(e.target.value)} className={inputCls(errors.firstName)} />
              </FormField>
            </div>

            {/* Username */}
            <FormField label="Username" required error={errors.username}>
              <input value={username} onChange={e => setUsername(e.target.value)} className={inputCls(errors.username)} />
            </FormField>

            {/* Email */}
            <FormField label="Email" error={errors.email}>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }}
                  placeholder="Nhập email mới (tuỳ chọn)"
                  className={`${inputCls(errors.email)} pl-9`}
                />
              </div>
            </FormField>

            {/* New Password */}
            <FormField label="Mật khẩu mới" error={errors.newPassword}>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={e => { setNewPassword(e.target.value); setErrors(p => ({ ...p, newPassword: "" })); }}
                  placeholder="Để trống nếu không đổi"
                  className={inputCls(errors.newPassword)}
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </FormField>

            {/* Phone + Birthday */}
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Phone Number" required error={errors.phone}>
                <input value={phone} onChange={e => setPhone(e.target.value)} className={inputCls(errors.phone)} />
              </FormField>
              <FormField label="Birthday">
                <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} className={inputCls()} />
              </FormField>
            </div>

            {/* Gender + Hometown */}
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Gender" required error={errors.gender}>
                <div className="relative">
                  <select value={gender} onChange={e => setGender(e.target.value)} className={selectCls(!!gender, errors.gender)}>
                    <option value="" disabled>Select</option>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </FormField>
              <FormField label="Hometown">
                <div className="relative">
                  <select value={hometown} onChange={e => setHometown(e.target.value)} className={selectCls(!!hometown)}>
                    <option value="">Select Items</option>
                    {PROVINCES.map(p => <option key={p}>{p}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </FormField>
            </div>

            {/* Position + Tech Position */}
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Position" required>
                <div className="relative">
                  <select value={position} onChange={e => setPosition(e.target.value)} className={selectCls(true)}>
                    <option>Member</option><option>Collaborators</option><option>Commissioner</option>
                    <option>Vice President</option><option>President</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </FormField>
              <FormField label="Tech Position" required>
                <div className="relative">
                  <select value={techType} onChange={e => setTechType(e.target.value as "technician" | "tester")} className={selectCls(true)}>
                    <option value="technician">Technician</option>
                    <option value="tester">Tester</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                {techChanged && (
                  <p className="text-orange-500 text-[10px] mt-1">
                    ⚠ Sẽ chuyển sang tab {techType === "technician" ? "Technicians" : "Testers"}
                  </p>
                )}
              </FormField>
            </div>

            {/* Course + Class */}
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Course" required error={errors.course}>
                <div className="relative">
                  <select value={course} onChange={e => setCourse(e.target.value)} className={selectCls(!!course, errors.course)}>
                    <option value="">Select Items</option>
                    {courses.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </FormField>
              <FormField label="Class">
                <input value={classVal} onChange={e => setClassVal(e.target.value)} placeholder="CNTT01" className={inputCls()} />
              </FormField>
            </div>

            {/* Status toggle */}
            <FormField label="Trạng thái">
              <div className="flex gap-3">
                {(["active", "inactive"] as const).map(s => (
                  <button
                    key={s} type="button"
                    onClick={() => setStatus(s)}
                    className={`flex-1 py-2.5 rounded-xl border text-sm transition-all flex items-center justify-center gap-2 ${
                      status === s
                        ? s === "active" ? "bg-green-50 border-green-400 text-green-600" : "bg-gray-100 border-gray-300 text-gray-600"
                        : "border-gray-200 text-gray-400 hover:border-gray-300"
                    }`}
                    style={{ fontWeight: status === s ? 600 : 400 }}
                  >
                    <span className={`w-2 h-2 rounded-full ${s === "active" ? "bg-green-400" : "bg-gray-300"}`} />
                    {s === "active" ? "Hoạt động" : "Không HĐ"}
                  </button>
                ))}
              </div>
            </FormField>

            {/* Save */}
            <button type="submit" className="w-full mt-1 py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white rounded-full text-sm transition-colors shadow-md" style={{ fontWeight: 600 }}>
              Lưu thay đổi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Confirm Modal ──────────────────────────────────────────────────────
function AdminConfirmModal({ member, action, onConfirm, onCancel }: {
  member: Member;
  action: "grant" | "revoke";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const isGrant = action === "grant";
  const initials = member.name.split(" ").slice(-2).map((w) => w[0]).join("").toUpperCase();
  const gradient = POSITION_COLORS[member.position] ?? "from-orange-400 to-orange-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onCancel}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[400px] overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header color bar */}
        <div className={`h-1.5 w-full ${isGrant ? "bg-orange-500" : "bg-red-500"}`} />
        <div className="p-7">
          {/* Icon */}
          <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center ${isGrant ? "bg-orange-50" : "bg-red-50"}`}>
            {isGrant
              ? <ShieldCheck size={28} className="text-orange-500" />
              : <ShieldOff size={28} className="text-red-500" />
            }
          </div>
          <h3 className="text-gray-900 text-center mb-1" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
            {isGrant ? "Cấp quyền Admin" : "Thu hồi quyền Admin"}
          </h3>
          <p className="text-gray-400 text-sm text-center mb-5">
            {isGrant
              ? "Thành viên này sẽ có quyền quản trị hệ thống."
              : "Thành viên này sẽ mất quyền quản trị hệ thống."}
          </p>

          {/* Member info */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4 mb-6">
            <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
              <span className="text-white text-sm font-bold">{initials}</span>
            </div>
            <div>
              <p className="text-gray-800 text-sm font-semibold">{member.name}</p>
              <p className="text-gray-400 text-xs">@{member.username} · {member.position} · {member.course}</p>
            </div>
          </div>

          {/* Permissions info */}
          <div className={`rounded-xl p-3 mb-5 ${isGrant ? "bg-orange-50 border border-orange-100" : "bg-red-50 border border-red-100"}`}>
            <p className={`text-xs font-semibold mb-2 ${isGrant ? "text-orange-700" : "text-red-700"}`}>
              {isGrant ? "Quyền sẽ được cấp:" : "Quyền sẽ bị thu hồi:"}
            </p>
            <div className="flex flex-col gap-1">
              {["Phê duyệt thành viên mới", "Cấp/Thu hồi quyền Admin", "Quản lý dữ liệu hệ thống"].map((perm) => (
                <div key={perm} className="flex items-center gap-2">
                  {isGrant
                    ? <CheckCircle size={12} className="text-orange-500 shrink-0" />
                    : <XCircle size={12} className="text-red-400 shrink-0" />
                  }
                  <span className={`text-xs ${isGrant ? "text-orange-700" : "text-red-600"}`}>{perm}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors"
              style={{ fontWeight: 600 }}
            >
              Huỷ
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 py-2.5 rounded-xl text-white text-sm transition-colors shadow-sm flex items-center justify-center gap-2 ${isGrant ? "bg-orange-500 hover:bg-orange-600" : "bg-red-500 hover:bg-red-600"}`}
              style={{ fontWeight: 600 }}
            >
              {isGrant ? <ShieldCheck size={15} /> : <ShieldOff size={15} />}
              {isGrant ? "Cấp quyền" : "Thu hồi"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Tab ────────────────────────────────────────────────────────────────
function AdminTab({ members, onToggleAdmin }: {
  members: Member[];
  onToggleAdmin: (id: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "admin" | "member">("all");
  const [confirm, setConfirm] = useState<{ member: Member; action: "grant" | "revoke" } | null>(null);
  const { page, pageSize, handlePageChange, handlePageSizeChange, paginate } = usePagination(10);

  const approved = members.filter((m) => m.approvalStatus === "approved");
  const admins = approved.filter((m) => m.isAdmin);
  const regularMembers = approved.filter((m) => !m.isAdmin);

  const filtered = useMemo(() => {
    const base = filterType === "admin" ? admins : filterType === "member" ? regularMembers : approved;
    const q = search.toLowerCase();
    return !q ? base : base.filter((m) =>
      m.name.toLowerCase().includes(q) ||
      m.username.toLowerCase().includes(q) ||
      m.position.toLowerCase().includes(q)
    );
  }, [search, filterType, approved, admins, regularMembers]);

  const pagedAdmin = paginate(filtered);

  const handleAction = (member: Member) => {
    setConfirm({ member, action: member.isAdmin ? "revoke" : "grant" });
  };

  const handleConfirm = () => {
    if (confirm) {
      onToggleAdmin(confirm.member.id);
      setConfirm(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
            <ShieldCheck size={20} className="text-orange-500" />
          </div>
          <div>
            <p className="text-gray-900 text-2xl" style={{ fontWeight: 700 }}>{admins.length}</p>
            <p className="text-gray-400 text-xs mt-0.5">Quản trị viên</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
            <Users size={20} className="text-blue-500" />
          </div>
          <div>
            <p className="text-gray-900 text-2xl" style={{ fontWeight: 700 }}>{regularMembers.length}</p>
            <p className="text-gray-400 text-xs mt-0.5">Thành viên thường</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center">
            <Users size={20} className="text-gray-400" />
          </div>
          <div>
            <p className="text-gray-900 text-2xl" style={{ fontWeight: 700 }}>{approved.length}</p>
            <p className="text-gray-400 text-xs mt-0.5">Tổng thành viên</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên, username, vị trí..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-white transition-all"
          />
        </div>
        {/* Filter tabs */}
        <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
          {([
            { key: "all", label: "Tất cả", count: approved.length },
            { key: "admin", label: "Admin", count: admins.length },
            { key: "member", label: "Thường", count: regularMembers.length },
          ] as const).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilterType(f.key)}
              className={`px-3.5 py-2 text-xs flex items-center gap-1.5 transition-colors ${filterType === f.key ? "bg-orange-500 text-white" : "text-gray-500 hover:bg-gray-50"}`}
              style={{ fontWeight: filterType === f.key ? 600 : 400 }}
            >
              {f.label}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${filterType === f.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-400 ml-1">
          <span className="font-semibold text-gray-700">{filtered.length}</span> thành viên
        </span>
      </div>

      {/* Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
        <Shield size={15} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-amber-700 text-xs">
          <span className="font-semibold">Lưu ý: </span>
          Chỉ cấp quyền Admin cho những thành viên đáng tin cậy. Admin có thể phê duyệt thành viên mới và quản lý toàn bộ hệ thống.
        </p>
      </div>

      {/* Member list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 flex flex-col items-center justify-center text-gray-400">
          <Shield size={48} className="mb-3 opacity-20" />
          <p className="text-sm">Không tìm thấy thành viên nào</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Thành viên", "Vị trí", "Loại", "Khoá", "Trạng thái", "Quyền Admin", "Thao tác"].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs text-gray-400 uppercase tracking-wide text-left first:text-left" style={{ fontWeight: 600 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedAdmin.map((member) => {
                const gradient = POSITION_COLORS[member.position] ?? "from-orange-400 to-orange-500";
                const initials = member.name.split(" ").slice(-2).map((w) => w[0]).join("").toUpperCase();
                return (
                  <tr key={member.id} className={`border-b border-gray-50 hover:bg-orange-50/20 transition-colors ${member.isAdmin ? "bg-orange-50/30" : ""}`}>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 relative`}>
                          <span className="text-white text-xs font-bold">{initials}</span>
                          {member.isAdmin && (
                            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                              <Shield size={8} className="text-white" />
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="text-gray-800 text-sm font-semibold">{member.name}</p>
                          <p className="text-gray-400 text-[10px]">@{member.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">{member.position}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[11px] text-white rounded-full px-2 py-0.5 ${member.type === "technician" ? "bg-blue-500" : "bg-purple-500"}`}>
                        {member.type === "technician" ? "Tech" : "Test"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-600">{member.course}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${member.status === "active" ? "bg-green-400" : "bg-gray-300"}`} />
                        <span className="text-xs text-gray-500">{member.status === "active" ? "Hoạt động" : "Không HĐ"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      {member.isAdmin ? (
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck size={13} className="text-orange-500" />
                          <span className="text-orange-600 text-xs font-semibold">Admin</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <Shield size={13} className="text-gray-300" />
                          <span className="text-gray-400 text-xs">Thường</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => handleAction(member)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                          member.isAdmin
                            ? "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                            : "bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200"
                        }`}
                        style={{ fontWeight: 600 }}
                      >
                        {member.isAdmin
                          ? <><ShieldOff size={12} />Thu hồi</>
                          : <><ShieldCheck size={12} />Cấp quyền</>
                        }
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="px-4 border-t border-gray-100">
            <Pagination
              total={filtered.length}
              page={page}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </div>
      )}

      {/* Confirm modal */}
      {confirm && (
        <AdminConfirmModal
          member={confirm.member}
          action={confirm.action}
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
type Tab = "overview" | "technicians" | "testers" | "approval" | "admin";

export default function Personnel() {
  const [tab, setTab] = useState<Tab>("overview");
  const [members, setMembers] = useState<Member[]>(MEMBERS_INITIAL);
  const [courses, setCourses] = useState<string[]>(COURSES_DEFAULT);
  const [showManageCourses, setShowManageCourses] = useState(false);
  
  // Pending members state (for demo purposes - these would normally come from backend)
  const [pendingMembers, setPendingMembers] = useState<Member[]>([
    {
      id: 101,
      name: "Trần Minh Hiếu",
      username: "hieuminhit",
      email: "hieuminh@example.com",
      dob: "15/05/2003",
      phone: "0987654321",
      gender: "Male",
      course: "K17",
      class: "CNTT02",
      hometown: "Hà Nội",
      position: "Member",
      type: "technician",
      machinesDone: 0,
      testsRun: 0,
      status: "inactive",
      approvalStatus: "pending",
      registeredAt: "07/04/2026 14:30",
    },
    {
      id: 102,
      name: "Nguyễn Thảo Linh",
      username: "linhnt.tester",
      email: "linhnt@example.com",
      dob: "22/08/2003",
      phone: "0976543210",
      gender: "Female",
      course: "K17",
      class: "KTPM01",
      hometown: "Bắc Ninh",
      position: "Member",
      type: "tester",
      machinesDone: 0,
      testsRun: 0,
      status: "inactive",
      approvalStatus: "pending",
      registeredAt: "07/04/2026 09:15",
    },
    {
      id: 103,
      name: "Lê Quang Duy",
      username: "duylq.tech",
      email: "duylq@example.com",
      dob: "10/12/2003",
      phone: "0965432109",
      gender: "Male",
      course: "K17",
      class: "KHMT01",
      hometown: "Nam Định",
      position: "Member",
      type: "technician",
      machinesDone: 0,
      testsRun: 0,
      status: "inactive",
      approvalStatus: "pending",
      registeredAt: "06/04/2026 16:45",
    },
  ]);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Tổng quan", icon: <TrendingUp size={15} /> },
    { id: "approval", label: "Phê duyệt", icon: <UserCheck size={15} /> },
    { id: "admin", label: "Quản lý Admin", icon: <Shield size={15} /> },
    { id: "technicians", label: "Technicians", icon: <Cpu size={15} /> },
    { id: "testers", label: "Testers", icon: <FlaskConical size={15} /> },
  ];

  const handleUpdateMember = (updated: Member) => {
    setMembers(prev => prev.map(m => m.id === updated.id ? updated : m));
    // Auto-switch tab if tech position changed
    if (updated.type === "technician" && tab !== "technicians") setTab("technicians");
    else if (updated.type === "tester" && tab !== "testers") setTab("testers");
  };

  const handleDeleteMember = (id: number) => {
    const member = members.find((m) => m.id === id);
    if (member) {
      if (window.confirm(`Bạn có chắc chắn muốn xóa thành viên "${member.name}"?\nHành động này không thể hoàn tác.`)) {
        setMembers((prev) => prev.filter((m) => m.id !== id));
        toast.success(`Đã xóa thành viên ${member.name}`, {
          description: `${member.name} (@${member.username}) đã bị xóa khỏi hệ thống.`,
        });
      }
    }
  };

  const handleToggleAdmin = (id: number) => {
    const member = members.find((m) => m.id === id);
    if (member) {
      const wasAdmin = member.isAdmin;
      setMembers((prev) => prev.map((m) => m.id === id ? { ...m, isAdmin: !m.isAdmin } : m));
      if (wasAdmin) {
        toast.error(`Đã thu hồi quyền Admin của ${member.name}`, {
          description: `${member.name} (@${member.username}) không còn là Admin.`,
        });
      } else {
        toast.success(`Đã cấp quyền Admin cho ${member.name}`, {
          description: `${member.name} (@${member.username}) đã trở thành Admin hệ thống.`,
        });
      }
    }
  };

  const handleApprove = (id: number) => {
    const member = pendingMembers.find((m) => m.id === id);
    if (member) {
      const approved = { ...member, approvalStatus: "approved" as const, status: "active" };
      setMembers((prev) => [...prev, approved]);
      setPendingMembers((prev) => prev.filter((m) => m.id !== id));
      toast.success(`Đã chấp nhận thành viên ${member.name}`, {
        description: `${member.name} (@${member.username}) đã được phê duyệt và có thể truy cập hệ thống.`,
      });
    }
  };

  const handleReject = (id: number) => {
    const member = pendingMembers.find((m) => m.id === id);
    if (member) {
      setPendingMembers((prev) => prev.filter((m) => m.id !== id));
      toast.error(`Đã từ chối thành viên ${member.name}`, {
        description: `${member.name} (@${member.username}) không được phê duyệt.`,
      });
    }
  };

  const handleApproveAll = () => {
    if (pendingMembers.length === 0) return;

    const approvedMembers = pendingMembers.map(m => ({
      ...m,
      approvalStatus: "approved" as const,
      status: "active"
    }));

    setMembers((prev) => [...prev, ...approvedMembers]);
    setPendingMembers([]);

    toast.success(`Đã chấp nhận tất cả ${approvedMembers.length} thành viên`, {
      description: `${approvedMembers.length} thành viên đã được phê duyệt và có thể truy cập hệ thống.`,
    });
  };

  const handleRejectAll = () => {
    if (pendingMembers.length === 0) return;

    const count = pendingMembers.length;
    setPendingMembers([]);

    toast.error(`Đã từ chối tất cả ${count} thành viên`, {
      description: `${count} thành viên không được phê duyệt.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-gray-900" style={{ fontSize: "1.2rem", fontWeight: 700 }}>Nhân sự</h1>
          <p className="text-gray-400 text-xs mt-0.5">Quản lý thành viên kỹ thuật của CLB</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowManageCourses(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-600 text-sm transition-colors"
            style={{ fontWeight: 600 }}
          >
            <Settings2 size={14} />Quản lý Khoá
          </button>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-all ${tab === t.id ? "bg-orange-500 text-white shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-white"}`}
                style={{ fontWeight: tab === t.id ? 600 : 400 }}
              >
                {t.icon}{t.label}
                {t.id === "approval" && pendingMembers.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {pendingMembers.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        {tab === "overview" && <OverviewTab members={members} />}
        {tab === "approval" && <ApprovalTab members={pendingMembers} onApprove={handleApprove} onReject={handleReject} onApproveAll={handleApproveAll} onRejectAll={handleRejectAll} />}
        {tab === "admin" && <AdminTab members={members} onToggleAdmin={handleToggleAdmin} />}
        {tab === "technicians" && <MemberListTab type="technician" courses={courses} members={members} onUpdateMember={handleUpdateMember} onDeleteMember={handleDeleteMember} />}
        {tab === "testers" && <MemberListTab type="tester" courses={courses} members={members} onUpdateMember={handleUpdateMember} onDeleteMember={handleDeleteMember} />}
      </main>

      <ManageCoursesModal
        isOpen={showManageCourses}
        onClose={() => setShowManageCourses(false)}
        courses={courses}
        onAdd={(c) => setCourses(prev => [...prev, c].sort())}
        onDelete={(c) => setCourses(prev => prev.filter(x => x !== c))}
      />
    </div>
  );
}
