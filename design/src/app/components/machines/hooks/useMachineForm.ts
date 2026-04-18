import { useState, useEffect } from "react";
import { getServices, getServicePrice } from "../../../data/services";
import { validateDiscount, useDiscount } from "../../../data/discounts";
import { calculatePoints, addPointHistory } from "../../../data/points";
import { type Machine, type Status, getMachines, ensureSequentialId } from "../../../data/machines";
import { addOrUpdateCustomer } from "../../../data/customers";

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

export function useMachineForm(machine?: Machine | null) {
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

  const totalServiceAmount = form.additionalServices.reduce((sum, serviceName) => {
    return sum + getServicePrice(serviceName);
  }, 0);

  const finalAmount = totalServiceAmount - discountAmount;

  const submitForm = (finalStatus?: Status) => {
    // If discount is applied, increment usage count and save discount amount
    if (discountApplied && form.discountCode) {
      useDiscount(form.discountCode);
    }

    // Calculate points earned if order is completed/returned OR for in-person (already brought machine)
    let pointsEarned = 0;
    const isInPerson = machine?.registrationType === "in-person" || (!machine);
    if ((finalStatus === "COMPLETE" || finalStatus === "RETURNED") && finalAmount > 0) {
      pointsEarned = calculatePoints(finalAmount);
    } else if (isInPerson && finalAmount > 0) {
      // For in-person: award points immediately when customer brings machine
      pointsEarned = calculatePoints(finalAmount);
    } else if (isInPerson && finalAmount === 0) {
      // In-person free registration (no services selected): award 1 point since customer brought machine
      pointsEarned = 1;
    }

    // Build the machine object with proper ID
    const updatedForm = {
      ...form,
      discountAmount: discountApplied ? discountAmount : 0,
      finalAmount: finalAmount,
      paymentStatus: form.paymentStatus || "pending",
      pointsEarned: pointsEarned > 0 ? pointsEarned : undefined,
      status: finalStatus ?? STEP_STATUS[step]
    };

    const resultMachine = formToMachine(updatedForm, machine);

    // Save point history and award customer points after machine is created
    if (pointsEarned > 0) {
      addPointHistory({
        id: Date.now().toString(),
        customerPhone: form.phone,
        customerName: form.customerName,
        type: "earn",
        points: pointsEarned,
        date: new Date().toISOString(),
        description: `Đơn hàng #${resultMachine.id} - ${finalAmount}`,
        relatedId: resultMachine.id.toString(),
      });
      // Award points to customer for in-person (customer already brought machine)
      if (form.phone && form.customerName && form.customerName !== "Khách hàng") {
        addOrUpdateCustomer(form.customerName, form.phone, pointsEarned, form.customerEmail);
      }
    }

    return resultMachine;
  };

  return {
    form,
    step,
    setStep,
    availableServices,
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
  const totalServiceAmount = form.additionalServices.reduce((sum, serviceName) => {
    return sum + getServicePrice(serviceName);
  }, 0);
  const finalAmount = totalServiceAmount - form.discountAmount;

  // Use existing ID for edits, ensureSequentialId for new machines
  const newId = existing?.id ?? ensureSequentialId(getMachines());

  return {
    id: newId,
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
    password: form.password,
    charger: form.charger === "co",
    appointmentTime: form.appointmentTime,
    dropOffTime: form.dropOffTime || undefined,
    registrationType: existing?.registrationType ?? "in-person",
    isApproved: existing?.isApproved ?? true,
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
    pointsEarned: form.pointsEarned || undefined,
  };
}
