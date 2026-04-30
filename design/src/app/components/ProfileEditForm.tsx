import { useState, useRef, useEffect, useMemo } from "react";
import { Camera, X, ChevronDown, CheckCircle2 } from "lucide-react";
import { updateCurrentUserProfile, type User } from "../data/users";
import { getFirestoreMemberByEmail, updateFirestoreMember } from "../data/firestoreMembers";
import { getMembers, saveMembers, type Member } from "../data/members";
import { useVietnamGeo } from "../data/vietnamGeo";

// ─── Constants ────────────────────────────────────────────────────────────
const COURSES = ["K13", "K14", "K15", "K16", "K17", "K18", "K19", "K20"];
const POSITIONS = ["Member", "Collaborators", "President", "Vice President", "Commissioner"];
const TECH_POSITIONS = ["Technician", "Tester"];
const GENDERS = ["Male", "Female", "Other"];

// ─── Custom Select ────────────────────────────────────────────────────────────
function FormSelect({
  value,
  onChange,
  options,
  placeholder = "Select Items",
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleBlur = () => setTimeout(() => setOpen(false), 120);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); setOpen((p) => !p); }}
        onBlur={handleBlur}
        className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2.5 bg-white text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
      >
        <span className={`${value ? "text-gray-800" : "text-gray-400"} truncate`}>
          {value || placeholder}
        </span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-auto max-h-52">
          {options.map((opt) => (
            <li
              key={opt}
              onMouseDown={() => { onChange(opt); setOpen(false); }}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors hover:bg-orange-50 hover:text-orange-700 truncate ${opt === value ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-700"}`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-gray-500">
        {label}{required && <span className="text-red-400">(*)</span>}
      </label>
      {children}
    </div>
  );
}

// ─── Props ──────────────────────────────────────────────────────────────────
interface MemberProfileSnapshot {
  id?: string | number;
  phone?: string;
  dob?: string;
  gender?: string;
  hometown?: string;
  position?: string;
  type?: "technician" | "tester";
  course?: string;
  class?: string;
  avatar?: string;
}

function dobToInput(value: string): string {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const parts = value.split("/");
  if (parts.length !== 3) return value;
  const [day, month, year] = parts;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

interface ProfileEditFormProps {
  user: User;
  onSave?: (updated: User) => void;
}

// ─── Component ─────────────────────────────────────────────────────────────────
export function ProfileEditForm({ user, onSave }: ProfileEditFormProps) {
  const nameParts = user.name.trim().split(" ");
  const lastName = nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : "";
  const firstName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : user.name;

  const [avatar, setAvatar] = useState(user.avatar || "");
  const [ln, setLastName] = useState(lastName);
  const [fn, setFirstName] = useState(firstName);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || "");
  const [dob, setDob] = useState(dobToInput(user.dob || ""));
  const [gender, setGender] = useState(user.gender || "");
  const [position, setPosition] = useState(user.position || "");
  const [techType, setTechType] = useState(user.techType || "");
  const [course, setCourse] = useState(user.course || "");
  const [classRoom, setClassRoom] = useState(user.classRoom || "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");
  const [syncWarning, setSyncWarning] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const hydratedEmailRef = useRef("");

  const { provinces, wards, loading: geoLoading, selectProvince, allData } = useVietnamGeo();
  const [provinceCode, setProvinceCode] = useState<number>(0);
  const [ward, setWard] = useState("");

  const provinceNames = useMemo(() => provinces.map(p => p.name), [provinces]);
  const wardNames = useMemo(() => wards.map(w => w.name), [wards]);

  // Parse hometown into province/ward on mount
  useEffect(() => {
    if (!user.hometown) return;
    const parts = user.hometown.split(", ");
    if (parts.length >= 2) {
      const wardName = parts[0].trim();
      const provinceName = parts.slice(1).join(", ").trim();
      const prov = provinces.find(p => p.name === provinceName);
      if (prov) {
        setProvinceCode(prov.code);
        selectProvince(prov.code);
        setWard(wardName);
      }
    }
  }, [user.hometown, provinces, selectProvince]);

  useEffect(() => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || hydratedEmailRef.current === normalizedEmail) {
      return;
    }

    let isMounted = true;

    const hydrateProfileFromMember = async () => {
      try {
        const member = await getFirestoreMemberByEmail(normalizedEmail) as MemberProfileSnapshot | null;
        if (!member || !isMounted) return;

        setPhone((prev) => prev || member.phone || "");
        setDob((prev) => prev || dobToInput(member.dob || ""));
        setGender((prev) => prev || member.gender || "");
        setPosition((prev) => prev || member.position || "");
        setTechType((prev) => {
          if (prev) return prev;
          if (member.type === "technician") return "Technician";
          if (member.type === "tester") return "Tester";
          return "";
        });
        setCourse((prev) => prev || member.course || "");
        setClassRoom((prev) => prev || member.class || "");
        setAvatar((prev) => prev || member.avatar || "");
      } catch {
        // Keep current local values when Firestore profile lookup fails.
      } finally {
        if (isMounted) {
          hydratedEmailRef.current = normalizedEmail;
        }
      }
    };

    void hydrateProfileFromMember();

    return () => {
      isMounted = false;
    };
  }, [email]);

  const inputClass = (field: string) =>
    `w-full border rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:border-transparent transition-all bg-white ${
      errors[field]
        ? "border-red-400 focus:ring-red-300"
        : "border-gray-300 focus:ring-orange-400"
    }`;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!ln.trim()) errs.lastName = "Bắt buộc";
    if (!fn.trim()) errs.firstName = "Bắt buộc";
    if (!username.trim()) errs.username = "Bắt buộc";
    if (!email.trim()) errs.email = "Bắt buộc";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Email không hợp lệ";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setSyncWarning("");
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const computedHometown = (() => {
      if (!provinceCode || !ward) return "";
      const province = allData?.find(p => p.code === provinceCode)?.name ?? "";
      return `${ward}, ${province}`;
    })();

    setIsSaving(true);
    const normalizedEmail = email.trim().toLowerCase();
    const previousUsername = user.username.trim().toLowerCase();
    const fullName = `${ln.trim()} ${fn.trim()}`.trim();
    const normalizedPhone = phone.trim();
    const selectedType: Member["type"] | null = techType === "Tester" ? "tester" : techType === "Technician" ? "technician" : null;

    const updated = updateCurrentUserProfile({
      name: fullName,
      username: username.trim(),
      email: normalizedEmail,
      phone: normalizedPhone,
      avatar,
      dob,
      gender,
      hometown: computedHometown,
      position,
      techType,
      course,
      classRoom,
    });

    if (updated) {
      const currentUsername = username.trim().toLowerCase();
      const cachedMembers = getMembers();

      const duplicateByUsername = cachedMembers.find((member) => {
        const memberUsername = member.username.trim().toLowerCase();
        const sameUid = Boolean(user.uid && member.uid && member.uid === user.uid);
        const sameEmail = member.email?.trim().toLowerCase() === normalizedEmail;
        const samePreviousUsername = memberUsername === previousUsername;
        if (sameUid || sameEmail || samePreviousUsername) return false;
        return memberUsername === currentUsername;
      });

      if (duplicateByUsername) {
        setErrors((prev) => ({ ...prev, username: "Username đã tồn tại" }));
        setIsSaving(false);
        return;
      }

      let hasLocalMatch = false;
      const nextMembers = cachedMembers.map((member) => {
        const memberEmail = member.email?.trim().toLowerCase();
        const memberUsername = member.username.trim().toLowerCase();
        const sameUid = Boolean(user.uid && member.uid && member.uid === user.uid);
        const sameEmail = Boolean(memberEmail && memberEmail === normalizedEmail);
        const samePreviousUsername = memberUsername === previousUsername;
        if (!sameUid && !sameEmail && !samePreviousUsername) return member;

        hasLocalMatch = true;
        return {
          ...member,
          name: fullName,
          username: username.trim(),
          phone: normalizedPhone,
          dob,
          gender,
          hometown: computedHometown,
          position,
          course,
          class: classRoom,
          avatar,
          type: selectedType ?? member.type,
          email: normalizedEmail,
        };
      });

      const fallbackMember: Member = {
        id: user.uid || normalizedEmail || previousUsername,
        name: fullName,
        username: username.trim(),
        dob,
        phone: normalizedPhone,
        gender,
        course,
        class: classRoom,
        hometown: computedHometown,
        position,
        type: selectedType ?? "technician",
        machinesDone: 0,
        testsRun: 0,
        status: user.status === "inactive" ? "inactive" : "active",
        approvalStatus: "approved",
        email: normalizedEmail,
        uid: user.uid,
        registeredAt: user.registeredAt,
        isAdmin: user.role === "admin",
        avatar,
      };

      let finalMembers = nextMembers;
      let hasRemoteSyncError = false;

      try {
        const firestoreMember = await getFirestoreMemberByEmail(normalizedEmail);
        if (firestoreMember?.id) {
          await updateFirestoreMember(String(firestoreMember.id), {
            name: fullName,
            username: username.trim(),
            phone: normalizedPhone,
            dob,
            gender,
            hometown: computedHometown,
            position,
            course,
            class: classRoom,
            avatar,
            email: normalizedEmail,
          });

          if (!hasLocalMatch) {
            finalMembers = [
              ...nextMembers.filter((member) => {
                const sameUid = Boolean(user.uid && member.uid && member.uid === user.uid);
                const sameEmail = member.email?.trim().toLowerCase() === normalizedEmail;
                const sameUsername = member.username.trim().toLowerCase() === previousUsername;
                return !sameUid && !sameEmail && !sameUsername;
              }),
              {
                ...firestoreMember,
                id: firestoreMember.id,
                name: fullName,
                username: username.trim(),
                phone: normalizedPhone,
                dob,
                gender,
                hometown: computedHometown,
                position,
                course,
                class: classRoom,
                avatar,
                email: normalizedEmail,
              },
            ];
          }
        } else if (!hasLocalMatch) {
          finalMembers = [...nextMembers, fallbackMember];
        }
      } catch (error) {
        hasRemoteSyncError = true;
        console.error("Update profile in Firestore failed:", error);
        if (!hasLocalMatch) {
          finalMembers = [...nextMembers, fallbackMember];
        }
      }

      saveMembers(finalMembers);
      if (hasRemoteSyncError) {
        setSyncWarning("Đã lưu hồ sơ cục bộ. Đồng bộ cloud tạm thời thất bại, vui lòng thử lại sau.");
      }
      setSuccess("Cập nhật hồ sơ thành công!");
      onSave?.(updated);
    }

    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Avatar */}
      <div className="flex justify-center mb-1">
        <div className="relative">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-20 h-20 rounded-full border-2 border-orange-400 overflow-hidden bg-gray-50 flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            {avatar ? (
              <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-gray-300">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
            )}
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center shadow border-2 border-white hover:bg-orange-500 transition-colors"
          >
            <Camera size={11} className="text-white" />
          </button>
          {avatar && (
            <button
              type="button"
              onClick={() => setAvatar("")}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center shadow border-2 border-white hover:bg-red-500 transition-colors"
            >
              <X size={10} className="text-white" />
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>
      </div>

      {/* Last name / First name */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Họ" required>
          <input value={ln} onChange={e => { setLastName(e.target.value); setErrors(p => ({ ...p, lastName: "" })); }} className={inputClass("lastName")} />
          {errors.lastName && <p className="text-red-400 text-[10px]">{errors.lastName}</p>}
        </Field>
        <Field label="Tên" required>
          <input value={fn} onChange={e => { setFirstName(e.target.value); setErrors(p => ({ ...p, firstName: "" })); }} className={inputClass("firstName")} />
          {errors.firstName && <p className="text-red-400 text-[10px]">{errors.firstName}</p>}
        </Field>
      </div>

      {/* Username */}
      <Field label="Username" required>
        <input value={username} onChange={e => { setUsername(e.target.value); setErrors(p => ({ ...p, username: "" })); }} className={inputClass("username")} />
        {errors.username && <p className="text-red-400 text-[10px]">{errors.username}</p>}
      </Field>

      {/* Email */}
      <Field label="Email" required>
        <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }} className={inputClass("email") + " bg-gray-50"} disabled />
        <p className="text-[10px] text-gray-500">Email không thể thay đổi</p>
        {errors.email && <p className="text-red-400 text-[10px]">{errors.email}</p>}
      </Field>

      {/* Phone / Birthday */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Số điện thoại">
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="0123456789" type="tel" className={inputClass("phone")} />
        </Field>
        <Field label="Ngày sinh">
          <input value={dob} onChange={e => setDob(e.target.value)} type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-orange-400 transition-all bg-white" />
        </Field>
      </div>

      {/* Gender / Province / Ward */}
      <div className="grid grid-cols-3 gap-3">
        <Field label="Giới tính">
          <FormSelect value={gender} onChange={setGender} options={GENDERS} placeholder="Select" />
        </Field>
        <Field label="Tỉnh / TP">
          {geoLoading ? (
            <div className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 text-sm text-gray-400 whitespace-nowrap">Loading...</div>
          ) : (
            <FormSelect
              value={allData?.find(p => p.code === provinceCode)?.name ?? ""}
              onChange={(name) => {
                const prov = provinces.find(p => p.name === name);
                if (prov) {
                  setProvinceCode(prov.code);
                  selectProvince(prov.code);
                }
                setWard("");
              }}
              options={provinceNames}
              placeholder="Chọn tỉnh"
            />
          )}
        </Field>
        <Field label="Xã / Phường">
          {provinceCode === 0 ? (
            <div className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 text-sm text-gray-400 whitespace-nowrap">Chọn tỉnh trước</div>
          ) : (
            <FormSelect
              value={ward}
              onChange={setWard}
              options={wardNames}
              placeholder="Chọn xã/phường"
            />
          )}
        </Field>
      </div>

      {/* Position / Tech Type */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Chức vụ">
          <FormSelect value={position} onChange={setPosition} options={POSITIONS} placeholder="Member" />
        </Field>
        <Field label="Vị trí Tech">
          <FormSelect value={techType} onChange={setTechType} options={TECH_POSITIONS} placeholder="Technician" />
        </Field>
      </div>

      {/* Course / Class */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Khóa">
          <FormSelect value={course} onChange={setCourse} options={COURSES} placeholder="Select" />
        </Field>
        <Field label="Lớp">
          <input value={classRoom} onChange={e => setClassRoom(e.target.value)} placeholder="CNTT01" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400 transition-all bg-white" />
        </Field>
      </div>

      {syncWarning && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-xl p-3 text-sm">
          {syncWarning}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-3 text-sm flex items-start gap-2">
          <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Submit */}
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={isSaving}
          className="px-12 py-2.5 rounded-full bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 active:scale-95 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSaving ? "Đang lưu..." : "Lưu hồ sơ"}
        </button>
      </div>
    </form>
  );
}
