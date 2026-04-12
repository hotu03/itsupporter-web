import { useState, useRef, useEffect } from "react";
import {
  Search,
  ChevronDown,
  LayoutGrid,
  List,
  X,
  QrCode,
  Clock,
  Plus,
  CheckSquare,
  Square,
  Smartphone,
  Monitor,
  CheckCircle2,
  RefreshCw,
  Star,
  DollarSign,
  CreditCard,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { SignatureCanvas, SignatureCanvasHandle } from "../components/SignatureCanvas";
import { getServices, getServicePrice, formatCurrency as formatCurr } from "../data/services";
import { validateDiscount, useDiscount } from "../data/discounts";
import { calculatePoints, addPointHistory, getPointsExplanation } from "../data/points";
import { getMachines, saveMachines, type Machine, type Status, STATUS_STYLES, ensureSequentialId } from "../data/machines";
import { MachineRow } from "../components/machines/MachineRow";
import { addInvoice } from "../data/invoices";
import { addOrUpdateCustomer } from "../data/customers";
import { addTransaction } from "../data/finance";

// ─── Member data ──────────────────────────────────────────────────────────────
const MEMBERS = [
  "Hà Gia Linh - K15",
  "Phạm Việt Anh - K15",
  "Nguyễn Mạnh Cường - K15",
  "Nguyễn Trọng Quân - K15",
  "Trần Đức Minh - K15",
  "Phan Anh Khoa - K15",
  "Nguyễn Phạm Nguyên Hoàn - K15",
  "Nguyễn Tuấn Đạt - K15",
  "Nguyễn Minh Hiếu - K16",
  "Nguyễn Công Sáng - K16",
  "Nguyễn Bá Mạnh - K16",
  "Phạm Ngọc Tú Anh - K16",
  "Nguyễn Ngọc Anh - K16",
  "Lê Thị Hồng Nhung - K16",
  "Trần Quang Huy - K16",
  "Đặng Thị Mai - K17",
  "Vũ Hoàng Nam - K17",
  "Bùi Thị Lan Anh - K17",
];

// ─── SearchableSelect ─────────────────────────────────────────────────────────
interface SearchableSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
  label?: string;
}

function SearchableSelect({ value, onChange, options, placeholder = "Select Items", label }: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (opt: string) => {
    onChange(opt);
    setOpen(false);
    setQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div className="flex flex-col gap-1" ref={ref}>
      {label && <label className="text-xs font-medium text-gray-600">{label}</label>}
      <div className="relative">
        {/* Trigger button */}
        <button
          type="button"
          onClick={() => { setOpen((p) => !p); setQuery(""); }}
          className={`w-full flex items-center justify-between border rounded-lg px-3 py-2 text-sm outline-none transition-all ${open
            ? "border-orange-400 ring-2 ring-orange-200 bg-white"
            : "border-gray-200 bg-white hover:border-gray-300"
            }`}
        >
          <span className={value ? "text-gray-800" : "text-gray-400"}>
            {value || placeholder}
          </span>
          <div className="flex items-center gap-1">
            {value && (
              <span
                onClick={handleClear}
                className="text-gray-300 hover:text-gray-500 transition-colors cursor-pointer p-0.5"
              >
                <X size={12} />
              </span>
            )}
            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            {/* Search input */}
            <div className="p-2 border-b border-gray-100">
              <div className="relative">
                <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search for an item..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-7 pr-3 py-1.5 text-xs border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                />
              </div>
            </div>
            {/* Options list */}
            <ul className="max-h-52 overflow-y-auto">
              {filtered.length === 0 ? (
                <li className="px-3 py-3 text-xs text-gray-400 text-center">Không tìm thấy</li>
              ) : (
                filtered.map((opt) => (
                  <li
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className={`px-3 py-2.5 text-sm cursor-pointer transition-colors hover:bg-orange-50 hover:text-orange-700 ${opt === value ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-700"
                      }`}
                  >
                    {opt}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Check items from PDF ──────────────────────────────────────────────────────
const CHECKLIST_ITEMS = [
  "Hình thức máy (Ngoại hình, ốc vít, bảo hành)",
  "Bàn phím",
  "Touchpad",
  "Màn hình",
  "Loa",
  "Wifi, Bluetooth",
  "Camera",
  "Cổng kết nối (USB)",
  "Quạt tản nhiệt",
  "Kiểm tra nguồn/pin",
];

const TECHNICIAN_CHECKLIST = [
  "Đối chiếu thông tin máy",
  "Hoàn thành yêu cầu của khách",
  "Vệ sinh máy",
];

// MachineCard imported from components/machines/MachineCard.tsx - reduces main file size (fixes edit-failed fragility per morphllm.com)

// ─── Sub-components ───────────────────────────────────────────────────────────
function MachineCard({ machine, index, onClick, onApprove }: { machine: Machine; index: number; onClick: () => void; onApprove?: (id: number) => void }) {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col gap-2 hover:shadow-md hover:border-orange-300 transition-all group relative"
    >
      <div onClick={onClick} className="cursor-pointer">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${STATUS_STYLES[machine.status]}`}>
            {machine.status}
          </span>
          <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xs font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Name & phone */}
        <div>
          <p className="text-gray-900 text-sm font-semibold leading-snug">
            {machine.customerName}, {machine.phone}
          </p>
          <p className="text-gray-400 text-[11px]">{machine.time}</p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs leading-snug line-clamp-2">{machine.description}</p>

        {/* Expired */}
        <p className="text-orange-500 text-xs font-semibold">
          Expired: {machine.expired}
        </p>

        {/* Category */}
        <div>
          <p className="text-gray-400 text-[10px] mb-1">Category</p>
          <span className="px-2 py-0.5 bg-orange-500 text-white rounded text-[10px] font-semibold">
            {machine.category}
          </span>
        </div>

        {/* Tester & Technician */}
        <div className="flex flex-col gap-0.5">
          <p className="text-gray-400 text-[10px]">
            Tester: <span className="text-gray-700">{machine.tester}</span>
          </p>
          <p className="text-gray-400 text-[10px]">
            Technician: <span className="text-gray-700">{machine.technician}</span>
          </p>
        </div>

        {/* Services & Payment */}
        {machine.additionalServices && machine.additionalServices.length > 0 && (
          <div className="border-t border-gray-100 pt-2 mt-1">
            <p className="text-gray-400 text-[10px] mb-1">Dịch vụ</p>
            <div className="flex flex-wrap gap-1">
              {machine.additionalServices.slice(0, 2).map((service, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[9px] font-medium"
                >
                  {service}
                </span>
              ))}
              {machine.additionalServices.length > 2 && (
                <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[9px]">
                  +{machine.additionalServices.length - 2}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Payment Info */}
        {machine.finalAmount !== undefined && machine.finalAmount > 0 && (
          <div className="flex items-center justify-between gap-2 bg-gray-50 rounded px-2 py-1.5">
            <div className="flex items-center gap-1">
              <DollarSign size={12} className="text-gray-500" />
              <span className="text-xs font-semibold text-gray-900">
                {formatCurr(machine.finalAmount)}
              </span>
            </div>
            {machine.paymentStatus && (
              <span
                className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${machine.paymentStatus === "paid"
                  ? "bg-green-100 text-green-700"
                  : machine.paymentStatus === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                  }`}
              >
                {machine.paymentStatus === "paid"
                  ? "Đã thanh toán"
                  : machine.paymentStatus === "pending"
                    ? "Chưa thanh toán"
                    : "Miễn phí"}
              </span>
            )}
          </div>
        )}

        {/* Points Earned */}
        {machine.pointsEarned && machine.pointsEarned > 0 && (
          <div className="flex items-center gap-1 text-yellow-600">
            <Star size={12} className="fill-yellow-500" />
            <span className="text-[10px] font-semibold">+{machine.pointsEarned} điểm</span>
          </div>
        )}

        {/* QR */}
        <div className="flex justify-end">
          <QrCode size={18} className="text-blue-400 cursor-pointer hover:text-blue-600" />
        </div>
      </div>

      {/* Approve button for online registrations */}
      {machine.registrationType === "online" && !machine.isApproved && onApprove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onApprove(machine.id);
          }}
          className="w-full mt-2 px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
        >
          <CheckCircle2 size={14} />
          Duyệt - Khách đã đưa máy đến
        </button>
      )}
    </div>
  );
}


