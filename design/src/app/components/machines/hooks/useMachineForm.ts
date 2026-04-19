import { useState, useEffect, useCallback } from "react";
import { getFirestoreServices } from "../../../data/firestoreServices";
import { validateFirestoreDiscount, useFirestoreDiscount } from "../../../data/firestoreDiscounts";
import { calculatePoints } from "../../../data/points";
import { type Machine, type Status } from "../../../data/machines";
import type { ServiceData } from "../../../data/services";

export interface FormState {
  customerName: string;
  customerEmail: string;
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
  pointsEarned?: number;
}

const DEFAULT_FORM: FormState = {
  customerName: "", customerEmail: "", phone: "", machineCondition: "",
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

const STATUS_TO_STEP: Record<Status, number> = {
  WAITING: 2, RUNNING: 3, RETESTING: 4, COMPLETE: 5, RETURNED: 5, RETURNING: 4,
};

const STEP_STATUS: Record<number, Status> = {
  1: "WAITING", 2: "WAITING", 3: "RUNNING", 4: "RETESTING", 5: "COMPLETE",
};

// Helper to get price from services array
function getServicePriceFromList(services: ServiceData[], serviceName: string): number {
  const service = services.find(s => s.name === serviceName);
  return service?.price ?? 0;
}

export function useMachineForm(machine?: Machine | null) {
  const [form, setForm] = useState<FormState>(
    machine ? machineToForm(machine) : DEFAULT_FORM
  );
  const [step, setStep] = useState(machine ? STATUS_TO_STEP[machine.status] : 1);
  const [availableServices, setAvailableServices] = useState<ServiceData[]>([]);
  const [servicesLoaded, setServicesLoaded] = useState(false);

  // Discount state - initialize from machine if editing
  const [discountApplied, setDiscountApplied] = useState(
    !!(machine?.discountCode && machine?.discountAmount)
  );
  const [discountAmount, setDiscountAmount] = useState(machine?.discountAmount || 0);
  const [discountError, setDiscountError] = useState("");

  // Load services from Firestore
  useEffect(() => {
    getFirestoreServices().then(services => {
      setAvailableServices(services);
      setServicesLoaded(true);
    }).catch(err => {
      console.error("Error loading services:", err);
      // Fallback to empty array
      setAvailableServices([]);
      setServicesLoaded(true);
    });
  }, []);

  // Calculate total from selected services
  const calculateTotal = useCallback((additionalServices: string[]): number => {
    return additionalServices.reduce((sum, serviceName) => {
      return sum + getServicePriceFromList(availableServices, serviceName);
    }, 0);
  }, [availableServices]);

  // Auto-calculate service amount when services change or services load
  useEffect(() => {
    if (!servicesLoaded) return;
    const total = calculateTotal(form.additionalServices);
    setForm((prev) => ({ ...prev, serviceAmount: total.toString() }));
    // Reset discount when service amount changes (need to re-apply discount)
    setDiscountApplied(false);
    setDiscountAmount(0);
    setDiscountError("");
  }, [form.additionalServices, servicesLoaded, calculateTotal]);

  // Auto-update payment status based on final amount
  useEffect(() => {
    const currentFinalAmount = (parseFloat(form.serviceAmount) || 0) - discountAmount;
    if (currentFinalAmount === 0 && form.paymentStatus !== "free") {
      setForm((prev) => ({ ...prev, paymentStatus: "free" }));
    } else if (form.paymentStatus === "free" && currentFinalAmount > 0) {
      setForm((prev) => ({ ...prev, paymentStatus: "pending" }));
    }
  }, [form.serviceAmount, discountAmount, form.paymentStatus]);

  const set = (key: keyof FormState, value: unknown) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const handleApplyDiscount = async () => {
    const originalAmount = parseFloat(form.serviceAmount) || 0;

    if (originalAmount === 0) {
      setDiscountError("Không thể áp dụng mã giảm giá cho đơn miễn phí");
      setDiscountApplied(false);
      setDiscountAmount(0);
      return;
    }

    const result = await validateFirestoreDiscount(form.discountCode, originalAmount);

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

  const totalServiceAmount = calculateTotal(form.additionalServices);
  const finalAmount = totalServiceAmount - discountAmount;

  // Mark discount as used when submitting - caller should handle this via Firestore
  const markDiscountUsed = async () => {
    if (discountApplied && form.discountCode) {
      await useFirestoreDiscount(form.discountCode);
    }
  };

  const submitForm = (finalStatus?: Status) => {
    // Calculate points earned if order is completed/returned OR for in-person (already brought machine)
    let pointsEarned = 0;
    const isInPerson = machine?.registrationType === "in-person" || (!machine);
    if ((finalStatus === "COMPLETE" || finalStatus === "RETURNED") && finalAmount > 0) {
      pointsEarned = calculatePoints(finalAmount);
    } else if (isInPerson && finalAmount > 0) {
      pointsEarned = calculatePoints(finalAmount);
    } else if (isInPerson && finalAmount === 0) {
      pointsEarned = 1;
    }

    // Build the machine object - ID is managed by parent (Machines.tsx) via Firestore
    const updatedForm = {
      ...form,
      discountAmount: discountApplied ? discountAmount : 0,
      finalAmount: finalAmount,
      paymentStatus: form.paymentStatus || "pending",
      pointsEarned: pointsEarned > 0 ? pointsEarned : undefined,
      status: finalStatus ?? STEP_STATUS[step]
    };

    const resultMachine = formToMachine(updatedForm, machine);

    return resultMachine;
  };

  return {
    form,
    step,
    setStep,
    availableServices,
    servicesLoaded,
    discountApplied,
    discountAmount,
    discountError,
    set,
    handleApplyDiscount,
    toggleCheck,
    setNote,
    totalServiceAmount,
    finalAmount,
    submitForm,
    markDiscountUsed,
  };
}

// Helper functions
function machineToForm(m: Machine): FormState {
  return {
    customerName: m.customerName === "Khách hàng" ? "" : m.customerName,
    customerEmail: m.customerEmail ?? "",
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
  const totalServiceAmount = 0; // Caller should calculate this before passing
  const finalAmount = totalServiceAmount - form.discountAmount;

  return {
    id: existing?.id ?? "",
    status: form.status,
    customerName: form.customerName || "Khách hàng",
    customerEmail: form.customerEmail,
    phone: form.phone || "—",
    time: existing?.time ?? new Date().toLocaleString("vi-VN", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      day: "2-digit", month: "numeric", year: "numeric",
    }).replace(/\//g, "/"),
    description: form.needs || form.machineCondition || "—",
    expired: form.appointmentTime || "—",
    category: form.category,
    tester: form.testerBefore || "—",
    technician: form.technician || "—",
    warranty: form.warranty,
    password: form.password || "",
    charger: form.charger === "co",
    appointmentTime: form.appointmentTime || "",
    dropOffTime: form.dropOffTime || "",
    registrationType: existing?.registrationType ?? "in-person",
    isApproved: existing?.isApproved ?? true,
    testerBefore: form.testerBefore || "",
    testerAfter: form.testerAfter || "",
    machineCondition: form.machineCondition || "",
    needs: form.needs || "",
    checklistBefore: form.checklistBefore,
    checklistAfter: form.checklistAfter,
    notesBefore: form.notesBefore,
    notesAfter: form.notesAfter,
    techChecklist: form.techChecklist,
    techNotes: form.techNotes || "",
    adminConfirmNote: form.adminConfirmNote || "",
    customerSignature: form.customerSignature || "",
    additionalServices: form.additionalServices.length > 0 ? form.additionalServices : [],
    serviceAmount: form.serviceAmount ? parseFloat(form.serviceAmount) : 0,
    discountCode: form.discountCode || "",
    discountAmount: form.discountAmount > 0 ? form.discountAmount : 0,
    paymentStatus: form.paymentStatus || "pending",
    finalAmount: finalAmount > 0 ? finalAmount : 0,
    pointsEarned: form.pointsEarned || 0,
  };
}
