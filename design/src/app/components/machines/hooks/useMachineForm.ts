import { useState, useEffect, useCallback } from "react";
import { getFirestoreServices } from "../../../data/firestoreServices";
import { validateFirestoreDiscount, useFirestoreDiscount } from "../../../data/firestoreDiscounts";
import { getFirestorePointRules } from "../../../data/firestorePoints";
import { calculatePoints, getPointsExplanation, type PointRule } from "../../../data/points";
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
  additionalServices: string[];
  serviceAmount: string;
  discountCode: string;
  discountAmount: number;
  paymentStatus: "paid" | "pending" | "free";
  pointsEarned?: number;
}

const DEFAULT_FORM: FormState = {
  customerName: "",
  customerEmail: "",
  phone: "",
  machineCondition: "",
  warranty: "het",
  needs: "",
  password: "",
  charger: "khong",
  appointmentTime: "",
  dropOffTime: "",
  testerBefore: "",
  testerAfter: "",
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
  WAITING: 2,
  RUNNING: 3,
  RETESTING: 4,
  COMPLETE: 5,
  RETURNED: 5,
  RETURNING: 4,
};

const STEP_STATUS: Record<number, Status> = {
  1: "WAITING",
  2: "WAITING",
  3: "RUNNING",
  4: "RETESTING",
  5: "COMPLETE",
};

function getServicePriceFromList(services: ServiceData[], serviceName: string): number {
  const service = services.find((item) => item.name === serviceName);
  return service?.price ?? 0;
}

export function useMachineForm(machine?: Machine | null) {
  const [form, setForm] = useState<FormState>(machine ? machineToForm(machine) : DEFAULT_FORM);
  const [step, setStep] = useState(machine ? STATUS_TO_STEP[machine.status] : 1);
  const [availableServices, setAvailableServices] = useState<ServiceData[]>([]);
  const [servicesLoaded, setServicesLoaded] = useState(false);

  const [discountApplied, setDiscountApplied] = useState(!!(machine?.discountCode && machine?.discountAmount));
  const [discountAmount, setDiscountAmount] = useState(machine?.discountAmount || 0);
  const [discountError, setDiscountError] = useState("");

  const [pointRules, setPointRules] = useState<PointRule[]>([]);
  const [pointsExplanation, setPointsExplanation] = useState<string[]>([]);

  useEffect(() => {
    getFirestoreServices()
      .then((services) => {
        setAvailableServices(services);
        setServicesLoaded(true);
      })
      .catch((error) => {
        console.error("Error loading services:", error);
        setAvailableServices([]);
        setServicesLoaded(true);
      });
  }, []);

  useEffect(() => {
    getFirestorePointRules()
      .then((rules) => {
        setPointRules(rules.filter((rule) => rule.enabled));
      })
      .catch((error) => {
        console.error("Error loading point rules:", error);
        setPointRules([]);
      });
  }, []);

  const calculateTotal = useCallback(
    (additionalServices: string[]): number => {
      return additionalServices.reduce((sum, serviceName) => {
        return sum + getServicePriceFromList(availableServices, serviceName);
      }, 0);
    },
    [availableServices]
  );

  useEffect(() => {
    if (!servicesLoaded) return;
    const total = calculateTotal(form.additionalServices);
    setForm((prev) => ({ ...prev, serviceAmount: total.toString() }));
    setDiscountApplied(false);
    setDiscountAmount(0);
    setDiscountError("");
  }, [form.additionalServices, servicesLoaded, calculateTotal]);

  useEffect(() => {
    const currentFinalAmount = Math.max(0, (parseFloat(form.serviceAmount) || 0) - discountAmount);

    if (currentFinalAmount === 0 && form.paymentStatus !== "free") {
      setForm((prev) => ({ ...prev, paymentStatus: "free" }));
    } else if (form.paymentStatus === "free" && currentFinalAmount > 0) {
      setForm((prev) => ({ ...prev, paymentStatus: "pending" }));
    }
  }, [form.serviceAmount, discountAmount, form.paymentStatus]);

  useEffect(() => {
    const nextFinalAmount = Math.max(0, (parseFloat(form.serviceAmount) || 0) - discountAmount);
    setPointsExplanation(getPointsExplanation(nextFinalAmount, pointRules));
  }, [form.serviceAmount, discountAmount, pointRules]);

  const set = (key: keyof FormState, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
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
      return;
    }

    const used = await useFirestoreDiscount(form.discountCode);
    if (!used) {
      setDiscountError("Không thể ghi nhận lượt sử dụng mã giảm giá");
      setDiscountApplied(false);
      setDiscountAmount(0);
      return;
    }

    setDiscountError("");
    setDiscountApplied(true);
    setDiscountAmount(result.discountAmount || 0);
  };

  const toggleCheck = (
    field: "checklistBefore" | "checklistAfter" | "techChecklist",
    index: number
  ) => {
    const next = [...(form[field] as boolean[])];
    next[index] = !next[index];
    set(field, next);
  };

  const setNote = (field: "notesBefore" | "notesAfter", index: number, value: string) => {
    const next = [...form[field]];
    next[index] = value;
    set(field, next);
  };

  const totalServiceAmount = calculateTotal(form.additionalServices);
  const finalAmount = Math.max(0, totalServiceAmount - discountAmount);

  const submitForm = (finalStatus?: Status) => {
    const pointsEarned = finalAmount > 0 ? calculatePoints(finalAmount, pointRules) : 0;

    const updatedForm = {
      ...form,
      discountAmount: discountApplied ? discountAmount : 0,
      finalAmount,
      paymentStatus: form.paymentStatus || "pending",
      pointsEarned: pointsEarned > 0 ? pointsEarned : undefined,
      status: finalStatus ?? STEP_STATUS[step],
    };

    return formToMachine(updatedForm, machine);
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
    pointsExplanation,
    pointRules,
    set,
    handleApplyDiscount,
    toggleCheck,
    setNote,
    totalServiceAmount,
    finalAmount,
    submitForm,
  };
}