// ─── Customer Signature Section ───────────────────────────────────────────────
const SIG_KEY_PREFIX = "its_sig_";

interface CustomerSignatureSectionProps {
  customerName: string;
  value: string;
  onChange: (sig: string) => void;
}

function CustomerSignatureSection({ customerName, value, onChange }: CustomerSignatureSectionProps) {
  const isMobileDevice = typeof window !== "undefined" && window.innerWidth < 768;
  const [mode, setMode] = useState<"direct" | "qr">(isMobileDevice ? "direct" : "qr");
  const sessionId = useRef(Math.random().toString(36).substr(2, 9));
  const sigCanvasRef = useRef<SignatureCanvasHandle>(null);

  const qrUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/sign?session=${sessionId.current}&name=${encodeURIComponent(customerName)}`
      : "";

  // Listen for signature from mobile via storage event (same browser, cross-tab)
  useEffect(() => {
    const key = SIG_KEY_PREFIX + sessionId.current;
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        onChange(e.newValue);
        localStorage.removeItem(key);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [onChange]);

  // Poll localStorage as fallback (1s interval)
  useEffect(() => {
    if (mode !== "qr") return;
    const key = SIG_KEY_PREFIX + sessionId.current;
    const interval = setInterval(() => {
      const stored = localStorage.getItem(key);
      if (stored) {
        onChange(stored);
        localStorage.removeItem(key);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [mode, onChange]);

  const handleReset = () => {
    onChange("");
    sigCanvasRef.current?.reset();
    // Fresh session ID so QR code refreshes
    sessionId.current = Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-gray-700">Chữ ký xác nhận của khách hàng</p>
          {value && (
            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-semibold flex items-center gap-1">
              <CheckCircle2 size={10} /> Đã ký
            </span>
          )}
        </div>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden text-[11px]">
          <button
            onClick={() => setMode("direct")}
            className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors ${mode === "direct" ? "bg-orange-500 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
          >
            <Smartphone size={11} /> Trực tiếp
          </button>
          <button
            onClick={() => setMode("qr")}
            className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors ${mode === "qr" ? "bg-orange-500 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
          >
            <Monitor size={11} /> Qua QR
          </button>
        </div>
      </div>

      {/* TH1 — Direct canvas */}
      {mode === "direct" && (
        <div className="flex flex-col gap-2">
          {value ? (
            <div className="flex flex-col gap-2">
              <div className="rounded-xl border-2 border-green-300 overflow-hidden bg-white">
                <img src={value} alt="Chữ ký" className="w-full h-36 object-contain" />
              </div>
              <button
                onClick={handleReset}
                className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs hover:border-red-300 hover:text-red-500 transition-colors"
              >
                <RefreshCw size={11} /> Ký lại
              </button>
            </div>
          ) : (
            <SignatureCanvas
              ref={sigCanvasRef}
              height={160}
              onEnd={(data) => { if (data) onChange(data); }}
              showResetButton
            />
          )}
          <p className="text-[11px] text-gray-400 italic">Khách hàng ký trực tiếp vào ô trên, sau đó tester nhấn Lưu.</p>
        </div>
      )}

      {/* TH2 — QR code */}
      {mode === "qr" && (
        <div className="flex flex-col gap-3">
          {!value ? (
            <>
              <div className="flex gap-4 items-start">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-3 shrink-0">
                  <QRCodeSVG value={qrUrl || "https://example.com"} size={128} level="M" />
                </div>
                <div className="flex flex-col gap-2 text-xs text-gray-600">
                  <p className="font-semibold text-gray-700">Hướng dẫn:</p>
                  <ol className="flex flex-col gap-1.5 text-gray-500">
                    {["Khách hàng dùng điện thoại quét mã QR", "Ký vào ô trên điện thoại và nhấn \"Xác nhận\"", "Chữ ký sẽ tự cập nhật tại đây"].map((txt, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 text-[10px] font-bold">{i + 1}</span>
                        {txt}
                      </li>
                    ))}
                  </ol>
                  <div className="flex items-center gap-1.5 text-orange-500 mt-1">
                    <Clock size={12} className="animate-pulse" />
                    <span className="text-[11px]">Đang chờ chữ ký…</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 italic break-all">
                Link: <a href={qrUrl} target="_blank" rel="noreferrer" className="text-orange-500 underline">{qrUrl}</a>
              </p>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-green-600 text-xs font-semibold">
                <CheckCircle2 size={14} /> Đã nhận chữ ký từ khách hàng!
              </div>
              <div className="rounded-xl border-2 border-green-300 overflow-hidden bg-white">
                <img src={value} alt="Chữ ký" className="w-full h-36 object-contain" />
              </div>
              <button
                onClick={handleReset}
                className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs hover:border-red-300 hover:text-red-500 transition-colors"
              >
                <RefreshCw size={11} /> Yêu cầu ký lại
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Create Form Drawer ───────────────────────────────────────────────────────
interface FormState {
  customerName: string;
  phone: string;
  machineCondition: string;
  warranty: "con" | "het";
  needs: string;
  password: string;
  charger: "co" | "khong";
  appointmentTime: string;
  dropOffTime: string;
  testerBefore: string;
  testerAfter: string;
  checklistBefore: boolean[];
  checklistAfter: boolean[];
  notesBefore: string[];
  notesAfter: string[];
  technician: string;
  techChecklist: boolean[];
  techNotes: string;
  adminConfirmNote: string;
  customerSignature: string;
  category: string;
  status: Status;
  // Finance fields
  additionalServices: string[];
  serviceAmount: string;
  discountCode: string;
  discountAmount: number;
  paymentStatus: "paid" | "pending" | "free";
}

const DEFAULT_FORM: FormState = {
  customerName: "", phone: "", machineCondition: "",
  warranty: "het", needs: "", password: "", charger: "khong",
  appointmentTime: "", dropOffTime: "", testerBefore: "", testerAfter: "",
  checklistBefore: Array(10).fill(false),
  checklistAfter: Array(10).fill(false),
  notesBefore: Array(10).fill(""),
  notesAfter: Array(10).fill(""),
  technician: "",
  techChecklist: Array(3).fill(false),
  techNotes: "",
  adminConfirmNote: "",
  customerSignature: "",
  category: "Hardware",
  status: "WAITING",
  additionalServices: [],
  serviceAmount: "",
  discountCode: "",
  discountAmount: 0,
  paymentStatus: "pending",
};

// ─── Helpers: Machine ↔ FormState ────────────────────────────────────────────
const STATUS_TO_STEP: Record<Status, number> = {
  WAITING: 2, RUNNING: 3, RETESTING: 4, COMPLETE: 5, RETURNED: 5, RETURNING: 4,
};

function machineToForm(m: Machine): FormState {
  return {
    customerName: m.customerName === "Khách hàng" ? "" : m.customerName,
    phone: m.phone === "—" ? "" : m.phone,
    machineCondition: m.machineCondition ?? "",
    warranty: m.warranty,
    needs: m.needs ?? (m.description === "—" ? "" : m.description),
    password: m.password,
    charger: m.charger ? "co" : "khong",
    appointmentTime: m.appointmentTime,
    dropOffTime: m.dropOffTime ?? "",
    testerBefore: m.testerBefore,
    testerAfter: m.testerAfter,
    checklistBefore: m.checklistBefore ?? Array(10).fill(false),
    checklistAfter: m.checklistAfter ?? Array(10).fill(false),
    notesBefore: m.notesBefore ?? Array(10).fill(""),
    notesAfter: m.notesAfter ?? Array(10).fill(""),
    technician: m.technician === "—" ? "" : m.technician,
    techChecklist: m.techChecklist ?? Array(3).fill(false),
    techNotes: m.techNotes ?? "",
    adminConfirmNote: m.adminConfirmNote ?? "",
    customerSignature: m.customerSignature ?? "",
    category: m.category,
    status: m.status,
    additionalServices: m.additionalServices ?? [],
    serviceAmount: m.serviceAmount?.toString() ?? "",
    discountCode: m.discountCode ?? "",
    discountAmount: m.discountAmount ?? 0,
    paymentStatus: m.paymentStatus ?? "pending",
  };
}

function formToMachine(form: FormState, existing?: Machine | null): Machine {
  // Calculate final amount
  const totalServiceAmount = form.additionalServices.reduce((sum, serviceName) => {
    return sum + getServicePrice(serviceName);
  }, 0);
  const finalAmount = totalServiceAmount - form.discountAmount;

  return {
    id: existing?.id ?? Date.now(),
    status: form.status,
    customerName: form.customerName || "Khách hàng",
    phone: form.phone || "—",
    time: existing?.time ?? new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    description: form.needs || form.machineCondition || "—",
    expired: form.appointmentTime || "—",
    category: form.category,
    tester: form.testerBefore || "—",
    technician: form.technician || "—",
    warranty: form.warranty,
    password: form.password,
    charger: form.charger === "co",
    appointmentTime: form.appointmentTime,
    dropOffTime: form.dropOffTime || undefined,
    registrationType: existing?.registrationType ?? "in-person", // Mặc định là đăng ký tại quầy
    isApproved: existing?.isApproved ?? true, // Đăng ký tại quầy được duyệt ngay
    testerBefore: form.testerBefore,
    testerAfter: form.testerAfter,
    machineCondition: form.machineCondition,
    needs: form.needs,
    checklistBefore: form.checklistBefore,
    checklistAfter: form.checklistAfter,
    notesBefore: form.notesBefore,
    notesAfter: form.notesAfter,
    techChecklist: form.techChecklist,
    techNotes: form.techNotes,
    adminConfirmNote: form.adminConfirmNote,
    customerSignature: form.customerSignature,
    additionalServices: form.additionalServices.length > 0 ? form.additionalServices : undefined,
    serviceAmount: form.serviceAmount ? parseFloat(form.serviceAmount) : undefined,
    discountCode: form.discountCode || undefined,
    discountAmount: form.discountAmount > 0 ? form.discountAmount : undefined,
    paymentStatus: form.paymentStatus,
    finalAmount: finalAmount > 0 ? finalAmount : undefined,
    pointsEarned: (form as any).pointsEarned || undefined,
  };
}

// ─── Form Drawer ───────────────────────────────────────────────────────────────
interface FormDrawerProps {
  onClose: () => void;
  onSave: (form: FormState, id?: number) => void;
  machine?: Machine | null;
}

function CreateDrawer({ onClose, onSave, machine }: FormDrawerProps) {
  const isEdit = !!machine;
  const [form, setForm] = useState<FormState>(
    machine ? machineToForm(machine) : DEFAULT_FORM
  );
  const [step, setStep] = useState(machine ? STATUS_TO_STEP[machine.status] : 1);
  const [availableServices, setAvailableServices] = useState(getServices());

  // Discount state - initialize from machine if editing
  const [discountApplied, setDiscountApplied] = useState(
    !!(machine?.discountCode && machine?.discountAmount)
  );
  const [discountAmount, setDiscountAmount] = useState(machine?.discountAmount || 0);
  const [discountError, setDiscountError] = useState("");

  // Auto-calculate service amount when services change
  useEffect(() => {
    const total = form.additionalServices.reduce((sum, serviceName) => {
      return sum + getServicePrice(serviceName);
    }, 0);
    setForm((prev) => ({ ...prev, serviceAmount: total.toString() }));
    // Reset discount when service amount changes (need to re-apply discount)
    setDiscountApplied(false);
    setDiscountAmount(0);
    setDiscountError("");
  }, [form.additionalServices]);

  // Reload services when component mounts
  useEffect(() => {
    setAvailableServices(getServices());
  }, []);

  // Auto-update payment status based on final amount
  useEffect(() => {
    const currentFinalAmount = (parseFloat(form.serviceAmount) || 0) - discountAmount;
    if (currentFinalAmount === 0 && form.paymentStatus !== "free") {
      // If no charge, set to free
      setForm((prev) => ({ ...prev, paymentStatus: "free" }));
    } else if (form.paymentStatus === "free" && currentFinalAmount > 0) {
      // If was free but now has charge, set to pending
      setForm((prev) => ({ ...prev, paymentStatus: "pending" }));
    }
  }, [form.serviceAmount, discountAmount, form.paymentStatus]);

  const set = (key: keyof FormState, value: unknown) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const handleApplyDiscount = () => {
    const originalAmount = parseFloat(form.serviceAmount) || 0;

    if (originalAmount === 0) {
      setDiscountError("Không thể áp dụng mã giảm giá cho đơn miễn phí");
      setDiscountApplied(false);
      setDiscountAmount(0);
      return;
    }

    const result = validateDiscount(form.discountCode, originalAmount);

    if (!result.valid) {
      setDiscountError(result.error || "Mã giảm giá không hợp lệ");
      setDiscountApplied(false);
      setDiscountAmount(0);
    } else {
      setDiscountError("");
      setDiscountApplied(true);
      setDiscountAmount(result.discountAmount || 0);
    }
  };

  const toggleCheck = (field: "checklistBefore" | "checklistAfter" | "techChecklist", i: number) => {
    const arr = [...(form[field] as boolean[])];
    arr[i] = !arr[i];
    set(field, arr);
  };

  const setNote = (field: "notesBefore" | "notesAfter", i: number, val: string) => {
    const arr = [...form[field]];
    arr[i] = val;
    set(field, arr);
  };

  const TOTAL_STEPS = 5;

  const STEP_STATUS: Record<number, Status> = {
    1: "WAITING", 2: "WAITING", 3: "RUNNING", 4: "RETESTING", 5: "COMPLETE",
  };

  const STEP_META = [
    { n: 1, label: "Thông tin KH", role: "Tester vòng ngoài", badge: "bg-yellow-50 text-yellow-700 border-yellow-200", statusTag: "WAITING", statusColor: "bg-yellow-400" },
    { n: 2, label: "Tester trước", role: "Tester vòng ngoài", badge: "bg-yellow-50 text-yellow-700 border-yellow-200", statusTag: "WAITING", statusColor: "bg-yellow-400" },
    { n: 3, label: "Technician", role: "Admin → Technician", badge: "bg-blue-50 text-blue-700 border-blue-200", statusTag: "RUNNING", statusColor: "bg-blue-500" },
    { n: 4, label: "Tester sau", role: "Admin → Tester", badge: "bg-teal-50 text-teal-700 border-teal-200", statusTag: "RETESTING", statusColor: "bg-teal-500" },
    { n: 5, label: "Xác nhận", role: "Admin xác nhận", badge: "bg-green-50 text-green-700 border-green-200", statusTag: "COMPLETE", statusColor: "bg-green-500" },
  ];

  const currentMeta = STEP_META[step - 1];

  // Calculate total service amount and final amount
  const totalServiceAmount = form.additionalServices.reduce((sum, serviceName) => {
    return sum + getServicePrice(serviceName);
  }, 0);

  const finalAmount = totalServiceAmount - discountAmount;

  const handleSubmit = (finalStatus?: Status) => {
    // If discount is applied, increment usage count and save discount amount
    if (discountApplied && form.discountCode) {
      useDiscount(form.discountCode);
    }

    // Calculate points earned if order is completed/returned
    let pointsEarned = 0;
    if ((finalStatus === "COMPLETE" || finalStatus === "RETURNED") && finalAmount > 0) {
      pointsEarned = calculatePoints(finalAmount);

      // Save to point history
      if (pointsEarned > 0) {
        addPointHistory({
          id: Date.now().toString(),
          customerPhone: form.phone,
          customerName: form.customerName,
          type: "earn",
          points: pointsEarned,
          date: new Date().toISOString(),
          description: `Đơn hàng #${machine?.id || "New"} - ${formatCurr(finalAmount)}`,
          relatedId: machine?.id?.toString() || "new",
        });
      }
    }

    // Save form with discount amount, payment info, and points
    const updatedForm = {
      ...form,
      discountAmount: discountApplied ? discountAmount : 0,
      finalAmount: finalAmount,
      paymentStatus: form.paymentStatus || "pending",
      pointsEarned: pointsEarned > 0 ? pointsEarned : undefined,
      status: finalStatus ?? STEP_STATUS[step]
    };

    onSave(updatedForm, machine?.id);

    // Show success message with points
    if (pointsEarned > 0) {
      setTimeout(() => {
        alert(`✅ Hoàn thành!\n\n🎉 Khách hàng nhận được ${pointsEarned} điểm thưởng!\n\n${getPointsExplanation(finalAmount).join("\n")}`);
      }, 100);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/40" onClick={onClose} />

      {/* Drawer */}
      <div className="w-full max-w-3xl bg-white h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-orange-500">
          <div>
            <p className="text-white font-bold">
              {isEdit ? `Chỉnh sửa phiếu — ${machine!.customerName}` : "Phiếu nhận máy"}
            </p>
            <p className="text-orange-100 text-xs">CLB Hỗ trợ Kỹ thuật IT Supporter</p>
          </div>
          <button onClick={onClose} className="text-white hover:text-orange-200 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Step tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          {STEP_META.map(({ n, label }) => (
            <button
              key={n}
              onClick={() => setStep(n)}
              className={`flex-1 py-3 text-xs font-semibold transition-colors border-b-2 ${step === n
                ? "border-orange-500 text-orange-600 bg-white"
                : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
            >
              <span className="hidden sm:inline">P{n}: </span>{label}
            </button>
          ))}
        </div>

        {/* Role banner */}
        <div className={`px-6 py-2.5 border-b flex items-center justify-between ${currentMeta.badge}`}>
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="opacity-60">Thực hiện bởi:</span>
            <span className="font-semibold">{currentMeta.role}</span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white ${currentMeta.statusColor}`}>
            → {currentMeta.statusTag}
          </span>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

          {/* ── Phần I ── */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-gray-700 font-semibold text-sm pb-1 border-b border-gray-100">
                Phần I: Thông tin khách hàng
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-600">Tên khách hàng *</label>
                  <input
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="Họ và tên"
                    value={form.customerName}
                    onChange={(e) => set("customerName", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-600">SĐT *</label>
                  <input
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="Số điện thoại"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">Tình trạng máy</label>
                <input
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  placeholder="Mô tả tình trạng máy..."
                  value={form.machineCondition}
                  onChange={(e) => set("machineCondition", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-600">Bảo hành</label>
                <div className="flex gap-4">
                  {(["con", "het"] as const).map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer">
                      <div
                        onClick={() => set("warranty", v)}
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${form.warranty === v ? "border-orange-500" : "border-gray-300"
                          }`}
                      >
                        {form.warranty === v && (
                          <div className="w-2 h-2 rounded-full bg-orange-500" />
                        )}
                      </div>
                      <span className="text-sm text-gray-700">
                        {v === "con" ? "Máy còn bảo hành" : "Máy hết bảo hành"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">Nhu cầu</label>
                <textarea
                  rows={3}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
                  placeholder="Mô tả nhu cầu của khách hàng..."
                  value={form.needs}
                  onChange={(e) => set("needs", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-600">Mật khẩu máy (nếu có)</label>
                  <input
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="Mật khẩu..."
                    value={form.password}
                    onChange={(e) => set("password", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600">Mang sạc</label>
                  <div className="flex gap-4 mt-1">
                    {(["co", "khong"] as const).map((v) => (
                      <label key={v} className="flex items-center gap-2 cursor-pointer">
                        <div
                          onClick={() => set("charger", v)}
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${form.charger === v ? "border-orange-500" : "border-gray-300"
                            }`}
                        >
                          {form.charger === v && (
                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                          )}
                        </div>
                        <span className="text-sm text-gray-700">{v === "co" ? "Có" : "Không"}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-600">Thời gian đưa máy đến</label>
                  <input
                    type="datetime-local"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    value={form.dropOffTime}
                    onChange={(e) => set("dropOffTime", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-600">Thời gian hẹn nhận máy</label>
                  <input
                    type="datetime-local"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    value={form.appointmentTime}
                    onChange={(e) => set("appointmentTime", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-600">Category</label>
                  <select
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white"
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                  >
                    <option>Hardware</option>
                    <option>Software</option>
                    <option>Network</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Finance section */}
              <div className="border-t border-gray-200 pt-4 mt-2">
                <h4 className="text-xs font-semibold text-gray-700 mb-3">Thông tin tài chính</h4>

                <div className="flex flex-col gap-1 mb-3">
                  <label className="text-xs font-medium text-gray-600">Dịch vụ thêm</label>
                  <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <div className="flex flex-wrap gap-2">
                      {availableServices.map((service) => {
                        const isSelected = form.additionalServices.includes(service.name);
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => {
                              const newServices = isSelected
                                ? form.additionalServices.filter((s) => s !== service.name)
                                : [...form.additionalServices, service.name];
                              set("additionalServices", newServices);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${isSelected
                              ? "bg-orange-500 text-white shadow-sm"
                              : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300"
                              }`}
                          >
                            <span>{service.name}</span>
                            <span className={`text-[10px] ${isSelected ? "opacity-90" : "opacity-60"}`}>
                              ({service.price === 0 ? "Miễn phí" : formatCurr(service.price)})
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {form.additionalServices.length === 0 && (
                      <p className="text-xs text-gray-400 italic mt-2">Chưa chọn dịch vụ nào</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-gray-600">Số tiền gốc (VNĐ)</label>
                      <input
                        type="number"
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50"
                        placeholder="0 = Miễn phí"
                        value={form.serviceAmount}
                        readOnly
                      />
                      <p className="text-[10px] text-gray-400 italic">Tự động tính dựa trên dịch vụ đã chọn</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-gray-600">Mã giảm giá</label>
                      <div className="flex gap-2">
                        <input
                          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent uppercase"
                          placeholder="VD: SAVE20"
                          value={form.discountCode}
                          onChange={(e) => set("discountCode", e.target.value.toUpperCase())}
                        />
                        <button
                          type="button"
                          onClick={handleApplyDiscount}
                          className="px-4 py-2 bg-orange-500 text-white rounded-lg text-xs font-medium hover:bg-orange-600 transition-colors whitespace-nowrap"
                        >
                          Áp dụng
                        </button>
                      </div>
                      {discountError && (
                        <p className="text-[10px] text-red-500 mt-1">{discountError}</p>
                      )}
                      {discountApplied && (
                        <p className="text-[10px] text-green-600 mt-1 flex items-center gap-1">
                          <CheckCircle2 size={10} /> Mã giảm giá đã được áp dụng!
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Payment Summary - Always show */}
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 space-y-2.5">
                    <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Tổng kết thanh toán</h5>

                    {/* Itemized services */}
                    {form.additionalServices.length > 0 && (
                      <div className="space-y-1">
                        {form.additionalServices.map((serviceName, idx) => {
                          const service = availableServices.find(s => s.name === serviceName);
                          const price = service?.price || 0;
                          return (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">• {serviceName}</span>
                              <span className="text-gray-700 font-medium">
                                {price === 0 ? "Miễn phí" : formatCurr(price)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {form.additionalServices.length === 0 && (
                      <div className="text-xs text-gray-400 italic">Chưa chọn dịch vụ nào</div>
                    )}

                    <div className="border-t border-orange-200 pt-2 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Số tiền gốc:</span>
                        <span className="font-semibold text-gray-700">
                          {formatCurr(parseFloat(form.serviceAmount) || 0)}
                        </span>
                      </div>

                      {discountApplied && discountAmount > 0 && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-green-600">Giảm giá:</span>
                          <span className="font-semibold text-green-600">
                            - {formatCurr(discountAmount)}
                          </span>
                        </div>
                      )}

                      <div className="border-t border-orange-300 pt-2 flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-800">Thành tiền:</span>
                        <span className="text-xl font-bold text-orange-600">
                          {formatCurr((parseFloat(form.serviceAmount) || 0) - discountAmount)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Status */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-600">Trạng thái thanh toán</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => set("paymentStatus", "paid")}
                        disabled={finalAmount === 0}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${finalAmount === 0
                          ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50"
                          : form.paymentStatus === "paid"
                            ? "bg-green-500 text-white shadow-md"
                            : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"
                          }`}
                      >
                        Đã thanh toán
                      </button>
                      <button
                        type="button"
                        onClick={() => set("paymentStatus", "pending")}
                        disabled={finalAmount === 0}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${finalAmount === 0
                          ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50"
                          : form.paymentStatus === "pending"
                            ? "bg-yellow-500 text-white shadow-md"
                            : "bg-white text-gray-600 border border-gray-200 hover:border-yellow-300"
                          }`}
                      >
                        Chưa thanh toán
                      </button>
                      <button
                        type="button"
                        onClick={() => set("paymentStatus", "free")}
                        disabled={finalAmount > 0}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${finalAmount > 0
                          ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50"
                          : form.paymentStatus === "free"
                            ? "bg-blue-500 text-white shadow-md"
                            : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
                          }`}
                      >
                        Miễn phí
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {form.warranty === "con" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 text-xs text-yellow-700 italic">
                  ⚠ Không vệ sinh trong đối với những máy còn bảo hành
                </div>
              )}
            </div>
          )}

          {/* ── Phần II: Tester trước khi nhận ── */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-gray-700 font-semibold text-sm pb-1 border-b border-gray-100">
                Phần II: Tester kiểm tra trước khi nhận máy
              </h3>

              <div className="max-w-xs">
                <SearchableSelect
                  value={form.testerBefore}
                  onChange={(v) => set("testerBefore", v)}
                  options={MEMBERS}
                  placeholder="Chọn tester trước..."
                  label="Tên tester trước"
                />
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-xs table-fixed">
                  <colgroup>
                    <col style={{ width: "38%" }} />
                    <col style={{ width: "12%" }} />
                    <col style={{ width: "50%" }} />
                  </colgroup>
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-gray-600 font-semibold">Nội dung kiểm tra máy</th>
                      <th className="text-center px-3 py-3 text-gray-600 font-semibold">Trước khi nhận</th>
                      <th className="text-left px-4 py-3 text-gray-600 font-semibold">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {CHECKLIST_ITEMS.map((item, i) => (
                      <tr key={`before-${i}`} className="hover:bg-gray-50/60">
                        <td className="px-4 py-3 text-gray-700 leading-snug">{i + 1}. {item}</td>
                        <td className="px-3 py-3 text-center">
                          <button
                            onClick={() => toggleCheck("checklistBefore", i)}
                            className="text-orange-500 hover:text-orange-600 transition-colors"
                          >
                            {form.checklistBefore[i]
                              ? <CheckSquare size={17} />
                              : <Square size={17} className="text-gray-300" />
                            }
                          </button>
                        </td>
                        <td className="px-4 py-2">
                          <textarea
                            rows={2}
                            className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-xs text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent resize-none transition-all"
                            placeholder="Ghi chú..."
                            value={form.notesBefore[i]}
                            onChange={(e) => setNote("notesBefore", i, e.target.value)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 italic">
                Tester trước nhập thông tin khách hàng và kiểm tra tình trạng máy khi nhận.
              </p>

              {/* ── Chữ ký khách hàng ── */}
              <CustomerSignatureSection
                customerName={form.customerName}
                value={form.customerSignature}
                onChange={(sig) => set("customerSignature", sig)}
              />
            </div>
          )}

          {/* ── Phần III: Technician ── */}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-gray-700 font-semibold text-sm pb-1 border-b border-gray-100">
                Phần III: Technician thực hiện
              </h3>

              {/* ① Admin chỉ định technician */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex flex-col gap-3">
                <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wide">① Admin — Chỉ định Technician</p>
                <SearchableSelect
                  value={form.technician}
                  onChange={(v) => set("technician", v)}
                  options={MEMBERS}
                  placeholder="Chọn technician..."
                  label="Tên technician"
                />
                <p className="text-[11px] text-blue-500 italic">Admin điền tên technician, lưu lại trước khi bàn giao máy. Trạng thái → <strong>RUNNING</strong>.</p>
              </div>

              {/* ② Technician thực hiện */}
              <div className="flex flex-col gap-3">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">② Technician — Thực hiện kiểm tra</p>

                <div className="bg-orange-50 border border-orange-100 rounded-lg px-4 py-3">
                  <p className="text-xs text-orange-700 italic leading-relaxed">
                    Quy trình: <strong>Tắt máy → Tháo vít → Ngắt nguồn/pin, xả điện → Vệ sinh nội thất → Hoàn thành yêu cầu → Lắp lại → Bật nguồn, khởi động lại.</strong>
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-2.5 text-gray-600 font-semibold">Nội dung kiểm tra</th>
                        <th className="text-center px-3 py-2.5 text-gray-600 font-semibold w-28">Hoàn thành ✓</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {TECHNICIAN_CHECKLIST.map((item, i) => (
                        <tr key={`tech-${i}`} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-700">{i + 1}. {item}</td>
                          <td className="px-3 py-3 text-center">
                            <button
                              onClick={() => toggleCheck("techChecklist", i)}
                              className="text-orange-500 hover:text-orange-600 transition-colors"
                            >
                              {form.techChecklist[i]
                                ? <CheckSquare size={16} />
                                : <Square size={16} className="text-gray-300" />
                              }
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-600">Ghi chú của Technician</label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent resize-none transition-all"
                    placeholder="Ghi lại tình trạng thực tế, linh kiện thay thế, vấn đề phát sinh trong quá trình sửa chữa..."
                    value={form.techNotes}
                    onChange={(e) => set("techNotes", e.target.value)}
                  />
                </div>

                <p className="text-xs text-gray-400 italic">
                  Technician hoàn thành → bàn giao máy lại cho Admin để chỉ định tester kiểm tra lại.
                </p>
              </div>
            </div>
          )}

          {/* ── Phần IV: Tester sau khi sửa ── */}
          {step === 4 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-gray-700 font-semibold text-sm pb-1 border-b border-gray-100">
                Phần IV: Tester kiểm tra sau khi sửa
              </h3>

              {/* ① Admin chỉ định tester sau */}
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 flex flex-col gap-3">
                <p className="text-[11px] font-semibold text-teal-700 uppercase tracking-wide">① Admin — Chỉ định Tester kiểm tra sau</p>
                <div className="max-w-xs">
                  <SearchableSelect
                    value={form.testerAfter}
                    onChange={(v) => set("testerAfter", v)}
                    options={MEMBERS}
                    placeholder="Chọn tester sau..."
                    label="Tên tester sau"
                  />
                </div>
                <p className="text-[11px] text-teal-600 italic">Admin chỉ định người test, lưu phần 4 trước khi bàn giao lại máy. Trạng thái → <strong>RETESTING</strong>.</p>
              </div>

              {/* ② Tester thực hiện */}
              <div className="flex flex-col gap-3">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">② Tester — Kiểm tra sau khi sửa</p>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-xs table-fixed">
                    <colgroup>
                      <col style={{ width: "38%" }} />
                      <col style={{ width: "12%" }} />
                      <col style={{ width: "50%" }} />
                    </colgroup>
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-3 text-gray-600 font-semibold">Nội dung kiểm tra máy</th>
                        <th className="text-center px-3 py-3 text-gray-600 font-semibold">Sau khi sửa</th>
                        <th className="text-left px-4 py-3 text-gray-600 font-semibold">Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {CHECKLIST_ITEMS.map((item, i) => (
                        <tr key={`after-${i}`} className="hover:bg-gray-50/60">
                          <td className="px-4 py-3 text-gray-700 leading-snug">{i + 1}. {item}</td>
                          <td className="px-3 py-3 text-center">
                            <button
                              onClick={() => toggleCheck("checklistAfter", i)}
                              className="text-orange-500 hover:text-orange-600 transition-colors"
                            >
                              {form.checklistAfter[i]
                                ? <CheckSquare size={17} />
                                : <Square size={17} className="text-gray-300" />
                              }
                            </button>
                          </td>
                          <td className="px-4 py-2">
                            <textarea
                              rows={2}
                              className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-xs text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent resize-none transition-all"
                              placeholder="Ghi chú..."
                              value={form.notesAfter[i]}
                              onChange={(e) => setNote("notesAfter", i, e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 italic">
                  Tester sau hoàn thành → bàn giao máy lại cho Admin để xác nhận hoàn thành và trả khách.
                </p>
              </div>
            </div>
          )}

          {/* ── Phần V: Admin xác nhận ── */}
          {step === 5 && (
            <div className="flex flex-col gap-5">
              <h3 className="text-gray-700 font-semibold text-sm pb-1 border-b border-gray-100">
                Phần V: Admin xác nhận &amp; trả máy
              </h3>

              {/* Summary card */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Tóm tắt phiếu</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                  <div><span className="text-gray-400">Khách hàng: </span><span className="text-gray-800 font-medium">{form.customerName || "—"}</span></div>
                  <div><span className="text-gray-400">SĐT: </span><span className="text-gray-800 font-medium">{form.phone || "—"}</span></div>
                  <div><span className="text-gray-400">Tester trước: </span><span className="text-gray-800 font-medium">{form.testerBefore || "—"}</span></div>
                  <div><span className="text-gray-400">Technician: </span><span className="text-gray-800 font-medium">{form.technician || "—"}</span></div>
                  <div><span className="text-gray-400">Tester sau: </span><span className="text-gray-800 font-medium">{form.testerAfter || "—"}</span></div>
                  <div><span className="text-gray-400">Thời gian đưa đến: </span><span className="text-gray-800 font-medium">{form.dropOffTime || "—"}</span></div>
                  <div><span className="text-gray-400">Hẹn trả: </span><span className="text-gray-800 font-medium">{form.appointmentTime || "—"}</span></div>
                </div>
                <div className="flex gap-6 pt-2 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    Checklist trước: <strong className="text-orange-500">{form.checklistBefore.filter(Boolean).length}/{form.checklistBefore.length}</strong>
                  </div>
                  <div className="text-xs text-gray-500">
                    Checklist sau: <strong className="text-teal-600">{form.checklistAfter.filter(Boolean).length}/{form.checklistAfter.length}</strong>
                  </div>
                </div>
                {form.techNotes && (
                  <div className="text-xs pt-2 border-t border-gray-200">
                    <span className="text-gray-400">Ghi chú Technician: </span>
                    <span className="text-gray-700 italic">{form.techNotes}</span>
                  </div>
                )}
              </div>

              {/* Invoice & Payment Summary */}
              {(form.additionalServices.length > 0 || form.discountCode) && (
                <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                        <CreditCard size={14} className="text-orange-500" />
                        Hóa đơn thanh toán
                      </p>
                      {finalAmount > 0 && (
                        <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${form.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : form.paymentStatus === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                          }`}>
                          {form.paymentStatus === "paid"
                            ? "Đã thanh toán"
                            : form.paymentStatus === "pending"
                              ? "Chưa thanh toán"
                              : "Miễn phí"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-3">
                    {/* Services */}
                    {form.additionalServices.length > 0 && (
                      <div>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase mb-2">Dịch vụ</p>
                        <div className="space-y-1.5">
                          {form.additionalServices.map((service, idx) => {
                            const price = getServicePrice(service);
                            return (
                              <div key={idx} className="flex items-center justify-between text-xs">
                                <span className="text-gray-700">{service}</span>
                                <span className="font-semibold text-gray-900">{formatCurr(price)}</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex items-center justify-between text-xs pt-2 mt-2 border-t border-gray-100">
                          <span className="text-gray-500">Tổng dịch vụ:</span>
                          <span className="font-semibold text-gray-900">{formatCurr(totalServiceAmount)}</span>
                        </div>
                      </div>
                    )}

                    {/* Discount */}
                    {discountApplied && form.discountCode && (
                      <div className="pt-2 border-t border-gray-100">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Mã giảm giá:</span>
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded font-mono font-semibold text-[10px]">
                              {form.discountCode}
                            </span>
                          </div>
                          <span className="font-semibold text-orange-600">-{formatCurr(discountAmount)}</span>
                        </div>
                      </div>
                    )}

                    {/* Final Amount */}
                    <div className="pt-3 mt-2 border-t-2 border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Thành tiền:</span>
                        <span className="text-lg font-bold text-orange-600">{formatCurr(finalAmount)}</span>
                      </div>
                    </div>

                    {/* Points Earned */}
                    {(() => {
                      const pointsEarned = calculatePoints(finalAmount);
                      if (pointsEarned > 0) {
                        return (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Star size={16} className="text-yellow-500 fill-yellow-500" />
                              <div>
                                <p className="text-xs font-semibold text-yellow-800">Điểm tích lũy</p>
                                <p className="text-[10px] text-yellow-600">
                                  {getPointsExplanation(finalAmount).join(" • ")}
                                </p>
                              </div>
                            </div>
                            <span className="text-lg font-bold text-yellow-700">+{pointsEarned}</span>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                </div>
              )}

              {/* Admin note */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">Ghi chú của Admin (tuỳ chọn)</label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent resize-none transition-all"
                  placeholder="Ghi chú khi trả máy, tình trạng xác nhận cuối..."
                  value={form.adminConfirmNote}
                  onChange={(e) => set("adminConfirmNote", e.target.value)}
                />
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Xác nhận trạng thái</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSubmit("COMPLETE")}
                    className="flex flex-col items-center gap-2 px-4 py-5 rounded-xl border-2 border-orange-400 bg-orange-50 hover:bg-orange-100 transition-colors"
                  >
                    <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold">COMPLETE</span>
                    <span className="text-xs text-orange-700 text-center leading-snug">Máy đã sửa xong, admin xác nhận hoàn thành</span>
                  </button>
                  <button
                    onClick={() => handleSubmit("RETURNED")}
                    className="flex flex-col items-center gap-2 px-4 py-5 rounded-xl border-2 border-green-400 bg-green-50 hover:bg-green-100 transition-colors"
                  >
                    <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold">RETURNED</span>
                    <span className="text-xs text-green-700 text-center leading-snug">Đã trả máy cho khách hàng thành công</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between gap-3">
          <div>
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                ← Trước
              </button>
            )}
          </div>

          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                onClick={() => setStep(n)}
                className={`h-2 rounded-full cursor-pointer transition-all ${step === n ? "bg-orange-500 w-4" : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Huỷ
            </button>
            {/* Quick save for steps 1-4 */}
            {step < TOTAL_STEPS && (
              <button
                onClick={() => handleSubmit(STEP_STATUS[step])}
                className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors shadow-sm"
              >
                {step === 1 ? "Đặt dịch vụ" : `Lưu P${step}`}
                {step !== 1 && <span className="opacity-80 ml-1">→ {STEP_STATUS[step]}</span>}
              </button>
            )}
            {/* Next */}
            {step < TOTAL_STEPS && (
              <button
                onClick={() => setStep(step + 1)}
                className="px-5 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
              >
                Tiếp →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Machines() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [search, setSearch] = useState("");
  const [gridView, setGridView] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [orderBy, setOrderBy] = useState<string>("Newest");
  const [editMachine, setEditMachine] = useState<Machine | null>(null);
  const [viewMode, setViewMode] = useState<"main" | "online">("main"); // main = quản lý chính, online = đăng ký trực tuyến

  // Load machines from localStorage only (no initial/mock data ever - per requirement)
  useEffect(() => {
    const storedMachines = getMachines();
    setMachines(storedMachines);
  }, []);

  const today = new Date().toLocaleDateString("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric",
  }).replace(/\//g, "/");

  const filtered = machines.filter((m) => {
    const matchSearch =
      m.customerName.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search);
    const matchFilter = filterStatus === "All" || m.status === filterStatus;

    // Phân biệt máy theo viewMode
    if (viewMode === "online") {
      // Tab "Đăng ký trực tuyến": chỉ hiển thị máy đăng ký online chưa duyệt
      return matchSearch && matchFilter && m.registrationType === "online" && !m.isApproved;
    } else {
      // Tab "Quản lý chính": chỉ hiển thị máy đăng ký tại quầy HOẶC đã duyệt
      return matchSearch && matchFilter && (m.registrationType === "in-person" || m.isApproved);
    }
  });

  const handleSave = (form: FormState, id?: number) => {
    const existingMachine = id ? machines.find(m => m.id === id) : null;
    const next: Machine = formToMachine(form, existingMachine);
    const updatedMachines = id ? machines.map(m => m.id === id ? next : m) : [next, ...machines];
    setMachines(updatedMachines);
    saveMachines(updatedMachines);

    // Create invoice for new in-person registration (not editing)
    if (!id && next.registrationType === "in-person") {
      const now = new Date();
      const currentDate = now.toLocaleDateString("vi-VN");
      const currentTime = now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

      // Create invoice
      addInvoice({
        machineId: next.id,
        customerName: next.customerName,
        phone: next.phone,
        registrationType: "in-person",
        services: (next.additionalServices || []).map(serviceName => ({
          name: serviceName,
          price: getServicePrice(serviceName),
        })),
        machineCondition: next.machineCondition,
        needs: next.needs,
        category: next.category,
        warranty: next.warranty,
        charger: next.charger,
        password: next.password,
        createdAt: currentDate,
        createdTime: currentTime,
        dropOffTime: next.dropOffTime,
        appointmentTime: next.appointmentTime,
        serviceAmount: next.serviceAmount || 0,
        discountCode: next.discountCode,
        discountAmount: next.discountAmount || 0,
        finalAmount: next.finalAmount || 0,
        paymentStatus: next.paymentStatus || "pending",
        pointsEarned: next.pointsEarned,
        tester: next.testerBefore || next.tester,
        createdBy: `Tester (${next.testerBefore || next.tester})`,
      });

      // Add/update customer
      if (next.phone !== "—" && next.customerName !== "Khách hàng") {
        addOrUpdateCustomer(next.customerName, next.phone, next.pointsEarned || 0);
      }

      // Add transaction to finance
      if (next.finalAmount && next.finalAmount > 0) {
        addTransaction({
          machineId: next.id,
          customerName: next.customerName,
          phone: next.phone,
          service: next.description,
          amount: next.finalAmount,
          paymentStatus: next.paymentStatus || "pending",
          date: currentDate,
          discountCode: next.discountCode,
          discountAmount: next.discountAmount,
        });
      }
    }
  };

  const handleApproveMachine = (id: number) => {
    const confirmed = window.confirm("Xác nhận khách hàng đã đưa máy đến và duyệt vào hệ thống quản lý chính?");
    if (!confirmed) return;


    // Ensure the machine has a proper sequential ID before approving
    const currentMachines = getMachines();
    let finalId = id;

    const machineToApprove = currentMachines.find(m => m.id === id);
    if (machineToApprove && (!machineToApprove.id || typeof machineToApprove.id !== 'number' || machineToApprove.id > 1000000000)) {
      finalId = ensureSequentialId(currentMachines, id);
    }

    const updatedMachines = machines.map(m =>
      m.id === id
        ? { ...m, id: finalId, isApproved: true, status: "WAITING" as Status }
        : m
    );
    setMachines(updatedMachines);
    saveMachines(updatedMachines);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top search bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
          />
        </div>
        <div className="ml-auto">
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors shadow-sm"
          >
            <Plus size={15} />
            Create
            <ChevronDown size={13} />
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 flex items-center gap-1">
        <button
          onClick={() => setViewMode("main")}
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${viewMode === "main"
            ? "text-orange-600 border-b-2 border-orange-600"
            : "text-gray-600 hover:text-gray-800"
            }`}
        >
          Quản lý chính
        </button>
        <button
          onClick={() => setViewMode("online")}
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${viewMode === "online"
            ? "text-orange-600 border-b-2 border-orange-600"
            : "text-gray-600 hover:text-gray-800"
            }`}
        >
          Đăng ký trực tuyến
          {machines.filter(m => m.registrationType === "online" && !m.isApproved).length > 0 && (
            <span className="ml-1.5 px-1.5 py-0.5 bg-orange-500 text-white text-[10px] rounded-full">
              {machines.filter(m => m.registrationType === "online" && !m.isApproved).length}
            </span>
          )}
        </button>
      </div>

      {/* Sub-toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex items-center gap-3">
        <p className="text-gray-700 text-sm font-semibold shrink-0">
          {filtered.length} Machines
        </p>
        <div className="flex-1" />

        {/* Filter */}
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-7 py-1.5 text-xs text-gray-600 outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
          >
            <option value="All">Filter</option>
            <option value="WAITING">Waiting</option>
            <option value="RUNNING">Running</option>
            <option value="RETESTING">Retesting</option>
            <option value="COMPLETE">Complete</option>
            <option value="RETURNED">Returned</option>
            <option value="RETURNING">Returning</option>
          </select>
          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Order by */}
        <div className="relative">
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-7 py-1.5 text-xs text-gray-600 outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
          >
            <option>Order by</option>
            <option>Newest</option>
            <option>Oldest</option>
            <option>Name A-Z</option>
          </select>
          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Date */}
        <span className="text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
          {today}
        </span>

        {/* View toggle */}
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setGridView(true)}
            className={`p-1.5 transition-colors ${gridView ? "bg-orange-500 text-white" : "bg-white text-gray-400 hover:bg-gray-50"}`}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setGridView(false)}
            className={`p-1.5 transition-colors ${!gridView ? "bg-orange-500 text-white" : "bg-white text-gray-400 hover:bg-gray-50"}`}
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
            Chưa có máy nào. Nhấn "Tạo" để bắt đầu.
          </div>
        ) : gridView ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((m, i) => (
              <MachineCard
                key={m.id}
                machine={m}
                index={i}
                onClick={() => setEditMachine(m)}
                onApprove={viewMode === "online" ? handleApproveMachine : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">#</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Status</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Tên KH</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">SĐT</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Giờ vào</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Mô tả</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Expired</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Tester</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Technician</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((m, i) => (
                  <MachineRow key={m.id} machine={m} index={i} onClick={() => setEditMachine(m)} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create drawer */}
      {showCreate && (
        <CreateDrawer onClose={() => setShowCreate(false)} onSave={handleSave} />
      )}

      {/* Edit drawer */}
      {editMachine && (
        <CreateDrawer
          machine={editMachine}
          onClose={() => setEditMachine(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}