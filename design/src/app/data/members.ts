// Shared member data management

export type MemberType = "technician" | "tester";
export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface Member {
  id: string | number;
  name: string;
  username: string;
  dob: string;
  phone: string;
  gender: string;
  course: string;
  class: string;
  hometown: string;
  position: string;
  type: MemberType;
  machinesDone: number;
  testsRun: number;
  status: string;
  approvalStatus: ApprovalStatus;
  email?: string;
  uid?: string; // for User-Member linking (added for registration.ts)
  registeredAt?: string;
  isAdmin?: boolean;
}

// ─── Date helpers ──────────────────────────────────────────────────────────────
export const dobToInput = (dob: string): string => {
  const p = dob.split("/");
  if (p.length !== 3) return "";
  return `${p[2]}-${p[1].padStart(2, "0")}-${p[0].padStart(2, "0")}`;
};

export const inputToDob = (val: string): string => {
  if (!val) return "";
  const [y, m, d] = val.split("-");
  return `${d}/${m}/${y}`;
};

export const splitName = (fullName: string): { lastName: string; firstName: string } => {
  const words = fullName.trim().split(" ");
  if (words.length === 1) return { lastName: "", firstName: words[0] };
  return { lastName: words.slice(0, -1).join(" "), firstName: words[words.length - 1] };
};

// ─── Constants ─────────────────────────────────────────────────────────────────
export const PROVINCES = [
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

export const COURSES_DEFAULT = ["K14", "K15", "K16", "K17", "K18", "K19"];

// ─── Avatar gradient by position ───────────────────────────────────────────────
export const POSITION_COLORS: Record<string, string> = {
  President: "from-red-400 to-red-600",
  "Vice President": "from-purple-400 to-purple-600",
  Commissioner: "from-blue-400 to-blue-600",
  Member: "from-orange-400 to-orange-500",
  Collaborators: "from-green-400 to-green-500",
};

// ─── CRUD ──────────────────────────────────────────────────────────────────────
export function getMembers(): Member[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem("its_members");
  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem("its_members");
    return [];
  }
}

export function saveMembers(members: Member[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("its_members", JSON.stringify(members));
}

export function addMember(member: Omit<Member, "id">): Member {
  const members = getMembers();
  const numericIds = members
    .map((m) => typeof m.id === "number" ? m.id : Number.parseInt(String(m.id), 10))
    .filter((id) => Number.isFinite(id));
  const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
  const newMember: Member = { ...member, id: maxId + 1 };
  const updated = [...members, newMember];
  saveMembers(updated);
  return newMember;
}

export function updateMember(id: string | number, updates: Partial<Member>): Member[] {
  const members = getMembers();
  const updated = members.map(m => String(m.id) === String(id) ? { ...m, ...updates } : m);
  saveMembers(updated);
  return updated;
}

export function deleteMember(id: string | number): void {
  const members = getMembers();
  saveMembers(members.filter(m => String(m.id) !== String(id)));
}
