import { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Camera, ChevronDown, X, ArrowLeft, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import backgroundImage from "../../assets/images/background.jpg";
import logo from "../../assets/images/logo.png";
import { createUserWithEmailAndPassword, deleteUser, signOut } from "firebase/auth";
import { registerUserAndPendingMember } from "../data/registration";
import { staffAuth } from "../utils/firebase";

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
        onFocus={() => setOpen(true)}
        onBlur={handleBlur}
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2.5 bg-white text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
      >
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-auto max-h-52">
          {options.map((opt) => (
            <li
              key={opt}
              onMouseDown={() => { onChange(opt); setOpen(false); }}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors hover:bg-orange-50 hover:text-orange-700 ${opt === value ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-700"}`}
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
        {label}{required && <span className="text-gray-500">(*)</span>}
      </label>
      {children}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const PROVINCES = [
  "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ",
  "An Giang", "Bà Rịa – Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu",
  "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",
  "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông",
  "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang",
  "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình",
  "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu",
  "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định",
  "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên",
  "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị",
  "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên",
  "Thanh Hóa", "Thừa Thiên – Huế", "Tiền Giang", "Trà Vinh",
  "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái",
];

const COURSES = ["K13", "K14", "K15", "K16", "K17", "K18", "K19", "K20"];
const POSITIONS = ["Member", "Collaborators", "President", "Vice President", "Commissioner"];
const TECH_POSITIONS = ["Technician", "Tester"] as const;
const GENDERS = ["Male", "Female", "Other"];

export default function SignUp() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const fromGoogle = params.get("from") === "google";
  const googleEmail = (params.get("email") || "").trim().toLowerCase();
  const googleUid = (params.get("uid") || "").trim();
  const isGoogleCompletion = fromGoogle && Boolean(googleEmail) && Boolean(googleUid);

  const [avatar, setAvatar] = useState<string>("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(googleEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [hometown, setHometown] = useState("");
  const [position, setPosition] = useState("");
  const [techPosition, setTechPosition] = useState("");
  const [course, setCourse] = useState("");
  const [classRoom, setClassRoom] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!lastName.trim()) errs.lastName = "Bắt buộc";
    if (!firstName.trim()) errs.firstName = "Bắt buộc";
    if (!username.trim()) errs.username = "Bắt buộc";
    if (!email.trim()) errs.email = "Bắt buộc";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Email không hợp lệ";

    if (!isGoogleCompletion) {
      if (!password.trim()) errs.password = "Bắt buộc";
      else if (password.length < 6) errs.password = "Tối thiểu 6 ký tự";
    }

    if (!phone.trim()) errs.phone = "Bắt buộc";
    if (!gender) errs.gender = "Bắt buộc";
    if (!position) errs.position = "Bắt buộc";
    if (!techPosition) errs.techPosition = "Bắt buộc";
    if (!course) errs.course = "Bắt buộc";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    let firebaseUid = "";

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const fullName = `${lastName.trim()} ${firstName.trim()}`.trim();

      if (isGoogleCompletion) {
        const currentUser = staffAuth.currentUser;
        const normalizedCurrentEmail = (currentUser?.email || "").trim().toLowerCase();
        if (!currentUser || currentUser.uid !== googleUid || normalizedCurrentEmail !== normalizedEmail) {
          setSubmitError("Phiên Google không hợp lệ. Vui lòng đăng nhập lại bằng Google.");
          return;
        }
        firebaseUid = googleUid;
      } else {
        const credential = await createUserWithEmailAndPassword(staffAuth, normalizedEmail, password);
        firebaseUid = credential.user.uid;
      }

      await registerUserAndPendingMember({
        name: fullName,
        username: username.trim(),
        email: normalizedEmail,
        uid: firebaseUid,
        dob: birthday,
        phone: phone.trim(),
        gender,
        course,
        class: classRoom.trim(),
        hometown,
        position,
        type: techPosition.toLowerCase() as "technician" | "tester",
        isAdmin: false,
      });

      if (!isGoogleCompletion) {
        await signOut(staffAuth);
      }

      setSubmitSuccess("Đăng ký thành công. Tài khoản đang chờ admin phê duyệt.");
      setTimeout(() => navigate("/"), 1200);
    } catch (error: unknown) {
      if (!isGoogleCompletion && staffAuth.currentUser && firebaseUid && firebaseUid === staffAuth.currentUser.uid) {
        await deleteUser(staffAuth.currentUser).catch(() => undefined);
      }

      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Đăng ký thất bại. Vui lòng thử lại.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full border rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:border-transparent transition-all bg-white ${
      errors[field]
        ? "border-red-400 focus:ring-red-300"
        : "border-gray-300 focus:ring-orange-400 focus:border-orange-400"
    }`;

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/55" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="IT Supporter"
            className="w-10 h-10 rounded-xl shadow-lg object-cover"
          />
          <span className="text-white font-bold text-lg tracking-wide drop-shadow">IT SUPPORTER</span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft size={15} />
          Quay lại Sign In
        </button>
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-lg">
          <div className="bg-white/97 backdrop-blur-sm rounded-3xl shadow-2xl px-8 py-8">

            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-gray-900 mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                {fromGoogle ? "Hoàn tất đăng ký" : "Đăng ký thành viên"}
              </h1>
              <p className="text-gray-400 text-xs">
                {fromGoogle
                  ? "Vui lòng điền thông tin để hoàn tất tài khoản CLB"
                  : "Điền đầy đủ thông tin để trở thành thành viên CLB IT Supporter"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

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
                  {/* Edit badge */}
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
                <Field label="Last Name" required>
                  <input
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value); setErrors((p) => ({ ...p, lastName: "" })); }}
                    placeholder="Nguyễn Văn"
                    className={inputClass("lastName")}
                  />
                  {errors.lastName && <p className="text-red-400 text-[10px]">{errors.lastName}</p>}
                </Field>
                <Field label="First Name" required>
                  <input
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value); setErrors((p) => ({ ...p, firstName: "" })); }}
                    placeholder="An"
                    className={inputClass("firstName")}
                  />
                  {errors.firstName && <p className="text-red-400 text-[10px]">{errors.firstName}</p>}
                </Field>
              </div>

              {/* Username */}
              <Field label="Username" required>
                <input
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setErrors((p) => ({ ...p, username: "" })); }}
                  placeholder="nguyenanit, an.it, ..."
                  className={inputClass("username")}
                />
                {errors.username && <p className="text-red-400 text-[10px]">{errors.username}</p>}
              </Field>

              {/* Email */}
              <Field label="Email" required>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                  placeholder="example@email.com"
                  disabled={isGoogleCompletion}
                  className={inputClass("email")}
                />
                {isGoogleCompletion && (
                  <p className="text-[10px] text-gray-500">Email lấy từ Google và không thể chỉnh sửa</p>
                )}
                {errors.email && <p className="text-red-400 text-[10px]">{errors.email}</p>}
              </Field>

              {/* Password */}
              {!isGoogleCompletion && (
                <Field label="Password" required>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
                      placeholder="Tối thiểu 6 ký tự"
                      className={inputClass("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-[10px]">{errors.password}</p>}
                </Field>
              )}

              {/* Phone / Birthday */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Phone Number" required>
                  <input
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }}
                    placeholder="0123456789"
                    type="tel"
                    className={inputClass("phone")}
                  />
                  {errors.phone && <p className="text-red-400 text-[10px]">{errors.phone}</p>}
                </Field>
                <Field label="Birthday">
                  <input
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    placeholder="dd/MM/yyyy"
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all bg-white"
                  />
                </Field>
              </div>

              {/* Gender / Hometown */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Gender" required>
                  <FormSelect
                    value={gender}
                    onChange={(v) => { setGender(v); setErrors((p) => ({ ...p, gender: "" })); }}
                    options={GENDERS}
                    placeholder="Select"
                  />
                  {errors.gender && <p className="text-red-400 text-[10px]">{errors.gender}</p>}
                </Field>
                <Field label="Hometown">
                  <FormSelect
                    value={hometown}
                    onChange={setHometown}
                    options={PROVINCES}
                    placeholder="Select Items"
                  />
                </Field>
              </div>

              {/* Position / Tech Position */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Position" required>
                  <FormSelect
                    value={position}
                    onChange={(v) => { setPosition(v); setErrors((p) => ({ ...p, position: "" })); }}
                    options={POSITIONS}
                    placeholder="Member"
                  />
                  {errors.position && <p className="text-red-400 text-[10px]">{errors.position}</p>}
                </Field>
                <Field label="Tech Position" required>
                  <FormSelect
                    value={techPosition}
                    onChange={(v) => { setTechPosition(v); setErrors((p) => ({ ...p, techPosition: "" })); }}
                    options={TECH_POSITIONS}
                    placeholder="Technician"
                  />
                  {errors.techPosition && <p className="text-red-400 text-[10px]">{errors.techPosition}</p>}
                </Field>
              </div>

              {/* Course / Class */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Course" required>
                  <FormSelect
                    value={course}
                    onChange={(v) => { setCourse(v); setErrors((p) => ({ ...p, course: "" })); }}
                    options={COURSES}
                    placeholder="Select Items"
                  />
                  {errors.course && <p className="text-red-400 text-[10px]">{errors.course}</p>}
                </Field>
                <Field label="Class">
                  <input
                    value={classRoom}
                    onChange={(e) => setClassRoom(e.target.value)}
                    placeholder="CNTT01"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all bg-white"
                  />
                </Field>
              </div>

              {/* Submit feedback */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-sm flex items-start gap-2">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {submitSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-3 text-sm flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                  <span>{submitSuccess}</span>
                </div>
              )}

              {/* Submit */}
              <div className="flex justify-center mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-16 py-2.5 rounded-full bg-green-500 text-white font-semibold text-sm hover:bg-green-600 active:scale-95 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Đang gửi..." : fromGoogle ? "Hoàn tất đăng ký" : "Đăng ký"}
                </button>
              </div>

              {/* Sign in link */}
              {!isGoogleCompletion && (
                <p className="text-center text-xs text-gray-400 mt-1">
                  Đã có tài khoản?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-4">
        <p className="text-white/60 text-xs">
          Copyright © 2023{" "}
          <a href="#" className="text-blue-300 hover:text-blue-200 font-medium transition-colors">
            HALINHIT.COM
          </a>
        </p>
      </div>
    </div>
  );
}