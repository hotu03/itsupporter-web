import { useState, useRef } from "react";
import { Camera, X, Mail, Eye, EyeOff, ChevronDown } from "lucide-react";
import type { Member } from "../../data/members";
import { FormField, inputCls, selectCls } from "./PersonnelForm";
import { PROVINCES, dobToInput, inputToDob, splitName, POSITION_COLORS } from "../../data/members";

interface EditMemberModalProps {
  member: Member | null;
  onClose: () => void;
  onSave: (updated: Member) => void;
  courses: string[];
}

export function EditMemberModal({ member, onClose, onSave, courses }: EditMemberModalProps) {
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
      gender,
      hometown,
      position,
      type: techType,
      course,
      class: classVal.trim(),
      status,
      ...(email ? { email } : {}),
    });
  };

  const gradient = POSITION_COLORS[position] ?? "from-orange-400 to-orange-500";
  const initials = `${lastName} ${firstName}`.trim().split(" ").slice(-2).map(w => w[0]).join("").toUpperCase() || "?";
  const techChanged = techType !== member.type;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[500px] max-h-[92vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
        <div className="p-8 pb-7">
          <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <X size={15} className="text-gray-500" />
          </button>
          <div className="text-center mb-6">
            <h2 className="text-gray-900" style={{ fontSize: "1.35rem", fontWeight: 700 }}>Chỉnh sửa thành viên</h2>
            <p className="text-gray-400 text-sm mt-1">Cập nhật thông tin thành viên</p>
          </div>
          <div className="flex justify-center mb-7">
            <div className="relative">
              <div className={`w-20 h-20 rounded-full border-2 border-orange-400 flex items-center justify-center overflow-hidden ${!avatar ? `bg-gradient-to-br ${gradient}` : ""}`}>
                {avatar
                  ? <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                  : <span className="text-white text-2xl" style={{ fontWeight: 700 }}>{initials}</span>
                }
              </div>
              <span className={`absolute top-0 right-0 w-4 h-4 rounded-full border-2 border-white ${status === "active" ? "bg-green-400" : "bg-gray-300"}`} />
              <label className="absolute bottom-0 right-0 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-orange-600 transition-colors">
                <Camera size={13} className="text-white" />
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) setAvatar(URL.createObjectURL(f)); }} />
              </label>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Last Name" required error={errors.lastName}>
                <input value={lastName} onChange={e => setLastName(e.target.value)} className={inputCls(errors.lastName)} />
              </FormField>
              <FormField label="First Name" required error={errors.firstName}>
                <input value={firstName} onChange={e => setFirstName(e.target.value)} className={inputCls(errors.firstName)} />
              </FormField>
            </div>
            <FormField label="Username" required error={errors.username}>
              <input value={username} onChange={e => setUsername(e.target.value)} className={inputCls(errors.username)} />
            </FormField>
            <FormField label="Email" error={errors.email}>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }} placeholder="Nhập email mới (tuỳ chọn)" className={`${inputCls(errors.email)} pl-9`} />
              </div>
            </FormField>
            <FormField label="Mật khẩu mới" error={errors.newPassword}>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={newPassword} onChange={e => { setNewPassword(e.target.value); setErrors(p => ({ ...p, newPassword: "" })); }} placeholder="Để trống nếu không đổi" className={inputCls(errors.newPassword)} />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Phone Number" required error={errors.phone}>
                <input value={phone} onChange={e => setPhone(e.target.value)} className={inputCls(errors.phone)} />
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
            <button type="submit" className="w-full mt-1 py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white rounded-full text-sm transition-colors shadow-md" style={{ fontWeight: 600 }}>
              Lưu thay đổi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
