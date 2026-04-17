// Shared member data management

export type MemberType = "technician" | "tester";
export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface Member {
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

// ─── Mock seed data ────────────────────────────────────────────────────────────
const MEMBERS_SEED: Member[] = [
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

// ─── CRUD ──────────────────────────────────────────────────────────────────────
export function getMembers(): Member[] {
  if (typeof window === "undefined") return MEMBERS_SEED;

  const stored = localStorage.getItem("its_members");
  if (!stored) {
    // Seed on first load
    localStorage.setItem("its_members", JSON.stringify(MEMBERS_SEED));
    return [...MEMBERS_SEED];
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : MEMBERS_SEED;
  } catch {
    localStorage.removeItem("its_members");
    localStorage.setItem("its_members", JSON.stringify(MEMBERS_SEED));
    return [...MEMBERS_SEED];
  }
}

export function saveMembers(members: Member[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("its_members", JSON.stringify(members));
}

export function addMember(member: Omit<Member, "id">): Member {
  const members = getMembers();
  const maxId = members.length > 0 ? Math.max(...members.map(m => m.id)) : 0;
  const newMember: Member = { ...member, id: maxId + 1 };
  const updated = [...members, newMember];
  saveMembers(updated);
  return newMember;
}

export function updateMember(id: number, updates: Partial<Member>): Member[] {
  const members = getMembers();
  const updated = members.map(m => m.id === id ? { ...m, ...updates } : m);
  saveMembers(updated);
  return updated;
}

export function deleteMember(id: number): void {
  const members = getMembers();
  saveMembers(members.filter(m => m.id !== id));
}