function machineToForm(machine: Machine): FormState {
  return {
    customerName: machine.customerName === "Khách hàng" ? "" : machine.customerName,
    customerEmail: machine.customerEmail ?? "",
    phone: machine.phone === "—" ? "" : machine.phone,
    machineCondition: machine.machineCondition ?? "",
    warranty: machine.warranty,
    needs: machine.needs ?? (machine.description === "—" ? "" : machine.description),
    password: machine.password,
    charger: machine.charger ? "co" : "khong",
    appointmentTime: machine.appointmentTime,
    dropOffTime: machine.dropOffTime ?? "",
    testerBefore: machine.testerBefore,
    testerAfter: machine.testerAfter,
    checklistBefore: machine.checklistBefore ?? Array(10).fill(false),
    checklistAfter: machine.checklistAfter ?? Array(10).fill(false),
    notesBefore: machine.notesBefore ?? Array(10).fill(""),
    notesAfter: machine.notesAfter ?? Array(10).fill(""),
    technician: machine.technician === "—" ? "" : machine.technician,
    techChecklist: machine.techChecklist ?? Array(3).fill(false),
    techNotes: machine.techNotes ?? "",
    adminConfirmNote: machine.adminConfirmNote ?? "",
    customerSignature: machine.customerSignature ?? "",
    category: machine.category,
    status: machine.status,
    additionalServices: machine.additionalServices ?? [],
    serviceAmount: machine.serviceAmount?.toString() ?? "",
    discountCode: machine.discountCode ?? "",
    discountAmount: machine.discountAmount ?? 0,
    paymentStatus: machine.paymentStatus ?? "pending",
  };
}

function formToMachine(form: FormState, existing?: Machine | null): Machine {
  const totalServiceAmount = parseFloat(form.serviceAmount || "0");
  const finalAmount = totalServiceAmount - (form.discountAmount || 0);

  return {
    id: existing?.id ?? "",
    status: form.status,
    customerName: form.customerName || "Khách hàng",
    customerEmail: form.customerEmail,
    phone: form.phone || "—",
    time:
      existing?.time ??
      new Date()
        .toLocaleString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          day: "2-digit",
          month: "numeric",
          year: "numeric",
        })
        .replace(/\//g, "/"),
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
